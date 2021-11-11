import React, { useState, useEffect, useContext } from "react";
import UserContext from "../../components/UserContext";
import { AppBar } from "@material-ui/core";
import { Toolbar } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import SignOutButton from "./signout_button";
import styles from "../../public/static/layout/navbar.module.css";

export default function NavBar() {
  const { user } = useContext(UserContext);
  const [isUser, setIsUser] = useState(false);
  useEffect(() => {
    if (user !== null) {
      setIsUser(true);
    } else {
      setIsUser(false);
    }
  }, [user]);

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item>
            <Typography variant="h2" style={{ padding: "5px" }}>
              <a href="/" style={{ textDecoration: "none" }}>
                👩🏼‍🦰
              </a>
            </Typography>
          </Grid>
          <Grid item>
            {isUser ? (
              <div className={styles.signout_button}>
                <SignOutButton />
              </div>
            ) : (
              <Button color="inherit" style={{ margin: "5px" }} href="/login">
                Login
              </Button>
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
