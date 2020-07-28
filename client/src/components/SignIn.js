import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TextField } from "formik-material-ui";
import {
  Typography,
  Button,
  Grid,
  Icon,
  FormControlLabel,
  Checkbox,
  Avatar,
  CssBaseline,
  Container,
  withStyles,
} from "@material-ui/core";
import { fetchUser } from "../actions";

const styles = (theme) => ({
  container: {
    marginTop: theme.spacing(5),
  },
  avatar: {
    marginLeft: theme.spacing(7),
    backgroundColor: theme.palette.secondary.main,
  },
});

class SignIn extends React.Component {
  state = { rememberMe: false };

  initialValues = {
    username: localStorage.getItem("username")
      ? localStorage.getItem("username") // this is the remember me local storage
      : "",
    password: localStorage.getItem("password")
      ? localStorage.getItem("password")
      : "", // this is the remember me local storage
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
    const { classes } = this.props;

    if (this.props.auth) {
      return <Redirect to="/"></Redirect>;
    }

    return (
      <Container component="main" className={classes.container}>
        <CssBaseline />
        <ToastContainer></ToastContainer>
        <Grid
          container
          direction="column"
          spacing={2}
          alignItems="center"
          justify="center"
        >
          <Grid item xs={12}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h3">Sign In</Typography>
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
                this.props.fetchUser(data, this.props.history);
                // this.signInUser(data);
                setSubmitting(false);
              }}
            >
              <Form autoComplete="off">
                <Grid container spacing={2}>
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
                      name="password"
                      label="Password*"
                      type="password"
                      variant="outlined"
                      fullWidth
                      component={TextField}
                    ></Field>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={this.state.rememberMe}
                          onChange={this.handleChange}
                          name="checkedA"
                          color="primary"
                        />
                      }
                      label="Remember Me"
                    />
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
      </Container>
    );
  };

  render() {
    return <div>{this.rendereContent()}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { fetchUser })(
  withStyles(styles)(SignIn)
);
