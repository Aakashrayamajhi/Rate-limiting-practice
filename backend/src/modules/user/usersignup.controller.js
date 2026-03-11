import userModel from "./user.model.js"
import bcrypt from "bcrypt"
import redis from "../../config/redis.config.js"


// Reserve username temporarily (10 seconds)
async function reserveUsername(username) {
    console.log("Trying to reserve username in Redis:", username)

    const result = await redis.set(
        `username:${username}`,
        "reserved",
        "NX",
        "EX",
        10
    )

    console.log("Redis reservation result:", result)

    return result
}


const signupController = async (req, res) => {

try {

    const { username, password } = req.body

    console.log("Signup request received:", username)

    // Validating input first
    if (!username || !password) {
        console.log("Validation failed: missing username or password")

        return res.status(400).json({
            message: "username and password required"
        })
    }


    // Checking redis cache first
    const usernameExist = await redis.get(`username:${username}`)

    console.log("Redis GET result:", usernameExist)


    if (usernameExist && usernameExist !== "reserved") {
        console.log("Username already exists in Redis cache")

        return res.status(400).json({
            message: "username already exists"
        })
    }


    // Trying reserving username
    const reserved = await reserveUsername(username)

    if (!reserved) {
        console.log("Username just reserved by another request")

        return res.status(400).json({
            message: "username is already taken just now, try another username"
        })
    }


    // Checking MongoDB
    const existingUser = await userModel.findOne({ username })

    console.log("MongoDB lookup result:", existingUser)


    if (existingUser) {
        console.log("Username already exists in MongoDB")

        return res.status(409).json({
            message: "username already exists"
        })
    }


    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    console.log("Password hashed successfully")


    // Create user
    const createdUser = await userModel.create({
        username,
        password: hashedPassword
    })

    console.log("User created in MongoDB:", createdUser.username)


    // Store permanent username in Redis
    const pipeline = redis.pipeline()

    pipeline.set(`username:${username}`, "1")

    await pipeline.exec()

    console.log("Username cached in Redis permanently")


    res.status(201).json({
        message: "Successfully signup",
        success: true,
        user: createdUser
    })

} catch(err) {

    console.log("Server error:", err)

    res.status(500).json({
        message: "internal server error"
    })
}

}

export default signupController