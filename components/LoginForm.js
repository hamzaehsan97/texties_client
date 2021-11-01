import React, { useState, useEffect, useContext } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { useRouter } from "next/router";
import TextieIcon from "../pages/layout//textie_icon";
import UserContext from "./UserContext";
import { CircularProgress } from "@material-ui/core";
import styles from "../static/LoginForm.module.css";

export default function LoginForm() {
  const router = useRouter();
  const { signIn, errors } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [auth_code, setAuth_code] = useState("");
  const [showAuth, setShowAuth] = useState(false);
  const [phone_number, setPhone_Number] = useState("");
  const [loginErrors, setLoginErrors] = useState([]);
  const handleSubmit = (e) => {
    if (phone_number.length === 0 || phone_number.length < 10) {
      setLoginErrors(["Please enter your phone number correctly"]);
      return;
    }
    setLoading(true);
    axios
      .post("https://texties.herokuapp.com/auth?phone_number=" + phone_number)
      .then((res) => {
        setLoginErrors(null);
        setLoading(false);
        setShowAuth(true);
      })
      .catch((err) => {
        console.log(err.response.data["Error"]);
        setLoginErrors(err.response.data["Error"]);
        setLoading(false);
      });
  };

  const handleSubmitAuth = (e) => {
    if (phone_number != "" || auth_code != "") {
      signIn(phone_number, auth_code);
    } else {
      setLoginErrors("Please enter your phone number and authorization code");
    }
  };

  return (
    <Grid container direction="column" alignItems="center">
      <Grid item>
        <CssBaseline />
        <div className={styles.paper}>
          <TextieIcon />
          <form className={styles.form}>
            <TextField
              variant="outlined"
              className={styles.inputText}
              margin="normal"
              required
              fullWidth
              value={phone_number}
              name="phone_number"
              label="Phone Number"
              type="phone_number"
              id="phone_number"
              autoComplete="phone_number"
              onChange={(e) => setPhone_Number(e.target.value)}
            />
            <Typography
              variant="subtitle1"
              className={styles.errorText}
              gutterBottom
            >
              {loginErrors}
            </Typography>
            {showAuth ? (
              <div>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  value={auth_code}
                  name="auth_code"
                  label="Authorization code"
                  type="auth_code"
                  id="auth_code"
                  autoComplete="auth_code"
                  onChange={(e) => setAuth_code(e.target.value)}
                />
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={styles.submit}
                  onClick={handleSubmitAuth}
                >
                  Login
                </Button>
              </div>
            ) : (
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <Grid item>
                  {" "}
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={styles.submit}
                    onClick={handleSubmit}
                  >
                    Send Auth Code
                  </Button>
                </Grid>
                <Grid item>
                  {loading ? (
                    <CircularProgress color="secondary" />
                  ) : (
                    <div></div>
                  )}
                </Grid>
              </Grid>
            )}
            <Typography
              variant="subtitle1"
              className={styles.errorText}
              gutterBottom
            >
              {errors}
            </Typography>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
