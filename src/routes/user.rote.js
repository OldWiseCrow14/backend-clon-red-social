const {Router} = require('express')
const validatormiddleware = require('../middlewares/validator')
const valid_users= require('../validator/users.validator')
const createuser = require('../controllers/createuser')
const router = Router()

router.post('/users', validatormiddleware(valid_users),createuser)

module.exports = router

