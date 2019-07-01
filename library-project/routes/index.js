const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

/* GET home page */
router.get("/", (req, res) => {
  res.render("index");
});

router.get("/books", (req, res) => {
  Book.find({})
    .then(books => {
      res.render("books", { books });
    })
    .catch(err => {
      console.log("Error while retrieving the books: ", err);
    });
});

router.get("/books/add", (req, res) => {
  res.render("book-add");
});

router.post("/books/add", (req, res) => {
  const { title, author, description, rating } = req.body;

  Book.create({ title, author, description, rating })
    .then(() => {
      res.redirect("/books");
    })
    .catch(err => {
      console.log("Error while adding a book: ", err);
    });
});

router.get("/books/edit/:bookId", (req, res) => {
  Book.findById(req.params.bookId)
    .then(book => {
      res.render("book-edit", { book });
    })
    .catch(err => {
      console.log("Error getting the book: ", err);
    });
});

router.post("/books/edit/:bookId", (req, res) => {
  const { title, author, description, rating } = req.body;

  Book.findByIdAndUpdate(req.params.bookId, {
    title,
    author,
    description,
    rating
  })
    .then(() => {
      res.redirect(`/books/${req.params.bookId}`);
    })
    .catch(err => {
      console.log("Error while updating the book: ", err);
    });
});

router.get("/books/:bookId", (req, res) => {
  // get the information for the book whose id is bookId from the database
  Book.findById(req.params.bookId)
    .then(book => {
      res.render("book-details", { book });
    })
    .catch(err => {
      console.log("Error while retrieving the book: ", err);
    });
});

module.exports = router;
