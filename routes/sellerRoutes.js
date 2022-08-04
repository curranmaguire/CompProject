//get and post artists
const express = require("express");
const router = express.Router();
const validate = require("../validation");
const Model = require("../model.js");

//---------------------GET---------------------//

router.get("/seller", (req, res) => {
  Model.seller.find({}).populate("products").exec((err, docs) => {
    if (err) return res.status(500);
    res.send(docs);
  });
});

router.get("/seller/:id", (req, res) => {
  const { error } = validate.validateID(req.params.id);
  if (error) return res.status(400).send(error.details[0].message);

  Model.seller
    .findById(req.params.id)
    .populate("products")
    .populate("sales")
    .exec((err, doc) => {
      if (err) return res.status(500);
      res.send(doc);
    });
});

//---------------------POST---------------------//

router.post("/seller/new", async (req, res) => {
  //validation using Joi to validate requests
  const { error } = validate.newSeller(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const newSeller = new Model.seller(req.body);

  newSeller.save((err, doc) => {
    if (err) {
      console.error(err);
      return res.status(500).send();
    }

    res.send();
  });
});

module.exports = router;
