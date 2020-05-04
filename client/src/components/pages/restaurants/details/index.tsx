import React from "react";
import { useParams, useHistory } from "react-router-dom";
// src
import CreateReviewModal from "components/ui/modals/create-review";
import { ReviewModel } from "models/Review";
import * as api from "api";
import { RestaurantModel } from "models/Restaurant";
import Spinner from "components/ui/spinner";
import StarRating from "components/ui/star-rating";
import RestaurantReview from "components/ui/restaurant-review";
import Button from "components/ui/button";
import { UserModel } from "models/User";

export interface RestaurantDetailsViewProps {
  restaurantDetails: RestaurantModel | null;
  isLoadingRestaurantDetails: boolean;
  recentReviews: ReviewModel[];
  isCreatingReview: boolean;
  currentUser: UserModel;
  fetchRestaurantDetails: (restaurantId: string) => void;
  createReview: (review: ReviewModel) => void;
}

const RestaurantDetailsView: React.FC<RestaurantDetailsViewProps> = (props) => {
  const {
    fetchRestaurantDetails,
    restaurantDetails,
    isLoadingRestaurantDetails,
    recentReviews,
    isCreatingReview,
    createReview,
    currentUser,
  } = props;

  const [showCreateReviewModal, setShowCreateReviewModal] = React.useState<
    boolean
  >(false);
  const closeCreateReviewModal = () => setShowCreateReviewModal(false);
  const openCreateReviewModal = () => setShowCreateReviewModal(true);

  const params = useParams<{ restaurantId: string }>();
  const { restaurantId } = params;
  const history = useHistory();

  const handleClickWriteReview = async () => {
    try {
      // if user is not logged in, redirect to /auth
      const { isAuthenticated } = await api.isCurrentUserAuthenticated();
      console.log("isAuthenticated: ", isAuthenticated);
    } catch (err) {
      const encodedRedirect = encodeURIComponent(history.location.pathname);
      return history.push(
        `/auth?redirectAfterAuth=${encodedRedirect}&openCreateReviewModal=1`
      );
    }

    // open create review modal
    openCreateReviewModal();
  };

  const renderRecentReviews = (): JSX.Element[] | JSX.Element => {
    if (!recentReviews.length) {
      return <div>No Reviews</div>;
    }

    return recentReviews.map((review, idx) => {
      return <RestaurantReview key={idx} review={review} />;
    });
  };

  // cdm
  React.useEffect(() => {
    fetchRestaurantDetails(restaurantId);
  }, []);

  if (isLoadingRestaurantDetails || restaurantDetails === null) {
    return <Spinner />;
  }

  return (
    <div className="RestaurantDetailsView container">
      <h2>{restaurantDetails.name}</h2>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s.
      </p>
      <div className="row">
        <div className="col">
          <h3 className="star-rating-header">
            <strong>Average Rating</strong>
          </h3>
          <StarRating rating={2.5} /> <span>47 Reviews</span>
        </div>
        <div className="col">
          <h3 className="star-rating-header">
            <strong>Highest Rating</strong>
          </h3>
          <StarRating rating={4} /> <span>2 Reviews</span>
        </div>
        <div className="col">
          <h3 className="star-rating-header">
            <strong>Lowest Rating</strong>
          </h3>
          <StarRating rating={2} /> <span>4 Reviews</span>
        </div>
      </div>

      <div>
        <h2>Recent Reviews</h2>

        {renderRecentReviews()}

        <div className="review-bottom">
          <Button onClick={handleClickWriteReview}>
            Write a review <i className="fas fa-chevron-right"></i>
          </Button>

          <CreateReviewModal
            currentUserId={currentUser._id}
            restaurantId={restaurantDetails._id}
            isCreatingReview={isCreatingReview}
            afterFormSubmit={createReview}
            restaurantName={restaurantDetails.name}
            showModal={showCreateReviewModal}
            handleCloseModal={closeCreateReviewModal}
          />
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetailsView;
