const {body,} = require('express-validator')

const userStorage = [
    body('username')
        .trim()
        .isLength({min:3, max:15})
        .withMessage('El nombre de ususario debe tener entre 3 y 15 caracteres.'),
    body('password')
        .trim()
        .isLength({min:8, max: 25})
        .withMessage('La contraseña debe tener entre 8 y 15 caracteres')
        .custom((value,{req})=>{
            if(value!== req.body.confirmPassword ) throw new Error("Las constraseñas no coinciden.")
            return true }),
    body('email')
        .trim()
        .isEmail()
        .withMessage('El correo electronico no es valido.')
        .normalizeEmail(),
    body('name')
        .isLength({min:3, max:30})
        .withMessage('La cantidad de caracteres no esta dentro del limite permitido.')

]

module.exports = userStorage