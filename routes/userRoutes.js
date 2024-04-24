const express = require("express");

const {
  registerUser,
  loginUser,
  logout,
  getUserDetail,
  updatePassword,
  updateProfile,
  getAllUser,
  getSingleUser,
  updateUserRole,
  deleteUser,
} = require("../controllers/userController.js");

const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth");

const router = express.Router();

// common Routes 
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);

// user Routes : user can update his password and profile 
router.route("/me").get(isAuthenticatedUser, getUserDetail);
router.route("/password/update").put(isAuthenticatedUser, updatePassword);
router.route("/me/update").put(isAuthenticatedUser, updateProfile);

// admin routes : admin can do CRUD operations on users; 
router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizedRoles("admin"), getAllUser); 

router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizedRoles("admin"), getSingleUser)
  .delete(isAuthenticatedUser, authorizedRoles("admin"), deleteUser);

  router
  .route("/admin/userRoleUpdate")
  .put(isAuthenticatedUser, authorizedRoles("admin"), updateUserRole)


module.exports = router;
