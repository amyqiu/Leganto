const apiUrl = "http://localhost:8080/";

function login(){
  var redirect = "https://accounts.google.com/o/oauth2/v2/auth?" +
 "scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fdrive.metadata.readonly&" +
 "include_granted_scopes=true&" +
 "state=state_parameter_passthrough_value&" +
 "redirect_uri=https://amyqiu.github.io/Leganto/dashboard&" +
 "response_type=token&" +
 "client_id=661489902931-8jdkv5dr7t1n5jh6t9m68n5m6o7iscsi.apps.googleusercontent.com";

 window.location.href = redirect;
}
