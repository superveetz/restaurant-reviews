import { connect } from "react-redux";
import { Dispatch, Action } from "redux";

// src
import * as authThunks from "store/auth/thunks";
import * as authSelectors from "store/auth/selectors";
import LoginForm, { LoginFormProps } from ".";
import { RootState } from "store";

type OwnProps = {
  toggleShowSignUpForm: () => void;
};

type StateProps = {
  isAuthLoading: boolean;
  loginError: object | null;
};

type DispatchProps = {
  login: (login: string, password: string, rememberMe: boolean) => void;
};

const mapStateToProps = (state: RootState): StateProps => ({
  isAuthLoading: authSelectors.authLoadingSelector(state),
  loginError: authSelectors.authErrorSelector(state),
});

const mapDispatchToProps = (dispatch: Dispatch<Action>): DispatchProps => {
  return {
    login: (login: string, password: string, rememberMe: boolean) =>
      dispatch<any>(authThunks.login(login, password, rememberMe)),
  };
};

const mergeProps = (
  stateProps: StateProps,
  dispatchProps: DispatchProps,
  ownProps: OwnProps
): LoginFormProps => {
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
)(LoginForm);
