import React from "react";
import { Card } from "react-bootstrap";

// src
import LoginForm from "./ui/login-form/container";
import SignUpForm from "./ui/sign-up-form/container";

interface AuthFormProps {}

const AuthForm: React.FC<AuthFormProps> = (props) => {
  const [showSignUpForm, setShowSignUpForm] = React.useState<boolean>(false);
  const toggleShowSignUpForm = () => setShowSignUpForm(!showSignUpForm);
  return (
    <Card className="auth-form">
      {!showSignUpForm ? (
        <LoginForm toggleShowSignUpForm={toggleShowSignUpForm} />
      ) : (
        <SignUpForm toggleShowSignUpForm={toggleShowSignUpForm} />
      )}
    </Card>
  );
};

export default AuthForm;
