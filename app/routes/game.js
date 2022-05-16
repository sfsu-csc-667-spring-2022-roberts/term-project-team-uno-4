const { ensureLoggedIn } = require("connect-ensure-login");

module.exports = function (app, rooms) {
   app.use(function (req, res, next) {
      res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
      next();
   });

   app.get("/game", ensureLoggedIn("/login"), async (req, res) => {
      let roomid = req.query.roomid;
      if (roomid && rooms[roomid] !== undefined) {
         let room = rooms[roomid];
         if (room.playerExists(req.user.username)) {
            let isadmin = room.playerIsAdmin(req.user.username);
            let tmp_room = {
               id: room.id,
               name: room.name,
               player_count: room.player_count,
            };
            return res.layout("game", { title: "Game", user: req.user, room: tmp_room, isadmin });
         }
      }
      return res.redirect("/");
   });
};
