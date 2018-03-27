$(document).ready(function() {
  var params = (new URL(document.location)).searchParams;
  var id = params.get("id");
  endpointGetRequest('http://localhost:8080/bookshelf/get/', loadBooks, id);
});

function loadBooks(response){
  var bookshelf = JSON.parse(response);
  var bookshelfTitle = document.getElementById("bookshelf-title");
  bookshelfTitle.innerHTML = bookshelf.name;

  var header = document.getElementById("header");
  header.innerHTML += "<a href='addbook.html?id=" + bookshelf.id + "' class='btn btn-primary btn-google'>Add a Book</a>";

  var books = bookshelf.books;
  for(var i = 0; i < books.length; i++){
    endpointGetRequest('http://localhost:8080/book/get/', displayBook, books[i]);
  }
}

function displayBook(response){
  var book = JSON.parse(response);
  var bookHolder = document.getElementById("books");
  bookHolder.innerHTML +=
    "<div class='col-md-4'>" +
  	"  <div class='card card-profile'>" +
  	"      <div class='card-avatar'>" +
  	"        <img class='img' src='" + book.image + "' />" +
  	"      </div>" +
  	"      <div class='content'>" +
  	"          <h4 class='card-title'>" + book.title + "</h4>" +
  	"          <h6 class='category text-gray'>By: " + book.author + "</h6>" +
  	"          <p >" + book.review + 	"</p>" +
  	"          <h7 class='category'>Rating: " + book.rating + "/10</h6>" +
  	"            <div>" +
  	"          <a href='#pablo' class='btn btn-primary btn-round'>View More Details</a>" +
  	"        </div>" +
  	"      </div>" +
  	"  </div>" +
  	"</div>";
}
