const User = require("../models/User")

const readUser = async (req, res) => {
    try {
        const readUserResult = await User.readUser({ _id: req.params._id })
        const respons = {
            success:true,
            data: readUserResult
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

module.exports = readUser