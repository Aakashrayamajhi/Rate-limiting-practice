import mongoose from "mongoose"
import dbConfig from "../config/db.config.js"

const uri = dbConfig.development.uri

const dbconnection = async ()=>{
try{
    await mongoose.connect(uri)
    .then(()=>{ console.log("dbconnected")})
    .catch((error)=>{console.log("dberror:",error)})
}catch(error){
    console.log("error in db:", error)
}
}

export default dbconnection