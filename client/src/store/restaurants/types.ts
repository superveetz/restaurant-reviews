import { RestaurantModel } from "models/Restaurant";
import { ReviewModel } from "models/Review";

export interface RestaurantState {
  restaurantList: {
    data: RestaurantModel[];
    error: object | null;
    loading: boolean;
  };
  restaurantDetails: {
    data: RestaurantModel | null;
    error: object | null;
    loading: boolean;
    recentReviews: ReviewModel[];
  };
}

export enum RestaurantActionTypes {
  RESTAURANT_LIST_FETCH_START = "RESTAURANT_LIST_FETCH_START",
  RESTAURANT_LIST_FETCH_SUCCESS = "RESTAURANT_LIST_FETCH_SUCCESS",
  RESTAURANT_LIST_FETCH_FAIL = "RESTAURANT_LIST_FETCH_FAIL",
  RESTAURANT_DETAILS_FETCH_START = "RESTAURANT_DETAILS_FETCH_START",
  RESTAURANT_DETAILS_FETCH_SUCCESS = "RESTAURANT_DETAILS_FETCH_SUCCESS",
  RESTAURANT_DETAILS_FETCH_FAIL = "RESTAURANT_DETAILS_FETCH_FAIL",
}

// Fetch Restaurant List
export interface RestaurantListFetchStartAction {
  type: typeof RestaurantActionTypes.RESTAURANT_LIST_FETCH_START;
}
export interface RestaurantListFetchSuccessAction {
  type: typeof RestaurantActionTypes.RESTAURANT_LIST_FETCH_SUCCESS;
  restaurantList: RestaurantModel[];
}
export interface RestaurantListFetchFailAction {
  type: typeof RestaurantActionTypes.RESTAURANT_LIST_FETCH_FAIL;
  error: object;
}

// Fetch Restaurant Details
export interface RestaurantDetailsFetchStartAction {
  type: typeof RestaurantActionTypes.RESTAURANT_DETAILS_FETCH_START;
}
export interface RestaurantDetailsFetchSuccessAction {
  type: typeof RestaurantActionTypes.RESTAURANT_DETAILS_FETCH_SUCCESS;
  restaurant: RestaurantModel;
}
export interface RestaurantDetailsFetchFailAction {
  type: typeof RestaurantActionTypes.RESTAURANT_DETAILS_FETCH_FAIL;
  error: object;
}

export type RestaurantActions =
  | RestaurantListFetchStartAction
  | RestaurantListFetchSuccessAction
  | RestaurantListFetchFailAction
  | RestaurantDetailsFetchStartAction
  | RestaurantDetailsFetchSuccessAction
  | RestaurantDetailsFetchFailAction;
