const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js"); // when we access module.exports from file then write like this

const userController = require("../controllers/user.js");

//signUp route

router.route("/signup")
.get(userController.renderSignupForm)
.post(wrapAsync(userController.signup)
);

//login route using router.route
router.route("/login")
.get(userController.renderLoginForm)
.post(
  saveRedirectUrl,
  passport.authenticate
  ("local",
 {failureRedirect: '/login', failureFlash: true }) ,
  userController.login
);

//log out route
 router.get("/logout", userController.logout);
 

module.exports = router;