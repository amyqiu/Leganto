    $(document).ready(function() {

        // Javascript method's body can be found in assets/js/demos.js
        // demo.initDashboardPageCharts();
        <!-- $.get("http://localhost:8080/user/get", function(data, status){ -->
            <!-- console.log(data); -->
        <!-- }); -->
		
		var queryString = location.hash.substring(1);

// Parse the query string to extract access token and other parameters.
// This code is useful if you set a value for the 'state' parameter when
// redirecting the user to the OAuth 2.0 server, but otherwise isn't needed.
var params = {};
var regex = /([^&=]+)=([^&]*)/g, m;
while (m = regex.exec(queryString)) {
  params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
  // Try to exchange the param values for an access token.
  exchangeOAuth2Token(params);
}

/* Validate the access token received on the query string. */
function exchangeOAuth2Token(params) {
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
      } else if (xhr.readyState == 4) {
        console.log('There was an error processing the token, another ' +
                    'response was returned, or the token was invalid.')
      }
    };
    xhr.send(null);
  }
}

function trySampleRequest() {
    var params = JSON.parse(localStorage.getItem('oauth2-test-params'));
    if (params && params['access_token']) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET',
          'http://localhost:8080/user/get&' +
          'access_token=' + params['access_token']);
      xhr.onreadystatechange = function (e) {
        console.log(xhr.response);
      };
      xhr.send(null);
    } else {
      oauth2SignIn();
    }
  }
    });