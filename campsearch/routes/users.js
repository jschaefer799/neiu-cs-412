const express = require('express')
const router = express.Router()
const { registerValidations, userController } = require('../controllers/user-controller')

router.get('/register', async (req, res, next) =>{
    res.render('users/register',{
        title: 'Register'
    })
})

router.post('/register', registerValidations,  async (req, res, next)=>{
    await userController.create(req, res, next)
})

router.get('/login', async (req, res, next) =>{
    res.render('users/login',{
        title: 'Login',
        layout: 'no_title'
    })
})

router.post('/login', async(req, res, next)=>{
    await userController.authenticate(req, res)
})
router.get('/logout', function(req, res){
    req.logout();
    req.flash('success', 'You are now logged out')
    res.redirect('/');
});

router.get('/userProfile', async(req, res, next)=>{
    await userController.viewUserDetails(req, res, next)
})

router.get('/edit', async (req, res, next)=>{
    await userController.edit(req,res,next)
})

router.post('/save', async(req, res, next)=>{
    await userController.save(req, res, next)
})

router.post('/changePassword', async(req, res, next)=>{
    await userController.changePassword(req, res, next)
})



module.exports = router