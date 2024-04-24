const express = require("express");
const {
  getAllBooks,
  createBook,
  updateBook,
  deleteBook,
  getBookdetailById,
} = require("../controllers/bookController");
const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth");

const router = express.Router();

// anyone can access is
router.route("/getAllBooks").get(getAllBooks); // filter applied here
router.route("/getBookById/:id").get(getBookdetailById);

// only admin can access it
router
  .route("/admin/createBook/new")
  .post(isAuthenticatedUser, authorizedRoles("admin"), createBook);

router
  .route("/admin/updateBook/:id")
  .put(isAuthenticatedUser, authorizedRoles("admin"), updateBook);

router
  .route("/admin/deleteBook/:id")
  .delete(isAuthenticatedUser, authorizedRoles("admin"), deleteBook);

module.exports = router;
