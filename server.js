const express = require("express");
const app = express();
const db = require("./db");
const passport = require("./auth");

require("dotenv").config();

const bodyParser = require("body-parser");
app.use(bodyParser.json()); //saved in req.body
const PORT = process.env.PORT || 3000;

//Middleware Function
const logRequest = (req, res, next) => {
  console.log(
    `[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`
  );
  next(); //imp
};
// app.use(logRequest);
app.use(passport.initialize());

// app.get("/", logRequest, (req, res) => {
//   res.send("Welcome to our Hotel.");
// });
const localAuthMiddleware = passport.authenticate("local", { session: false });

app.get("/", (req, res) => {
  res.send("Welcome to our Hotel.");
});

//Import the router files
const personRoutes = require("./routes/personRoute");
const menuItemsRoutes = require("./routes/menuItemsRoutes");

//Use the routers
// app.use("/person", localAuthMiddleware, personRoutes);
app.use("/person", personRoutes);
app.use("/menuitems", menuItemsRoutes);
// app.use("/menuitems", logRequest, menuItemsRoutes);

app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
