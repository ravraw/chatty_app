let sample =
  'hi there check this out https://news.nationalgeographic.com/content/dam/news/2018/05/17/you-can-train-your-cat/02-cat-training-NationalGeographic_1484324.ngsversion.1526587209178.adapt.1900.1.jpg';

('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRI_6ge5A36wFRE_-gweBkHZ6kmt2-dwF1s0DZp1BKtXtcxD_sI');

///(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/gi.test(el);

function getURL(str) {
  let splitArray = str.split(' ');
  let userContent = '';
  let url = '';
  splitArray.forEach(el => {
    if (/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/.test(el)) {
      //if (/(jpg|gif|png)$/.test(el)) {
      url = el;
      // } else if (/(http(s?):)([/|.|\w|\s|-])*/.test(el)) {
      //   console.log('NO match');
    } else {
      userContent += ` ${el}`;
    }
  });
  return { url, userContent };
}

function replaceQuotes(str) {
  return str.replace(/(^["|'])|(["|']$)/g, '');
}

console.log(replaceQuotes('"hello"'));

console.log(getURL(sample).url);
