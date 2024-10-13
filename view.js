const renderBook = (book) => {
  return `
        <div class="book" data-id="${book.id}">
            <h4 class="book-id">${book.id}</h4>
            <button class="book-title" onclick='renderBookDetail(${JSON.stringify(
              book
            )})'>${book.title}</button>
            <h4 class="book-price">$${book.price}</h4>
            <h4 class="book-read">read</h4>
            <button class="book-update" onclick="editBook(${
              book.id
            })">update</button> 
            <button class="deleteBtn"><img src="garbige.jpg" alt="delete"></button>
        </div>
    `;
};

const renderBooks = (a) => {
  const pagBooks = paginateBooks(a);
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
  localStorage.setItem("bookId", Gid);
}
function loadFromLocalStorage() {
  const storedData = localStorage.getItem("bookList");
  const storedGid = localStorage.getItem("bookId");
  try {
    if (storedData) {
      Gbooklist = JSON.parse(storedData);
      // } else {
      //   saveToLocalstorage();
    }
    if (storedGid) {
      Gid = parseInt(storedGid, 10);
    }
  } catch (error) {
    console.error("Error parsing json from localStorage", error);
  }
  // console.log(renderBooks(Gbooklist));
  renderBooks(Gbooklist);
}

document.getElementById("new-book-form").addEventListener("submit", (event) => {
  const title = document.getElementById("newBookTitle").value;
  const price = parseFloat(document.getElementById("newBookPrice").value);
  const img = document.getElementById("newBookImg").value;

  if (title && !isNaN(price) && img) {
    Gid++;
    const newBook = {
      id: Gid,
      title: title,
      price: price,
      img: img,
    };
    Gbooklist.push(newBook);
    saveToLocalstorage();
    renderBooks(Gbooklist);
    updatePagBtn();
    toggleAddBook();
  }
  // else {
  //   alert("Please fill in all fields correctly");
  // }
});

document.getElementById("books").addEventListener("click", (event) => {
  if (event.target.classList.contains("deleteBtn")) {
    const bookDiv = event.target.closest(".book");
    const bookIdDelete = parseInt(bookDiv.dataset.id, 10);
    Gbooklist = Gbooklist.filter((book) => book.id !== bookIdDelete);

    Gbooklist.forEach((book, index) => {
      book.id = index + 1;
    });
    Gid = Gbooklist.length ? Gbooklist[Gbooklist.length - 1].id + 1 : 1;

    saveToLocalstorage();
    renderBooks(Gbooklist);
    updatePagBtn();
  }
});

function resetData() {
  Gbooklist = [
    {
      id: 1,
      title: "The Covenant of Water",
      price: 22,
      img: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcT_jj5ajD4PQvEkjJ_px1jG0kQ5RygVFOZlvP75CMM5vIX6QDUadaaHQZhJ2_kepCCq4kSWzG-t6iqL3WmjzvmE1vGkjCmK2ZpnPq2WAaz3",
    },
    {
      id: 2,
      title: "The Seven Husbands of Evelyn Hugo",
      price: 10,
      img: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTvfS4FNPtrDZRJjISp48_mpaU38JNs8AjAKySWjPui9YpIRqr2xCsKMYdZzwqOPx_UEzFTHdccN4gGTU50sXLz-lPeNjgDf7g2vmP-T2U",
    },
    {
      id: 3,
      title:
        "How to Talk to Anyone: 92 Little Tricks for Big Success in Relationships",
      price: 12,
      img: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQJ-YNXR1rTBZCOeQgt09tpW2eZdF5BXWQctFWxgnQMkQjTXPgwYcDcNMaOjLV6KTubB8aR9L_IpvLCe5RZv_jpnGwD3OZqe_tqLOx6d7IrVju-FUowvR19zA",
    },
    {
      id: 4,
      title: "Demon Copperhead",
      price: 20,
      img: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSDUlDNM-4OynzPJnnQ2GGtRFGYfCBGNi6OVoU2x0-NMDYC1i3iO_oF0Vut6OLIfREimnJ1fbnJpb268OkyXaEMpL8I30Ykew",
    },
    {
      id: 5,
      title: "Atria Books Ugly Love by Colleen Hoover",
      price: 12,
      img: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcS12aFqHQzV6o7wk_5uHz7iJavSOyHVFZdJLkwFS3jKkQf_0R8xOu4Jn-Sqfxjy7xODZR62DrOOe8qLuq5iPrPNpJSzcgNWybjEemcwar4_iW5-KZcyw5AX",
    },
    {
      id: 6,
      title: "It Ends With Us",
      price: 50,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLijs-FCt5jW8s5LCg_YMRoe7HZizicmJWUA&s",
    },
    {
      id: 7,
      title: "The Stalker by Alex Gray",
      price: 30,
      img: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTXdKUybuuYAgblRfxVYuGWQ1NzMzGpzRGXQQw3flxR3s1XGVrI8ssMdXuGvNuBo018Tsr68VayaWADBkUJCeVkWgkNuzX2Ms9SjAlPKHPDfSEDW89QbvZc",
    },
  ];
  Gid = 7;
  saveToLocalstorage();
  renderBooks(Gbooklist);
}

const editBook = (bookId) => {
  const book = Gbooklist.find((b) => b.id === bookId);
  if (book) {
    document.getElementById("updateBookTitle").value = book.title;
    document.getElementById("updateBookPrice").value = book.price;
    document.getElementById("updateBookImg").value = book.img;
    document.getElementById("update-book-form").dataset.bookId = bookId;
    document.getElementById("update-book").style.display = "block";
  }
};

document
  .getElementById("update-book-form")
  .addEventListener("submit", (event) => {
    const bookId = parseInt(
      document.getElementById("update-book-form").dataset.bookId
    );
    const title = document.getElementById("updateBookTitle").value;
    const price = parseFloat(document.getElementById("updateBookPrice").value);
    const img = document.getElementById("updateBookImg").value;

    const bookIndex = Gbooklist.findIndex((b) => b.id === bookId);
    if (bookIndex !== -1) {
      // עדכון הספר במערך
      Gbooklist[bookIndex] = {
        ...Gbooklist[bookIndex],
        title,
        price,
        img,
      };

      saveToLocalstorage();
      renderBooks(Gbooklist);
      updatePagBtn();
    }
    // else {
    //   alert("Please fill in all fields correctly");
    // }
    document.getElementById("update-book").style.display = "none";
  });

const toggleUpdateBook = () => {
  const updateBookForm = document.getElementById("update-book");
  if (updateBookForm.style.display === "none") {
    updateBookForm.style.display = "block";
  } else {
    updateBookForm.style.display = "none";
  }
};
