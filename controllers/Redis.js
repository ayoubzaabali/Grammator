const set =(key,val)=>{
    global.RedisClient.set(key, val);
}

const get = async (key)=>{
  return(await global.RedisClient.get(key) ) 
}






module.exports={
    get,set
}