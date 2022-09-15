let {Op} = require('sequelize')
let {Course, User} = require('../models')

class CourseController {
    static home(req, res){
        let userid = req.params.id
        res.render('home', {userid})
    }
    static yourCourse(req, res) {
        let userid = 1
        Course.findAll({
            include: {
                model:User,
                where: {
                    "id":userid
                }
            }
        })
        .then(course =>{
            console.log(course)
            res.render('yourcourse', {course, userid})
        })   
        .catch(err =>{
            console.log(err)
            res.send(err)
        })
    }
    static listCourse(req,res) {
        let userid = 2
        let data = {}
        Course.findAll(
            {
            include: {
                model:User,
            },
            order:[
                ['category', 'DESC']
            ]
        })
        .then(result => {
            data.course = result
            return User.findByPk(userid)
        })
        .then(user =>{
            data.user = user
            // console.log(user.role)
            res.render('course', data )
        })   
        .catch(err =>{
            res.send(err)
        })
    }
    static detailCourse(req,res) {
        let id = req.params.courseid
        Course.findByPk(id)
        .then(course =>{
            console.log(course)
            res.render('coursedetail', {course})
        })   
        .catch(err =>{
            res.send(err)
        })
    }
    static detailCourse(req, res) {
        
    }
}
module.exports = CourseController