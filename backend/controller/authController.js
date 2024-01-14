const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const { JWT_KEY } = require("../../secrets");
const {sendMail} = require("../utility/nodemailer");

module.exports.signup = async function signup(req, res) {
  try {
    let dataObj = req.body;
    let user = await userModel.create(dataObj);
    sendMail("signup", user);
    if (user) {
      res.json({
        message: "user signed up",
        data: user,
      });
    } else {
      res.json({ message: "error while signing up" });
    }
  } catch {
    res.status(500).json({ message: err.message });
  }
};

module.exports.login = async function login(req, res) {
  try {
    let data = req.body;
    if (data.email) {
      let user = await userModel.findOne({ email: data.email });
      if (user) {
        if (user.password == data.password) {
          let uid = user["_id"];
          let token = jwt.sign({ payload: uid }, JWT_KEY);
          res.cookie("login", token, { httpOnly: true });
          return res.json({
            message: "loggedin success",
            data: user,
          });
        } else {
          return res.json({ message: "wrong credentials" });
        }
      } else {
        return res.json({ message: "user not found" });
      }
    } else {
      res.json({ message: "Empty field" });
    }
  } catch {
    return res.json({ message: err.message });
  }
};

module.exports.protectRoute = async function protectRoute(req, res, next) {
  try {
    let token;
    //console.log(req.cookies);
    // console.log('chal rha hai');
    // console.log(req.cookies);
    if (req.cookies.login) {
      token = req.cookies.login;
      let payload = jwt.verify(token, JWT_KEY);

      if (payload) {
        const user = await userModel.findById(payload.payload);
        req.role = user.role;
        req.id = user.id.toString();
        next();
      } else {
        return res.json({
          message: "please login again",
        });
      }
    } else {
      const client = req.get("User-Agent");
      if (client.includes("Mozilla") == true) {
        return res.redirect("/login");
      }
      return res.json({
        message: "operation not allowed",
      });
    }
  } catch {
    res.json({
      message: "login again",
    });
  }
};

//isAuthorised-> check the user's role admin or restaurantOwner or deliveryboy, etc.
module.exports.isAuthorised = function isAuthorised(roles) {
  return function (req, res, next) {
    if (roles.includes(req.role) == true) {
      next();
    } else {
      res.status(401).json({
        message: "You are not authorized",
      });
    }
  };
};

//forget password
module.exports.forgetPassword = async function forgetPassword(req, res) {
  let { email } = req.body;
  try {
    const user = await userModel.findOne({ email: email });
    if (user) {
      const resetToken = user.createResetToken();
      let resetPasswordLink = `${req.protocol}://${req.get(
        "host"
      )}/resetpassword/${resetToken}`;
      let obj={resetPasswordLink: resetPasswordLink, email: email}
      //send email to the user
      sendMail("resetpassword", obj);
      return res.json({
        message:'password changed'
      })
    } else {
      return res.json({
        message: "please signup",
      });
    }
  } catch {
    res.status(500).json({ message: err.message });
  }
};

//reset password
module.exports.resetPassword = async function resetPassword(req, res) {
  try {
    const token = req.params.token;
    let { password, confirmpassword } = req.body;
    const user = await userModel.findOne({ resetToken: token });
    if (user) {
      //resetPasswordHandler will update user's pwd in db
      user.resetPasswordHandler(password, confirmpassword);
      await user.save();
      res.json({
        message: "password changed successfully, please login again",
      });
    } else {
      res.json({
        message: "user not found, please signup",
      });
    }
  } catch {
    res.json({
      message: "server error",
    });
  }
};

module.exports.logout = function logout(req, res) {
  res.cookie("login", " ", { maxAge: 1 });
  res.json({
    message: "user logged out successfully",
  });
};
