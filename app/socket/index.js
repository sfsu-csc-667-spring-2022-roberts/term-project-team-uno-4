module.exports = function (io, socket, rooms) {
   console.log("User: " + socket.username + " connected");
   require("./home")(io, socket, rooms);
   require("./game")(io, socket, rooms);
};
