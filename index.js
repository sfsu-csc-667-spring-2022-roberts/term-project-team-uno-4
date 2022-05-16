const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const csrf = require("csurf");
const logger = require("morgan");
const passport = require("passport");
const createError = require("http-errors");
const { Server } = require("socket.io");
const { createServer } = require("http");
const http = createServer(app);
const io = new Server(http);

const port = process.env.PORT || 3000;

app.set("views", path.join(__dirname, "public/views"));
app.set("view engine", "ejs");
app.use(require("ejs-yield"));
app.use(logger("dev"));
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
   session({
      secret: "keyboard cat",
      resave: false,
      saveUninitialized: false,
   })
);
app.use(csrf());
app.use(passport.authenticate("session"));
app.use(function (req, res, next) {
   let msgs = req.session.messages || [];
   res.locals.messages = msgs;
   res.locals.hasMessages = !!msgs.length;
   req.session.messages = [];
   next();
});

app.use(function (req, res, next) {
   res.locals.csrfToken = req.csrfToken();
   next();
});

require("./app/routes")(app, io);

app.use(function (req, res, next) {
   next(createError(404));
});

app.use(function (err, req, res, next) {
   res.locals.message = err.message;
   res.locals.status = err.status || 500;

   res.status(err.status || 500);
   res.layout("error", { title: err.message });
});

http.listen(port, () => console.log(`App started on port ${port}`));
