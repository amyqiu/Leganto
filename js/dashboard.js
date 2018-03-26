$(document).ready(function() {
  var params = JSON.parse(localStorage.getItem('oauth2-test-params'));
  if (params && params['access_token']) {
    getBookshelves();
    return;
  }
  var queryString = location.hash.substring(1);
  var params = {};
  var regex = /([^&=]+)=([^&]*)/g, m;
  while (m = regex.exec(queryString)) {
    params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
    // Try to exchange the param values for an access token.
    if (params['access_token']) {
      exchangeOAuth2Token(params, getBookshelves);
      break;
    }
  }
});

function getBookshelves(){
  endpointGetRequest('http://localhost:8080/user/get/', function (response) {
    var user = JSON.parse(response);
    var bookshelfIDs = user.bookshelves;
    loadBookshelves(bookshelfIDs);
  });
}

function loadBookshelves(bookshelves){
  for(var i = 0; i < bookshelves.length; i++){
    (function(){
      var bookshelfId = bookshelves[i];
      var color = getColor(i, bookshelves.length);

      endpointGetRequest('http://localhost:8080/bookshelf/get/', function(bookshelf) {
        displayBookshelf(color, bookshelf);
      }, bookshelfId);
    })();
  }
}

function displayBookshelf(color, response){
  var bookshelf = JSON.parse(response);
  var bookshelfHolder = document.getElementById("bookshelves");
  bookshelfHolder.innerHTML +=
    "<div class='col-md-4'>" +
    "  <div class='card card-stats'>" +
    "    <div class='card-header' data-background-color='" + color + "'>" +
    "      <i class='material-icons'>content_copy</i>" +
    "    </div>" +
    "    <div class='card-content'>" +
    "      <p class='category'>" + bookshelf.name + "</p>" +
    "      <h3 class='title'>" + bookshelf.books.length + " Books</h3>" +
    "    </div>" +
    "    <div class='card-footer'>" +
    "      <div class='stats'><a href='bookshelf.html?id=" + bookshelf.id + "'>View Books...</a>" +
    "      </div>" +
    "    </div>" +
    "  </div>" +
    "</div>";
}

function getColor(i, length){
  var color = "orange";
  if (i%length == 0){
    color = "pink";
  } else if (i%length == 1){
    color = "green";
  } else if (i%length == 2){
    color = "red";
  } else if (i%length == 3){
    color = "purple";
  } else if (i%length == 4){
    color = "orange";
  } else if (i%length == 5){
    color = "blue";
  }
  return color;
}
