let Review = require('../models/reviews').Review
let {User} = require('../models/user')

exports.reviewsController = {

    save: async (req, res, next) =>{
        try {
            let review
            if (req.body.checkCreate === 'create') {
                console.log(req.body.checkCreate)
                review = await create(req.body.title, req.body.date, req.body.rating, req.body.body)
                console.log(review.id)
                req.user.reviews.push(review.id.trim())
                req.user = await User.findByIdAndUpdate({_id: req.user.id.trim()}, {reviews: req.user.reviews}, {new: true})
            } else {
                review = await update(req.body.id, req.body.title, req.body.date, req.body.rating, req.body.body)
            }
            res.redirect(`/reviews/view?id=${review.id.trim()}`)
        } catch(err){
            next(err)
        }
    },
    add: async (req, res, next) =>{
        if(req.isAuthenticated()) {
            try {
                let currentDate = new Date()
                res.render('reviews/add_review', {
                    doCreate: true,
                    title: 'Camp Search App',
                    name: 'Add a review',
                    date: currentDate.getMonth() + 1 + '/' + currentDate.getDate() + '/' + currentDate.getFullYear(),
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
    },
    view: async (req, res, next) =>{
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
    },

    viewAll: async (req, res, next) =>{
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
                title: 'Reviews',
                reviewList: allReviews,
                isHomeActive: "active",
                layout: 'default'
            })
        } catch(err){
            next(err)
        }
    },

    delete: async (req, res, next) =>{
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



