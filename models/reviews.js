const mongoose = require('mongoose')

const ReviewSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        minlength: [3, 'Minimum Title length is 3 characters']
    },
    date: {
        type: String,
        require: true
    },
    rating: {
        type: Number,
        require: true
    },
    body: {
        type: String,
        required: [true, 'Note body is required']
    }
})
ReviewSchema.set('toObject',{getters: true, virtuals: true})
exports.Review = mongoose.model('reviews', ReviewSchema)
