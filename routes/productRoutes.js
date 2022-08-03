//get and post artists
const express = require("express");
const router = express.Router();
const validate = require("../validation");
const Model = require("../model.js");

//---------------------GET---------------------//

router.get("/product", (req, res) => {
  Model.product.find({}).exec((err, docs) => {
    if (err) return res.status(500);
    res.send(docs);
  });
});

router.get("/product/:id", (req, res) => {
  const { error } = validate.validateID(req.params.id);
  if (error) return res.status(400).send(error.details[0].message);

  Model.product
    .findById(req.params.id)
    .populate("seller")
    .exec((err, doc) => {
      if (err) return res.status(500);
      res.send(doc);
    });
});

//---------------------POST---------------------//

router.post("/product/new", async (req, res) => {
  //validation using Joi to validate requests
  const { error } = validate.newProduct(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const newProduct = new Model.product(req.body);

  const seller = await Model.seller.findById(req.body.seller);

  if (!seller) return res.status(404).send("no seller found with that id");

  await newProduct.save(async (err, doc) => {
    if (err) {
      console.error(err);
      return res.status(500).send("error creating product");
    }

    seller.products.push(doc._id);
    await seller.save();

    return res.send();
  });
});

//---------------------PUT---------------------//

module.exports = router;
