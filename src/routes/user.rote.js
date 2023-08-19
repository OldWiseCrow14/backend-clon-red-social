const {Router} = require('express')
const validatormiddleware = require('../middlewares/validator')

const validUsers= require('../validator/users.validator')
const loginValidator = require('../validator/loginValidator')
const readUserValidator = require('../validator/readUserValidator')

const createuser = require('../controllers/createuser')
const loginUser = require('../controllers/login')
const readSuggestions = require('../controllers/readSuggestions')
const readUser = require('../controllers/readUser')

const isAuth = require('../middlewares/isAuth')

const router = Router()

router.post('/users', validatormiddleware(validUsers),createuser)
router.post('/login', validatormiddleware(loginValidator), loginUser)
router.get('/user/suggestions', isAuth, readSuggestions)
router.get('/user/:_id', isAuth, validatormiddleware(readUserValidator), readUser)

module.exports = router

