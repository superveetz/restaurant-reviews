import _ from "lodash";
import moment from "moment";

// src
import * as types from "./types";
import { updateObject } from "../../util";
import { ReviewModel } from "models/Review";

const initialState: types.ReviewState = {
  createReview: {
    data: null,
    error: null,
    loading: false,
  },
};

// Fetch Restaurant List
const restaurantListStart = (state: types.ReviewState) => {
  return updateObject(state, {
    restaurantList: { error: null, loading: true, data: [] },
  });
};
const restaurantListSuccess = (
  state: types.ReviewState,
  action: types.ReviewCreateSuccessAction
) => {
  return updateObject(state, {
    createReview: {
      error: null,
      loading: false,
      data: action.review,
    },
  });
};
const restaurantListFail = (
  state: types.ReviewState,
  action: types.ReviewCreateFailAction
) => {
  return updateObject(state, {
    restaurantList: { error: action.error, loading: false, data: [] },
  });
};

const reducer = (state = initialState, action: types.ReviewActions) => {
  switch (action.type) {
    case types.ReviewActionTypes.REVIEW_CREATE_START:
      return restaurantListStart(state);

    case types.ReviewActionTypes.REVIEW_CREATE_SUCCESS:
      return restaurantListSuccess(state, action);

    case types.ReviewActionTypes.REVIEW_CREATE_FAIL:
      return restaurantListFail(state, action);

    default:
      return state;
  }
};

export default reducer;
