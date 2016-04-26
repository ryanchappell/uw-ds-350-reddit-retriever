'use strict';
const snoowrap = require('snoowrap');
const fs = require('fs');
const winston = require('winston');
const apiConfig = require('./apiConfig.js');

// log config
var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)(),
    new (winston.transports.File)({ filename: 'retriever.log' })
  ]
});

const r = new snoowrap(apiConfig.apiConfig);
//r.config({debug: true});

logger.info('starting up!');

// e.g. get front page listings (posts)
r.get_hot()
.then(function(result){
  var fileDate = new Date().toString();
  // TODO: somethin' like this
  //var fileName = 'front-page-hot_' + fileDate.format("%Y-%m-%d %H:%M:%S") + '.json';
  var fileName = 'result.json'

  fs.writeFile(fileName, JSON.stringify(result, null, '  '));
})
.catch(function(err){
  console.log('error occurred: ' + err);
});

logger.info('done!');
