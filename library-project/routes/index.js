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
