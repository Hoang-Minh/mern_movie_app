import React from "react";
import { useDispatch } from "react-redux";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { TextField } from "formik-material-ui";
import {
  Typography,
  Button,
  Grid,
  Icon,
  Container,
  Avatar,
  CssBaseline,
} from "@material-ui/core";
import { signUpUser1 } from "../actions";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(5),
  },
  avatar: {
    marginLeft: theme.spacing(7),
    backgroundColor: theme.palette.secondary.main,
  },
}));

const SignUp = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const initialValues = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object().shape({
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

  const rendereContent = () => {
    return (
      <Container component="main" className={classes.container}>
        <CssBaseline />
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
            <Typography variant="h3">Sign up</Typography>
          </Grid>
          <Grid item md={6} xs={6}>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                // same shape as initial values
                const data = {
                  firstName: values.firstName,
                  lastName: values.lastName,
                  username: values.username,
                  email: values.email,
                  password: values.password,
                  avatar: `http://gravatar.com/avatar/${moment().unix()}?d=identicon`,
                };
                signUpUser1(data, dispatch);
                setSubmitting(false);
                resetForm();
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

  return <div>{rendereContent()}</div>;
};

export default SignUp;
