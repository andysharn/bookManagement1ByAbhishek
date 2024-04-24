const res = require("express/lib/response");
const Book = require("../models/bookModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const ApiFeature = require("../utils/apiFeatures");

//create book  --  by Admin only 
exports.createBook = catchAsyncErrors(async (req, res, next) => {
  const { bookTitle, bookAuthor, bookPublishYear } = req.body;

   await Book.create({
    bookTitle,
    bookAuthor,
    bookPublishYear,
  });

  res.status(201).json({
    success: true,
    message: `Book ${bookTitle} Created Successfully`,
  });
});


//updateBook -- by Admin only 
exports.updateBook = catchAsyncErrors(async (req, res, next) => {
  const newBookData = {
    bookTitle: req.body.bookTitle,
    bookAuthor: req.body.bookAuthor,
    bookPublishYear: req.body.bookPublishYear,
  };
  await Book.findByIdAndUpdate(req.book.id, newBookData, {
    new: false,
    runValidators: true,
    useFindAndModify: true,
  });

  res.status(200).json({
    success: true,
    message: "Book  updated successfully!"
  });
});



//Get all book by -- user or admin 
exports.getAllBooks = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 3;
  const bookCount = await Book.countDocuments();

  const apiFeature = new ApiFeature(Book.find(), req.query)
    .search()
    .filter();

  const books = await apiFeature.query;
  console.log('Total Books:', bookCount);
  console.log('Books:', books);

  res.status(200).json({
    success: true,
    books,
    bookCount,
  });
});

//get single Book detail
exports.getBookdetailById = catchAsyncErrors(async (req, res, next) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    return next(new ErrorHandler("Book Not Found", 404));
  }

  res.status(200).json({
    success: true,
    book,
  });
});

//update Book by admin
exports.updateBook = catchAsyncErrors(async (req, res, next) => {
  let book = await Book.findById(req.params.id);
  if (!book) {
    return next(new ErrorHandler("Book Not Found", 404));
  };

  book = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: false,
    runValidators: true,
    useFindAndModify: true,
  });

  res.status(200).json({
    success: true,
    book,
    message:"book update successfully ! "
  });
});

//delete Book --  by Admin
exports.deleteBook = catchAsyncErrors(async (req, res, next) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    return next(new ErrorHandler("book Not Found", 404));
  };

  await book.deleteOne();
  res.status(200).json({
    success: true,
    message: "book deleted Successfully",
  });
});
