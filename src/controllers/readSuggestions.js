const User = require("../models/User")

const readSuggestions = async (req, res) => {
    try {
        const readSuggestionsResult = await User.readSuggestions()
        const respons = {
            success:true,
            data: readSuggestionsResult
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

module.exports = readSuggestions