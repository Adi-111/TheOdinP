const Library = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleReadStatus = function() {
    this.read = !this.read;
};

function addBook(title, author, pages, read){
    let newBook = new Book(title, author, pages, read);
    Library.push(newBook);
    displayBooks(); // Update display after adding book
}

function displayBooks() {
    const container = document.getElementById("books-container");
    container.innerHTML = "";

    Library.forEach(book => {
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");

        const titleElement = document.createElement("h2");
        titleElement.textContent = book.title;

        const authorElement = document.createElement("p");
        authorElement.textContent = "Author: " + book.author;

        const pagesElement = document.createElement("p");
        pagesElement.textContent = "Pages: " + book.pages;

        const readElement = document.createElement("p");
        readElement.textContent = "Read: " + (book.read ? "Yes" : "No");

        const toggleReadButton = document.createElement("button");
        toggleReadButton.textContent = book.read ? "Mark as Unread" : "Mark as Read";
        toggleReadButton.addEventListener("click", () => {
            book.toggleReadStatus();
            displayBooks(); // Re-display books after toggling the read status
        });

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", () => {
            removeBook(book); // Pass book object to remove
            displayBooks(); // Re-display books after removing the book
        });

        // Append book details and buttons to the book card
        bookCard.appendChild(titleElement);
        bookCard.appendChild(authorElement);
        bookCard.appendChild(pagesElement);
        bookCard.appendChild(readElement);
        bookCard.appendChild(toggleReadButton);
        bookCard.appendChild(removeButton);

        // Append the book card to the container
        container.appendChild(bookCard);
    });
}

function removeBook(book) {
    const index = Library.indexOf(book);
    if (index !== -1) {
        Library.splice(index, 1);
    }
}

// Event listener for new book form submission
const bookForm = document.getElementById("book-form");
bookForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("read").checked;

    addBook(title, author, pages, read);

    const modal = document.getElementById("modal");
    modal.style.display = "none";
    bookForm.reset();
});

// Event listener for opening modal
const newBookBtn = document.getElementById("new-book-btn");
newBookBtn.addEventListener("click", () => {
    const modal = document.getElementById("modal");
    modal.style.display = "block";
});

// Event listener for closing modal
const closeButton = document.getElementsByClassName("close")[0];
closeButton.addEventListener("click", () => {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
});

// Event listener for clicking outside modal to close it
window.addEventListener("click", (event) => {
    const modal = document.getElementById("modal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

addBook("To Kill a Mockingbird", "Harper Lee", 336, true);
addBook("1984", "George Orwell", 328, false);
addBook("The Great Gatsby", "F. Scott Fitzgerald", 180, true);
addBook("The Catcher in the Rye", "J.D. Salinger", 224, false);
addBook("Lord of the Flies", "William Golding", 224, true);

// Initially display books when the page loads
displayBooks();
