import { connect, ConnectedProps } from "react-redux";
import { Dispatch, Action } from "redux";

// src
import * as authSelectors from "store/auth/selectors";
import Routing, { RoutingProps } from "./";
import { RootState } from "store";
import { User } from "store/auth/types";

type OwnProps = {};

type StateProps = {
  user: User;
};

type DispatchProps = {};

const mapStateToProps = (state: RootState, ownProps: OwnProps): StateProps => ({
  user: authSelectors.authUserSelector(state),
});

const mapDispatchToProps = (dispatch: Dispatch<Action>): DispatchProps => {
  return {};
};

const mergeProps = (
  stateProps: StateProps,
  dispatchProps: DispatchProps,
  ownProps: OwnProps
): RoutingProps => {
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
)(Routing);
