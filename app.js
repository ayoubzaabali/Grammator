const {  spawn } = require('child_process');
const {  createReadStream } = require("fs");

    var result=[];
    //create a new read stream
    const readStream= createReadStream("./routes/input.txt");

    // spawn aspell cmd
    const child = spawn('aspell', ['-a']);
 
    // This will wait until we know the readable stream is actually valid before piping
    readStream.on('open', function () {
 
     // This just pipes the read stream to the response object 
     readStream.pipe(child.stdin);
   });
 
  // This will wait untill we have valid output
    child.stdout.on('data', (data) => {
      data=data.toString();
      let regex = /&\s(\w+)\s(\d+)\s(\d+):\s(.+)/g ;
      let match = regex.exec(data)
      if(match!=null){
        result.push(
        {
          "word":match[1],
          "row" : match[2],
          "column" :match[3],
          "posibilities":match[4].split(",")
        })
      }       

 
   });
   child.on("close",(code,signal)=>{
       console.log(result)
   })
  // in case an error occurs durring aspell execution
   child.stderr.on('data', (data) => {
     console.error(`child stderr:\n${data}`);
   });
 