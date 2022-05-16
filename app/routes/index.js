let rooms = {};

module.exports = function (app, io) {
   require("./auth")(app);
   require("./user")(app);
   require("./home")(app);
   require("./game")(app, rooms);

   io.use((socket, next) => {
      const username = socket.handshake.auth.username;
      if (!username) {
         return next(new Error("invalid username"));
      }
      socket.username = username;
      next();
   });

   const server = require("../socket");
   io.on("connection", (socket) => server(io, socket, rooms));
};
