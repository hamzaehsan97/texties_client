import React, { useState, useEffect, useContext } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { useRouter } from "next/router";
import TextieIcon from "../pages/layout//textie_icon";
import UserContext from "./UserContext";
import { CircularProgress } from "@material-ui/core";
import styles from "../styles/LoginForm.module.css";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(10),
    padding: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: 100 + "%",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  inputText: {
    width: 100 + "%",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  select: { minHeight: 50, fontSize: 1.5 + "em" },
  errorText: {
    textAlign: "center",
    color: "red",
    fontWeight: "bolder",
  },
}));

export default function LoginForm() {
  const router = useRouter();
  const classes = useStyles();
  const { signIn, errors } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [auth_code, setAuth_code] = useState("");
  const [showAuth, setShowAuth] = useState(false);
  const [phone_number, setPhone_Number] = useState("");
  const [loginErrors, setLoginErrors] = useState([]);
  const handleSubmit = (e) => {
    setLoading(true);
    axios
      .post("https://texties.herokuapp.com/auth?phone_number=" + phone_number)
      .then((res) => {
        setLoading(false);
        setShowAuth(true);
      })
      .catch((err) => {
        console.log(err);
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
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
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
