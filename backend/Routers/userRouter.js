const express = require("express");
const multer = require("multer");
const userModel = require("../models/userModel");
const {
  getUser,
  getAllUser,
  deleteUser,
  updateUser,
  updateProfileImage
} = require("../controller/userController");

const {
  signup,
  login,
  protectRoute,
  isAuthorised,
  forgetPassword,
  resetPassword,
  logout,
} = require("../controller/authController");
//miniapp
const userRouter = express.Router();

//user ke options
userRouter.route("/:id").patch(updateUser).delete(deleteUser);

userRouter.route("/signup").post(signup);
userRouter.route("/login").post(login);
userRouter.route("/forgetpassword").post(forgetPassword);

userRouter.route("/resetpassword/:token").post(resetPassword);

userRouter.route("/logout").get(logout);
//multer for fileupload

//upload->storage, filter
const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(null, `user-${Date.now()}.jpeg`);
  },
});

const filter = function (req, file, cb) {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Not an Image! please upload an image"), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: filter,
});

//profile page
userRouter.post("/ProfileImage", upload.single("photo"), updateProfileImage);
//get request
userRouter.get("/ProfileImage", (req, res) => {
  res.sendFile(
    'C:/Users/Robin Kumar/Desktop/backend_pepcoding/foodApp/multer.html'
  );
});

userRouter.use(protectRoute);
userRouter.route("/userProfile").get(getUser);


//admin sepecific func
userRouter.use(isAuthorised(["admin"]));
userRouter.route("").get(getAllUser);

module.exports = userRouter;
