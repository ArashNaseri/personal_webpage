// // Get the parent container element
// var paperList = document.querySelector(".paper-list");

// // // Get the search button element
// // var searchButton = document.getElementById("search-button");

// // // Add a click event listener to the search button
// // searchButton.addEventListener("click", function(){
// //   // Get the author name from the input field
// //   var authorName = document.getElementById("author-name").value;

//   // Fetch the papers from the Google Scholar API


//   // Fetch the papers from the generated json file

//   fetch('static/js/papers.json')
//     .then(function(response){
//       return response.json();
//     })
//     .then(function(data){
//       // Clear the paper list
//       paperList.innerHTML = "";

//       // Loop through the papers and create HTML elements for each one
//       for (var i = 0; i < data.length; i++) {

//         var paper = data[i];
//         var paperDiv = document.createElement("div");
//         paperDiv.classList.add("paper");

//         var title = document.createElement("h2");
//         title.classList.add("paper-title");
//         title.innerText = paper.title;
//         paperDiv.appendChild(title);

//         var authors = document.createElement("p");
//         authors.classList.add("paper-authors");
//         authors.innerText = paper.authors;
//         paperDiv.appendChild(authors);

//         var journal = document.createElement("p");
//         journal.classList.add("journal");
//         journal.innerText = paper.journal;
//         paperDiv.appendChild(journal);

//         var year = document.createElement("p");
//         year.classList.add("journal");
//         year.innerText = paper.year;
//         paperDiv.appendChild(year);

//         paperList.appendChild(paperDiv);

//       }
//     })
//     .catch(function(error){
//       console.log(error);
//     });
// // });

const date = new Date()
var copyright_date = date.getFullYear()

$("#Copyright").html("Copyright " + String(copyright_date)+".")


let section = document.querySelectorAll("section");
let menu = document.querySelectorAll("header nav a");

window.onscroll = () => {
  section.forEach((i) => {
    let top = window.scrollY;
    let offset = i.offsetTop - 150;
    let height = i.offsetHeight;
    let id = i.getAttribute("id");

    if (top >= offset && top < offset + height) {
      menu.forEach((link) => {
        link.classList.remove("active");
        document
          .querySelector("header nav a[href*=" + id + "]")
          .classList.add("active");
      });
    }
  });
};

function reveal() {
  var reveals = document.querySelectorAll(".reveal");

  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}

window.addEventListener("scroll", reveal);

// To check the scroll position on page load
reveal();




fetch('js/papers.json')
.then(response => response.json())
.then(data => {
// Create a list from the JSON data
let listItems = document.getElementById("papers");
j=1
for (let item of data) {
  let listItem = document.createElement("p");
  listItem.setAttribute('data-aos','fade-up')
  listItem.setAttribute('data-aos-delay','500')
  listItem.setAttribute('data-aos-duration','700')
  listItem.innerHTML = "<i class='fa-solid fa-x1 fa-pen'></i>"+ "<span class='paper-title' style='padding-left: 20px;'>" +
      item.title+ "</span>" + "<br>"+"<span class='paper-authors' style='padding-left: 40px;'>" + 
      item.authors + ", </span>" + "<span class='journal'>" + item.journal + 
        "</span>" + ",<span class='journal'>" + item.year + "</span>" 
  j++
  listItems.appendChild(listItem);
}
});

