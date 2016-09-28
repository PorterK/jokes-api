'use strict';
const db = require('../db');
const knockJoke = require('./knockJoke');

module.exports = {
  knockJoke: knockJoke(db)
}
