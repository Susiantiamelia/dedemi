let {Op} = require('sequelize')
let {User, Profil} = require('../models')

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
    }

}
module.exports = UserController