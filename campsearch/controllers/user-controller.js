let User = require('../models/user').User
const {body, validationResult} = require ('express-validator')
const passport = require('passport')

exports.userController= {
    create: async (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            req.flash('error', errors.array().map(e => e.msg + '</br>').join(''))
            res.redirect('/users/register')
        } else {
            try {
                let userParams = getUserParams(req.body)
                let newUser = new User(userParams)
                let user = await User.register(newUser, req.body.password)
                req.flash('success', `${user.fullName}'s account created successfully`)
                res.redirect('/')
            } catch (error) {
                console.log(`Error saving user: ${error.message}`)
                req.flash('error', `Failed to create user account. Invalid email.`)
                res.redirect('/users/register')
            }
        }
    },

    authenticate: async (req, res, next) => {
        await passport.authenticate('local', function (err, user, info) {
            if (err)
                return next(err)
            if (!user) {
                req.flash('error', 'Failed to login')
                return res.redirect('/users/login')
            }
            req.logIn(user, function (err) {
                if (err)
                    return next(err)
                req.flash('success', `${user.fullName} logged in`)
                return res.redirect('/')
            })
        })(req, res, next);

    },

    viewUserDetails: async (req, res, next) => {
        if (req.isAuthenticated()) {
            const user = await User.findOne({_id: req.user.id.trim()})
            try {
                res.render('users/user_profile', {
                    title: "Account Details",
                    userId: user.id
                })
            } catch (err) {
                next(err)
            }
        } else {
            req.flash('error', "Must be logged in to access profile")
            res.redirect('/users/login')
        }
    },
    save: async (req, res, next) => {
        if (req.isAuthenticated()) {
            try {
                let user = await update(req.body.id, req.body.firstName, req.body.lastName, req.body.email)
                req.flash('success', 'You have successfully updated your account details')
                req.login(user, function(err){
                    if(err){
                        return next(err)
                    }
                    res.redirect('/users/userProfile')
                })


            } catch (err) {
                next(err)
            }
        }else {
            req.flash('error', "Must be logged in to access profile")
            res.redirect('/users/login')
        }
    },
    changePassword: async (req, res, next) => {
        if (req.isAuthenticated()) {
            try {
                const user = await User.findOne({_id: req.user.id.trim()})
                user.changePassword(req.body.oldpassword, req.body.newpassword, function(err){
                    if(err){
                        req.flash('error', 'Password incorrect')

                        return next(err)
                    }
                })
                req.login(user, function(err){
                    if(err){
                        return next(err)
                    }
                    req.flash('success', 'You have successfully updated your password details')
                    res.redirect('/users/userProfile')
                })


            } catch (err) {
                next(err)
            }
        }else {
            req.flash('error', "Must be logged in to access profile")
            res.redirect('/users/login')
        }
    },
    edit: async (req, res, next) => {
        if (req.isAuthenticated()) {
            try {
                const user = await User.findOne({_id: req.user.id.trim()})
                res.render('users/edit_profile', {
                    doCreate: false,
                    title: 'Edit Account Details',
                    userId: user.id.trim(),
                    userEmail: user.email,
                    userFirstName: user.name.first,
                    userLastName: user.name.last,
                })
            } catch (err) {
                next(err)
            }
        }
    }
}
const getUserParams = body => {
    return {
        name: {
            first: body.first,
            last: body.last
        },
        email: body.email,
        password: body.password
    }
}
update = async (id, firstName, lastName, email)=>{
    id = id.trim()
    let user = await User.findByIdAndUpdate({_id: id}, {$set: {'name.first': firstName, 'name.last': lastName}, email: email}, {new: true})
    return user;
}

exports.registerValidations = [
    body('first')
        .notEmpty().withMessage('First name is required')
        .isLength({min: 2}).withMessage('First name must be at least 2 characters'),
    body('last')
        .notEmpty().withMessage('Last name is required')
        .isLength({min: 2}).withMessage('Last name must be at least 2 characters'),
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({min: 8}).withMessage('Password must be at least 8 characters'),
    body('email').isEmail().normalizeEmail().withMessage('Email is invalid')
]