import React from "react";
import { withRouter } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Typography, Button, Grid, Icon } from "@material-ui/core";
import { FormikTextField } from "formik-material-fields";
import { connect } from "react-redux";
import moment from "moment";
import { signUpUser } from "../actions";

class SignUp extends React.Component {
  initialValues = {
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
            }}
          >
            <Form autoComplete="off">
              <FormikTextField
                style={{ margin: 8 }}
                fullWidth
                // component={TextField}
                label="First Name"
                name="firstName"
              />
              <FormikTextField
                style={{ margin: 8 }}
                fullWidth
                // component={TextField}
                label="Last Name"
                name="lastName"
              />
              <FormikTextField
                style={{ margin: 8 }}
                fullWidth
                // component={TextField}
                label="Username"
                name="username"
              />

              <FormikTextField
                style={{ margin: 8 }}
                fullWidth
                // component={TextField}
                label="Email"
                name="email"
                type="email"
              />

              <FormikTextField
                style={{ margin: 8 }}
                fullWidth
                // component={TextField}
                label="Password"
                name="password"
                type="password"
              />

              <FormikTextField
                style={{ margin: 8 }}
                fullWidth
                // component={TextField}
                label="Confirm Password"
                name="confirmPassword"
                type="password"
              />

              <Grid
                style={{ marginTop: "1rem" }}
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
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
            </Form>
          </Formik>
        </Grid>
      </Grid>
    );
  };

  render() {
    return <div>{this.rendereContent()}</div>;
  }
}

export default connect(null, { signUpUser })(withRouter(SignUp));
