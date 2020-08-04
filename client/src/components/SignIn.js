import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
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
} from "@material-ui/core";
import { fetchUser1 } from "../actions";

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
  const classes = useStyles();
  const dispatch = useDispatch();
  const [rememberMe, setRememberMe] = useState(false);
  const history = useHistory();

  const initialValues = {
    username: localStorage.getItem("username")
      ? localStorage.getItem("username") // this is the remember me local storage
      : "",
    password: localStorage.getItem("password")
      ? localStorage.getItem("password")
      : "", // this is the remember me local storage
  };

  const onChangeRememberMe = (event) => {
    setRememberMe(event.target.checked);
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
                };

                if (rememberMe) {
                  // checkbox
                  localStorage.setItem("username", data.username);
                  localStorage.setItem("password", data.password);
                } else {
                  localStorage.removeItem("username");
                  localStorage.removeItem("password");
                }

                fetchUser1(data, dispatch, history);
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
                          checked={rememberMe}
                          onChange={onChangeRememberMe}
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

  return <div>{rendereContent()}</div>;
};

export default SignIn;
