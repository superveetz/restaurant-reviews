import { connect } from "react-redux";
import { Dispatch, Action } from "redux";

// src
import HomePage, { HomePageProps } from "./";
import * as restaurantThunks from "store/restaurants/thunks";
import * as restaurantSelectors from "store/restaurants/selectors";
import { RootState } from "store";
import { RestaurantModel } from "models/Restaurant";

type OwnProps = {};

type StateProps = {
  restaurantList: RestaurantModel[];
  restauntListLoading: boolean;
};

type DispatchProps = {
  fetchRestaurantList: () => void;
};

const mapStateToProps = (state: RootState): StateProps => ({
  restaurantList: restaurantSelectors.restaurantListDataSelector(state),
  restauntListLoading: restaurantSelectors.restaurantListLoadingSelector(state),
});

const mapDispatchToProps = (dispatch: Dispatch<Action>): DispatchProps => {
  return {
    fetchRestaurantList: () =>
      dispatch<any>(restaurantThunks.fetchRestaurantList()),
  };
};

const mergeProps = (
  stateProps: StateProps,
  dispatchProps: DispatchProps,
  ownProps: OwnProps
): HomePageProps => {
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
)(HomePage);
