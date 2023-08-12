const User = require("../models/User")
const jsonwebtoken = require("jsonwebtoken")

const login = async (req, res) => {
    try {
        const loginResult = await User.login({ username: req.body.username })
        if(!loginResult) {
            const respons = {
                success:false,
                msg:"el usuario es incorrecto"
            }
            return res.status(400).json(respons)
        }
        if(loginResult.password !== req.body.password) {
            const respons = {
                success:false,
                msg:"la contraseña es incorecta"
            }
            return res.status(400).json(respons)
        }
        const token = jsonwebtoken.sign({idUser:loginResult._id}, process.env.TOKEN_SECRET)
        const respons = {
            success:true,
            idUser:loginResult._id,
            token
        }
        return res.status(200).json(respons)
    } catch (error) {
        const respons = {
            success:false,
            msg:"error en el servidor"
        }
        console.log(error)
        return res.status(500).json(respons)
    }
}

module.exports = login