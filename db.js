'use strict';
const Sequelize = require('sequelize');

//Use the environment variable to store our database URL (so to not give it away)
let db_url = process.env['DATABASE_URL'];

//Use Sequelize to connect to the postgres database
let db = new Sequelize(db_url, {
          dialect: 'postgres', //Tell Sequelize we are using postgres
          underscored: true, //Use underscored table names and entries
          logging: console.log //Use the console.log funciton to log errors
        });

//Export the db variable when our module is required
module.exports = db;
