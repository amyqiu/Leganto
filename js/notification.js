$(document).ready(function() {
  endpointGetRequest('http://localhost:8080/user/get/', function (response) {
    var user = JSON.parse(response);
    var notificationIDs = user.notifications;
    loadNotifications(notificationIDs.sort());
  });
});

function loadNotifications(notifications){
  for(var i = 0; i < notifications.length; i++){
    (function(){
      var notificationId = notifications[i];
      endpointGetRequest('http://localhost:8080/notification/get/', displayNotification);
    })();
  }
}

function displayNotification(response){
  var notification = JSON.parse(response);
  var notificationHolder = document.getElementById("content");
  notificationHolder.innerHTML +=
  "<div class='alert alert-info'>" +
  "    <span>" + notification.title + "</span>" +
  "</div>";
}
