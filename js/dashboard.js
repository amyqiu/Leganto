$(document).ready(function() {
  var queryString = location.hash.substring(1);
  var params = {};
  var regex = /([^&=]+)=([^&]*)/g, m;
  while (m = regex.exec(queryString)) {
    params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
    // Try to exchange the param values for an access token.
    exchangeOAuth2Token(params, getBookshelves);
  }
});

/* Validate the access token received on the query string. */
function exchangeOAuth2Token(params, callback) {
  var oauth2Endpoint = 'https://www.googleapis.com/oauth2/v3/tokeninfo';
  if (params['access_token']) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', oauth2Endpoint + '?access_token=' + params['access_token']);
    xhr.onreadystatechange = function (e) {
      var response = JSON.parse(xhr.response);
      // Verify that the 'aud' property in the response matches YOUR_CLIENT_ID.
      if (xhr.readyState == 4 &&
          xhr.status == 200 &&
          response['aud'] &&
          response['aud'] == '661489902931-8jdkv5dr7t1n5jh6t9m68n5m6o7iscsi.apps.googleusercontent.com') {
        localStorage.setItem('oauth2-test-params', JSON.stringify(params) );
        callback();
      } else if (xhr.readyState == 4) {
        console.log('There was an error processing the token, another ' +
                    'response was returned, or the token was invalid.')
      }
    };
    xhr.send(null);
  }
}

function getBookshelves(){
  endpointGetRequest('http://localhost:8080/user/get/', function (response) {
    var user = JSON.parse(response);
    var bookshelfIDs = user.bookshelves;
    loadBookshelves(bookshelfIDs);
  });
}

//TODO: redirect to new error window??
function endpointGetRequest(url, callback, id) {
  var params = JSON.parse(localStorage.getItem('oauth2-test-params'));
  if (params && params['access_token']) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onreadystatechange = function (e) {
      if (xhr.readyState == 4 && xhr.status == 200){
        console.log(xhr.response);
        callback(xhr.response);
      } else if (xhr.readyState == 4) {
        console.log('An error has occurred!');
      }
    };
    xhr.setRequestHeader('Authorization', 'Bearer ' + params['access_token']);
    if (id){
      xhr.setRequestHeader('id', id);
    }
    xhr.send(null);
  } else {
    console.log("unauthorized!!");
  }
}

function loadBookshelves(bookshelves){
  for(var i = 0; i < bookshelves.length; i++){
    var bookshelfId = bookshelves[i];
    var color = getColor(i, bookshelves.length);

    endpointGetRequest('http://localhost:8080/bookshelf/get/', function(bookshelf) {
      displayBookshelf(color, bookshelf);
    }, bookshelfId);
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
    "      <h3 class='title'>" + bookshelf.books.size() + " Books</h3>" +
    "    </div>" +
    "    <div class='card-footer'>" +
    "      <div class='stats'><a href='bookshelf.html'>View Books...</a>" +
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
