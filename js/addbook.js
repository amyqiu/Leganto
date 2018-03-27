// $(document).ready(function() {
//   var params = (new URL(document.location)).searchParams;
//   var id = params.get("id");
//   endpointGetRequest('http://localhost:8080/bookshelf/get/', loadBooks, id);
// });

function createBook(){
  var title = document.getElementById("title").value;
  var author = document.getElementById("author").value;
  var hours = document.getElementById("hours").value;
  var pages = document.getElementById("pages").value;
  var rating = document.getElementById("rating").value;
  var dueDate = document.getElementById("date").value;
  var genre = document.getElementById("genre").value;
  var isCompleted = document.getElementById("completed").checked;
  var image = document.getElementById("image").value;
  var review = document.getElementById("review").value;

  var book = {
    title,
    author,
    hours,
    pages,
    rating,
    dueDate,
    genre,
    isCompleted,
    image,
    review
  }

  var id = getBookshelfId();

  endpointPostRequest("http://localhost:8080/book/post/", redirect, book, id)
}

function redirect(){
  window.location.href = "bookshelf.html?id=" + getBookshelfId();
}

function getBookshelfId(){
  var params = (new URL(document.location)).searchParams;
  return params.get("id");
}
