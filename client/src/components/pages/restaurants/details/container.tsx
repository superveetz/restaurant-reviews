import { connect } from "react-redux";
import { Dispatch, Action } from "redux";

// src
import RestaurantDetailsView, { RestaurantDetailsViewProps } from "./";
import * as restaurantSelectors from "store/restaurants/selectors";
import * as restaurantThunks from "store/restaurants/thunks";
import * as reviewSelectors from "store/reviews/selectors";
import * as reviewThunks from "store/reviews/thunks";
import * as authSelectors from "store/auth/selectors";
import { RootState } from "store";
import { RestaurantModel } from "models/Restaurant";
import { ReviewModel } from "models/Review";
import { UserModel } from "models/User";

type OwnProps = {};

type StateProps = {
  restaurantDetails: RestaurantModel | null;
  isLoadingRestaurantDetails: boolean;
  recentReviews: ReviewModel[];
  isCreatingReview: boolean;
  currentUser: UserModel;
};

type DispatchProps = {
  fetchRestaurantDetails: (restaurantId: string) => void;
  createReview: (review: ReviewModel) => void;
};

const mapStateToProps = (state: RootState, ownProps: OwnProps): StateProps => ({
  restaurantDetails: restaurantSelectors.restaurantDetailsDataSelector(state),
  isLoadingRestaurantDetails: restaurantSelectors.restaurantDetailsLoadingSelector(
    state
  ),
  recentReviews: restaurantSelectors.restaurantDetailsRecentReviewsSelector(
    state
  ),
  isCreatingReview: reviewSelectors.createReviewLoadingSelector(state),
  currentUser: authSelectors.authUserSelector(state),
});

const mapDispatchToProps = (dispatch: Dispatch<Action>): DispatchProps => ({
  fetchRestaurantDetails: (restauarntId) =>
    dispatch<any>(restaurantThunks.fetchRestaurantDetails(restauarntId)),
  createReview: (review: ReviewModel) =>
    dispatch<any>(reviewThunks.createRestaurantReview(review)),
});

const mergeProps = (
  stateProps: StateProps,
  dispatchProps: DispatchProps,
  ownProps: OwnProps
): RestaurantDetailsViewProps => {
  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(RestaurantDetailsView);
