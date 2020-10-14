const axios = require('axios');

exports.getActivity = function(){
    let element = document.createElement("span")
    element.setAttribute("id", "span1")
    let targetDiv = document.getElementById("newDiv")
    targetDiv.appendChild(element)
    let source = document.getElementById("span1")


    axios.get('https://www.boredapi.com/api/activity').then(resp => {
        console.log(resp.data.activity)
        source.innerText = resp.data.activity
    }).catch((message) => {
        console.log(message)
    })
}