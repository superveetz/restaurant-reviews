import { connect } from "react-redux";
import { Dispatch, Action } from "redux";

// src
import App, { AppProps } from "./app";
import * as authSelectors from "store/auth/selectors";
import { RootState } from "../store";

type OwnProps = {};

type StateProps = {
  isFetchingActiveSession: boolean;
};

type DispatchProps = {};

const mapStateToProps = (state: RootState, ownProps: OwnProps): StateProps => ({
  isFetchingActiveSession: authSelectors.authFetchingActiveSession(state),
});

const mapDispatchToProps = (dispatch: Dispatch<Action>): DispatchProps => ({});

const mergeProps = (
  stateProps: StateProps,
  dispatchProps: DispatchProps,
  ownProps: OwnProps
): AppProps => {
  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
  };
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(App);
