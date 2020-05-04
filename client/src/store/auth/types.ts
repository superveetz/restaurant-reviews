import { UserModel } from "models/User";

export interface AuthState {
  user: UserModel;
  loading: boolean;
  error: object | null;
  fetchingActiveSession: boolean;
}

export enum AuthActionTypes {
  AUTH_START = "AUTH_START",
  AUTH_SUCCESS = "AUTH_SUCCESS",
  AUTH_FAIL = "AUTH_FAIL",
  AUTH_SIGN_OUT = "AUTH_SIGN_OUT",
  AUTH_FETCH_ACTIVE_SESSION_START = "AUTH_FETCH_ACTIVE_SESSION_START",
  AUTH_FETCH_ACTIVE_SESSION_SUCCESS = "AUTH_FETCH_ACTIVE_SESSION_SUCCESS",
  AUTH_FETCH_ACTIVE_SESSION_FAIL = "AUTH_FETCH_ACTIVE_SESSION_FAIL",
}

// Sign Up / Log In / Log Out
export interface AuthStartAction {
  type: typeof AuthActionTypes.AUTH_START;
}
export interface AuthSuccessAction {
  type: typeof AuthActionTypes.AUTH_SUCCESS;
  user: UserModel;
}
export interface AuthFailAction {
  type: typeof AuthActionTypes.AUTH_FAIL;
  error: object;
}
export interface AuthSignOutAction {
  type: typeof AuthActionTypes.AUTH_SIGN_OUT;
}

// Fetch Active Session
export interface AuthFetchActiveSessionStartAction {
  type: typeof AuthActionTypes.AUTH_FETCH_ACTIVE_SESSION_START;
}
export interface AuthFetchActiveSessionSuccessAction {
  type: typeof AuthActionTypes.AUTH_FETCH_ACTIVE_SESSION_SUCCESS;
  user: UserModel;
}
export interface AuthFetchActiveSessionFailAction {
  type: typeof AuthActionTypes.AUTH_FETCH_ACTIVE_SESSION_FAIL;
}

export type AuthActions =
  | AuthStartAction
  | AuthSuccessAction
  | AuthFailAction
  | AuthSignOutAction
  | AuthFetchActiveSessionStartAction
  | AuthFetchActiveSessionSuccessAction
  | AuthFetchActiveSessionFailAction;
