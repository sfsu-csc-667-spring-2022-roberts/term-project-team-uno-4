const saveUserScore = require("../controllers/game");

module.exports = function (io, socket, rooms) {
   socket.on("connect room", (roomid, callback) => {
      if (roomid && rooms[roomid] !== undefined) {
         let room = rooms[roomid];
         socket.leave("unogame");
         socket.join(roomid);

         io.to(room.id).emit("update lobby list", { players: room.getPlayers() });

         socket.on("start game", () => {
            room.status = 1;
            io.to(room.id).emit("game started", { status: true });
         });

         socket.on("join game", (callback) => {
            callback(refreshGameDataResponse());
         });

         socket.on("refresh data", () => {
            refreshGameDataRequest();
         });

         socket.on("draw card", () => {
            if (room.checkMyTurn(socket.username)) {
               if (room.drawACard()) {
                  refreshGameDataRequest();
               }
            }
         });

         socket.on("play card", async ({ index, color }) => {
            if (room.checkMyTurn(socket.username)) {
               console.log(index, color);
               let win = room.players[room.turn].deck.playCard(room, index, color);
               refreshGameDataRequest();
               if (win) {
                  room.status = 2;
                  let player_win = room.players[room.turn].name;
                  io.to(room.id).emit("end game", { status: true, message: player_win + " wins!" });

                  for (let p of room.players) {
                     if (p.name == player_win) {
                        await saveUserScore(p.name, true);
                     } else {
                        await saveUserScore(p.name, false);
                     }
                  }

                  setTimeout(() => {
                     delete rooms[roomid];
                     io.to("unogame").emit("update room list", { rooms: getRoomsList() });
                  }, 1000);
               }
            }
         });

         socket.on("call uno", () => {
            if (room.checkMyTurn(socket.username)) {
               room.callUno();
               refreshGameDataRequest();
            }
         });

         socket.on("refresh data request", (callback) => {
            let data = refreshGameDataResponse();
            callback(data);
         });

         function refreshGameDataRequest() {
            io.to(room.id).emit("refresh data request");
         }

         function refreshGameDataResponse() {
            let turn = room.turn;
            let status = room.status;
            let draw_stack = room.draw_stack;
            let discard_pile = room.discard_pile;
            let player_count = room.player_count;
            let player = room.getPlayerData(socket.username);
            let players = room.getOtherPlayerData(socket.username);
            return { turn, status, draw_stack, player_count, discard_pile, player, players };
         }

         socket.on("room chat", (msg) => {
            io.to(room.id).emit("room chat", msg);
         });

         socket.on("leave room", (roomid, callback) => {
            let isadmin = room.playerIsAdmin(socket.username);
            room.removePlayer(socket.username);

            if (room.players.length <= 0 || isadmin) {
               socket.broadcast.to(room.id).emit("end game", { status: true, message: "Admin ended the game!" });
               delete rooms[roomid];
            }

            let players = [];
            for (let player of room.players) {
               let picked = (({ id, name, index }) => ({ id, name, index }))(player);
               players.push(picked);
            }

            let tmp_room = {
               id: room.id,
               name: room.name,
               players: players,
            };

            io.to("unogame").emit("update room list", { rooms: getRoomsList() });
            io.to(room.id).emit("update lobby list", { players: room.getPlayers() });
            callback({ status: true, room: tmp_room });
         });

         let players = [];
         for (let p of room.players) {
            let picked = (({ id, name, index }) => ({ id, name, index }))(p);
            players.push(picked);
         }

         let tmp_room = {
            id: room.id,
            name: room.name,
            players: players,
         };

         callback({ status: true, room: tmp_room, message: "Room connected successfully!" });
      }

      callback({ status: false, message: "Room dosen't exist!" });

      function getRoomsList() {
         let temp_rooms = [];
         for (let room of Object.values(rooms)) {
            let temp_room = {
               id: room.id,
               name: room.name,
               player_count: room.player_count,
            };
            temp_rooms.push(temp_room);
         }
         return temp_rooms;
      }
   });
};
