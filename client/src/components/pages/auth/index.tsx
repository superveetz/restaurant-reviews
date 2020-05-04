/** @jsx jsx */
import React from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";

// src
import { usePrevious, useQuery } from "hooks";
import AuthForm from "components/ui/forms/auth";
import { UserModel, UserRoleType } from "models/User";

const AuthPageWrapper = styled.div`
  & .auth-form {
    max-width: 420px;
    margin: 0 auto;
  }
`;

export interface AuthPageProps {
  isAuthLoading: boolean;
  currentUser: UserModel;
}

const AuthPage: React.FC<AuthPageProps> = (props) => {
  const { isAuthLoading, currentUser } = props;
  const history = useHistory();
  const queryParams = useQuery();

  // cdu
  const prevIsAuthLoading = usePrevious(isAuthLoading);
  React.useEffect(() => {
    // redirect on successful authentication
    if (prevIsAuthLoading && !isAuthLoading && currentUser) {
      // priotize redirect params
      const redirectAfterAuth = queryParams.get("redirectAfterAuth");
      // todo, find cleaner way to serialize dynamic query params
      const openCreateReviewModal = queryParams.get("openCreateReviewModal");

      if (redirectAfterAuth) {
        return history.push(
          `${redirectAfterAuth}?openCreateReviewModal=${
            openCreateReviewModal || 0
          }`
        );
      }

      // default redirect behaviour
      const { role } = currentUser;
      switch (role) {
        case UserRoleType.restaurantOwner:
          return history.push("/owners");
        default:
          return history.push("/");
      }
    }
  }, [isAuthLoading]);

  return (
    <AuthPageWrapper className="AuthPage">
      <div className="container pt-4">
        <AuthForm />
      </div>
    </AuthPageWrapper>
  );
};

export default AuthPage;
