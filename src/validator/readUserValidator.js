const { param } = require("express-validator")

const readUserValidator = [
    param("_id")
        .trim()
        .isLength({min:3, max:30})
        .withMessage("el _id debe contener mas de 3 caracteres")
]

module.exports = readUserValidator