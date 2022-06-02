const express = require("express");
const app = express();
const spell_routes= require("./routes/spell_r")
const home_routes= require("./routes/grammar_r")
const { exec ,spawn } = require('child_process');
const session= require("express-session");
const Redis=require("ioredis");
const RedisStore=require("connect-redis")(session);


const cors = require("cors");


global.languageToolHost=process.env.LanguageUrl+"/v2"


const port = process.env.PORT || 8080

// const RedisClient=new Redis({
//     host: 'redis',
//     port: 6379
// });
// 
// global.RedisClient=RedisClient

app.use(session({
    secret:"some secret",
    cookie:{maxAge:3000000000 },
    // store:new RedisStore({client:RedisClient}),
    saveUninitialized:false,
    resave:false
}))


//allow origin 
app.options('*', cors())


//Routes setting
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use('/', home_routes);
app.use('/spell', spell_routes);




app.listen(port,()=>{
    console.log(`app listening to port ${port}`)
})