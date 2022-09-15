let {Op} = require('sequelize')
let {User,Profile,Users_Course} = require('../models')
const bcrypt = require('bcryptjs')
class UserController {
    static registerForm(req,res) {
        res.render('registerForm')
    } 
    static postRegisterForm(req,res) {
        const {
            username,
            email,
            password
        } = req.body
        User.create({
            username,
            email,
            password
        })
        .then(() => {
            res.redirect('/login')
        })
        .catch(err => {
            let error = err
            if(err.name === 'SequelizeValidationError') {
                error = err.message
            }
            res.send(error)
        })
    }

    static loginForm(req,res) {
        const {error} = req.query
        res.render('loginForm', {error})
    }
    static postLoginForm(req,res) {
        const {username , password} = req.body
        User.findOne({
            where : {username}
        })

        .then(user => {
            if(user) {
                const isValidPass = bcrypt.compareSync(password,user.password)
                if(isValidPass) {
                    req.session.user = {id: user.id} 
                    // req.session.save()
                    return res.redirect(`/`)
                } else {
                    const error = 'Invalid Username or Password !'
                    return res.redirect(`/login?error=${error}`)
                }
            } else {
                const error = 'Invalid Username or Password !'
                return res.redirect(`/login?error=${error}`)
            }
        })
    }
    static profilePage(req,res) {
        let {id} = req.session.user
        Profile.findOne({
            where : {
                UserId : id
            }
        })
        .then(result => {
            res.render('profilePage', { profileData : result})
        })
        .catch(err => {
            console.log(err);
            res.send(err)
        })
    }
    static editProfile(req,res) {
        let {id} = req.session.user
        Profile.findOne({
            where : {
                UserId : id
            }
        })
        .then(result => {
            res.render('editProfilForm', { profileData : result})
        })
        .catch(err => {
            res.send(err)
        })
    }
    static postEditProfile(req,res) {
        let id = req.session.user.id
        const {
            fullName,
            dateOfBirth,
            adress,
            background
        } = req.body
        Profile.update({
            fullName,
            dateOfBirth,
            adress,
            background
        },{
            where : {
                UserId : id
            }
        })
        .then(() => {
            res.redirect('/user')
        })
        .catch(err => {
            res.send(err)
        })
    }
    static logout(req,res) {
        res.redirect('/login')
    }
    static deleteAccount(req,res) {
        let {id} = req.session.user
        User.destroy({
            where : {
                id : id
            }
        })
        .then((result) => {
            res.redirect('/login')
        })  
        .catch(err => {
            console.log(err);
            res.send(err)
        })
    }
    static addProfile(req,res) {
        res.render('addProfileForm')
    }
    static postAddProfile(req,res) {
        let UserId = req.session.user.id
        const {
            fullName,
            dateOfBirth,
            adress,
            background
        } = req.body
        Profile.create({
            UserId,
            fullName,
            dateOfBirth,
            adress,
            background
        })
        .then(result => {
            res.redirect('/user')
        })
        .catch(err => {
            let error = err
            if(err.name === 'SequelizeValidationError') {
                error = err.errors.map(el => (el.message))
            }
            res.send(error)
        })
    }

}
module.exports = UserController