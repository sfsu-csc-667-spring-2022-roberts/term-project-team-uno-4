const { ensureLoggedIn } = require("connect-ensure-login");

module.exports = function (app, io, socket, rooms) {
   console.log("User: " + socket.username + " connected!");

   io.emit("room update", rooms);

   socket.on("global chat", (msg) => {
      io.emit("global chat", msg);
   });

   socket.on("create room", (name, callback) => {
      if (!socket.username) {
         callback({ status: false });
         return;
      }
      let room = {
         id: generateId(12),
         name: name,
         users: [{ username: socket.username, isadmin: true }],
         status: 0,
      };
      rooms[room.id] = room;
      io.emit("room update", rooms);
      callback({ status: true, room: room });
   });

   socket.on("join room", (roomid, callback) => {
      if (roomid && rooms[roomid] !== undefined) {
         let room = rooms[roomid];

         let exists = userExists(room.users, socket.username);

         if (!exists) {
            if (room.status >= 1) {
               callback({ status: false, message: "Game started!" });
            }

            if (room.users.length >= 4) {
               callback({ status: false, message: "Room almost full!" });
            }

            room.users.push({
               username: socket.username,
               isadmin: false,
            });
         }

         socket.join(roomid);

         io.emit("room update", rooms);
         io.to(roomid).emit("lobby update", room);

         socket.on("leave room", (username, callback) => {
            for (var i = 0; i < room.users.length; i++) {
               if (room.users[i].username == username) {
                  let isadmin = isAdmin(room.users, socket.username);
                  room.users.splice(i, 1);
                  if (room.users.length <= 0 || isadmin) {
                     delete rooms[roomid];
                  }
                  break;
               }
            }

            callback({ status: true, room: room });
         });

         socket.on("room chat", (msg) => {
            io.to(roomid).emit("room chat", msg);
         });

         socket.on("disconnect", () => {
            console.log("User: " + socket.username + " disconnected");
            // for (var i = 0; i < room.users.length; i++) {
            //    if (room.users[i].username == socket.username) {
            //       let isadmin = isAdmin(room.users, socket.username);
            //       room.users.splice(i, 1);
            //       if (room.users.length <= 0 || isadmin) {
            //          delete rooms[roomid];
            //       }
            //       break;
            //    }
            // }
         });
         callback({ status: true, room: room, message: "Room connected successfully!" });
      }
      callback({ status: false, message: "Room dosen't exist!" });
   });

   socket.on("disconnect", () => {
      console.log("user disconnected");
   });

   function userExists(users, username) {
      for (let user of users) {
         if (user.username == username) {
            return true;
         }
      }
      return false;
   }

   function isAdmin(users, username) {
      for (let user of users) {
         if (user.username == username && user.isadmin == true) {
            return true;
         }
      }
      return false;
   }

   const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
   function generateId(length = 12) {
      let result = "";
      for (let i = 0; i < length; i++) {
         result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return result;
   }
};
