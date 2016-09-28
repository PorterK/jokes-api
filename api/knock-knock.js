'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const models = require('../models');

let router = express.Router();
router.use(bodyParser.json());

router.get('/', (req, res)=>{

  models.knockJoke.findAll()
  .then((jokes)=>{
    res.send(jokes);
  })

});

module.exports = router;
