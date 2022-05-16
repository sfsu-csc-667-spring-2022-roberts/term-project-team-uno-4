const { ensureLoggedIn } = require("connect-ensure-login");

module.exports = function (app, io) {
   app.use(function (req, res, next) {
      res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
      next();
   });

   app.get("/", ensureLoggedIn("/login"), async (req, res, next) => {
      res.layout("index", { title: "Home", user: req.user });
   });

   app.get("/rules", async (req, res, next) => {
      res.layout("rules", { title: "Rules", user: req.user });
   });
};
