let {Op} = require('sequelize')
const converttime = require('../helpers/converttime')
const humanizeDuration = require("humanize-duration")
let {Course, User, Users_Course} = require('../models')
const convertArray = require('../helpers/converttoarray')
const countTheCourse = require('../helpers/takethecourse')

class CourseController {
    static home(req, res){
        let userid = req.session.user.id
        let data = {}
        User.findByPk(userid,{
            include:Course
        })
        .then(user =>{
            data.course = user.Courses
            let count =countTheCourse(data.course)
            console.log(count)
            res.render('home', {user, count})
        })
    }
    static yourCourse(req, res) {
        let userid = req.session.user.id
        let data = {}
        Course.findAll({
            include: {
                model:User,
                where: {
                    "id":userid
                }
            }
        })
        .then(course =>{
            data.course = course
            return User.findByPk(userid)
        })
        .then(user =>{
            data.user= user
            console.log(data)
            res.render('yourcourse', {data, userid, converttime})
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
            data.courseId = convertArray(courseId, "CourseId")
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
        let errors = req.query.errors
        // console.log(courseId);  
        Course.findByPk(courseId)
        .then(data =>{
            res.render('editcourseform', {data, errors})
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
               res.redirect(`/course/${courseId}/edit?errors=${error}`)
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
            // console.log(err)
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
    static renderChat(req,res) {
        res.render('chatroom')
    }
}
module.exports = CourseController