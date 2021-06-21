import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { InputLabel, Select, MenuItem, Paper } from "@material-ui/core";
// import { LockOutlinedIcon } from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import Copyright from "./layout/copyright";
import Link from "next/link";
import Router from "next/dist/next-server/lib/router/router";
import { useRouter } from "next/router";
import TextieIcon from "./layout/textie_icon";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  select: { minHeight: 50, fontSize: 1.5 + "em" },
}));

export default function Home() {
  const router = useRouter();

  const classes = useStyles();
  const [auth_code, setAuth_code] = useState("");
  const [showAuth, setShowAuth] = useState(false);
  const [phone_number, setPhone_Number] = useState("");
  const handleSubmit = (e) => {
    axios
      .put("https://texties.herokuapp.com/auth" + phone_number)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    setShowAuth(true);
  };

  const handleSubmitAuth = (e) => {
    axios
      .put("https://texties.herokuapp.com/auth" + phone_number)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    router.push("/results");
    setShowAuth(true);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Grid container direction="column" justify="center" alignItems="center">
        <CssBaseline />
        <div className={classes.paper}>
          <TextieIcon />
          <Typography component="h1" variant="h5">
            Log in to Textie!
          </Typography>
          <form className={classes.form}>
            <TextField
              variant="outlined"
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
                  className={classes.submit}
                  onClick={handleSubmitAuth}
                >
                  Login
                </Button>
              </div>
            ) : (
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleSubmit}
              >
                Send Auth Code
              </Button>
            )}
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Grid>
    </Container>
  );
}
