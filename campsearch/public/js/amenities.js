let campsites = require('./campsites')

exports.filterByDogsAllowed = function (){
    let sites = campsites.getCampsites()

    console.log("3 of the " + sites + " allow dogs.")
}