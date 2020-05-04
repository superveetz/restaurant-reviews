import { connect, ConnectedProps } from "react-redux";
import { Dispatch, Action } from "redux";

// src
import FourZeroFourPage, { FourZeroFourPageProps } from "./";
import { RootState } from "store";
import { User } from "store/auth/types";

type OwnProps = {};

type StateProps = {};

type DispatchProps = {};

const mapStateToProps = (
  state: RootState,
  ownProps: OwnProps
): StateProps => ({});

const mapDispatchToProps = (dispatch: Dispatch<Action>): DispatchProps => {
  return {};
};

const mergeProps = (
  stateProps: StateProps,
  dispatchProps: DispatchProps,
  ownProps: OwnProps
): FourZeroFourPageProps => {
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
)(FourZeroFourPage);
