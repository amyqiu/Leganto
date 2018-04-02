function createBookshelf(){
  var name = document.getElementById("name").value;
  var books = [];

  var bookshelf = {
    name,
    books
  }

  endpointPostRequest("http://localhost:8080/bookshelf/post/", redirect, bookshelf)
}

function redirect(){
  window.location.href = "dashboard";
}
