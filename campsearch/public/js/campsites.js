let DateTime = require('luxon').DateTime
//alternatively I could use: let luxon = require('luxon) in order to access all of the luxon properties; whereas placing the
// .DateTime after the statement gives me access to only the DateTime functions
let reviews = require('./reviews')

exports.getCampsites = function (emitter){
    let stars = reviews.getReviews();
    let num = 0;
    let current = DateTime.local()

    if (stars === 1 || stars === 2)
        num = 6
    if (stars === 3 || stars === 4)
        num = 15
    if (stars === 5)
        num = 18
    console.log("As of " + current.toLocaleString() + " the number of campsites with " + stars + " star reviews in the area you selected:" + num)

    let count = 1

    while (count <= 10){
        console.log("Pre-emitter message for count: " + count)
        emitter.emit('foo', count)
        console.log("Post-emitter message for count: " + count)
        count++
    }
    return num
}