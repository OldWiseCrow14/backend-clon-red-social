const User = require('../models/User')
const jsonwebtoken = require('jsonwebtoken')


const create_users  = async (req,res)=>{
    const {username, password, email, name} = req.body
    try {
        const UserModel = new User({username, password, email, name})
        const createUserResult = await UserModel.createUser()
        const token = jsonwebtoken.sign({idUser:createUserResult.insertedId}, process.env.TOKEN_SECRET)
        const response = {
            idUser:createUserResult.insertedId,
            token
        }
        return res.status(200).json(response)
    } catch (error) {
        return  res.status(500).json({message:'Hubo un error en el servidor'})
        }
}


module.exports = create_users