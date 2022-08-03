//get and post artists 
const express = require("express");
const router = express.Router();
const validate = require("../validation");
const Model = require("../model.js");

//---------------------GET---------------------//

router.get("/artist", async (req, res) => {

    await Model.artist.find({},(err,docs)=>{
        if (err) return res.status(500)
        res.send(docs)
    })
  
});

router.get('/artist/:id', async (req,res)=>{
    const { error } = validate.validateID(req.params.id);
    if (error) return res.status(400).send(error.details[0].message);

    await Model.artist.findById(req.params.id).populate('songs').populate('stadium').exec((err,doc)=>{
        if(err) return res.status(500)
        res.send(doc)
    })
})



//---------------------POST---------------------//

router.post('/artist/new',async (req,res)=>{

    //validation using Joi to validate requests
    const { error } = validate.newArtist(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const newArtist = new Model.artist(req.body)

    const stadium = await Model.stadium.findById(req.body.stadium)

    if(!stadium) return res.status(404).send('no stadium found with that id')

    await newArtist.save(async (err,doc)=>{
        if(err) {
            
            console.error(err)
            return res.status(500).send()
        }

        stadium.artists.push(req.body.stadium)
        await stadium.save()

        res.send()
    })
})


//---------------------PUT---------------------//

router.put('/artist/:id', async (req,res)=>{
//validates the id for the request
    const idValidation = validate.validateID(req.params.id);
    if (idValidation.error) return res.status(400).send(idValidation.error.details[0].message);


    //validation using Joi to validate requests
    const artistValidation = validate.updateArtist(req.body);
    if (artistValidation.error) return res.status(400).send(artistValidation.error.details[0].message);

    await Model.artist.findByIdAndUpdate(req.params.id,{...req.body},(err,doc)=>{
        if(err) return res.status(500).send()
        return res.send()
    })


}
)



module.exports = router;
