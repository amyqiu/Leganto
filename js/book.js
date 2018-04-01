$(document).ready(function() {
  var params = (new URL(document.location)).searchParams;
  var id = params.get("id");
  endpointGetRequest('http://localhost:8080/book/get/', loadBook, id);
});

function loadBook(response){
  var book = JSON.parse(response);

  var heading = document.getElementById("heading");
  heading.innerHTML = book.title;

  var image = document.getElementById("image");
  image.src = book.image;

  var title = document.getElementById("title");
  title.innerHTML = book.title;

  var author = document.getElementById("author");
  author.innerHTML = book.author;

  var hours = document.getElementById("hours");
  hours.innerHTML = book.hours + " Hours";

  var pages = document.getElementById("pages");
  pages.innerHTML = book.pages + " Pages";

  var rating = document.getElementById("rating");
  rating.innerHTML = book.rating + "/10";

  var dueDate = document.getElementById("date");
  dueDate.innerHTML = book.dueDate;

  var genre = document.getElementById("genre");
  genre.innerHTML = book.genre;

  var completed = document.getElementById("completed");
  completed.checked = book.isCompleted;

  var review = document.getElementById("review");
  review.innerHTML = book.review;

  var button = document.getElementById("button");
  button.onclick = function() {
    window.location.href = "https://amyqiu.github.io/Leganto/editbook?id=" + book.id;
  };
}
