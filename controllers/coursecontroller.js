let {Op} = require('sequelize')
const converttime = require('../helpers/converttime')
const humanizeDuration = require("humanize-duration")
let {Course, User, Users_Course} = require('../models')
const convertArray = require('../helpers/converttoarray')

class CourseController {
    static home(req, res){
        let userid = req.session.user.id
        User.findByPk(userid)
        .then(user =>{
            res.render('home', {user})
        })
    }
    static yourCourse(req, res) {
        let userid = req.session.user.id
        Course.findAll({
            include: {
                model:User,
                where: {
                    "id":userid
                }
            }
        })
        .then(course =>{
            // console.log(course)
            res.render('yourcourse', {course, userid, converttime})
        })   
        .catch(err =>{
            console.log(err)
            res.send(err)
        })
    }
    static listCourse(req,res) {
        let userid = req.session.user.id
        let data = {}
        let search = req.query.search
        let sort = req.query.sort
        Course.searchFunction(search, sort)
        .then(result => {
            data.course = result
            return User.findByPk(userid)
        })
        .then(user =>{
            data.user = user
            return Users_Course.findAll({
                where :{
                    "UserId":userid
                }, attributes:[
                    "CourseId"
                ]
            })
        })
        .then(courseId =>{
            data.courseId = convertArray(courseId)
            console.log(data.courseId)
            res.render('course', {data,converttime} )
        })
        .catch(err =>{
            console.log(err)
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
    static addCourse(req, res) {
        let errors = req.query.errors
        res.render('addform' ,{errors})
    }
    static addCourseHandler(req, res) {
        let {name, description, duration, category, link} = req.body
        Course.create({
            name,
            description,
            duration,
            category,
            link
        })
        .then(() =>{
            res.redirect('/course/all')
        })   
        .catch(err =>{
            if(err.name === "SequelizeValidationError") {
                let error = err.errors.map(element => {
                return element.message
               }); 
               res.redirect(`/course/add?errors=${error}`)
            } else {
                res.send(err)
            }
        })
    }
    static editCourse(req, res) {
        let courseId = req.params.id
        Course.findByPk(courseId)
        .then(data =>{
            res.render('editform', {data})
        })
        .catch(err =>{
            res.send(err)
        })
    }
    static editCourseHandler(req, res) {
        let courseId = req.params.id
        let {name, description, duration, category, link} = req.body
        Course.update({
            name,
            description,
            duration,
            category,
            link
        }, {
            where: {
                "id" : courseId
            }
        })
        .then(() =>{
            res.redirect('/course/all')
        })   
        .catch(err =>{
            if(err.name === "SequelizeValidationError") {
                let error = err.errors.map(element => {
                return element.message
               }); 
               res.send(error)
            } else {
                res.send(err)
            }
        })
    }
    static unsubscribe(req,res){
        let courseId = req.params.courseid
        // console.log(courseId)
        let userid = req.session.user.id

        Users_Course.destroy({
            where :{
                "UserId" : userid,
                "CourseId" : courseId
            }
        })
        .then(() =>{
            res.redirect('/course/sub')
        })   
        .catch(err =>{
            console.log(err)
            res.send(err)
        })
    }
    static subscribe(req, res) {
        let courseId = req.params.id
        let userid = req.session.user.id
        Users_Course.create({
            "UserId" : userid,
            "CourseId" : courseId
        })
        .then(() =>{
            res.redirect('/course/all')
        })   
        .catch(err =>{
            res.send(err)
        })
    }
}
module.exports = CourseController