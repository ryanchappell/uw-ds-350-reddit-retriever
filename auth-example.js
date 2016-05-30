var RedditApi = require('reddit-oauth');

var reddit = new RedditApi({
    app_id: 'app-id',
    app_secret: 'app-secret',
    redirect_uri: 'reddit-redirect-url'
});

module.exports = {
  getAccessToken: function(callback)
  {
    reddit.passAuth(
        'username',
        'password',
        function (success) {
            if (success) {
              callback(reddit.access_token);
            } else {
              console.log('err');
              callback();
            }
        }
    );
  }
}
