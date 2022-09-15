let {Op} = require('sequelize')
let {User, Profil} = require('../models')
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
        console.log(req.body);
        User.create({
            username,
            email,
            password
        })
        .then(() => {
            res.redirect('/login')
        })
        .catch(err => {
            // console.log(err);
            res.send(err)
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
                    console.log(req.session,"=======");
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

}
module.exports = UserController