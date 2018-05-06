const {
  extractMediaFromHot,
  extractGoalsFromMedia,
  extractURLfromHTML,
} = require('./redditParser');

const results = [];

extractMediaFromHot()
  .then((mediaArray) => {
    mediaArray.forEach(media => console.log(media.title));
    console.log('\n End of media \n');
    return mediaArray;
  })
  .then(extractGoalsFromMedia)
  .forEach((currGoal) => {
    if (Object.prototype.hasOwnProperty.call(currGoal, 'html')) {
      results.push({
        ...currGoal,
        url: extractURLfromHTML(currGoal.html),
      });
    } else results.push(currGoal);
  })
  .then(() => console.log(results));
