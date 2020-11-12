const express = require('express')
const router = express.Router()
const { reviewsController } = require('../controllers/reviews-controller')

router.get('/add', async (req, res, next) =>{
    try{
        let currentDate = new Date()

        res.render('reviews/add_review',{
            isCreate: true,
            title: 'Camp Search Web App',
            name: 'Add Review',
            reviewKey: await reviewsController.count(),
            reviewDate: currentDate.getMonth()+1 + '/' + currentDate.getDate() + '/' + currentDate.getFullYear(),
            isAddActive: 'active',
            layout: 'star_rating'
        })

    }
    catch(err){
        next(err)
    }
})

router.post('/save', async(req, res, next) =>{
    try{
        let review
        if (req.body.saveMethod === 'create')
            review = await reviewsController.create(req.body.reviewKey, req.body.reviewDate, req.body.reviewRating, req.body.title, req.body.body)
        else
            review = await reviewsController.update(req.body.reviewKey, req.body.reviewDate, req.body.reviewRating, req.body.title, req.body.body)
        res.redirect('/reviews/view?key=' + req.body.reviewKey)
    }
    catch (err){
        next(err)
    }
})

router.get('/view', async (req, res, next) =>{
    try{
        let review = await reviewsController.read(req.query.key)
        res.render('reviews/view_review',{
            title: "Camp Search Web App",
            name: 'View Review',
            reviewDate: review.date,
            reviewTitle: review.title,
            reviewKey: review.key,
            reviewBody: review.body,
            reviewRating: review.rating
        })
    }
        catch (err){
            next(err)
    }
})

router.get('/edit', async (req, res, next) =>{
    try{
        let review = await reviewsController.read(req.query.key)
        res.render('reviews/edit_review',{
            isCreate: false,
            title: "Camp Search Web App",
            name: 'Edit Review',
            reviewTitle: review.title,
            reviewKey: review.key,
            reviewBody: review.body,
            reviewDate: review.date,
            reviewRating: review.rating,
            layout: 'star_rating'
        })
    }
    catch (err){
        next(err)
    }
})

router.get('/viewAll', async (req, res, next)=>{
    try{
        let allReviews = await reviewsController.findAllReviews()

        res.render('reviews/view_all',{
            title: "Camp Search Web App",
            name: 'View All Reviews',
            reviewList: allReviews,
            isViewAllActive: 'active'
        })
    }
    catch (err){
        next(err)
    }
})
router.get('/delete', async (req, res, next) =>{
    try{
        let review = await reviewsController.destroy(req.query.key)
        res.redirect('/reviews/viewAll')
    }
    catch (err){
        next(err)
    }
})





module.exports = router;
