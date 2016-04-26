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
const retrievalIntervalMillis = 60 * 1000;
//r.config({debug: true});

logger.info('starting up!');

setInterval(function(){
  r.get_hot()
  .then(function(result){
    resultWriter.write('hot',result);
    logger.info('wrote "hot" result');
  })
  .catch(function(err){
    logger.error('error occurred in "hot": ' + err);
  });
}, retrievalIntervalMillis);

setInterval(function(){
  r.get_new()
  .then(function(result){
    resultWriter.write('new',result);
    logger.info('wrote "new" result');
  })
  .catch(function(err){
    logger.error('error occurred in "new": ' + err);
  });
}, retrievalIntervalMillis);

logger.info('done!');
