import { createSelector } from "reselect";
import { RootState } from "store";

// Restaurant List
export const restaurantListLoadingSelector = (state: RootState) =>
  state.restaurants.restaurantList.loading;
export const restaurantListErrorSelector = (state: RootState) =>
  state.restaurants.restaurantList.error;
export const restaurantListDataSelector = (state: RootState) =>
  state.restaurants.restaurantList.data;
// Restaurnt Details
export const restaurantDetailsLoadingSelector = (state: RootState) =>
  state.restaurants.restaurantDetails.loading;
export const restaurantDetailsErrorSelector = (state: RootState) =>
  state.restaurants.restaurantDetails.error;
export const restaurantDetailsDataSelector = (state: RootState) =>
  state.restaurants.restaurantDetails.data;
export const restaurantDetailsRecentReviewsSelector = (state: RootState) =>
  state.restaurants.restaurantDetails.recentReviews;
export const restaurantDetailsDataNameSelector = (state: RootState) =>
  restaurantDetailsDataSelector(state)?.name;
