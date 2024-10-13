const renderBook = (book) => {
  return `
        <div class="book">
            <h4 id="book-id">${book.id}</h4>
            <button id="book-title" onclick='renderBookDetail(${JSON.stringify(
              book
            )})'>${book.title}</button>
            <h4 id="book-price">$${book.price}</h4>
            <h4 id="book-read">read</h4>
            <h4 id="book-update">update</h4>
            <img src="garbige.jpg" alt="delete">
        </div>
    `;
};
const renderBooks = (books) => {
  const pagBooks = paginateBooks(books);
  let booksStr = ``;
  for (const book of pagBooks) {
    booksStr += renderBook(book);
  }
  document.getElementById("books").innerHTML = booksStr;
  // return booksStr;
};

const renderBookDetail = (book) => {
  const str = `
        <div id="details">
            <h3>${book.title}</h3>
            <h5>Price:$${book.price}</h3>
            <img src="${book.img}" alt="${book.title}">
    `;
  document.getElementById("book-detail").innerHTML = str;
  return str;
};

const paginateBooks = (books) => {
  const startIndex = (currentPage - 1) * booksPerPage;
  const endIndex = startIndex + booksPerPage;
  return books.slice(startIndex, endIndex);
};

const updatePagBtn = () => {
  document.getElementById("prev-button").disabled = currentPage === 1;
  document.getElementById("next-button").disabled =
    currentPage >= Math.ceil(Gbooklist.length / booksPerPage);
};

document.getElementById("prev-button").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    renderBooks(Gbooklist);
    updatePagBtn();
  }
});

document.getElementById("next-button").addEventListener("click", () => {
  if (currentPage < Math.ceil(Gbooklist.length / booksPerPage)) {
    currentPage++;
    renderBooks(Gbooklist);
    updatePagBtn();
  }
});

const toggleAddBook = () => {
  const addBookDiv = document.getElementById("add-book");
  addBookDiv.style.display =
    addBookDiv.style.display === "none" || addBookDiv.style.display === ""
      ? "block"
      : "none";
};

function saveToLocalstorage() {
  localStorage.setItem("bookList", JSON.stringify(Gbooklist));
}
function loadFromLocalStorage() {
  const storedData = localStorage.getItem("bookList");
  try{
    if (storedData) {
      Gbooklist = JSON.parse(storedData);
    } else {
      saveToLocalstorage();
    }
  }catch(error)
  {
    console.error("Error parsing json from localStorage", error);
  }
  
  renderBooks(Gbooklist);
}


