let Review = require('../models/reviews').Review

//const mongoose = require('mongoose')
// const connectDB = async () => {
//     try{
//         await mongoose.connect(process.env.DB_URL,{
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         })
//     } catch(err){
//         console.log(err)
//     }
// }
exports.reviewsController = {

    async update (key, date, rating, title, body){
        let review = await Review.findOneAndUpdate({key: key}, {
            title: title,
            date: date,
            rating: rating,
            body: body
        })
        return review
    },

    async create(key, date, rating, title, body){
        let count = await Review.countDocuments({})
        let review = new Review({
            key: count,
            date: date,
            rating: rating,
            title: title,
            body: body
        })
        await review.save()
        return review
    },

    async read(key){
        const review = await Review.findOne({key: key})
        return review
    },

    async findAllReviews(){
        const reviews = await Review.find({})
        return reviews.map(review => {
            return{
                key: review.key,
                title: review.title,
                date: review.date
            }
        })
    },

    async count(){
        const count = await Review.countDocuments({})
        return count
    },

    async destroy(key){
        await Review.deleteOne({key: key})

    }
}