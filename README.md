# retriever 
![alt text](https://travis-ci.org/ryanchappell/uw-ds-350-reddit-retriever.svg?branch=master "build status")

This is a Node application that retrieve 100 results from the front page (aka "hot", https://www.reddit.com) or new page (https://www.reddit.com/new). It uses the Reddit API.

## To use

### Configure
Create an auth.js file which will provide the authentication credentials used by app.js. See auth-example.js for an example.

### Run
```
> node app.js [DATAITEMID]
```
[DATAITEMID] can be 1 for "hot",  2 for "new"
