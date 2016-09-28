'use strict';
const express = require('express');
const knock = require('./knock-knock');

//Use the router built into express
let router = express.Router();

router.use('/knock-knock', knock);

//For all non-defined requests, send this response
router.all('*', (req, res)=> {
  //Tell them that the requested route is not defined by sending the 404 code
  res.status(404).send('No terrible jokes here...');
});

module.exports = router;
