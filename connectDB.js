const mongoose = require("mongoose");

const password = "Curran123";
const dbname = "t2summative";
const url =
  "mongodb+srv://Curran:" +
  password +
  "@cluster0.ymrp7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const db = mongoose.connection;

exports.connect = function connectDb() {
  mongoose.connect(url);

  db.once("open", () => {
    console.log("Database connected:", url);
  });

  db.on("error", (err) => {
    console.error("connection error:", err);
  });
};
