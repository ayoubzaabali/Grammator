const express = require("express");
const router = express.Router();
const {  createReadStream,createWriteStream,existsSync,writeFile } = require("fs");
const path = require("path");
const {get,set} = require("../controllers/Redis");
const axios = require("axios");


// ###Grammar check for multiple languages
router.post("/check",(req,res)=>{

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






module.exports = router;