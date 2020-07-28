import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Typography, Button, Grid, Icon } from "@material-ui/core";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";
import { signUpUser } from "../actions";
import { TextField } from "formik-material-ui";

class SignUp extends React.Component {
  initialValues = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  rendereContent = () => {
    const { history } = this.props;
    return (
      <Fragment>
        <ToastContainer></ToastContainer>
        <Grid
          container
          direction="column"
          spacing={2}
          alignItems="center"
          justify="center"
        >
          <Grid item xs={12}>
            <Typography variant="h2">Sign Up</Typography>
          </Grid>
          <Grid item md={6} xs={6}>
            <Formik
              initialValues={this.initialValues}
              validationSchema={this.validationSchema}
              onSubmit={(values, { setSubmitting }) => {
                // same shape as initial values
                const data = {
                  firstName: values.firstName,
                  lastName: values.lastName,
                  username: values.username,
                  email: values.email,
                  password: values.password,
                  avatar: `http://gravatar.com/avatar/${moment().unix()}?d=identicon`,
                };

                console.log("data before submitting", data);
                console.log("before sending to signUpUser");
                this.props.signUpUser(data, history);
                setSubmitting(false);

                // check if registered successfull....
                toast.success("Successful");
              }}
            >
              <Form autoComplete="off">
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Field
                      name="firstName"
                      label="First Name*"
                      variant="outlined"
                      fullWidth
                      autoFocus
                      component={TextField}
                    ></Field>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      name="lastName"
                      label="Last Name*"
                      variant="outlined"
                      fullWidth
                      component={TextField}
                    ></Field>
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      name="username"
                      label="Username*"
                      variant="outlined"
                      fullWidth
                      component={TextField}
                    ></Field>
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      name="email"
                      label="Email*"
                      variant="outlined"
                      fullWidth
                      component={TextField}
                    ></Field>
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      name="password"
                      label="Password*"
                      variant="outlined"
                      fullWidth
                      component={TextField}
                    ></Field>
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      name="confirmPassword"
                      label="Confirm Password*"
                      variant="outlined"
                      fullWidth
                      component={TextField}
                    ></Field>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container justify="center" alignItems="center">
                      <Grid item>
                        <Button
                          size="large"
                          variant="contained"
                          color="primary"
                          type="submit"
                          endIcon={<Icon>send</Icon>}
                        >
                          Send
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Form>
            </Formik>
          </Grid>
        </Grid>
      </Fragment>
    );
  };

  render() {
    return <div>{this.rendereContent()}</div>;
  }
}

export default connect(null, { signUpUser })(withRouter(SignUp));
