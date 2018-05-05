const {
  extractMediaFromHot,
  extractGoalsFromMedia,
} = require('./redditParser');

extractMediaFromHot()
  .then((mediaArray) => {
    mediaArray.forEach(media => console.log(media.title));
    console.log('\n End of media \n');
    return mediaArray;
  })
  .then(extractGoalsFromMedia)
  .forEach(goal => console.log(goal.title));

// r.getHot().map(post => post.title).then(console.log);
