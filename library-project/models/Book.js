const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookSchema = new Schema(
  {
    title: String,
    author: {
      type: Schema.Types.ObjectId,
      ref: "Author"
    },
    rating: Number,
    description: String
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
