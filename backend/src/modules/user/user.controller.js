import userModel from "./user.model.js"

const signupController = async (req , res) =>{

try{
    const {username , password} = req.body;
 const createdUser = await userModel.create({
        username , password
    })
console.log(createdUser)

res.status(200).json({
    message:"successfully signup",
    success : true
})
    
}catch(err){
    console.log("server error :", err)
    res.status(500).json({
        message : "internal server error"
    })
}
   

}

export default signupController