$(document).ready(function() {
  endpointGetRequest('http://localhost:8080/user/get/', function (response) {
    var user = JSON.parse(response);
    var bookID = user.bookStatistic;
    var hourID = user.hourStatistic;
    var pageID = user.pageStatistic;
    endpointGetRequest('http://localhost:8080/statistic/get/', loadBookStat, bookID);
    endpointGetRequest('http://localhost:8080/statistic/get/', loadHourStat, hourID);
    endpointGetRequest('http://localhost:8080/statistic/get/', loadPageStat, pageID);
    for (goalID of user.goals.sort()){
      endpointGetRequest('http://localhost:8080/goal/get/', loadGoal, goalID);
    }
  });
});

function loadBookStat(response){
  var statistic = JSON.parse(response);

  var stat = document.getElementById("bookstat");
  stat.innerHTML = statistic.representation;
}

function loadHourStat(response){
  var statistic = JSON.parse(response);

  var stat = document.getElementById("hourstat");
  stat.innerHTML = statistic.representation;
}

function loadPageStat(response){
  var statistic = JSON.parse(response);

  var stat = document.getElementById("pagestat");
  stat.innerHTML = statistic.representation;
}

function loadGoal(response){
  var goal = JSON.parse(response);

  endpointGetRequest('http://localhost:8080/statistic/get/', function(stat) {
    var statistic = JSON.parse(stat);

    var goalHolder = document.getElementById("goals");
    goalHolder.innerHTML +=
    "<div class='col-md-3'>" +
  	"	  <div class='card card-stats'>" +
  	"		  <div class='card-header' data-background-color='blue'>" +
  	"			  <i class='material-icons'>assignment</i>" +
  	"		  </div>" +
  	"		  <div class='card-content'>" +
  	"			  <p class='category'>" + statistic.value + " " + goal.type + "</p>" +
  	"			 <br><br> <h4 class='title'>" + goal.title + "s</h3>" +
  	"		  </div>" +
  	"		  <div class='card-footer'>" +
  	"			  <div class='stats'>By " + goal.deadline + "</div>" +
  	"		  </div>" +
  	"	  </div>" +
  	" </div>";
  }, goal.statistic);
}
