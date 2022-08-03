const Joi = require("@hapi/joi");
const { stadium } = require("./model");


function newArtist(doc){
  const schema = Joi.object({
    name:Joi.string().required(),
    dob:Joi.string().required(),
    songs:Joi.array(),
    stadium:Joi.string().length(24).hex().required()
  })
  return schema.validate(doc)
}
module.exports.newArtist = newArtist 

function updateArtist(doc){
  const schema = Joi.object({
    name:Joi.string(),
    dob:Joi.string(),
    songs:Joi.array(),
    stadium:Joi.string().length(24).hex().required()
  })
  return schema.validate(doc)
}
module.exports.updateArtist = updateArtist


function newStadium(doc){
  const schema = Joi.object({
    name:Joi.string().required(),
    about:Joi.string().required(),
    img:Joi.string().required(),
    
  })  
  return schema.validate(doc)

}
module.exports.newStadium = newStadium

function updateStadium(doc){
  const schema = Joi.object({
    name:Joi.string().required(),
    About:Joi.string().required(),
    img:Joi.string().required(),
    performing:Joi.array()
  })
  return schema.validate(doc)
}
module.exports.updateStadium = updateStadium
function newSong(doc){
  const schema = Joi.object({
 
    name:Joi.string().required(),
    length:Joi.string().required(),
    artist:Joi.string().length(24).hex().required()
  })
  return schema.validate(doc)
}
module.exports.newSong = newSong

function updateSong(doc){
  const schema = joi.object({
    
    name:Joi.string().required(),
    length:Joi.string().required(),
    artist:Joi.array().required()
  })
  return schema.validate(doc)
}
module.exports.updateSong = updateSong

function validateID(id) {
  const schema = Joi.string().length(24).hex().required();
  return schema.validate(id);
}
module.exports.validateID = validateID;
