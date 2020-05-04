import { connect } from "react-redux";
import { Dispatch, Action } from "redux";

// src
import * as authThunks from "store/auth/thunks";
import * as authSelectors from "store/auth/selectors";
import SignUpForm, { SignUpFormProps } from ".";
import { RootState } from "store";

type OwnProps = {
  toggleShowSignUpForm: () => void;
};

type StateProps = {
  isAuthLoading: boolean;
  signUpErr: object | null;
};

type DispatchProps = {
  signUp: (login: string, password: string, rememberMe: boolean) => void;
};

const mapStateToProps = (state: RootState, ownProps: OwnProps): StateProps => ({
  isAuthLoading: authSelectors.authLoadingSelector(state),
  signUpErr: authSelectors.authErrorSelector(state),
});

const mapDispatchToProps = (dispatch: Dispatch<Action>): DispatchProps => {
  return {
    signUp: (login: string, password: string, rememberMe: boolean) =>
      dispatch<any>(authThunks.signUp(login, password, rememberMe)),
  };
};

const mergeProps = (
  stateProps: StateProps,
  dispatchProps: DispatchProps,
  ownProps: OwnProps
): SignUpFormProps => {
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
)(SignUpForm);
