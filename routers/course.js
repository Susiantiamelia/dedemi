const express = require('express')
const CourseController = require('../controllers/coursecontroller')
const router = express.Router()


router.get('/all', CourseController.listCourse)
router.get('/add', CourseController.addCourse)
router.post('/add', CourseController.addCourseHandler)
router.get('/:id/edit', CourseController.editCourse)
router.post('/:id/edit', CourseController.editCourseHandler)
router.get('/:id/subscribe', CourseController.subscribe)
router.get('/sub', CourseController.yourCourse)
router.get('/sub/:courseid', CourseController.detailCourse)
router.get('/sub/:courseid/unsubscribe', CourseController.unsubscribe)



module.exports = router