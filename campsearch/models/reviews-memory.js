let Review = require('./reviews').Review
let AbstractReviewsStore = require('./reviews').AbstractReviewsStore

let reviews = []

exports.InMemoryReviewsStore = class InMemoryReviewsStore extends AbstractReviewsStore {
    async close() { }
    async update (key, title, body){
        reviews[key].title = title
        reviews[key].body = body
        return reviews[key]
    }

    async create(key, title, body){
        reviews[key] = new Review(key, title, body)
        return reviews[key]
    }

    async read(key){
        if (reviews[key])
            return reviews[key]
        else
            throw new Error (`Review ${key} does not exist`)
    }

    async destroy(key){
        if(reviews[key])
            delete reviews[key]
        else
            throw new Error(`Review ${key} does not exist`)
    }

    async keyList(){
        return Object.keys(reviews)
    }

    async count(){
        return reviews.length
    }
}