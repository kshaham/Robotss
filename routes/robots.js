var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');

var baseUrl
if (true == false) {
  baseUrl = "http://localhost:3003"
} else {
  baseUrl = "https://southernct-443-robots-api.herokuapp.com"
}

/* List Robots */

router.get('/robots', function(req, res, next) {
  var url = "https://southernct-443-robots-api.herokuapp.com/api/robots"

  fetch(url)
    .then(function(response) {
      response.json()
        .then(function(json){
          console.log("LISTING ROBOTS", json)
          res.render('robots/index', {robots: json, title: "All Robots"});
        })
    })
    .catch(function(err){
      console.log("GOT AN ERROR:", err)
      res.send({error: `OOPS - SERVER ERROR ${err}`});
    })
});

/* New Robot */

router.get('/robots/new', function(req, res, next) { // handle GET requests to the robots/new URL path
  res.render('robots/new', { // render the robots/new.ejs view
    title: "New Robot"
  })
})


/* Show Robot */

router.get('/robots/:id', function(req, res, next) {
  var robotId = req.params.id;
  var errorMessage = `OOPS - COULDN'T FIND ROBOT ${robotId}`
  const endpointUrl = `${baseUrl}/api/robots/${robotId}`
  var url = `https://southernct-443-robots-api.herokuapp.com/api/robots/${robotId}`
  //The same as the one above. Difference is called string interpolation^^. Bot is Concatination basically adding like in java
  //var url = "https://southernct-443-robots-api.herokuapp.com/api/robots/" + robotID

  fetch(url)
    .then(function(response) {
      response.json()
        .then(function(json){
          console.log("SHOWING ROBOT", json)
          res.render('robots/show', {robot: json, title: `Robot ${robotId}`,requestUrl: endpointUrl});
        })
        .catch(function(err){
          console.log("JSON PARSE ERROR", err)
          res.send(errorMessage)
        })
    })
    .catch(function(err){
      console.log(errorMessage)
      res.send(errorMessage)
    })
});


/* Edit */
router.get('/robots/:id/edit', function(req, res, next) {
  const robotId = req.params.id
  const endpointUrl = `${baseUrl}/api/robots/${robotId}`

  fetch(endpointUrl).then(function(response) {
    response.json().then(function(json){
      console.log("POPULATING FORM WITH ROBOT", json)
      res.render('robots/edit', {
        robot: json,
        title: `Edit Robot ${robotId}`,
        requestUrl: endpointUrl,
        requestMethod: "PUT"
      })
    })
  })
})


module.exports = router;