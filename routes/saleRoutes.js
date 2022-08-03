//get and post stadiums
const express = require("express");
const router = express.Router();
const validate = require("../validation");
const Model = require("../model.js");
//------------GET----------------------
router.get("/sale", (req, res) => {
  Model.sale.find({}, (err, docs) => {
    if (err) return res.status(500);
    res.send(docs);
  });
});

router.get("/sale/:id", async (req, res) => {
  const { error } = validate.validateID(req.params.id);
  if (error) return res.status(400).send(error.details[0].message);

  await Model.sale
    .findById(req.params.id)
    .populate("products")
    .populate("sellers")
    .exec((err, doc) => {
      if (err) return res.status(500);
      res.send(doc);
    });
});

//---------------------POST---------------------//

router.post("/sale/new", async (req, res) => {
  //validation using Joi to validate requests
  const { error } = validate.newSale(req.body); //write this function
  if (error) return res.status(400).send(error.details[0].message);

  const newSale = new Model.sale(req.body);

  await newSale.save((err, doc) => {
    if (err) {
      console.error(err);
      return res.status(500).send();
    }

    res.send();
  });
});

module.exports = router;
