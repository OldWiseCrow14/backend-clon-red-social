const User = require('../models/User')
const jsonwebtoken = require('jsonwebtoken')

const createUsers  = async (req,res)=>{
    const {username, password, email, name} = req.body
    try {
        const loginResult = await User.login({ username })
        if(loginResult) {
            const respons = {
                success:false,
                msg:"el usuario ya esta en uso"
            }
            return res.status(400).json(respons)
        }
        const checkEmailResult = await User.checkEmail({ email })
        if(checkEmailResult) {
            const respons = {
                success:false,
                msg:"el email ya esta en uso"
            }
            return res.status(400).json(respons)
        }
        const UserModel = new User({username, password, email, name})
        const createUserResult = await UserModel.createUser()
        if(!createUserResult.acknowledged) {
            const respons = {
                success:false,
                msg:"Error al crear el usuario, intentelo mas tarde"
            }
            return res.status(400).json(respons)
        }
        const token = jsonwebtoken.sign({idUser:createUserResult.insertedId}, process.env.TOKEN_SECRET)
        const response = {
            success: true,
            idUser: createUserResult.insertedId,
            token
        }
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({ message: 'Hubo un error en el servidor' })
    }
}


module.exports = createUsers