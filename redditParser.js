const {
  redditGoals,
} = require('./config');
const Snoowrap = require('snoowrap');

const {
  clientId,
  clientSecret,
  refresh_token: refreshToken,
} = redditGoals;

const r = new Snoowrap({
  userAgent: 'reddit-goals',
  clientId,
  clientSecret,
  refreshToken,
});

const regExp = /([0-9]-[0-9])|(\[[0-9]\]-[0-9])|([0-9]-\[[0-9]\])/;


module.exports = {
  extractMediaFromHot() {
    const goalPosts = [];
    return r.getSubreddit('soccer')
      .getHot()
      .forEach(((post) => {
        if (post.link_flair_text === 'Media') {
          const goalPost = {
            title: post.title,
          };
          if (post.url !== null) {
            goalPost.url = post.url;
          }
          if (post.media !== null) {
            goalPost.media = post.media.oembed.html;
          }
          goalPosts.push(goalPost);
        }
      })).then(() => goalPosts)
      .catch(Promise.reject);
  },
  extractGoalsFromMedia(mediaArray) {
    const goalArray = mediaArray
      .filter(media =>
        media.title.includes('goal') || regExp.test(media.title));
    return Promise.resolve(goalArray);
  },
};
