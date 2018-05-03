const { redditGoals } = require ('./config');
const snoowrap = require('snoowrap');

var { clientId, clientSecret, refresh_token: refreshToken } = redditGoals;

const r = new snoowrap({
  userAgent: 'reddit-goals',
  clientId,
  clientSecret,
  refreshToken
});

r.getHot().map(post => post.title).then(console.log);

// Get posts from /r/soccer

r.getSubreddit('soccer')
 .getHot()
 .map(post => post.title + ' ' + post.ups)
 .then(console.log);

