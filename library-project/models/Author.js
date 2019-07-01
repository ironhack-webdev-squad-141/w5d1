const mongoose = require("mongoose");
const { Schema } = mongoose;

const authorSchema = new Schema({
  firstName: String,
  lastName: String,
  birthdate: Date,
  nationality: String,
  pictureUrl: String
});

const Author = mongoose.model("Author", authorSchema);

module.exports = Author;
