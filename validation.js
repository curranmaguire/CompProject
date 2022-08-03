const Joi = require("@hapi/joi");

function newSale(doc) {
  const schema = Joi.object({
    name: Joi.string().required(),
    address: Joi.string().required(),
    products: Joi.array(),
  });
  return schema.validate(doc);
}
module.exports.newSale = newSale;

function newProduct(doc) {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.string().required(),
    image: Joi.string().required(),
    seller: Joi.string().length(24).hex().required(),
  });
  return schema.validate(doc);
}
module.exports.newProduct = newProduct;

function newSeller(doc) {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    products: Joi.array(),
    sales: Joi.array(),
  });
  return schema.validate(doc);
}
module.exports.newSeller = newSeller;

function validateID(id) {
  const schema = Joi.string().length(24).hex().required();
  return schema.validate(id);
}
module.exports.validateID = validateID;
