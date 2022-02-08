const cardContainer = document.querySelector('#card-container');
const genresContainer = document.querySelector('#genres')
const search = document.querySelector('#search');

search.addEventListener('keydown', (e) => {

    if (e.key == 'Enter') {
        while (cardContainer.childElementCount > 1) {
            cardContainer.removeChild(cardContainer.lastChild)
        }
        filteredBooks = [];
        filteredBooks = filterItems(library, e.target.value, ['title', 'author', 'genre'])
        populateBooks(filteredBooks)
    }
})

let library = []
let filteredBooks = []
let genres = ['All']

function Book(title, author, genre, description) {
    this.title = title
    this.author = author
    this.genre = genre
    this.description = description
    this.isRead = false
}

function addBookToLibrary(title, author, genre, description) {
    library.push(new Book(title, author, genre, description))
}

const lorem = 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aspernatur, officiis maxime quos repellat obcaecati distinctio, itaque ipsam numquam aut suscipit impedit deserunt...'

addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 'Fantasy', lorem)
addBookToLibrary('Lord of the Rings', 'J.R.R. Tolkien', 'Fantasy', lorem)
addBookToLibrary('Outsider', 'Stephen King', 'Thriller', lorem)
addBookToLibrary('Pet Semetery', 'Stephen King', 'Thriller', lorem)
addBookToLibrary('Dune', 'Frank Herber', 'Sci-Fi', lorem)
addBookToLibrary('The Martian', 'Andy Weir', 'Sci-Fi', lorem)
addBookToLibrary('Ugly Love', 'Colleen Hoover', 'Romance', lorem)
addBookToLibrary('Seven Days in June', 'Tia Williams', 'Thriller', lorem)



function populateBooks(arr) {
    arr.forEach((book) => {
        if (!genres.includes(book.genre)) {
            genres.push(book.genre)
        }
        const card = document.createElement('div')
        const title = document.createElement('h2')
        const author = document.createElement('h3')
        const div = document.createElement('div')
        const description = document.createElement('p')
        const deleteBtn = document.createElement('button')
        card.classList.toggle('card')
        div.classList.toggle('card-text')
        title.innerText = `${book.title}`
        author.innerText = `${book.author} - ${book.genre}`
        description.innerText = `${book.description}`
        deleteBtn.innerHTML = '<span class="material-icons close">close</span>'
        div.append(title)
        div.append(author)
        div.append(description)
        card.append(div)
        card.append(deleteBtn)
        cardContainer.append(card)
    })
}

populateBooks(library);

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
        while (cardContainer.childElementCount > 1) {
            cardContainer.removeChild(cardContainer.lastChild)
        }

        if (genre.textContent == 'All') {
            populateBooks(library);

        } else {

            filteredBooks = [];
            filteredBooks = filterItems(library, genre.textContent, ['title', 'author', 'genre'])
            populateBooks(filteredBooks)
        }

        genreNodes.forEach(element => element.classList.remove('active-genre'))
        genre.classList.add('active-genre')
    })
})


const filterItems = (arr, query, param) => {
    return arr.filter(book => book[param[0]].toLowerCase() == query.toLowerCase() || book[param[1]].toLowerCase() == query.toLowerCase() || book[param[2]].toLowerCase() == query.toLowerCase())
}