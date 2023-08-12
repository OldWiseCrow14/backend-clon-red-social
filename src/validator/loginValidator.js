const {body} = require("express-validator")

const loginValidator = [
    body("username")
        .trim()
        .isLength({min:3, max:10})
        .withMessage("el usuario debe contener mas de 3 caracteres"),
    body("password")
        .isLength({min:8, max:20})
        .withMessage("el pasword debe contener minimo 8 caracteres"),
]

module.exports = loginValidator