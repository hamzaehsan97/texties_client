import React, { useState, useEffect, useContext } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import Copyright from "../pages/layout/copyright";
import { useRouter } from "next/router";
import TextieIcon from "../pages/layout//textie_icon";
import UserContext from "../components/UserContext";
import { CardActionArea, CircularProgress } from "@material-ui/core";
import Image from "next/image";
import { textiesGif } from "../public/textiesGIF.gif";

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

export default function Home() {
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
      direction="row"
      spacing={0}
      justifyContent="center"
      alignItems="center"
      style={{ paddingTop: "10vh" }}
    >
      <Grid item ls={1} xs={1}></Grid>
      <Grid item lg={5} xs={12}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={5}
        >
          <Grid item>
            <Typography variant="h2">
              <b>Reimagining notes 📓</b>
            </Typography>
            <Typography variant="h6">
              Texties helps you keep track of your notes. Sign-up today!
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item lg={6} xs={12}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item>
            <Image src={textiesGif} width={207} height={392} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
