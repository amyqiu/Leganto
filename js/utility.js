function exchangeOAuth2Token(params, callback) {
  var oauth2Endpoint = 'https://www.googleapis.com/oauth2/v3/tokeninfo';
    var xhr = new XMLHttpRequest();
    xhr.open('POST', oauth2Endpoint + '?access_token=' + params['access_token']);
    xhr.onreadystatechange = function (e) {
      var response = JSON.parse(xhr.response);
      if (xhr.readyState == 4 &&
          xhr.status == 200 &&
          response['aud'] &&
          response['aud'] == '661489902931-8jdkv5dr7t1n5jh6t9m68n5m6o7iscsi.apps.googleusercontent.com') {
        sessionStorage.setItem('oauth2-test-params', JSON.stringify(params) );
        callback();
      } else if (xhr.readyState == 4) {
        console.log('There was an error processing the token, another ' +
                    'response was returned, or the token was invalid.')
      }
    };
    xhr.send(null);
}

function endpointGetRequest(url, callback, id) {
  var params = JSON.parse(sessionStorage.getItem('oauth2-test-params'));
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

function endpointPostRequest(url, callback, body, id) {
  var params = JSON.parse(sessionStorage.getItem('oauth2-test-params'));
  if (params && params['access_token']) {
    var http = new XMLHttpRequest();

    http.open("POST", url, true);

    http.setRequestHeader('Authorization', 'Bearer ' + params['access_token']);
    http.setRequestHeader("Content-type", "application/json");
    if (id){
        http.setRequestHeader("id", id);
    }

    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 201) {
            callback(http.response);
        } else if (http.readyState == 4){
          console.log("Error has occurred in post request");
        }
    }
    http.send(JSON.stringify(body));
  }
}


function endpointPutRequest(url, callback, body, id) {
  var params = JSON.parse(sessionStorage.getItem('oauth2-test-params'));
  if (params && params['access_token']) {
    var http = new XMLHttpRequest();

    http.open("PUT", url, true);

    http.setRequestHeader('Authorization', 'Bearer ' + params['access_token']);
    http.setRequestHeader("Content-type", "application/json");
    if (id){
        http.setRequestHeader("id", id);
    }

    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) {
            callback(http.response);
        } else if (http.readyState == 4){
          console.log("Error has occurred in put request");
        }
    }
    http.send(JSON.stringify(body));
  }
}

function endpointDeleteRequest(url, callback, id, bookshelfId) {
  var params = JSON.parse(sessionStorage.getItem('oauth2-test-params'));
  if (params && params['access_token']) {
    var http = new XMLHttpRequest();

    http.open("DELETE", url, true);

    http.setRequestHeader('Authorization', 'Bearer ' + params['access_token']);
    http.setRequestHeader("id", id);

    if(bookshelfId){
      http.setRequestHeader("bookshelfId", bookshelfId);
    }

    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 204) {
            callback();
        } else if (http.readyState == 4){
          console.log("Error has occurred in delete request");
        }
    }
    http.send(null);
  }
}
