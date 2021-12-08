import React, { useState, useEffect, useContext } from "react";
import UserContext from "../../components/UserContext";
import { AppBar } from "@material-ui/core";
import { Toolbar } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import SignOutButton from "./signout_button";
import styles from "../../public/static/layout/navbar.module.css";
import Switch from "@material-ui/core/Switch";
import { FormGroup } from "@material-ui/core";
import { FormControlLabel } from "@material-ui/core";
export default function NavBar() {
  const { user, toggleDarkMode, darkMode } = useContext(UserContext);
  const [isUser, setIsUser] = useState(false);
  useEffect(() => {
    if (user !== null) {
      setIsUser(true);
    } else {
      setIsUser(false);
    }
  }, [user]);

  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      className={styles.app_bar}
    >
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
            <div
              style={{
                display: "flex",
                direction: "row",
              }}
            >
              <Typography
                variant={"h6"}
                style={{ padding: 10 + "px", paddingRight: 12 + "px" }}
              >
                🌞
              </Typography>{" "}
              <FormGroup>
                <FormControlLabel
                  variant="h6"
                  style={{ paddingTop: 5 + "px" }}
                  control={
                    <Switch
                      onChange={toggleDarkMode}
                      checked={darkMode}
                      color="default"
                    />
                  }
                  label="🌑"
                />
              </FormGroup>
              {isUser ? (
                <div className={styles.signout_button}>
                  <SignOutButton />
                </div>
              ) : (
                <Button color="inherit" style={{ margin: "5px" }} href="/login">
                  Login
                </Button>
              )}
            </div>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
