const express = require('express')
const CourseController = require('../controllers/coursecontroller')
const router = express.Router()


router.get('/', CourseController.listCourse)



module.exports = router