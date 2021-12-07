import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { useContext } from "react";
import UserContext from "../../components/UserContext";
import styles from "../../public/static/layout/signout_button.module.css";
import { Typography } from "@material-ui/core";
import { Grid } from "@material-ui/core";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SignOutButton() {
  const { signOut } = useContext(UserContext);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        className={styles.submit}
        onClick={handleClickOpen}
      >
        Sign out
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item>
            <DialogTitle id="alert-dialog-slide-title">
              <Typography variant="subtitle1">
                Are you sure you want to sign out?
              </Typography>
            </DialogTitle>
          </Grid>
          <Grid item>
            <DialogActions>
              <Button onClick={handleClose} color="primary" variant="outlined">
                Cancel
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                className={styles.submit}
                onClick={signOut}
                disableElevation
              >
                Sign out
              </Button>
            </DialogActions>
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
}
