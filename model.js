const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Seller = new Schema({
  name: String,
  description: String,
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  sales: [{ type: Schema.Types.ObjectId, ref: "Sale" }],
});

exports.seller = mongoose.model("Seller", Seller);

const Sale = new Schema({
  name: String,
  address: String,
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
});

exports.sale = mongoose.model("Sale", Sale);

const Product = new Schema({
  name: String,
  description: String,
  price: String,
  image: String,
  seller: { type: Schema.Types.ObjectId, ref: "Seller" },
});

exports.product = mongoose.model("Product", Product);
