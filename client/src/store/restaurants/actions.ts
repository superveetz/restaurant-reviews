import { RestaurantActionTypes, RestaurantActions } from "./types";
import { RestaurantModel } from "models/Restaurant";

// Fetch Restaurant List
export const restaurantListFetchStart = (): RestaurantActions => {
  return { type: RestaurantActionTypes.RESTAURANT_LIST_FETCH_START };
};
export const restaurantListFetchSuccess = (
  restaurantList: RestaurantModel[]
): RestaurantActions => {
  return {
    type: RestaurantActionTypes.RESTAURANT_LIST_FETCH_SUCCESS,
    restaurantList,
  };
};
export const restaurantListFetchFail = (error: object): RestaurantActions => {
  return {
    type: RestaurantActionTypes.RESTAURANT_LIST_FETCH_FAIL,
    error,
  };
};

// Fetch Restaurant Details
export const restaurantDetailsFetchStart = (): RestaurantActions => {
  return { type: RestaurantActionTypes.RESTAURANT_DETAILS_FETCH_START };
};
export const restaurantDetailsFetchSuccess = (
  restaurant: RestaurantModel
): RestaurantActions => {
  return {
    type: RestaurantActionTypes.RESTAURANT_DETAILS_FETCH_SUCCESS,
    restaurant,
  };
};
export const restaurantDetailsFetchFail = (
  error: object
): RestaurantActions => {
  return {
    type: RestaurantActionTypes.RESTAURANT_DETAILS_FETCH_FAIL,
    error,
  };
};
