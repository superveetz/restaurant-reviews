import { UserModel } from "models/User";
import {
  AuthActionTypes,
  AuthActions,
  AuthFetchActiveSessionSuccessAction,
  AuthFetchActiveSessionFailAction,
  AuthFetchActiveSessionStartAction,
} from "./types";

// Sign Up / Log In / Sign Out
export const authStart = (): AuthActions => {
  return { type: AuthActionTypes.AUTH_START };
};
export const authSuccess = (user: UserModel): AuthActions => {
  return { type: AuthActionTypes.AUTH_SUCCESS, user: user };
};

export const authFail = (error: object): AuthActions => {
  return { type: AuthActionTypes.AUTH_FAIL, error: error };
};

export const authSignOut = (): AuthActions => {
  return { type: AuthActionTypes.AUTH_SIGN_OUT };
};

// Fetch Active Session
export const fetchActiveSessionStart = (): AuthFetchActiveSessionStartAction => {
  return { type: AuthActionTypes.AUTH_FETCH_ACTIVE_SESSION_START };
};
export const fetchActiveSessionSuccess = (
  user: UserModel
): AuthFetchActiveSessionSuccessAction => {
  return {
    type: AuthActionTypes.AUTH_FETCH_ACTIVE_SESSION_SUCCESS,
    user: user,
  };
};
export const fetchActiveSessionFail = (
  error: object
): AuthFetchActiveSessionFailAction => {
  return { type: AuthActionTypes.AUTH_FETCH_ACTIVE_SESSION_FAIL };
};
