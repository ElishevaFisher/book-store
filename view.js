
const renderBook = (book) => {
  return `
        <div class="book">
            <h4 id="book-id">${book.id}</h4>
            <h4 id="book-title">${book.title}</h4>
            <h4 id="book-price">$${book.price}</h4>
            <h4 id="book-read">read</h4>
            <h4 id="book-update">update</h4>
            <img src="garbige.jpg" alt="delete">
        </div>
    `;
};

const renderBooks = (books) => {
    const pagBooks= paginateBooks(books);
  let booksStr = ``;
  for (const book of pagBooks) {
    booksStr += renderBook(book);
  }
  document.getElementById("books").innerHTML = booksStr;
  return booksStr;
};

const paginateBooks= (books) =>{
    const startIndex =(currentPage -1)* booksPerPage;
    const endIndex= startIndex+booksPerPage;
    return books.slice(startIndex,endIndex);
};

const updatePagBtn=()=>{
    document.getElementById("prev-button").disabled = currentPage === 1;
    document.getElementById("next-button").disabled = currentPage >= Math.ceil(Gbooklist.length / booksPerPage);
};


document.getElementById("prev-button").addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        renderBooks(Gbooklist);
        updatePaginationButtons();
    }
});

document.getElementById("next-button").addEventListener("click", () => {
    if (currentPage < Math.ceil(Gbooklist.length / booksPerPage)) {
        currentPage++;
        renderBooks(Gbooklist);
        updatePaginationButtons();
    }
});
