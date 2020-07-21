import React from "react";
import { withRouter } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  Typography,
  Button,
  TextField,
  Grid,
  Icon,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { FormikTextField } from "formik-material-fields";
import { connect } from "react-redux";
import { fetchUser } from "../actions";

class SignIn extends React.Component {
  state = { rememberMe: false }; // this is the remember me checkbox

  initialValues = {
    username: localStorage.getItem("username")
      ? localStorage.getItem("username") // this is the remember me local storage
      : "",
    password: localStorage.getItem("password")
      ? localStorage.getItem("password")
      : "", // this is the remember me local storage
  };

  isRememberMe = () => {
    return localStorage.getItem("rememberMe") ? true : false;
  };

  handleChange = (event) => {
    console.log(event);
    this.setState({ rememberMe: event.target.checked });
  };

  validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
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
          <Typography variant="h2">Sign In</Typography>
        </Grid>
        <Grid item md={6} xs={6}>
          <Formik
            initialValues={this.initialValues}
            validationSchema={this.validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              // same shape as initial values
              const data = {
                username: values.username,
                password: values.password,
                //image: `http://gravatar.com/avatar/${moment().unix()}?d=identicon`,
              };

              if (this.state.rememberMe) {
                // checkbox
                localStorage.setItem("username", data.username);
                localStorage.setItem("password", data.password);
              } else {
                localStorage.removeItem("username");
                localStorage.removeItem("password");
              }

              // sign in
              this.props.fetchUser(data, history);
              setSubmitting(false);
            }}
          >
            <Form>
              <FormikTextField
                style={{ margin: 8 }}
                fullWidth
                component={TextField}
                label="Username"
                name="username"
              />

              <FormikTextField
                style={{ margin: 8 }}
                fullWidth
                component={TextField}
                label="Password"
                name="password"
                type="password"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    // disabled={true} // disable for now
                    onChange={this.handleChange}
                    color="primary"
                    checked={this.state.rememberMe}
                  />
                }
                label="Remember Me"
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

export default connect(null, { fetchUser })(withRouter(SignIn));
