const Room = require("./game/room");
const Deck = require("./game/deck");
const Card = require("./game/card");
const Player = require("./game/player");

let initial_cards = 7;

module.exports = function (io, socket, rooms) {
   socket.join("unogame");

   io.to("unogame").emit("update room list", { rooms: getRoomsList() });

   socket.on("create room", (name, callback) => {
      let player = new Player(generateId(), socket.username, 0);
      for (let i = 0; i < initial_cards; i++) {
         player.deck.drawCard();
      }
      let room = new Room(generateId(), name);
      room.addPlayer(player);
      room.selectPlayfieldCard();

      rooms[room.id] = room;

      let tmp_room = {
         id: room.id,
         name: room.name,
         player_count: room.player_count,
      };

      io.to("unogame").emit("update room list", { rooms: getRoomsList() });
      callback({ status: true, room: tmp_room });
   });

   socket.on("join room", (roomid, callback) => {
      if (roomid && rooms[roomid] !== undefined) {
         let room = rooms[roomid];

         if (!room.playerExists(socket.username)) {
            if (room.status >= 1) {
               callback({ status: false, message: "Game started!" });
               return;
            }

            if (room.players.length >= 4) {
               callback({ status: false, message: "Room almost full!" });
               return;
            }

            let player = new Player(generateId(), socket.username, room.players.length);
            for (let i = 0; i < initial_cards; i++) {
               player.deck.drawCard();
            }
            room.addPlayer(player);
         }

         let tmp_room = {
            id: room.id,
            name: room.name,
            player_count: room.player_count,
         };

         io.to("unogame").emit("update room list", { rooms: getRoomsList() });
         callback({ status: true, room: tmp_room });
         return;
      }
      callback({ status: false, message: "Room dosen't exist!" });
   });

   socket.on("global chat", (msg) => {
      io.to("unogame").emit("global chat", msg);
   });

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
};

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
function generateId(length = 12) {
   let result = "";
   for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
   }
   return result;
}
