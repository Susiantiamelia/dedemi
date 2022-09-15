const express = require('express')
const CourseController = require('../controllers/coursecontroller')
const router = express.Router()


router.get('/all', CourseController.listCourse)
// router.get('/add', CourseController.addCourse)
// router.post('/add', CourseController.addCourseHandler)
router.get('/sub', CourseController.yourCourse)
router.get('/sub/:courseid', CourseController.detailCourse)


module.exports = router