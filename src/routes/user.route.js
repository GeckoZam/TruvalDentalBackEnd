const express = require('express')
const userController = require('../controllers/user.controller')

const router = express.Router()

router.route('/').post(userController.createUser)
router.route('/').get(userController.findAllUsers)
router.route('/:id').get(userController.findOneUserById)
router.route('/:id').put(userController.updateUser)
router.route('/:id').delete(userController.deleteUser)

module.exports = router;