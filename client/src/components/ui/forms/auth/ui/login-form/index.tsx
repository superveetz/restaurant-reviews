/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import * as yup from "yup";
import { Formik, Form, FormikProps } from "formik";
import { Checkbox, FormControl, TextField } from "@material-ui/core";
import { Card, Alert } from "react-bootstrap";

// src
import Button from "components/ui/button";
import { usePrevious } from "hooks";

export interface LoginFormValues {
  login: string;
  email: string;
  password: string;
  rememberMe: boolean;
}

const LoginFormValidationSchema = yup.object().shape({
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
  password: yup.string().required("Required"),
});

export interface LoginFormProps {
  isAuthLoading: boolean;
  loginError: object | null;
  toggleShowSignUpForm: () => void;
  login: (login: string, password: string, rememberMe: boolean) => void;
}

const LoginForm: React.FC<LoginFormProps> = (props) => {
  const { isAuthLoading, toggleShowSignUpForm, login, loginError } = props;
  const [showLoginError, setShowLoginError] = React.useState<boolean>(false);

  const handleAuthFormSubmit = async (values: LoginFormValues) => {
    return login(values.login, values.password, values.rememberMe);
  };

  const renderLoginFormSubmitButtonText = (): JSX.Element | string => {
    // login form
    if (isAuthLoading) {
      return (
        <span>
          LOGGING IN <i className="fas fa-spinner fa-spin"></i>
        </span>
      );
    }
    return "LOG IN";
  };

  // cdu
  const prevAuthLoading = usePrevious(isAuthLoading);
  React.useEffect(() => {
    if (prevAuthLoading !== isAuthLoading && loginError) {
      setShowLoginError(true);
    }
  }, [isAuthLoading]);

  return (
    <Card.Body className="card-body">
      <Card.Title className="text-center">LOG IN</Card.Title>

      <Formik
        initialValues={{
          login: "",
          email: "",
          password: "",
          rememberMe: false,
        }}
        validationSchema={LoginFormValidationSchema}
        onSubmit={(values: LoginFormValues) => handleAuthFormSubmit(values)}
        render={(formikBag: FormikProps<LoginFormValues>) => (
          <Form className="" noValidate>
            {formikBag.submitCount > 0 && showLoginError && !isAuthLoading && (
              <Alert
                variant="danger"
                onClose={() => setShowLoginError(false)}
                dismissible
              >
                Invalid Login Credentials
              </Alert>
            )}
            {/* Login */}
            <div className="row align-items-center justify-content-center mb-4">
              <div className="col">
                <TextField
                  autoComplete={"off"}
                  autoFocus={true}
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
                    autoComplete={"off"}
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

            {/* Checkbox */}
            <div className="row align-items-center justify-content-center mb-4">
              <div className="col">
                <FormControl className="w-100">
                  <label
                    htmlFor="rememberMe"
                    className="cursor-pointer text-unselectable"
                  >
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
                {renderLoginFormSubmitButtonText()}
              </Button>
            </div>
          </Form>
        )}
      />

      <span className="form-bottom-text">
        Don't have an account?
        <Button onClick={toggleShowSignUpForm}>Sign Up</Button>
      </span>
    </Card.Body>
  );
};

export default LoginForm;
