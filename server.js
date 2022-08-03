const express = require("express");
const mongoose = require("mongoose");
const Connect = require("./connectDB.js");
const path = require("path");
const app = express();

//----------ERROR HANDLING-----------

Connect.connect();
console.log(process.env.FRONTEND_URL);
mongoose.connection.on("error", (err) => {
  console.error("connection error:", err);
});

app.use(express.json());

//----------------HOMEPAGE------------
// app.use("/static", express.static(path.join(__dirname, "public")));
app.use(express.static("public"));
//----------IMPORT ROUTES-----------
const artistRoutes = require("./routes/artistRoutes");
const stadiumRoutes = require("./routes/stadiumRoutes");
const songRoutes = require("./routes/songRoutes");

//-----------HANDLE ROUTES----------
app.get("/artist", artistRoutes);
app.all("/artist/*", artistRoutes);
app.get("/stadium", stadiumRoutes);
app.all("/stadium/*", stadiumRoutes);
app.get("/song", songRoutes);
app.all("/song/*", songRoutes);

//-------------LOCAL CONNECTION------------
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log("listening on port " + port);
});
