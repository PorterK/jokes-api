'use strict';
const db = require('../db');
const knockJoke = require('./knockJoke');

//export an object that has each model as a property for ease of access
module.exports = {
  knockJoke: knockJoke(db)
}
