const db = require("../models");
const { User } = db;

exports.saveUserScore = async (username, win) => {
   let user = await User.findOne({
      where: {
         username: username,
      },
   });
   if (user) {
      if (win) {
         user.wins = user.wins + 1;
      } else {
         user.losses = user.losses + 1;
      }
      await user.save();
   }
   res.redirect("/user/" + req.user.username);
};
