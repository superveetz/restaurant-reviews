import _ from "lodash";
import moment from "moment";

// src
import * as types from "./types";
import { updateObject } from "../../util";
import { ReviewModel } from "models/Review";

const initialState: types.RestaurantState = {
  restaurantList: {
    data: [],
    error: null,
    loading: false,
  },
  restaurantDetails: {
    data: null,
    error: null,
    loading: false,
    recentReviews: [],
  },
};

// Fetch Restaurant List
const restaurantListStart = (state: types.RestaurantState) => {
  return updateObject(state, {
    restaurantList: { error: null, loading: true, data: [] },
  });
};
const restaurantListSuccess = (
  state: types.RestaurantState,
  action: types.RestaurantListFetchSuccessAction
) => {
  return updateObject(state, {
    restaurantList: {
      error: null,
      loading: false,
      data: action.restaurantList,
    },
  });
};
const restaurantListFail = (
  state: types.RestaurantState,
  action: types.RestaurantListFetchFailAction
) => {
  return updateObject(state, {
    restaurantList: { error: action.error, loading: false, data: [] },
  });
};

// Fetch Restaurant Details
const restaurantDetailsStart = (state: types.RestaurantState) => {
  return updateObject(state, {
    restaurantDetails: { error: null, loading: true, data: [] },
  });
};
const restaurantDetailsSuccess = (
  state: types.RestaurantState,
  action: types.RestaurantDetailsFetchSuccessAction
) => {
  const { reviews } = action.restaurant;

  const sortedReviews = _.orderBy(
    reviews,
    (o: ReviewModel) => {
      return moment(o.createdOn);
    },
    ["desc"]
  );

  const recentReviews = sortedReviews.slice(0, 5);

  return updateObject(state, {
    restaurantDetails: {
      error: null,
      loading: false,
      data: action.restaurant,
      recentReviews: recentReviews,
    },
  });
};
const restaurantDetailsFail = (
  state: types.RestaurantState,
  action: types.RestaurantDetailsFetchFailAction
) => {
  return updateObject(state, {
    restaurantDetails: { error: action.error, loading: false, data: [] },
  });
};

const reducer = (state = initialState, action: types.RestaurantActions) => {
  switch (action.type) {
    case types.RestaurantActionTypes.RESTAURANT_LIST_FETCH_START:
      return restaurantListStart(state);

    case types.RestaurantActionTypes.RESTAURANT_LIST_FETCH_SUCCESS:
      return restaurantListSuccess(state, action);

    case types.RestaurantActionTypes.RESTAURANT_LIST_FETCH_FAIL:
      return restaurantListFail(state, action);

    case types.RestaurantActionTypes.RESTAURANT_DETAILS_FETCH_START:
      return restaurantDetailsStart(state);

    case types.RestaurantActionTypes.RESTAURANT_DETAILS_FETCH_SUCCESS:
      return restaurantDetailsSuccess(state, action);

    case types.RestaurantActionTypes.RESTAURANT_DETAILS_FETCH_FAIL:
      return restaurantDetailsFail(state, action);

    default:
      return state;
  }
};

export default reducer;
