const express = require('express')
const UserController = require('../controllers/usercontroller copy')
const router = express.Router()


router.get('/', UserController.profilePage)
router.get('/edit',UserController.editProfile)
router.post('/edit',UserController.postEditProfile)
router.get('/logout',UserController.logout)
router.get('/deleteAccount',UserController.deleteAccount)
router.get('/addProfile',UserController.addProfile)
router.post('/addProfile',UserController.postAddProfile)
module.exports = router