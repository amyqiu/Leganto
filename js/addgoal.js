function createGoal(){
  var type = document.getElementById("type").value;
  var value = document.getElementById("value").value;
  var stat = {
    "@type" : type + "Statistic",
    "value" : value
  }

  endpointPostRequest("http://localhost:8080/statistic/post/", createRestOfGoal, stat)
}

function createRestOfGoal(response){
  var title = document.getElementById("title").value;
  var type = document.getElementById("type").value;
  var deadline = document.getElementById("deadline").value;

  var stat = JSON.parse(response);
  var statistic = stat.id;

  var goal = {
    title,
    type,
    deadline,
    statistic
  }

  endpointPostRequest("http://localhost:8080/goal/post/", redirect, goal)
}

function redirect(){
  window.location.href = "goal";
}
