import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";

import authReducer from "./auth/reducer";
import { AuthState } from "./auth/types";
import restaurantReducer from "./restaurants/reducer";
import { RestaurantState } from "./restaurants/types";
import reviewReducer from "./reviews/reducer";
import { ReviewState } from "./reviews/types";

const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : null;

/*
 * Root reducer of the app
 */
// The top-level state object
export interface ApplicationState {
  auth: AuthState;
  restaurants: RestaurantState;
  reviews: ReviewState;
}
export const RootReducer = combineReducers<ApplicationState>({
  auth: authReducer,
  restaurants: restaurantReducer,
  reviews: reviewReducer,
});

const store = createStore(
  RootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export type RootState = ReturnType<typeof RootReducer>;
export default store;
