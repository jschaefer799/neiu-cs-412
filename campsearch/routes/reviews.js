const express = require('express')
const router = express.Router()
let reviewsStore = require('../app').reviewsStore

router.get('/add', async (req, res, next) =>{
    try{
        res.render('add_review',{
            isCreate: true,
            title: 'Camp Search Web App',
            name: 'Add Review',
            reviewKey: await reviewsStore.count(),
            isAddActive: 'active'
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
            review = await reviewsStore.create(req.body.reviewKey, req.body.title, req.body.body)
        else
            review = await reviewsStore.update(req.body.reviewKey, req.body.title, req.body.body)
        res.redirect('/reviews/view?key=' + req.body.reviewKey)
    }
    catch (err){
        next(err)
    }
})

router.get('/view', async (req, res, next) =>{
    try{
        let review = await reviewsStore.read(req.query.key)
        res.render('view_review',{
            title: "Camp Search Web App",
            name: 'View Review',
            reviewTitle: review.title,
            reviewKey: review.key,
            reviewBody: review.body
        })
    }
        catch (err){
            next(err)
    }
})

router.get('/edit', async (req, res, next) =>{
    try{
        let review = await reviewsStore.read(req.query.key)
        res.render('edit_review',{
            isCreate: false,
            title: "Camp Search Web App",
            name: 'Edit Review',
            reviewTitle: review.title,
            reviewKey: review.key,
            reviewBody: review.body
        })
    }
    catch (err){
        next(err)
    }
})

router.get('/viewAll', async (req, res, next)=>{
    try{
        let keyList = await reviewsStore.keyList()
        let keyPromises = keyList.map(key =>{
            return reviewsStore.read(key)
        })
        let allReviews = await Promise.all(keyPromises)
        res.render('view_all',{
            title: "Camp Search Web App",
            name: 'View All Reviews',
            reviewList: extractReviewsToLiteral(allReviews),
            isViewAllActive: 'active'
        })
    }
    catch (err){
        next(err)
    }
})
router.get('/delete', async (req, res, next) =>{
    try{
        res.render('delete_review',{
            title: "Camp Search Web App",
            name: 'Delete Review',
        })
        let review = await reviewsStore.destroy(req.query.key)
        res.redirect('/reviews/viewAll')
    }
    catch (err){
        next(err)
    }
})

function extractReviewsToLiteral(allReviews){
    return allReviews.map(review =>{
        return{
            key: review.key,
            title: review.title
        }
    })
}



module.exports = router;
