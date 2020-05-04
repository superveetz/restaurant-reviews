import { connect } from "react-redux";
import { Dispatch, Action } from "redux";

// src
import * as authSelectors from "store/auth/selectors";
import AuthPage, { AuthPageProps } from "./";
import { RootState } from "store";
import { UserModel } from "models/User";

type OwnProps = {};

type StateProps = {
  isAuthLoading: boolean;
  currentUser: UserModel;
};

type DispatchProps = {};

const mapStateToProps = (state: RootState, ownProps: OwnProps): StateProps => ({
  isAuthLoading: authSelectors.authLoadingSelector(state),
  currentUser: authSelectors.authUserSelector(state),
});

const mapDispatchToProps = (dispatch: Dispatch<Action>): DispatchProps => {
  return {};
};

const mergeProps = (
  stateProps: StateProps,
  dispatchProps: DispatchProps,
  ownProps: OwnProps
): AuthPageProps => {
  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(AuthPage);
