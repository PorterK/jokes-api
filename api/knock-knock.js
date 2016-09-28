'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const models = require('../models');
const _ = require('lodash');

let router = express.Router();
//Use JSON to parse requests and to send responses
router.use(bodyParser.json());

//If a GET request is sent to the endpoint
router.get('/', (req, res)=>{
  //Find all of the knock knock jokes
  models.knockJoke.findAll()
  .then(jokes=>{
    //and send them
    res.send(jokes);
  })
  .catch(err=>{
    //on error, send the 500 (internal server error) code and the error message
    res.status(500).send(err);
  });

});

//If a request is sent to the endpoint/keyword, where keyword is any word, send back the joke
router.get('/:keyword', (req, res)=>{
  //Get the keyword from the request
  let keyword = req.params['keyword'];

  models.knockJoke.findAll({
    where: {
      keyWord: _.lowerCase(keyword)
    }
  })
  .then(jokes =>{
    if(jokes.length > 0){
      //put this list of jokes in a random order
      let jokeList = _.shuffle(jokes);

      //get a random joke by pulling a random index from the shuffled list
      let randomJoke = jokeList[_.random(0, jokeList.length - 1)];

      res.send(randomJoke.joke);
    }else{
        res.status(404).send('A joke with that keyword wasn\'t found, be the first to create it!');
    }
  });
});

module.exports = router;
