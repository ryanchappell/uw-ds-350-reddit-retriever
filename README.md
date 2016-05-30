# retriever 
![alt text](https://travis-ci.org/ryanchappell/uw-ds-350-reddit-retriever.svg?branch=master "build status")

This is a Node application that retrieve 100 results from the front page (aka "hot", https://www.reddit.com) or new page (https://www.reddit.com/new). It uses the Reddit API.

When executed, it will write the Reddit API to a .json file that includes the page and timestamp in the filename (e.g. "new-1461809887043.json").

## To use

### Configure
1. Create an auth.js file which will provide the authentication credentials used by app.js. See auth-example.js for an example.
2. Create an apiConfig.js file which will provide the user agent supplied to the Reddit API. See apiConfig-example.js for an example.

### Run
```
> node app.js [DATAITEMID]
```
[DATAITEMID] can be 1 for "hot",  2 for "new"
