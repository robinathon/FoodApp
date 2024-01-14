import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import EditReviewDialog from "./EditReviewDialog";
import "../Styles/planDetail.css";
import "../Styles/contact.css";
import AuthProvider, { useAuth } from "../Context/AuthProvider";

function PlanDetail() {
  const [plan, setPlan] = useState({});
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [review, setReview] = useState("");
  const [rate, setRate] = useState("5");
  const { user } = useAuth();
  const [editReviewId, setEditReviewId] = useState(null);

  useEffect(async () => {
    const data = await axios.get("/plans/plan/" + id);
    delete data.data.data["_id"];
    delete data.data.data["__v"];
    setPlan(data.data.data);
    const reviewsData = await axios.get("/review/" + id);
    setReviews(reviewsData.data.data);
  }, []);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleClick = async () => {
    const data = await axios.post("/review/crud/" + id, {
      review: review,
      rating: rate,
      user: user.data._id,
      plan: id,
    });
    const reviewsData = await axios.get("/review/" + id);
    setReviews(reviewsData.data.data);
  };
  const handleEditPlan=()=>{
    
  }

  const handleEdit = (reviewId) => {
    setEditReviewId(reviewId);
  };

  const handleEditReview = async (editedReview, editedRating) => {
    try {
      await axios.patch(`/review/crud/${editReviewId}`, {
        review: editedReview,
        rating: editedRating,
      });
      const reviewsData = await axios.get("/review/" + id);
      setReviews(reviewsData.data.data);
      setEditReviewId(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (reviewId) => {
    try {
      await axios.delete("/review/crud/" + id, {
        data: { id: reviewId },
      });
      const reviewsData = await axios.get("/review/" + id);
      setReviews(reviewsData.data.data);
      alert("Review deleted");
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="pDetailBox">
      <div className="h1Box">
        <h1 className="h1">PLAN DETAILS</h1>
        <div className="line"></div>
      </div>
      <div className="planDetailBox">
        <div className="planDetail">
          <div className="loginBox">
            {Object.keys(plan).map((ele, key) => (
              <div className="entryBox" key={key}>
                <div className="entryText">
                  {capitalizeFirstLetter(ele)}
                </div>
                <div className=" input">
                  {capitalizeFirstLetter(plan[ele].toString())}
                </div>
              </div>
            ))}
            <div>
                <button onClick={() => handleEditPlan(id)}>
                    Edit
                </button>
            </div>
          </div>
        </div>
      </div>

      <div className="reviewBox">
        <div className="reviewEnrty">
          <input
            type="text"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
          <select
            name=""
            id=""
            className="select"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
          >
            <option value="5">5 Excellent</option>
            <option value="4">4 Very Good</option>
            <option value="3">3 Good</option>
            <option value="2">2 Poor</option>
            <option value="1">1 Very Poor</option>
          </select>
          <button className="btn" onClick={handleClick}>
            Submit
          </button>
        </div>

        {reviews.map((ele, key) => (
          <div className="reviewsCard" key={key}>
            <div className="pdreviews">
              <div className="pdrdetail">
                <h3>{ele.user.name}</h3>
                <div className="input"> {ele.review}</div>
              </div>
              <div className="rate">
                <label htmlFor="star5" title="text">
                  {ele.rating}
                </label>
              </div>
            </div>

            <div className="rcBtn">
              <button
                className="upBtn"
                onClick={() => handleEdit(ele._id)}
              >
                Edit
              </button>

              <button
                className="showMoreBtn btn"
                onClick={() => handleDelete(ele._id)}
              >
                Delete
              </button>

              {editReviewId === ele._id && (
                <EditReviewDialog
                  isOpen={true}
                  onClose={() => setEditReviewId(null)}
                  onEdit={handleEditReview}
                  initialReview={ele.review}
                  initialRating={ele.rating}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlanDetail;
