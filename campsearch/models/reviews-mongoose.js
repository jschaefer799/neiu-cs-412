let Review = require('./reviews').Review
let AbstractReviewsStore = require('./reviews').AbstractReviewsStore

const mongoose = require('mongoose')
const connectDB = async () => {
    try{
        await mongoose.connect(process.env.DB_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    } catch(err){
        console.log(err)
    }
}
exports.MongooseReviewsStore = class MongooseReviewsStore extends AbstractReviewsStore {

    async update (key, date, rating, title, body){
         await connectDB()
        let review = await Review.findOneAndUpdate({key: key}, {
            title: title,
            date: date,
            rating: rating,
            body: body
        })
        await mongoose.disconnect()
        return review
     }

    async create(key, date, rating, title, body){
        await connectDB()
        let count = await Review.countDocuments({})
        let review = new Review({
            key: count,
            date: date,
            rating: rating,
            title: title,
            body: body
        })
        await review.save()
        await mongoose.disconnect()
        return review
    }

    async read(key){
        await connectDB()
        const review = await Review.findOne({key: key})
        await mongoose.disconnect()
        return review
     }

     async findAllReviews(){
         await connectDB()
         const reviews = await Review.find({})
         await mongoose.disconnect()
         return reviews.map(review => {
             return{
                 key: review.key,
                 title: review.title,
                 date: review.date
             }
         })
     }

    async count(){
        await connectDB()
        const count = await Review.countDocuments({})
        await mongoose.disconnect()
        return count
    }

    async destroy(key){
        await connectDB()
         await Review.deleteOne({key: key})
        await mongoose.disconnect()

    }
}