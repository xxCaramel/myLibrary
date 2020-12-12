
let myLibrary = [];
let id_counter = getCounter();
const library_dom = document.querySelector(".library");
const nav = document.querySelector(".main_nav");

displayBooks();

/*Event listener*/
library_dom.addEventListener('click', (event) => {
   
    if(event.target.name === "delete") {
        removeBookEvent(+event.target.closest(".book").getAttribute("name"));
    } else if (event.target.name === "readStat") {
        changeRead(event.target);
    }
});

nav.addEventListener('click',(event) => {
    
    if(event.target.name === "new"){
        console.log(event.target.name);
        toggle();
    } else if(event.target.name === "clear"){
        clear();
    }
});


/*Book constructor*/
function Book(author,name,pages,hasRead,id) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
    this.id = id;
}

/*Adds any number of books to myLibrary array*/
function addBookToLibrary(...books) {
    for (let book of books){
        myLibrary.push(book);
    }

    console.log(myLibrary)
    localStorage.setItem("lib",JSON.stringify(myLibrary));
}

/*Removes book from array if it exists*/
function deleteBook(book){
    if(myLibrary.includes(book)) {
        index = myLibrary.indexOf(book);
        myLibrary.splice(index,1);
    } else {
        console.log("No book found");
    }
    localStorage.setItem("lib",JSON.stringify(myLibrary));
    
}

function removeBookEvent(id) {
    let book = myLibrary.find(item => item.id==id);
    deleteBook(book);
    location.reload();
}

/*Create and add book*/

function createBookEvent() {
    let form = document.forms.book_form;
    let book_info = form.elements.book_entry;
    let radio = form.elements.yn;

    let info = [];
    let readStatus = (radio[0].checked) ? true:false;

    for(let entry of book_info.elements){
        if(!entry.value) break;
        info.push(entry.value);
    }
    info.push(readStatus);
   
    let book = new Book(...info,id_counter++);
    localStorage.setItem("counter",id_counter);

    addBookToLibrary(book);

}

function getCounter() {
    let counter = localStorage.getItem("counter");
    if(!counter) return 0;
    return +counter;
}


function displayBooks() {
   
    
    let library = JSON.parse(localStorage.getItem("lib"));
    let html;
    
   if(!library) return;
   myLibrary = library; //myLibrary now is a reference to library
   for(let book of library){
        html = createHTML(book.author,book.name,book.pages,book.hasRead,book.id);
        library_dom.insertAdjacentHTML('afterbegin',html);
   }

}

function createHTML(author,name,pages,hasRead,id) {
    html = 
    `<div class="book" name=${String(id)}>
        <div class="book_right">
            <p>${name}</p>
            <p>${author}</p>
            <p>${pages}pg.</p>
        </div>
            <div class="book_left">
                <div class="book_btns">
                    <button class="btn_b btn" name="readStat">${String(hasRead)}</button>
                    <button class="btn_b btn" name="delete">Delete</button>
                </div>
        </div>
    </div>`;
    return html;
}



function toggle() {
    let form = document.forms.book_form;
    console.log(form.style.display)
    if(form.style.display === "none"){
        form.style.display = "flex";
        document.querySelector("#new_btn").innerHTML = "Cancel";
    } else {
        form.style.display = "none";
        document.querySelector("#new_btn").innerHTML = "New";
    }
}

function changeRead(btn) {
    id = btn.closest(".book").getAttribute("name");
    let book = myLibrary.find(item => item.id==id);
    current = book.hasRead;
    book.hasRead = !current;
    localStorage.setItem("lib",JSON.stringify(myLibrary));
    btn.innerHTML = String(!current);
    console.log(book);
}

function clear() {
    localStorage.clear();
    location.reload();
}


