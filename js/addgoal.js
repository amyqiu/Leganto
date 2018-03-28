function createBookshelf(){
  var title = document.getElementById("title").value;
  var type = document.getElementById("type").value;
  var deadline = document.getElementById("deadline").value;

  var bookshelf = {
    title,
    type,
    deadline
  }

  endpointPostRequest("http://localhost:8080/goal/post/", redirect, bookshelf)
}

function redirect(){
  window.location.href = "goal";
}
