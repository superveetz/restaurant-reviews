import { Action } from "redux";
import { ThunkAction } from "redux-thunk";

// src
import { RootState } from "../";
import {
  restaurantListFetchStart,
  restaurantListFetchFail,
  restaurantListFetchSuccess,
  restaurantDetailsFetchStart,
  restaurantDetailsFetchFail,
  restaurantDetailsFetchSuccess,
} from "./actions";
import * as api from "../../api";

export const fetchRestaurantList = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => async (dispatch) => {
  dispatch(restaurantListFetchStart());

  // call api
  try {
    const { restaurants } = await api.fetchRestaurantList();

    return dispatch(restaurantListFetchSuccess(restaurants));
  } catch (err) {
    return dispatch(restaurantListFetchFail(err));
  }
};

export const fetchRestaurantDetails = (
  restaurantId: string
): ThunkAction<void, RootState, unknown, Action<string>> => async (
  dispatch
) => {
  dispatch(restaurantDetailsFetchStart());

  // call api
  try {
    const { restaurant } = await api.fetchRestaurantDetails(restaurantId);
    console.log("restaurant: ", restaurant);

    return dispatch(restaurantDetailsFetchSuccess(restaurant));
  } catch (err) {
    return dispatch(restaurantDetailsFetchFail(err));
  }
};
