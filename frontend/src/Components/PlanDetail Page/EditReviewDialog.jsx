import React, { useState } from "react";

const EditReviewDialog = ({ isOpen, onClose, onEdit, initialReview, initialRating }) => {
  const [editedReview, setEditedReview] = useState(initialReview || "");
  const [editedRating, setEditedRating] = useState(initialRating || "5");

  const handleEdit = () => {
    onEdit(editedReview, editedRating);
    onClose();
  };

  return (
    <div className={`edit-review-dialog ${isOpen ? "open" : ""}`}>
      <textarea
        value={editedReview}
        onChange={(e) => setEditedReview(e.target.value)}
        placeholder="Edit your review..."
      />
      <select
        value={editedRating}
        onChange={(e) => setEditedRating(e.target.value)}
      >
        <option value="5">5 Excellent</option>
        <option value="4">4 Very Good</option>
        <option value="3">3 Good</option>
        <option value="2">2 Poor</option>
        <option value="1">1 Very Poor</option>
      </select>
      <button onClick={handleEdit}>Save Changes</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default EditReviewDialog;
