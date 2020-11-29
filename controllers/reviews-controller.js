let Review = require('../models/reviews').Review
let {User} = require('../models/user')
const { DateTime } = require("luxon")
const {body, validationResult} = require ('express-validator')


exports.reviewsController = {

    save: async (req, res, next) =>{

            try {

                if (req.body.checkCreate === 'create') {
                    let review
                    review = await create(req.body.title, req.body.date, req.body.rating, req.body.body)
                    req.user.reviews.push(review.id.trim())
                    req.user = await User.findByIdAndUpdate({_id: req.user.id.trim()}, {reviews: req.user.reviews}, {new: true})
                    req.flash('success', 'Review added successfully')
                    res.redirect(`/reviews/view?id=${review.id.trim()}`)
                } else {
                    await update(req.body.id, req.body.title, req.body.date, req.body.rating, req.body.body)
                    req.flash('success', 'Review updated successfully')
                    res.redirect(`/reviews/view?id=${req.body.id.trim()}`)
                }

            } catch (err) {
                next(err)
            }

    },
    add: async (req, res, next) =>{
        if(req.isAuthenticated()) {
            try {
                let currentDate = DateTime.local()
                res.render('reviews/add_review', {
                    doCreate: true,
                    title: 'Add Review',
                    date: currentDate.month + '/' + currentDate.day + '/' + currentDate.year,
                    isHomeActive: "",
                    isAddReviewActive: "active",
                    layout: 'star_rating'
                })
            } catch (err) {
                next(err)
            }
        }else{
            req.flash('error', 'Please log in to access reviews')
            res.redirect('/users/login')
        }
    },
    edit: async (req, res, next) =>{
        if(req.isAuthenticated()) {
            try{
                const review = await Review.findOne({_id: req.query.id.trim()})
                res.render('reviews/edit_review', {
                    doCreate: false,
                    title: 'Edit Review',
                    reviewId: req.query.id.trim(),
                    reviewTitle: review.title,
                    reviewDate: review.date,
                    reviewRating: review.rating,
                    reviewBody: review.body,
                    layout: 'star_rating'
                })
            } catch(err){
                next(err)
            }
        }else{
            req.flash('error', 'Please log in to access reviews')
            res.redirect('/users/login')
        }
    },
    view: async (req, res, next) =>{
        if(req.isAuthenticated()) {
            try{
                const review = await Review.findOne({_id: req.query.id.trim()})
                res.render('reviews/view_review',{
                    title: "View Review",
                    reviewId: req.query.id.trim(),
                    reviewTitle: review.title,
                    reviewDate: review.date,
                    reviewRating: review.rating,
                    reviewBody: review.body
                })
            } catch(err) {
                next(err)
            }
        }else{
            req.flash('error', 'Please log in to access reviews')
            res.redirect('/users/login')
        }
    },

    viewAll: async (req, res, next) =>{
        if(req.isAuthenticated()) {
            try{
                let reviewIds = req.user.reviews
                let reviewPromises = reviewIds.map(id => Review.findOne({_id: id}))
                let reviews = await Promise.all(reviewPromises)
                let allReviews = reviews.map(review =>{
                    return{
                        id: review.id.trim(),
                        title: review.title,
                        date: review.date
                    }
                })
                res.render('reviews/view_all',{
                    title: 'Your Reviews',
                    reviewList: allReviews,
                    isHomeActive: "active",
                    layout: 'default'
                })
            } catch(err){
                next(err)
            }
        }else{
            req.flash('error', 'Please log in to access reviews')
            res.redirect('/users/login')
        }
    },

    delete: async (req, res, next) =>{
        if(req.isAuthenticated()) {
            try{
                let id = req.query.id.trim()
                let reviewIndex = req.user.reviews.indexOf(id)
                req.user.reviews.splice(reviewIndex, 1)
                await User.findByIdAndUpdate({_id: req.user.id}, {reviews: req.user.reviews})
                await Review.deleteOne({_id: id})
                req.flash('success', 'Review successfully deleted')
                res.redirect("/reviews/viewAll")

            } catch(err){
                next(err)
            }
        }else{
            req.flash('error', 'Please log in to access reviews')
            res.redirect('/users/login')
        }
    },

    topReviews: async (req, res, next) => {
        try{
            let reviewList = await Review.find({})
            let allReviews = reviewList.map(review =>{
                return{
                    id: review.id.trim(),
                    title: review.title,
                    date: review.date,
                    rating: review.rating,
                    body: review.body
                }
            })

            let sortedReviews = allReviews.sort((a, b) =>(a.rating > b.rating) ? -1 : 1)
            let maxViewReviews = sortedReviews.slice(0,10)
            res.render('reviews/top_reviews',{
                title: 'Top Reviews',
                reviewList: maxViewReviews,
                isHomeActive: "active",
                layout: 'star_rating'
            })
        } catch(err){
            next(err)
        }
    }
}
create = async (title, date, rating, body) => {
    let review = new Review({
        title: title,
        date: date,
        rating: rating,
        body: body
    })
    review = await review.save()
    return review;
}
update = async (id, title, date, rating, body)=>{
    id = id.trim()
    let review = await Review.findByIdAndUpdate({_id: id}, {title: title, date: date, rating: rating, body: body}, {new: true})
    return review;
}

exports.addReviewValidations = [
    body('rating')
        .notEmpty().withMessage('Rating is required')
        .isLength({min: 1}).withMessage('A rating must be selected'),
    body('title')
        .notEmpty().withMessage('Review title is required')
        .isLength({min: 2}).withMessage('Review title must be at least 2 characters'),
    body('body')
        .notEmpty().withMessage('Review body is required')
        .isLength({min: 8}).withMessage('Review body must be at least 8 characters')
]