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
router.get('/:tag', (req, res)=>{
  //Get the keyword from the request
  let keyword = req.params['tag'];

  models.knockJoke.findAll({
    where: {
      tag: {
        $contains: [_.lowerCase(keyword)]
      }
    }
  })
  .then(jokes =>{
    if(jokes.length > 0){
      //put this list of jokes in a random order
      let jokeList = _.shuffle(jokes);

      //get a random joke by pulling a random index from the shuffled list
      let randomJoke = jokeList[_.random(0, jokeList.length - 1)];

      res.send({
        key: randomJoke.keyWord,
        joke: randomJoke.joke
      });
    }else{
        res.status(404).send('A joke with that keyword wasn\'t found, be the first to create it!');
    }
  });
});

//If a post request is sent to the endpoint, create a joke
router.post('/', (req, res)=>{
  //get the joke and keyword from the request
  let keyword = req.body.keyword;
  let joke = req.body.joke;
  let tag = req.body.tag;

  //create the joke in the database
  models.knockJoke.findOrCreate({
    where: {
      keyWord: keyword,
      joke: joke,
      tag: _.union(['random'], tag)
    }
  }).then(joke =>{
    //if it was successfully created, tell us and show us the joke we created
    res.send(`Joke successfully created: ${joke}`);
  }).catch(err =>{
    //if there is an error, display the error 500 (internal server error) and tell us the error message
    res.status(500).send(err);
  });
});

module.exports = router;
