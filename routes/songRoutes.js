//get and post songs 
const express = require("express");
const router = express.Router();
const validate = require("../validation");
const Model = require("../model.js");

//---------------------GET---------------------//

router.get("/song", async (req, res) => {
  

    await Model.song.find({},(err,docs)=>{
        if (err) return res.status(500)
        res.send(docs)
    })
  
});

router.get('/song/:id',async (req,res)=>{
    const { error } = validate.validateID(req.params.id);
    if (error) return res.status(400).send(error.details[0].message);

    await Model.song.findById(req.params.id).populate('artist').exec((err,doc)=>{
        if(err) return res.status(500)
        res.send(doc)
    })
})

//---------------------POST---------------------//

router.post('/song/new',async (req,res)=>{

    //validation using Joi to validate requests
    const { error } = validate.newSong(req.body); //validate song functiob needs writing 
    if (error) return res.status(400).send(error.details[0].message);

  
    const artist = await Model.artist.findById(req.body.artist)

    if(!artist) return res.status(404).send('artist not found')

    const newSong = new Model.song(req.body)
    

    await newSong.save(async(err,doc)=>{
        if(err) {
            
            console.error(err)
            return res.status(500).send()
        }

        artist.songs.push(doc._id)
        await artist.save()
        return res.send()
        
        
    })
    
})


//---------------------PUT---------------------//

router.put('/song/:id', async (req,res)=>{
    //validates the id for the request
        const idValidation = validate.validateID(req.params.id);
        if (idValidation.error) return res.status(400).send(idValidation.error.details[0].message);
    
    
        //validation using Joi to validate requests
        const songValidation = validate.updateSong(req.body);
        if (songValidation.error) return res.status(400).send(songValidation.error.details[0].message);
    
        await Model.song.findByIdAndUpdate(req.params.id,{...req.body},(err,doc)=>{
            if(err) return res.status(500).send()
            return res.send()
        })
    
    
    }
    )
    
    
    
    module.exports = router;