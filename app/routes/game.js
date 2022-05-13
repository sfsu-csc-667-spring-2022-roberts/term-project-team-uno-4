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
         let isadmin = isAdmin(room.users, req.user.username);
         return res.layout("game", { title: "Game", user: req.user, room, isadmin });
      } else {
         return res.redirect("/");
      }
   });

   function isAdmin(users, username) {
      for (let user of users) {
         if (user.username == username && user.isadmin == true) {
            return true;
         }
      }
      return false;
   }
};
