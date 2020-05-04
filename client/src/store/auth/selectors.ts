import { createSelector } from "reselect";
import { RootState } from "store";

export const authLoadingSelector = (state: RootState) => state.auth.loading;
export const authErrorSelector = (state: RootState) => state.auth.error;
export const authUserSelector = (state: RootState) => state.auth.user;
export const authFetchingActiveSession = (state: RootState) =>
  state.auth.fetchingActiveSession;
