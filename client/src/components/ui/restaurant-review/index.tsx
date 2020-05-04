import React from "react";
import moment from "moment";

// src
import StarRating from "components/ui/star-rating";
import { ReviewModel } from "models/Review";

interface RestaurantReviewProps {
  review: ReviewModel;
}

const RestaurantReview: React.FC<RestaurantReviewProps> = (props) => {
  const { review } = props;

  return (
    <div className="RestaurantReview">
      <div className="row">
        <div className="review-creator">
          <img
            src="/assets/img/default-user-avatar.jpg"
            alt="Default User Avatar"
          />
          {review.authorId && review.authorId.username}
        </div>
      </div>

      <div className="review-meta">
        <StarRating rating={review.starRating} size="sm" /> <b>Review Title</b>
        <div className="review-meta-date">
          Created On: {moment(review.createdOn).format("MMM DD, YYYY")}
        </div>
        <p>{review.comment}</p>
      </div>
    </div>
  );
};

export default RestaurantReview;
