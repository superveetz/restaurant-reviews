import { Action } from "redux";
import { ThunkAction } from "redux-thunk";

// src
import { RootState } from "../";
import {
  authStart,
  authFail,
  authSuccess,
  fetchActiveSessionStart,
  fetchActiveSessionSuccess,
  fetchActiveSessionFail,
} from "./actions";
import * as api from "../../api";

export const authenticateIfActiveSession = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => async (dispatch) => {
  // const asyncResp = await exampleAPI()
  dispatch(fetchActiveSessionStart());

  // check if userId exists in local storage
  const userId = localStorage.getItem("userId");

  // if no userId, then authFail
  if (!userId || !userId.length) {
    return dispatch(
      fetchActiveSessionFail({ error: { message: "No Active Session" } })
    );
  }

  // call api to authenticate
  try {
    const { user } = await api.refreshAccessToken(userId);
    return dispatch(fetchActiveSessionSuccess(user));
  } catch (err) {
    return dispatch(fetchActiveSessionFail(err));
  }
};

export const signUp = (
  login: string,
  password: string,
  rememberMe: boolean
): ThunkAction<void, RootState, unknown, Action<string>> => async (
  dispatch
) => {
  // const asyncResp = await exampleAPI()
  dispatch(authStart());

  try {
    // call api to authenticate
    console.log("login: ", login);
    console.log("password: ", password);

    const { user } = await api.signUp(login, password);

    // if rememberMe was set, store userId in localstorage, ideally, this should be encrypted
    if (rememberMe) {
      localStorage.setItem("userId", user._id);
    } else {
      localStorage.setItem("userId", "");
    }

    return dispatch(authSuccess(user));
  } catch (err) {
    console.log("err: ", err);

    return dispatch(authFail(err));
  }
};

export const login = (
  login: string,
  password: string,
  rememberMe: boolean
): ThunkAction<void, RootState, unknown, Action<string>> => async (
  dispatch
) => {
  dispatch(authStart());

  try {
    // call api to authenticate
    const { user } = await api.login(login, password);

    if (rememberMe) {
      localStorage.setItem("userId", user._id);
    } else {
      localStorage.setItem("userId", "");
    }
    return dispatch(authSuccess(user));
  } catch (err) {
    return dispatch(authFail(err));
  }
};
