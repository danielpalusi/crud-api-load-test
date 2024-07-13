const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let books = [];

app.get('/', (_, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

app.post('/books', (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).send('Missing title or author');
  }

  const newBook = { id: books.length + 1, title, author };
  books.push(newBook);
  res.status(201).send(newBook);
});

app.get('/books', (_, res) => {
  res.json(books);
});

app.get('/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) {
    return res.status(404).send('Book not found');
  }
  res.json(book);
});

app.put('/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) {
    return res.status(404).send('Book not found');
  }

  const { title, author } = req.body;
  book.title = title || book.title;
  book.author = author || book.author;

  res.send(book);
});

app.delete('/books/:id', (req, res) => {
  const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
  if (bookIndex === -1) {
    return res.status(404).send('Book not found');
  }

  books.splice(bookIndex, 1);
  res.status(204).send();
});
