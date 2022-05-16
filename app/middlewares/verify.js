const db = require("../models");
const User = db.User;

verifyData = (req, res, next) => {
   User.findOne({
      where: {
         username: req.body.username,
      },
   }).then((user) => {
      if (user) {
         req.session.messages = ["Failed! Username is already in use!"];
         res.redirect("/signup");
         return;
      }
      User.findOne({
         where: {
            email: req.body.email,
         },
      }).then((user) => {
         if (user) {
            req.session.messages = ["Failed! Email is already in use!"];
            res.redirect("/signup");
            return;
         }
         let error = hasError(req.body.password);
         if (error) {
            req.session.messages = error;
            res.redirect("/signup");
            return;
         }
         return next();
      });
   });
};

function hasError(p) {
   let errors = [];
   if (p.length < 8) {
      errors.push("Your password must be at least 8 characters");
   }
   if (p.search(/[a-z]/i) < 0) {
      errors.push("Your password must contain at least one letter.");
   }
   // if (p.search(/[0-9]/) < 0) {
   //    errors.push("Your password must contain at least one digit.");
   // }
   if (errors.length > 0) {
      return errors;
   }
   return false;
}

const signupVerify = {
   verifyData: verifyData,
};
module.exports = signupVerify;
