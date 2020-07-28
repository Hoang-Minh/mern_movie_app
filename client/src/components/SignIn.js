import React, { useState } from "react";
// import { withRouter } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Typography,
  Button,
  Grid,
  Icon,
  FormControlLabel,
  Checkbox,
  Box,
  Avatar,
  CssBaseline,
  Container,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TextField } from "formik-material-ui";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { fetchUser } from "../actions";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(5),
  },
  avatar: {
    marginLeft: theme.spacing(7),
    backgroundColor: theme.palette.secondary.main,
  },
}));

const SignIn = () => {
  //state = { rememberMe: false }; // this is the remember me checkbox
  const [rememberMe, setRememberMe] = useState(false);
  const classes = useStyles();

  const initialValues = {
    username: localStorage.getItem("username")
      ? localStorage.getItem("username") // this is the remember me local storage
      : "",
    password: localStorage.getItem("password")
      ? localStorage.getItem("password")
      : "", // this is the remember me local storage
  };

  const isRememberMe = () => {
    return localStorage.getItem("rememberMe") ? true : false;
  };

  const handleChange = (event) => {
    console.log(event);
    // this.setState({ rememberMe: event.target.checked });
    setRememberMe({ rememberMe: event.target.value });
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const rendereContent = () => {
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
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting }) => {
                // same shape as initial values
                const data = {
                  username: values.username,
                  password: values.password,
                  //image: `http://gravatar.com/avatar/${moment().unix()}?d=identicon`,
                };

                if (rememberMe) {
                  // checkbox
                  localStorage.setItem("username", data.username);
                  localStorage.setItem("password", data.password);
                } else {
                  localStorage.removeItem("username");
                  localStorage.removeItem("password");
                }

                // sign in
                // this.props.fetchUser(data, history);
                setSubmitting(false);
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
                      type="password"
                      variant="outlined"
                      fullWidth
                      component={TextField}
                    ></Field>
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      name="confirmPassword"
                      label="Confirm Password*"
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
                          onChange={handleChange}
                          color="primary"
                          checked={rememberMe}
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

  // const renderNotification = () => {
  //   console.log("render Notification", this.props.isSuccessfulRegistered);
  //   if (!this.props.isSuccessfulRegistered) return null;
  //   console.log(this.props.isSuccessfulRegistered.registered);
  //   toast.success("Thanks for signing. Now you can proceed to log in.", {
  //     position: toast.POSITION.TOP_RIGHT,
  //     autoClose: true,
  //   });
  // };

  // const renderPage = () => {
  //   const { history } = this.props;

  //   if (this.props.isSuccessfulRegistered) {
  //     console.log("registered ", this.props.isSuccessfulRegistered);
  //     return history.push("/");
  //   } else {
  //     return (
  //       <Box component="div" style={{ marginTop: "3rem" }}>
  //         {this.renderNotification()}
  //         <ToastContainer></ToastContainer>
  //         {this.rendereContent()}
  //       </Box>
  //     );
  //   }
  // };

  return <div>{rendereContent()}</div>;
};

// const mapStateToProps = (state) => {
//   return {
//     isSuccessfulRegistered: state.userStatus,
//   };
// };

// export default connect(mapStateToProps, { fetchUser })(withRouter(SignIn));
export default SignIn;
