import express from "express"
import cors from "cors"
import ratelimiter from "./config/fixed_window_counter.config.js"

const app = express()

//middlewares
app.use(cors({
    origin : `http://localhost:3000`
}))
app.use(express.json())
app.use(ratelimiter)


app.get("/",(req , res)=>{
    res.send("hello")
})

//handling Routes 

import userRouter from "./modules/user/user.route.js"

app.use("/api/v1/user", userRouter)


export {app}