const mongoose = require("mongoose");
require("dotenv").config();

//Define the MongoDB connection URL
// const mongoURL = "mongodb://localhost:27017/hotels"; //Replace 'mydatabase' with your database name

// const mongoURL =
//   "mongodb+srv://patil150pratik:myXiPgYWgNzYFwXK@cluster0.xml8zcl.mongodb.net/";

// const mongoURL =
//   "mongodb+srv://patil150pratik:<myXiPgYWgNzYFwXK>@cluster0.xml8zcl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// const mongoURL = process.env.MONGODB_URL_LOCAL;
const mongoURL = process.env.MONGODB_URL;
//Set up MongoDB connection
mongoose.connect(mongoURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true});

//Get the default connection
//Mongoose maintains a default connection object repesenting the MongoDB connection
const db = mongoose.connection;

//Define event listeners for database connection
db.on("connected", () => {
  console.log("Connected to MongoDB server");
});

db.on("error", (err) => {
  console.log("MongoDB connection error:", err);
});

db.on("disconnected", () => {
  console.log("MongoDB  disconnected");
});

//Export the database connection
module.exports = db;
