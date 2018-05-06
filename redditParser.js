const cheerio = require('cheerio');

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
    const mediaArray = [];
    return r.getSubreddit('soccer')
      .getHot()
      .forEach(((post) => {
        if (post.link_flair_text === 'Media') {
          const media = {
            title: post.title,
          };
          if (post.url !== null) {
            media.url = post.url;
          }
          if (post.media !== null) {
            media.html = post.media.oembed.html;
          }
          mediaArray.push(media);
        }
      })).then(() => mediaArray)
      .catch(Promise.reject);
  },
  extractGoalsFromMedia(mediaArray) {
    const goalArray = mediaArray
      .filter(media =>
        media.title.includes('goal') || regExp.test(media.title));
    return Promise.resolve(goalArray);
  },
  extractURLfromHTML(mediaHTML) {
    return cheerio.load(mediaHTML)('iframe').attr('src');
  },
};
