import React, { useState, useEffect, useContext } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import UserContext from "../components/UserContext";
import Image from "next/image";

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
      <Grid item lg={5} xs={12} style={{ paddingBottom: "20px" }}>
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
            <Image
              src="/visual-guide.gif"
              width={310}
              height={588}
              placeholder="blur"
              alt="visual-gif"
              blurDataURL="data:..."
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
