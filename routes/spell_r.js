const express = require("express");
const axios = require("axios");
const router = express.Router();
const { GetSpellErrors,GetSpellErrorsFile }=require("../controllers/spell");
const crypto = require('crypto');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })


// ###Grammar check for multiple languages
router.post("/verify",(req,res)=>{

     const { lang,text }=req.body;
     if(!text)
     res.status(401).json({ success: false, data: "text required" }) //send json response
     if(!lang)
     res.status(401).json({ success: false, data: "language required" }) //send json response


    //Assigning necessary parameters
    const options = {
        params: { language: lang , text }
    };

    //Send request to languagetool local server
    axios.get(global.languageToolHost+"/check",options).then(function (response) {
          res.status(200).json({ success: true, data: response.data.matches }) //send json response
    }).catch(function (error) {

          console.error(error); // error handling
          res.status(200).json({ success: false, data: "error occured" }) //send json response

    });

    
})



// ###Spell check for english
router.post("/check",GetSpellErrors);

// ###Spell check for english supports for .txt files
router.post("/checkFile",upload.single('filename'),GetSpellErrorsFile);






















module.exports = router;