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
const saleRoutes = require("./routes/saleRoutes");
const sellerRoutes = require("./routes/sellerRoutes");
const productRoutes = require("./routes/productRoutes");

//-----------HANDLE ROUTES----------
app.get("/sale", saleRoutes);
app.all("/sale/*", saleRoutes);
app.get("/seller", sellerRoutes);
app.all("/seller/*", sellerRoutes);
app.get("/product", productRoutes);
app.all("/product/*", productRoutes);

//-------------LOCAL CONNECTION------------
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log("listening on port " + port);
});
