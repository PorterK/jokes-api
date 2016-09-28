'use strict';
const express = require('express');
const Sequelize = require('sequelize');
const api = require('./api');
const db = require('./db');
const models = require('./models');

//express is a RESTful API package
let app = express();

//Redirect requests to /api to directory /api
app.use('/api', api);

//Start the app on port 2300
app.listen(2300, (e) => {
  if (e){
    //If an error exists, tell us what the error is & cease opperation
    console.error('failed to bind', e);
    process.exit(1);
  }
  //Let us know we are up & running
  console.log('==> 🚀 listening on 2300');
});

//create a function to encapsulate all of our data initialization
let ensureIntialData = ()=>{
  //since we only have one model right now, find it or create it
  return models.knockJoke.findOrCreate({
    where: {
      keyWord: 'luke'
    }
  });
}

//Authenticate the connection to the databse
db.authenticate()
  .then(()=>{
    //Tell us the connection has succeeded (so we can see things happening more linearly)
    console.log('The connection to the database has succeeded.');
    //Sync the database if it isn't in sync... don't force it to prevent data corruption
    return db.sync({force: false});
  })
  .then(ensureIntialData) //ensure our initial data has been created by passing our function
  .then(()=>{
    console.log('Initial data created or existed already!'); //Tell us the data has been created
  })
  .catch(err=>{
    // If there is an error, tell us what it is
    console.log(`There was an error: ${err}`);
  });
