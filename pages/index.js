import React, { useState, useEffect, useContext } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Router from "next/router";
import UserContext from "../components/UserContext";
import Image from "next/image";
import styles from "../public/static/index.module.css";
import { Button, CircularProgress, TextField } from "@material-ui/core";
import { LinearProgress } from "@material-ui/core";
import axios from "axios";
export default function Home() {
  const { signOut, user } = useContext(UserContext);
  const [phone_number, setPhone_Number] = useState("");
  const [signupErrors, setSignupErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e) => {
    if (phone_number.length === 0 || phone_number.length < 10) {
      setSignupErrors(["Please enter your phone number correctly"]);
      return;
    }
    setLoading(true);
    axios
      .post("https://texties.herokuapp.com/signup?phone_number=" + phone_number)
      .then((res) => {
        setSignupErrors(null);
        setLoading(false);
        window.location.href = "/login";
      })
      .catch((err) => {
        setSignupErrors(err.response.data["Error"]);
        setLoading(false);
      });
  };
  useEffect(() => {
    if (user === null) {
      // Router.push("/");
    } else {
      Router.push("/results");
    }
  }, []);
  return (
    <Grid
      container
      direction="row"
      spacing={0}
      alignItems="center"
      style={{ paddingTop: "5vh" }}
    >
      <Grid item ls={1} xs={1}></Grid>
      <Grid item lg={5} xs={12} style={{ paddingBottom: "20px" }}>
        <Grid container direction="column" alignItems="center" spacing={5}>
          <Grid item>
            <Typography variant="h2" className={styles.title}>
              <b>Reimagining notes 📓</b>
            </Typography>
            <Typography variant="h6" className={styles.sub_title}>
              Texties helps you keep track of your notes. Sign-up today!
            </Typography>
          </Grid>
          <Grid item>
            <form>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={1}
                className={styles.form}
              >
                <Grid item>
                  <TextField
                    value={phone_number}
                    name="phone_number"
                    label="Phone Number"
                    type="phone_number"
                    id="phone_number"
                    className={styles.phone_field}
                    onChange={(e) => setPhone_Number(e.target.value)}
                    style={{ maxHeight: 55 + "px", background: "#fff" }}
                  />
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={loading}
                    className={styles.access_button}
                  >
                    Get Access
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
          <Grid item>
            {loading ? <CircularProgress /> : null}
            {signupErrors ? (
              <Typography
                variant="subtitle1"
                className={styles.errorText}
                gutterBottom
              >
                {signupErrors}
              </Typography>
            ) : null}
          </Grid>
        </Grid>
      </Grid>
      <Grid item lg={6} xs={12}>
        <Grid container direction="column" alignItems="center">
          <Grid item>
            <Image
              src="/visual-guide.gif"
              width={310}
              height={588}
              placeholder="blur"
              alt="visual-gif"
              blurDataURL="/visual-guide.gif"
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
