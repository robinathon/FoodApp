const express = require("express");
const reviewRouter = express.Router();
const { protectRoute } = require("../controller/authController");
const {createReview, updateReview, getAllReviews, top3reviews, getPlanReviews, deleteReview} = require("../controller/reviewController");

reviewRouter.route("/all").get(getAllReviews);

reviewRouter.route("/top3").get(top3reviews);

reviewRouter.route("/:id").get(getPlanReviews);

reviewRouter.use(protectRoute)

////////////////////////plan_id
reviewRouter.route("/crud/:id").post(createReview);
////////////////////////reviewId
reviewRouter.route("/crud/:id").patch(updateReview).delete(deleteReview);

module.exports=reviewRouter;