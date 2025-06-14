const express = require("express");
const app = express();
const db = require("./db");
require("dotenv").config();

const bodyParser = require("body-parser");
app.use(bodyParser.json()); //saved in req.body
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Welcome to our Hotel.");
});

//Import the router files
const personRoutes = require("./routes/personRoute");
const menuItemsRoutes = require("./routes/menuItemsRoutes");

//Use the routers
app.use("/person", personRoutes);
app.use("/menuitems", menuItemsRoutes);

app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
