const reviewModel = require("../models/reviewModel");
const planModel = require("../models/planModel");
module.exports.getAllReviews = async function getAllReviews(req, res) {
  try {
    const reviews = await reviewModel.find();
    if (reviews) {
      return res.json({
        message: "reviews retrieved",
        data: reviews,
      });
    } else {
      return res.json({
        message: "review not found",
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

module.exports.top3reviews = async function top3reviews(req, res) {
  try {
    const reviews = await reviewModel.find().sort({ rating: -1 }).limit(3);
    if (reviews) {
      return res.json({
        message: "top3 reviews retrieved",
        data: reviews,
      });
    } else {
      return res.json({
        message: "review not found",
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

module.exports.getPlanReviews = async function getPlanReviews(req, res) {
  try {
    const planid = req.params.id;
    let reviews = await reviewModel.find();

    reviews = reviews.filter((review) => review.plan._id.toString() == planid);

    if (reviews) {
      return res.json({
        message: "plan reviews retrieved",
        data: reviews,
      });
    } else {
      return res.json({
        message: "review2 not found",
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

module.exports.createReview = async function createReview(req, res) {
  try {
    const id = req.params.id;

    let plan = await planModel.findById(id);
    console.log(req.body);
    let review = await reviewModel.create(req.body);
    //replace with orig formula
    plan.ratingsAverage = (plan.ratingsAverage + req.body.rating) / 2;

    await review.save();
    console.log('hello');
    res.json({
      message: "review created",
      data: review,
    });
  } catch (err) {
    return res.json({
      message: err.message,
    });
  }
};
module.exports.updateReview = async function updateReview(req, res) {
  try {
    let id = req.params.id;
    let keys = [];
    let dataToBeUpdated = req.body;
    //console.log(dataToBeUpdated);
    for (let key in dataToBeUpdated) {
      if (key == "id") continue;
      keys.push(key);
    }
    let review = await reviewModel.findById(id);
    //console.log(review);
    for (let i = 0; i < keys.length; i++) {
      review[keys[i]] = dataToBeUpdated[keys[i]];
    }
    await review.save();
    res.json({
      message: "review updated succesfully",
      data: review,
    });
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

module.exports.deleteReview = async function deleteReview(req, res) {
  try {
    let planid = req.params.id;
    let id = req.body.id; //reviewid
    let review = await reviewModel.findByIdAndDelete(id);
    res.json({
      message: "Review deleted successfully",
      data: review,
    });
  } catch (err) {
    res.json({ message: err.message });
  }
};
