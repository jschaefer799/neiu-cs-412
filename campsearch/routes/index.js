const express = require('express');
const router = express.Router();


router.get('/', async function(req, res, next) {
  const options ={
    'title': 'CAMP Search Web App',
    'name': 'CAMP Search',
    'styles': ['stylesheets/style.css', 'stylesheets/style02.css'],
    'isHomeActive': 'active'
  }
  res.render('index', options);


});

module.exports = router;

