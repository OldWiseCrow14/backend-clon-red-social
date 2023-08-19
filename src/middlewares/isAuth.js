'use strict'

const { verify } = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
        const token = req.get('Authorization').split(' ')[1]
        const decodedToken = verify(token, process.env.TOKEN_SECRET)
        req.tokenInfo = decodedToken
        next()
    } catch (error) {
        console.error(error.message)
        const response = { errors: [{ message: 'No authentication!' }] }
        res.status(401).json(response)
    }
}