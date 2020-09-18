let reviews = require('./reviews')

exports.getCampsites = function (){
    let stars = reviews.getReviews();
    let num = 0;

    if (stars === 1 || stars === 2)
        num = 6
    if (stars === 3 || stars === 4)
        num = 15
    if (stars === 5)
        num = 18
    console.log("Here's the number of campsites with " + stars + " star reviews in the area you selected:" + num)
    return num
}