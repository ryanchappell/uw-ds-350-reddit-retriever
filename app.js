'use strict';
const snoowrap = require('snoowrap');
const fs = require('fs');
const winston = require('winston');
const apiConfig = require('./apiConfig.js');
const resultWriter = require('./resultWriter.js');
const auth = require('./auth');

if (process.argv < 3 ||
  (process.argv[2] != 1 && process.argv[2] != 2))
{
  console.log('usage: node app.js [DATAITEMID]')
  console.log('[DATAITEMID] can be 1 for "hot",  2 for "new"');
  process.exit();
}

// log config
var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)(),
    new (winston.transports.File)({ filename: 'retriever.log' })
  ]
});

var dataItem = process.argv[2];
var retrievalIntervalMillis = 5 * 1000;

logger.info("starting up!");
logger.info("retrievalIntervalMillis: " + retrievalIntervalMillis);

setInterval(function(){

  auth.getAccessToken(function(token){
    if (!token)
    {
      logger.error('token is null');
      process.exit();
    }

    console.log('got token ' + token);

    var r = new snoowrap({
      user_agent: apiConfig.apiConfig.user_agent,
      access_token: token
    });

    switch(dataItem)
    {
        case "1":
          r.get_hot()
          .then(function(result){
            resultWriter.write('hot',result);
            logger.info('wrote "hot" result');
          })
          .catch(function(err){
            logger.error('error occurred in "hot": ' + err);
          });
          break;
        case "2":
          r.get_new()
          .then(function(result){
            resultWriter.write('new',result);
            logger.info('wrote "new" result');
          })
          .catch(function(err){
            logger.error('error occurred in "new": ' + err);
          });
          break;
        default:
          throw new Error("not implemented for dataItem " + dataItem);
    }

  })
}, retrievalIntervalMillis);
