const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

module.exports.createReview = async (req, res) => {
  
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review); //to save new review inside db
    newReview.author = req.user._id;
    listing.reviews.push(newReview); //listing schema k reviews array k inside push ho jyega
  
    await newReview.save();
    await listing.save();
    req.flash("success", "New Review Created!");
    res.redirect(`/listings/${listing._id}`);
};

module.exports.destroyReview = async (req, res) =>{
    let {id, reviewId} = req.params;
    
   await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});//pull means delete
   await Review.findOneAndDelete(reviewId);
   req.flash("success", "Review Deleted!");
   res.redirect(`/listings/${id}`);//redirect to same page
 
};