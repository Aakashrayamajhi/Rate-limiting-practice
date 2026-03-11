
import {app} from "./app.js"
import dotenv from "dotenv"
import path from "path"
import dbconnection from "./database/connection.js"
dotenv.config({
    path :  path.resolve('../.env')
})

const PORT = process.env.PORT

dbconnection()
app.listen(PORT , ()=>{
    console.log('server is running on port 3000')
})