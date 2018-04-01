$(document).ready(function() {
  var params = (new URL(document.location)).searchParams;
  var id = params.get("id");
  endpointGetRequest('http://localhost:8080/book/get/', loadBook, id);
});

function loadBook(response){
  var book = JSON.parse(response);

  var title = document.getElementById("title");
  title.setAttribute("value", book.title);

  var author = document.getElementById("author");
  author.setAttribute("value", book.author);

  var hours = document.getElementById("hours");
  hours.setAttribute("value", book.hours);

  var pages = document.getElementById("pages");
  pages.setAttribute("value", book.pages);

  var image = document.getElementById("image");
  image.setAttribute("value", book.image);

  var rating = document.getElementById("rating");
  rating.setAttribute("value", book.rating);

  var dueDate = document.getElementById("date");
  dueDate.setAttribute("value", book.dueDate);

  var genre = document.getElementById("genre");
  genre.setAttribute("value", book.genre);

  var completed = document.getElementById("completed");
  completed.setAttribute("checked", book.completed);

  var review = document.getElementById("review");
  review.innerHTML = book.review;
}

function saveBook(){
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

  var id = getBookId();

  endpointPutRequest("http://localhost:8080/book/put/", redirect, book, id)
}

function redirect(){
  window.location.href = "book?id=" + getBookshelfId();
}

function getBookId(){
  var params = (new URL(document.location)).searchParams;
  return params.get("id");
}
