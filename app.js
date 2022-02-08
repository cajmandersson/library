const cardContainer = document.querySelector('#card-container');
const genresContainer = document.querySelector('#genres')
const search = document.querySelector('#search');
const addBtn = document.querySelector('#addBook')
const lorem = 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aspernatur, officiis maxime quos repellat obcaecati distinctio, itaque ipsam numquam aut suscipit impedit deserunt...'

// Parameters
let library = []
let genres = ['All']
let bookId = 0;


// Book Constructor
function Book(title, author, genre, description, dataIndex) {
    this.dataIndex = dataIndex
    this.title = title
    this.author = author
    this.genre = genre
    this.description = description
    this.isRead = false
}

function addBookToLibrary(title, author, genre, description) {
    library.push(new Book(title, author, genre, description, bookId))
    bookId++;
}

const filterBooks = (query) => {
    if (query == null || query == '') {
        return library
    } else {
        return library.filter(book => book.title.toLowerCase() == query.toLowerCase() || book.author.toLowerCase() == query.toLowerCase() || book.genre.toLowerCase() == query.toLowerCase())
    }
}

const displayBooks = (query) => {
    const books = filterBooks(query)
    removeBooksfromDisplay()
    books.forEach(book => {
        cardContainer.append(createBookCard(book))
        if (!genres.includes(book.genre)) {
            genres.push(book.genre)
        }
    })
}

function removeBooksfromDisplay() {
    while (cardContainer.childElementCount > 1) {
        cardContainer.removeChild(cardContainer.lastChild)
    }
}

function removeBookFromLibrary(id) {
    library = library.filter(book => book.dataIndex != id)
    displayBooks(null)
}

addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 'Fantasy', lorem)
addBookToLibrary('Lord of the Rings', 'J.R.R. Tolkien', 'Fantasy', lorem)
addBookToLibrary('Outsider', 'Stephen King', 'Thriller', lorem)
addBookToLibrary('Pet Semetery', 'Stephen King', 'Thriller', lorem)
addBookToLibrary('Dune', 'Frank Herber', 'Sci-Fi', lorem)
addBookToLibrary('The Martian', 'Andy Weir', 'Sci-Fi', lorem)
addBookToLibrary('Ugly Love', 'Colleen Hoover', 'Romance', lorem)
addBookToLibrary('Seven Days in June', 'Tia Williams', 'Thriller', lorem)

displayBooks(null)


search.addEventListener('keydown', (e) => {
    if (e.key == 'Enter') {
        displayBooks(e.target.value)
    }
})

addBtn.addEventListener('click', (e) => {
    const button = e.target.parentElement
    const form = document.querySelector('#addForm')
    console.log(form)
    button.classList.toggle('hide')
    form.classList.toggle('hide')
})


function createBookCard(book) {
    const card = document.createElement('div')
    const title = document.createElement('h2')
    const author = document.createElement('h3')
    const text = document.createElement('div')
    const bottomBtns = document.createElement('div')
    const description = document.createElement('p')
    const deleteBtn = document.createElement('button')
    const likeBtn = document.createElement('button')
    const readBtn = document.createElement('button')

    deleteBtn.classList.toggle('closeBtn')
    deleteBtn.innerHTML = `<span class="material-icons">close</span>`
    deleteBtn.setAttribute('data-index', `${book.dataIndex}`)

    likeBtn.classList.toggle('likeBtn')
    likeBtn.innerHTML = `<span class="material-icons">favorite_border</span>`

    readBtn.classList.toggle('readBtn')
    readBtn.innerHTML = `<span class="material-icons">check_box_outline_blank</span>`

    bottomBtns.append(readBtn)
    bottomBtns.append(likeBtn)

    text.classList.toggle('card-text')
    title.innerText = `${book.title}`
    author.innerText = `${book.author} - ${book.genre}`
    description.innerText = `${book.description}`

    text.append(title)
    text.append(author)
    text.append(description)

    deleteBtn.addEventListener('click', (e) => {
        const bookId = e.target.parentElement.getAttribute('data-index')
        removeBookFromLibrary(bookId)
    })


    // refactor into object
    likeBtn.addEventListener('click', (e) => {
        const element = e.target.parentElement;
        element.classList.toggle('clicked')
        if (element.classList.contains('clicked')) {
            element.innerHTML = `<span class="material-icons">favorite</span>`
        } else {
            element.innerHTML = `<span class="material-icons">favorite_border</span>`
        }
    })

    readBtn.addEventListener('click', (e) => {
        const element = e.target.parentElement;
        element.classList.toggle('clicked')
        if (element.classList.contains('clicked')) {
            element.innerHTML = `<span class="material-icons">check_box</span>`
        } else {
            element.innerHTML = `<span class="material-icons">check_box_outline_blank</span>`
        }
    })

    bottomBtns.classList.toggle('bottomBtns')

    card.classList.toggle('card')
    card.append(text)
    card.append(deleteBtn)
    card.append(bottomBtns)
    return card;
}




// Refactor

genres.forEach((genre) => {
    const h3 = document.createElement('h3')
    h3.classList.toggle('genre')
    h3.textContent = genre
    genresContainer.append(h3);
})

genresContainer.firstElementChild.classList.add('active-genre')

const genreNodes = document.querySelectorAll('.genre');
genreNodes.forEach((genre) => {
    genre.addEventListener('click', () => {
        if (genre.textContent == 'All') {
            displayBooks(null)
        } else {
            displayBooks(genre.textContent)
        }
        genreNodes.forEach(element => element.classList.remove('active-genre'))
        genre.classList.add('active-genre')
    })
})