import {
  AuthActionTypes,
  AuthActions,
  AuthStartAction,
  AuthSuccessAction,
  AuthFailAction,
  AuthSignOutAction,
  AuthFetchActiveSessionSuccessAction,
  AuthState,
  AuthFetchActiveSessionFailAction,
  AuthFetchActiveSessionStartAction,
} from "./types";
import { updateObject } from "../../util";

const initialState: AuthState = {
  user: {
    _id: "",
    username: "",
    email: "",
    accessToken: "",
    role: null,
  },
  error: null,
  loading: false,
  fetchingActiveSession: true,
};

// Sign Up / Log In / Log Out
const authStart = (state: AuthState, action: AuthStartAction) => {
  return updateObject(state, { error: null, loading: true });
};
const authSuccess = (state: AuthState, action: AuthSuccessAction) => {
  return updateObject(state, {
    user: action.user,
    error: null,
    loading: false,
  });
};
const authFail = (state: AuthState, action: AuthFailAction) => {
  return updateObject(state, {
    user: null,
    error: action.error,
    loading: false,
  });
};
const authSignOut = (state: AuthState, action: AuthSignOutAction) => {
  return updateObject(state, {
    user: null,
    error: null,
    loading: false,
  });
};

// Fetch Active Session
const fetchActiveSessionStart = (
  state: AuthState,
  action: AuthFetchActiveSessionStartAction
) => {
  return updateObject(state, { error: null, fetchingActiveSession: true });
};
const fetchActiveSessionSuccess = (
  state: AuthState,
  action: AuthFetchActiveSessionSuccessAction
) => {
  return updateObject(state, {
    user: action.user,
    error: null,
    fetchingActiveSession: false,
  });
};
const fetchActiveSessionFail = (
  state: AuthState,
  action: AuthFetchActiveSessionFailAction
) => {
  return updateObject(state, {
    user: null,
    fetchingActiveSession: false,
  });
};

const reducer = (state = initialState, action: AuthActions) => {
  switch (action.type) {
    case AuthActionTypes.AUTH_START:
      return authStart(state, action);

    case AuthActionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);

    case AuthActionTypes.AUTH_FAIL:
      return authFail(state, action);

    case AuthActionTypes.AUTH_SIGN_OUT:
      return authSignOut(state, action);

    case AuthActionTypes.AUTH_FETCH_ACTIVE_SESSION_START:
      return fetchActiveSessionStart(state, action);

    case AuthActionTypes.AUTH_FETCH_ACTIVE_SESSION_SUCCESS:
      return fetchActiveSessionSuccess(state, action);

    case AuthActionTypes.AUTH_FETCH_ACTIVE_SESSION_FAIL:
      return fetchActiveSessionFail(state, action);

    default:
      return state;
  }
};

export default reducer;
