/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import * as yup from "yup";
import { Formik, Form, FormikProps } from "formik";
import { Checkbox, FormControl, TextField } from "@material-ui/core";
import { Card, Alert } from "react-bootstrap";

// src
import { usePrevious } from "hooks";
import Button from "components/ui/button";

export interface SignUpFormValues {
  login: string;
  password: string;
  email: string;
  confirmPassword: string;
  rememberMe: boolean;
}

const SignUpFormValidationSchema = yup.object().shape({
  // seems it is not possible to reference own field value without causing recursive error
  // used 'email' field as a clone for the login field so that i can reference that field to obtain the same value for 'login'
  login: yup
    .string()
    .required("Username or Email is required")
    .when("email", (email, schema) => {
      return email && email.includes("@")
        ? // email schema
          schema.email("Email is invalid")
        : // username schema
          schema
            .min(8, "Username is too short")
            .max(42, "Username is too long");
    }),
  password: yup
    .string()
    .required("Required")
    .min(8, "Password too short")
    .max(42, "Password too long"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});

export interface SignUpFormProps {
  isAuthLoading: boolean;
  signUpErr: object | null;
  signUp: (login: string, password: string, rememberMe: boolean) => void;
  toggleShowSignUpForm: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = (props) => {
  const { isAuthLoading, signUp, toggleShowSignUpForm, signUpErr } = props;
  const [showSignUpError, setShowSignUpError] = React.useState<boolean>(false);

  // cdu
  const prevIsAuthLoading = usePrevious(isAuthLoading);
  React.useEffect(() => {
    // failed sign up attempt occured
    if (prevIsAuthLoading && !isAuthLoading && signUpErr) {
      setShowSignUpError(true);
    }
  }, [isAuthLoading]);

  const handleSignUpFormSubmit = async (values: SignUpFormValues) => {
    return signUp(values.login, values.password, values.rememberMe);
  };

  const renderSignUpFormSubmitButtonText = (): JSX.Element | string => {
    // sign up form
    if (isAuthLoading) {
      return (
        <span>
          SIGNING UP <i className="fas fa-spinner fa-spin"></i>
        </span>
      );
    }

    return "SIGN UP";
  };

  // cdu
  React.useEffect(() => {}, [isAuthLoading]);

  return (
    <Card.Body className="card-body">
      <Card.Title className="text-center">SIGN UP</Card.Title>
      <Formik
        initialValues={{
          login: "",
          email: "",
          password: "",
          confirmPassword: "",
          rememberMe: false,
        }}
        validationSchema={SignUpFormValidationSchema}
        onSubmit={(values: SignUpFormValues) => handleSignUpFormSubmit(values)}
        render={(formikBag: FormikProps<SignUpFormValues>) => (
          <Form className="" noValidate>
            {formikBag.submitCount > 0 && showSignUpError && !isAuthLoading && (
              <Alert
                variant="danger"
                onClose={() => setShowSignUpError(false)}
                dismissible
              >
                It appears this Username or Email has already been taken. Do you
                already have an account?
              </Alert>
            )}
            {/* Login */}
            <div className="row align-items-center justify-content-center mb-4">
              <div className="col">
                <TextField
                  className="w-100"
                  id="login"
                  name="login"
                  type="text"
                  label="Username or Email"
                  placeholder="janedoe@gmail.com"
                  value={formikBag.values.login}
                  onChange={(e) => {
                    formikBag.setValues({
                      ...formikBag.values,
                      login: e.target.value,
                      email: e.target.value, // update email manually here
                    });
                  }}
                  onBlur={formikBag.handleBlur}
                  variant="outlined"
                  required
                  error={!!formikBag.touched.login && !!formikBag.errors.login}
                  helperText={
                    formikBag.touched.login && !!formikBag.errors.login
                      ? formikBag.errors.login
                      : null
                  }
                />
              </div>
            </div>

            {/* Password */}
            <div className="row align-items-center justify-content-center mb-4">
              <div className="col">
                <FormControl className="w-100">
                  <TextField
                    id="password"
                    name="password"
                    type="password"
                    label="Password"
                    value={formikBag.values.password}
                    onChange={formikBag.handleChange}
                    onBlur={formikBag.handleBlur}
                    variant="outlined"
                    required
                    error={
                      !!formikBag.touched.password &&
                      !!formikBag.errors.password
                    }
                    helperText={
                      formikBag.touched.password && !!formikBag.errors.password
                        ? formikBag.errors.password
                        : null
                    }
                  />
                </FormControl>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="row align-items-center justify-content-center mb-4">
              <div className="col">
                <FormControl className="w-100">
                  <TextField
                    id="confirmPassword"
                    type="password"
                    label="Confirm Password"
                    value={formikBag.values.confirmPassword}
                    onChange={formikBag.handleChange}
                    onBlur={formikBag.handleBlur}
                    variant="outlined"
                    required
                    error={
                      !!formikBag.touched.confirmPassword &&
                      !!formikBag.errors.confirmPassword
                    }
                    helperText={
                      formikBag.touched.confirmPassword &&
                      !!formikBag.errors.confirmPassword
                        ? formikBag.errors.confirmPassword
                        : null
                    }
                  />
                </FormControl>
              </div>
            </div>

            {/* Checkbox */}
            <div className="row align-items-center justify-content-center mb-4">
              <div className="col">
                <FormControl className="w-100">
                  <label htmlFor="rememberMe">
                    <Checkbox
                      id="rememberMe"
                      color="primary"
                      value={formikBag.values.rememberMe}
                      onChange={formikBag.handleChange}
                      onBlur={formikBag.handleBlur}
                    />
                    Remember Me
                  </label>
                </FormControl>
              </div>
            </div>

            <div className="text-center">
              <Button
                type="submit"
                className="bg-primary text-white"
                color="primary"
                variant="contained"
                size="large"
                disabled={isAuthLoading}
              >
                {renderSignUpFormSubmitButtonText()}
              </Button>
            </div>
          </Form>
        )}
      />

      <span className="form-bottom-text">
        Already have an account?
        <Button onClick={toggleShowSignUpForm}>{"Log In"}</Button>
      </span>
    </Card.Body>
  );
};

export default SignUpForm;
