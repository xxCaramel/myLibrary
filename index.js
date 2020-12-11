

let myLibrary = []
displayBooks();

/*Book constructor*/
function Book(author,name,pages,hasRead) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
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
   

    let book = new Book(info[0],info[1],info[2],info[3]);
    addBookToLibrary(book);

}

function toggle() {
    let form = document.forms.book_form;
   
    if(form.style.display === "none"){
        form.style.display = "flex";
        document.querySelector("#new_btn").innerHTML= "Cancel";
    } else {
        form.style.display = "none";
        document.querySelector("#new_btn").innerHTML = "New";
    }
}

function displayBooks() {
   
    let library_dom = document.querySelector(".library");
    let library = JSON.parse(localStorage.getItem("lib"));
    let html;
    
   if(!library) return;
   myLibrary = library; //myLibrary now is a reference to library
   for(let book of library){
        html = createHTML(book.author,book.name,book.pages,book.hasRead);
        library_dom.insertAdjacentHTML('afterbegin',html);
   }

}

function createHTML(author,name,pages,hasRead) {
    html = 
    `<div class="book">
        <div class="book_right">
            <p>${name}</p>
            <p>${author}</p>
            <p>${pages}pg.</p>
        </div>
            <div class="book_left">
                <div class="book_btns">
                    <button class="btn_b btn" name="readStat">-</button>
                    <button class="btn_b btn" name="delete">Delete</button>
                </div>
        </div>
    </div>`;
    return html;
}



