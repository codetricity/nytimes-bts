const request = require('request');
const apiKey = require('./js/api-key');


const greetingButton = document.getElementById('greeting-button');
greetingButton.addEventListener('click', mainGreeting);

const responseArea = document.getElementById('response-area');

function mainGreeting() {
  const key = apiKey.myKey();

  const fullUrl = {
    url: "https://api.nytimes.com/svc/search/v2/articlesearch.json",
    qs: {
      'api-key': key,
      'q': "bts"
    }};

  request.get(fullUrl, function (error, response, body) {
    let dataObject = JSON.parse(body);
    let arrayOfArticles = dataObject.response.docs;
    let listOfArticles;
    arrayOfArticles.forEach((eachArticle) => {
      console.log(eachArticle.snippet);
      console.log(eachArticle.web_url);
      eachArticle.multimedia.forEach((eachMedia) => {
        let imageUrl = "https://www.nytimes.com/" + eachMedia.url;
        console.log(imageUrl);
      });
      console.log('---');
      listOfArticles = `${listOfArticles} 
        <p>
          <a href="${eachArticle.web_url}">
          ${eachArticle.snippet}
          </a>
          <br>
        </p>
        `;

        eachArticle.multimedia.forEach((eachImage) => {
          let imageUrl = "https://www.nytimes.com/" + eachImage.url;
          listOfArticles = `${listOfArticles}
            <div>
            <img src='${imageUrl}'>
            </div>
            `;
        });
    });
    
    responseArea.innerHTML = listOfArticles;
    console.log('this is the main greeting from the button press');
  });
}
