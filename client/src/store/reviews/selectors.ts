import { createSelector } from "reselect";
import { RootState } from "store";

// Restaurant List
export const createReviewLoadingSelector = (state: RootState) =>
  state.reviews.createReview.loading;
export const createReviewErrorSelector = (state: RootState) =>
  state.reviews.createReview.error;
export const createReviewDataSelector = (state: RootState) =>
  state.reviews.createReview.data;
