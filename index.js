function addUserInput() {
  const searchInput = document.querySelector('.search');
  searchInput.addEventListener('change', userInputAndHtml);
  searchInput.addEventListener('keyup', userInputAndHtml);
}

function userInputAndHtml() {
  let userInput = this.value
  if (userInput) {
    html = "";
    let wikiAPI = "https://en.wikipedia.org/w/api.php?action=opensearch&&search=" + userInput;
    getDataFromAPI(wikiAPI);
  }
  document.querySelector('.articles').innerHTML = "";
}

function getDataFromAPI(url) {
  $.get(url, function(data) {
    displayArticles(data);
  }, 'jsonp');
}

function displayArticles(data) {
  let heading = data[1];
  let articleInfo = data[2];
  let wikiLink = data[3];
  for (let index in heading) {
    displayInHtml(heading[index], articleInfo[index], wikiLink[index]);
  }
}

function displayInHtml(heading, aboutArticle, link) {
  html += `<li><a href = ${link} target="_blank"><h1>${heading}</h1>
  <p>${aboutArticle}</p></li>`;
  document.querySelector('.articles').innerHTML = html;
}


addUserInput();
let html = "";
