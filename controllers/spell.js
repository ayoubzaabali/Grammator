const { exec, spawn } = require('child_process');
const session = require('express-session');
const { fstat, createReadStream,createWriteStream,existsSync,watch } = require("fs");
const { createHmac } = require('node:crypto');
const path =require("path");
const { Readable } = require("stream")



const GetSpellErrors=(req,res)=>{
  // create redeable from text input
  // .............................
  const {text}=req.body;
  if(!text)
  return res.status(400).send({success:false,msg:"text required"});
  const readable = Readable.from([text]);
  

  var result=[];
  
  
  // spawn aspell cmd
  const child = spawn('aspell', ['-a']);
  


  // feed aspell with the text
  readable.pipe(child.stdin)

  
// This will wait untill we have valid output
  child.stdout.on('data', (data) => {
    data=data.toString();
    let regex = /&\s(\w+)\s(\d+)\s(\d+):\s(.+)/g ;
    let match = regex.exec(data)
    if(match!=null){
      result.push(
      {
        "word":match[1],
        "posibilities_count" : match[2],
        "position" :match[3],
        "posibilities":match[4].split(",")
      })
    }       


 });

//  handle onclose event
 child.on("close",(code,signal)=>{
     res.status(200).json({success:true,data:result});
 })


// in case an error occurs durring aspell execution
 child.stderr.on('data', (data) => {
   console.error(`child stderr:\n${data}`);
   res.status(400).json({success:false,data:"an error occured durring execution"});

 });

}
const GetSpellErrorsFile=(req,res)=>{
  // construct redeable from text file
  // .............................
  const readable = createReadStream(req.file.path);
  
  var result=[];


  // spawn aspell cmd
  const child = spawn('aspell', ['-a']);
  


  // feed aspell with the text
  readable.pipe(child.stdin)

  
// This will wait untill we have valid output
  child.stdout.on('data', (data) => {
    data=data.toString();
    let regex = /&\s(\w+)\s(\d+)\s(\d+):\s(.+)/g ;
    let match = regex.exec(data)
    if(match!=null){
      result.push(
      {
        "word":match[1],
        "posibilities_count" : match[2],
        "position" :match[3],
        "posibilities":match[4].split(",")
      })
    }       


 });

//  handle onclose event
 child.on("close",(code,signal)=>{
     res.status(200).json({success:true,data:result});
 })


// in case an error occurs durring aspell execution
 child.stderr.on('data', (data) => {
   console.error(`child stderr:\n${data}`);
   res.status(400).json({success:false,data:"an error occured durring execution"});

 });

}

// session.file=createHmac('sha256', code)
// .update(Math.floor(keys[0].toString()))
// .digest('hex');






















module.exports ={
  GetSpellErrors,
  GetSpellErrorsFile
}