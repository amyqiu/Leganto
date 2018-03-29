function createGoal(){
  var type = document.getElementById("type").value;
  var value = document.getElementById("value").value;
  var stat = {
    "@type" : type + "Statistic",
    "value" : value
  }

  endpointPostRequest("http://localhost:8080/statistic/post/", redirect, stat)
}

function createRestOfGoal(){
  var title = document.getElementById("title").value;
  var type = document.getElementById("type").value;
  var deadline = document.getElementById("deadline").value;

  var goal = {
    title,
    type,
    deadline
  }

  endpointPostRequest("http://localhost:8080/goal/post/", redirect, goal)
}

function redirect(){
  window.location.href = "goal";
}
