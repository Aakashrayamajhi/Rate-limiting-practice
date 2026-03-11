import userModel from "./user.model.js"
import bcrypt from "bcrypt"

const signupController = async (req, res) => {

try {

    const { username, password } = req.body;


    if(!username || !password){
        return res.status(400).json({
            message: "username and password required"
        })
    }

    const existingUser = await userModel.findOne({ username })

    if(existingUser){
        return res.status(409).json({
            message: "username already exists"
        })
    }


    const hashedPassword = await bcrypt.hash(password, 10)

    const createdUser = await userModel.create({
        username,
        password: hashedPassword
    })

    res.status(201).json({
        message: "Successfully signup",
        success: true,
        user: createdUser
    })

} catch(err) {

    console.log("server error:", err)

    res.status(500).json({
        message: "internal server error"
    })

}

}

export default signupController