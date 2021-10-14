import React, { useState, useEffect, useContext } from "react";
import UserContext from "../../components/UserContext";
import { AppBar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { Toolbar } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Grid } from "@material-ui/core";
// const useStyles = makeStyles((theme) => ({
//   paper: {
//     marginTop: theme.spacing(10),
//     padding: theme.spacing(1),
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     width: 100 + "%",
//   },
// }));

export default function NavBar() {
  const { user } = useContext(UserContext);
  const [isUser, setIsUser] = useState(false);
  useEffect(() => {
    if (user !== null) {
      setIsUser(true);
    } else {
      setIsUser(false);
    }
    console.log("user from Nav", user);
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
              👩🏼‍🦰
            </Typography>
          </Grid>
          <Grid item>
            {isUser ? (
              <></>
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
