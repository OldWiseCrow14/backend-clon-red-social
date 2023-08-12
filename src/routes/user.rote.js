const {Router} = require('express')
const validatormiddleware = require('../middlewares/validator')

const validUsers= require('../validator/users.validator')
const loginValidator = require('../validator/loginValidator')

const createuser = require('../controllers/createuser')
const loginUser = require('../controllers/login')

const router = Router()

router.post('/users', validatormiddleware(validUsers),createuser)
router.post('/login', validator(loginValidator), loginUser)

module.exports = router

