import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { ReviewModel } from "models/Review";

// src
import { RootState } from "../";
import {
  reviewCreateStart,
  reviewCreateFail,
  reviewCreateSuccess,
} from "./actions";
import * as api from "../../api";

export const createRestaurantReview = (
  restaurantReview: ReviewModel
): ThunkAction<void, RootState, unknown, Action<string>> => async (
  dispatch
) => {
  dispatch(reviewCreateStart());

  // call api
  try {
    const { review } = await api.createRestaurantReview(restaurantReview);

    return dispatch(reviewCreateSuccess(review));
  } catch (err) {
    return dispatch(reviewCreateFail(err));
  }
};
