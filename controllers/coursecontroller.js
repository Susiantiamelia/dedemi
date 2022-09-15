let {Op} = require('sequelize')
let {Course} = require('../models')

class CourseController {
    static listCourse(req,res) {
        Course.findAll()
        .then(result =>{
            res.render('course', {result})
        })   
        .catch(err =>{
            res.send(err)
        })
    }
}
module.exports = CourseController