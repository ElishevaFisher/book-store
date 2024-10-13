function main() {
  console.log("in main");
  if(localStorage.getItem('bookList') === null){
    saveToLocalstorage();
  }
  loadFromLocalStorage();
  renderBooks(Gbooklist);
  console.log(Gbooklist)

  
  updatePagBtn();
}
main();



