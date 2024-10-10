
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
  let booksStr = ``;
  for (const book of books) {
    booksStr += renderBook(book);
  }
  document.getElementById("books").innerHTML = booksStr;
  return booksStr;
};
