const mongoose = require("mongoose");

const bookSchema = mongoose.Schema(
  {
    bookTitle: {
      type: String,
      required: [true, "Please Enter Book Name"],
      maxLength: [50, "Name should not exceed 30 words"],
      minLength: [1, "Name should have more than 4 character"],
      unique: true,
    },
    bookAuthor: {
      type: String,
      required: [true, "Please enter Book Author Name"],
      maxLength: [50, "Name should not exceed 30 words"],
      minLength: [1, "Name should have more than 4 character"],
      
    },
    bookPublishYear: {
      type: Number,
      required: [true, "Please enter Book Publish year"],
    },
  }

);

module.exports = mongoose.model("Book", bookSchema);