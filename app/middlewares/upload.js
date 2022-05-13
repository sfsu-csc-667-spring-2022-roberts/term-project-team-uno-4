const multer = require("multer");
const path = require("path");

var limits = {
   files: 2,
   fileSize: 10240 * 10240,
};

// avatar upload
var image_storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, "./public/img/avatar");
   },
   filename: function (req, file, cb) {
      cb(null, req.user.username + path.extname(file.originalname));
   },
   fileFilter: (req, file, cb) => {
      if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
         cb(null, true);
      } else {
         cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
         return;
      }
   },
});

var image_upload = multer({ storage: image_storage, limits: limits }).single("image");

const uploadImage = (req, res, next) => {
   image_upload(req, res, function (err) {
      if (err) {
         res.status(500).send(err);
         return;
      }
      if (req.file) {
         req.image_url = req.file.filename;
      } else {
         req.image_url = "";
      }
      next();
      return;
   });
};

const uploadFiles = {
   uploadImage,
};

module.exports = uploadFiles;
