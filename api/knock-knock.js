'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const models = require('../models');

let router = express.Router();
//Use JSON to parse requests and to send responses
router.use(bodyParser.json());

//If a GET request is sent to the endpoint
router.get('/', (req, res)=>{
  //Find all of the knock knock jokes
  models.knockJoke.findAll()
  .then((jokes=>{
    //and send them
    res.send(jokes);
  })
  .catch(err=>{
    //on error, send the 500 (internal server error) code and the error message
    res.status(500).send(err);
  });

});

module.exports = router;
