const express = require('express')
const courseController = require('../controllers/coursecontroller')
const router = express.Router()
const usersRouter = require('./user')
const courseRouter = require('./course')
const UserController = require('../controllers/usercontroller copy')
const CourseController = require('../controllers/coursecontroller')



router.get('/register', UserController.registerForm)
router.post('/register', UserController.postRegisterForm)

router.get('/login',UserController.loginForm)
router.post('/login',UserController.postLoginForm)

router.use(function(req,res,next) {
    // console.log(req.session);
    if (!req.session.user) {
        const error = 'Please Login First'
        res.redirect(`/login?error=${error}`)
    } else {
        next()
    }   
})

router.get('/', CourseController.home)
router.use('/user', usersRouter)
router.use('/course', courseRouter)

module.exports = router