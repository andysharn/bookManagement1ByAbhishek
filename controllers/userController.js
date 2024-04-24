const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");

//register a user (by default role is "user")
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
  });
  sendToken(user, 201, res);
});

//Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password, "got it");
  if (!email || !password) {
    return next(new ErrorHandler("please enter email or password", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  console.log(user, "after creation");
  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  sendToken(user, 200, res);
});

//logout user
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "logged out successfully",
  });
});

//get user detail
exports.getUserDetail = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
});

//update password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");
  console.log(req.user);
  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("old password is incorrect", 400));
  }
  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(
      new ErrorHandler("password does not match with confirm password", 400)
    );
  }

  user.password = req.body.newPassword;
  await user.save();
  sendToken(user, 200, res);
});

//update user profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    message: "User profile updated successfully!",
  });
});

// get all users by admin
exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
  const toGetAllUser = await User.find();
  res.status(200).json({
    success: true,
    allUsers: toGetAllUser,
  });
});

// get single user by  admin
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
  const toGetUser = await User.findById(req.params.id);
  if (!toGetUser) {
    return next(new ErrorHandler("user does not exist with id", 400));
  }
  res.status(200).json({
    success: true,
    user: toGetUser,
  });
});

//update user role -- admin
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };
  await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    message: `User role for ${newUserData.role} is updated successfully.`,
  });
});

//delete  -- admin
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const toDeleteUser = await User.findByIdAndUpdate(req.params.id);
  if (!toDeleteUser) {
    return next(
      new ErrorHandler(`user does not exist with id ${req.params.id}`)
    );
  }
  await toDeleteUser.deleteOne();
  res.status(200).json({
    success: true,
    message: `${toDeleteUser} user is deleted successfully!`,
  });
});
