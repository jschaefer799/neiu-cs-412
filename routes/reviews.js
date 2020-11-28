const express = require('express')
const router = express.Router()
const { addReviewValidations, reviewsController } = require('../controllers/reviews-controller')

router.get('/add', async (req, res, next) =>{
    try{
        await reviewsController.add(req, res, next)

        // let currentDate = new Date()
        //
        // res.render('reviews/add_review',{
        //     isCreate: true,
        //     title: 'Camp Search Web App',
        //     name: 'Add Review',
        //     reviewKey: await reviewsController.count(),
        //     reviewDate: currentDate.getMonth()+1 + '/' + currentDate.getDate() + '/' + currentDate.getFullYear(),
        //     isAddActive: 'active',
        //     layout: 'star_rating'
        // })

    }
    catch(err){
        next(err)
    }
})

router.post('/save', addReviewValidations, async(req, res, next) =>{
    try{
        await reviewsController.save(req, res, next)
    }
    catch (err){
        next(err)
    }
})

router.get('/view', async (req, res, next) =>{
    try{
        await reviewsController.view(req, res, next)
        // let review = await reviewsController.read(req.query.key)
        // res.render('reviews/view_review',{
        //     title: "Camp Search Web App",
        //     name: 'View Review',
        //     reviewDate: review.date,
        //     reviewTitle: review.title,
        //     reviewKey: review.key,
        //     reviewBody: review.body,
        //     reviewRating: review.rating
        // })
    }
        catch (err){
            next(err)
    }
})

router.get('/edit', async (req, res, next) =>{
    try{
        await reviewsController.edit(req, res, next)
        // let review = await reviewsController.read(req.query.key)
        // res.render('reviews/edit_review',{
        //     isCreate: false,
        //     title: "Camp Search Web App",
        //     name: 'Edit Review',
        //     reviewTitle: review.title,
        //     reviewKey: review.key,
        //     reviewBody: review.body,
        //     reviewDate: review.date,
        //     reviewRating: review.rating,
        //     layout: 'star_rating'
        //})
    }
    catch (err){
        next(err)
    }
})

router.get('/viewAll', async (req, res, next)=>{
    try{
        await reviewsController.viewAll(req, res, next)

        //let allReviews = await reviewsController.viewAll(req, res, next)

        // res.render('reviews/view_all',{
        //     title: "Camp Search Web App",
        //     name: 'View All Reviews',
        //     reviewList: allReviews,
        //     isViewAllActive: 'active'
        // })
    }
    catch (err){
        next(err)
    }
})
router.get('/delete', async (req, res, next) =>{
    try{
        await reviewsController.delete(req, res, next)
        // let review = await reviewsController.destroy(req.query.key)
        // res.redirect('/reviews/viewAll')
    }
    catch (err){
        next(err)
    }
})
router.get('/topReviews', async (req, res, next)=>{
    try{
        await reviewsController.topReviews(req, res, next)
    }
    catch(err){
        next(err)
    }
})


module.exports = router;
