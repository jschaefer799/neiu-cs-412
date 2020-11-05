exports.AbstractReviewsStore = class AbstractReviewsStore{
    async close() { }
    async update (key, title, body){ }
    async create (key, title, body) { }
    async read (key) { }
    async destroy (key) { }
    async keyList () { }
    async count () { }
}

const mongoose = require('mongoose')
const ReviewSchema = new mongoose.Schema({
    key: {
        type: Number,
        required: true,
        unique: true
    },
    date: {
        type: String,
        require: true
    },
    rating: {
        type: Number,
        require: true
    },
    title: {
        type: String,
        required: [true, 'Title is required'],
        minlength: [3, 'Minimum Title length is 3 characters']
    },
    body: {
        type: String,
        required: [true, 'Note body is required']
    }
})

exports.Review = mongoose.model('reviews', ReviewSchema)
