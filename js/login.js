const apiUrl = "http://localhost:8080/";

function login(){
  // var username = document.getElementById("username").value;
  // var password = document.getElementById("password").value;

  // var params = "username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password);
  var redirect = "https://accounts.google.com/o/oauth2/v2/auth?" + 
 "scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fdrive.metadata.readonly&" +
 "include_granted_scopes=true&" +
 "state=state_parameter_passthrough_value&" +
 "redirect_uri=https://amyqiu.github.io/Leganto/dashboard&" +
 "response_type=token&" +
 "client_id=661489902931-8jdkv5dr7t1n5jh6t9m68n5m6o7iscsi.apps.googleusercontent.com";
 
 window.location.href = redirect;
  
          // $.get("http://localhost:8080/user/", function(data, status){
            // console.log(data);
			// window.open('dashboard.html', '_self', false);
        // });
  
  // postRequest(apiUrl, (result)=>{
    // var parsedResult = JSON.parse(result);
    // if (parsedResult){
		// console.log("result");
      // // sessionStorage.setItem('token', parsedResult.token);
      // window.open('dashboard.html', '_self', false);
    // } else {
      // // var errorElement = document.getElementById("errorMessage");
      // // errorElement.innerHTML = "Invalid username/password!";
    // }
  // });
}
