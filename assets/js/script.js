const btnAddBook = document.querySelector(".btn-add");
const form = document.querySelector(".form");
const formOverlay = document.querySelector(".overlay");
const btnClose = document.querySelector(".btn-close");
const btnSubmit = document.querySelector(".btn-submit");
const main = document.querySelector(".main");
const mainContainer = document.querySelector(".main .container");

const inputAuthor = document.querySelector("#author");
const inputTitle = document.querySelector("#title");
const inputPages = document.querySelector("#pages");
const inputWasReaded = document.querySelector("#wasReaded");

const showForm = () => {
  form.classList.add("active");
  formOverlay.classList.add("active-overlay");
}

const hideForm = ({target}) => {
  if(target == btnClose || target == formOverlay) {
    form.classList.remove("active");
    formOverlay.classList.remove("active-overlay");
  }
}

let myLibrary = [];

function Book([author, title, pages, wasReaded]) {
  // the constructor...
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.wasReaded = wasReaded;
}

Book.prototype.toggleRead = function() {
  if(this.wasReaded) {
    return this.wasReaded = false;
  }
  this.wasReaded = true;
}

const showBook = ({author, title, pages, wasReaded}) => {

  const createTag = (tag) => {
    return document.createElement(tag);
  }

  const card = createTag("div");
  const cardBody = createTag("div");
  const spanAuthor = createTag("h5");
  const spanTitle = createTag("h5");
  const spanPages = createTag("h5");
  const btnRead = createTag("button")
  const btnDelete = createTag("button");
  const btnsWrapper = createTag("div");

  card.classList.add("card");
  card.dataset.id = myLibrary.length - 1;
  mainContainer.appendChild(card);

  cardBody.classList.add("card-body");
  card.appendChild(cardBody);

  btnRead.innerText = "Não lido";
  btnRead.classList.add("btn");
  btnRead.classList.add("btn-read");

  if(wasReaded) {
    btnRead.classList.add("btn-read--true");
    btnRead.innerText = "Lido";
  }

  btnDelete.classList.add("btn");
  btnDelete.classList.add("btn-delete");
  btnDelete.innerText = "Remover";

  spanAuthor.classList.add("autor");
  spanTitle.classList.add("title");
  spanPages.classList.add("pages");

  spanAuthor.innerHTML = author;
  spanTitle.innerHTML = title;
  spanPages.innerHTML = `${pages} páginas`;

  cardBody.appendChild(spanAuthor);
  cardBody.appendChild(spanTitle);
  cardBody.appendChild(spanPages);

  btnsWrapper.appendChild(btnRead);
  btnsWrapper.appendChild(btnDelete);
  btnsWrapper.classList.add("wrapper-btn");
  cardBody.appendChild(btnsWrapper);

  btnRead.addEventListener("click", () => {
    myLibrary[card.dataset.id].toggleRead();
      btnRead.classList.toggle("btn-read--true");
      if(btnRead.classList.contains("btn-read--true")) {
        return btnRead.innerText = "Lido";
      }
      btnRead.innerText = "Não lido";
  })

  btnDelete.addEventListener("click", () => {
    card.remove();
    delete myLibrary[card.dataset.id];
  })
}

const addBookToLibrary = () => {
  // do stuff here
  let book = new Book([inputAuthor.value, inputTitle.value, inputPages.value, inputWasReaded.checked]);
  myLibrary.push(book);

  inputAuthor.value = '';
  inputTitle.value = '';
  inputPages.value = '';
  inputWasReaded.checked = false;

  showBook(myLibrary[myLibrary.length - 1]);
}

window.addEventListener("click", hideForm);
btnAddBook.addEventListener("click", showForm);
btnSubmit.addEventListener("click", addBookToLibrary);