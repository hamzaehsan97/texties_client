import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { InputLabel, Select, MenuItem, Paper } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import Copyright from "./layout/copyright";

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

export default function Auth() {
  const classes = useStyles();
  const [notes, setNotes] = useState([]);
  const [auth_code, setauth_code] = useState("");
  const handleSubmit = (e) => {
    axios
      .get("https://texties.herokuapp.com/get/notes")
      .then((res) => {
        setNotes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // useEffect(() => {
  //   axios
  //     .get("https://texties.herokuapp.com/get/notes")
  //     .then((res) => {
  //       setNotes(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);
  return (
    <Container component="main" maxWidth="xs">
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item>
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}></Avatar>
            <Typography component="h1" variant="h5">
              Log in
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                value={auth_code}
                name="auth_code"
                label="Authorization Code"
                type="auth_code"
                id="auth_code"
                autoComplete="auth_code"
                onChange={(e) => setauth_code(e.target.value)}
                onClick={handleSubmit}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Send Auth Code
              </Button>
            </form>
            {/* <Paper className={classes.paper}>
            <ul>
              {notes.map((note) => (
                <li key={note.id}>
                  <Typography>{note.textie}</Typography>
                </li>
              ))}
            </ul>
          </Paper> */}
          </div>
          <Box mt={8}>
            <Copyright />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
