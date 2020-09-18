(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.amenities = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
let campsites = require('./campsites')

exports.filterByDogsAllowed = function (){
    let sites = campsites.getCampsites()

    console.log("3 of the " + sites + " allow dogs.")
}
},{"./campsites":2}],2:[function(require,module,exports){
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
},{"./reviews":3}],3:[function(require,module,exports){
exports.getReviews = function(){
    console.log("Welcome to CAMP Search! Let's filter campsites by the number of stars campsites have been rated!")
    return 5;
}
},{}]},{},[1])(1)
});
