let campsites = require('./campsites')
let EventEmitter = require('events').EventEmitter

let emitter = new EventEmitter()

exports.filterByDogsAllowed = function (){
    emitter.on('foo', function (arg1){
        console.log("Emitter received event number: " + arg1)
    })
    let sites = campsites.getCampsites(emitter)

    console.log("3 of the " + sites + " allow dogs.")
}