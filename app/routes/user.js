const { ensureLoggedIn } = require("connect-ensure-login");
const { uploadFiles } = require("../middlewares");
const db = require("../models");
const { User } = db;

module.exports = function (app) {
   app.use(function (req, res, next) {
      res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
      next();
   });

   app.get("/user/:username", ensureLoggedIn("/login"), async (req, res) => {
      let tuser = await User.findOne({
         where: {
            username: req.params.username,
         },
      });
      return res.layout("users/profile", { title: "Profile", user: req.user, tuser: tuser });
   });

   app.get("/user/:username/edit", ensureLoggedIn("/login"), async (req, res) => {
      if (req.user.username == req.params.username) {
         let user = await User.findByPk(req.user.id);
         res.layout("users/edit", { title: "Edit Profile", user: user });
         return;
      }
      res.redirect("/user/" + req.params.username);
   });

   app.post("/user/:username/update", [ensureLoggedIn("/login"), uploadFiles.uploadImage], async (req, res) => {
      let user = await User.findByPk(req.user.id);
      user.photo_path = req.image_url || user.image;
      await user.save();
      res.redirect("/user/" + req.user.username);
   });
};
