//get and post stadiums 
const express = require("express");
const router = express.Router();
const validate = require("../validation");
const Model = require("../model.js");
//------------GET----------------------
router.get("/stadium", async (req, res) => {

    await Model.stadium.find({},(err,docs)=>{
        if (err) return res.status(500)
        res.send(docs)
    })
    
});

router.get("/stadium/:id", async (req, res) => {

    const { error } = validate.validateID(req.params.id);
    if (error) return res.status(400).send(error.details[0].message);

    await Model.stadium.findById(req.params.id).populate('artists').exec((err,doc)=>{
        if (err) return res.status(500)
        res.send(doc)
    })
    
});


//---------------------POST---------------------//

router.post('/stadium/new',async (req,res)=>{

    //validation using Joi to validate requests
    const { error } = validate.newStadium(req.body); //write this function
    if (error) return res.status(400).send(error.details[0].message);

    const newStadium = new Model.stadium(req.body)
    
    await newStadium.save((err,doc)=>{
        if(err) {
            
            console.error(err)
            return res.status(500).send()
        }

        res.send()
    })
})

//----------------PUT---------------------//

router.put('/stadium/:id', async (req,res)=>{
//validates the id for the request
    const idValidation = validate.validateID(req.params.id);
    if (idValidation.error) return res.status(400).send(idValidation.error.details[0].message);


    //validation using Joi to validate requests
    const stadiumValidation = validate.updateStadium(req.body);
    if (stadiumValidation.error) return res.status(400).send(stadiumValidation.error.details[0].message);

    await Model.stadium.findByIdAndUpdate(req.params.id,{...req.body},(err,doc)=>{
        if(err) return res.status(500).send()
        return res.send()
    })


}
)



module.exports = router;