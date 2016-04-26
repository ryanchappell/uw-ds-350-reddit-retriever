'use strict';
const snoowrap = require('snoowrap');
const fs = require('fs');
const winston = require('winston');
const apiConfig = require('./apiConfig.js');
const resultWriter = require('./resultWriter.js');

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
  resultWriter.write('hot',result);
  logger.info('wrote "hot" result');
})
.catch(function(err){
  logger.error('error occurred in "hot": ' + err);
});

// e.g. get 'new' listings (posts)
r.get_new()
.then(function(result){
  resultWriter.write('new',result);
  logger.info('wrote "new" result');
})
.catch(function(err){
  logger.error('error occurred in "new": ' + err);
});

logger.info('done!');
