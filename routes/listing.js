const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js"); //{} curly braces is used-- ..middleware.js contain multiple prop..-- jab hmhe sirf selected prop chaiye middleware.js se tb hm {} use krte ha 
const listingController = require("../controllers/listing.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({storage });


//router.route use when route have same path like "/" then write all in 1 box
//store index or create route
router
.route("/")
.get(wrapAsync(listingController.index))
.post(
  isLoggedIn, 
  upload.single('listing[image]'),
  validateListing,
  wrapAsync(listingController.createListing)
);
//++++++++++++++++++++++++++++++++++++++++++++++++++++++
//new route  use up because /:id route  take it like id show use up
router.get("/new", isLoggedIn,listingController.renderNewForm);

//show route or Update or delete using router.route
router
.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(
   isLoggedIn, 
   isOwner,
   upload.single('listing[image]'),
   validateListing, 
   wrapAsync(listingController.updateListing)
)
.delete(
  isLoggedIn, 
  isOwner,
  wrapAsync(listingController.destroyListing)
);


//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//edit route
router.get(
  "/:id/edit",
  isOwner,
  isLoggedIn, 
  wrapAsync(listingController.renderEditForm)
);

//++++++++++++++++++++++

module.exports = router;