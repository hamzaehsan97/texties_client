import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { makeStyles } from "@material-ui/core/styles";
import { useContext } from "react";
import UserContext from "../../components/UserContext";
import { IconButton } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { TextField } from "@material-ui/core";
import { useState } from "react";
import { Typography } from "@material-ui/core";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import { Grid } from "@material-ui/core";
import Router from "next/router";
import styles from "../../public/static/layout/add_textie.module.css";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddTextie() {
  const [textie, setTextie] = useState("");
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");
  const { user } = useContext(UserContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    setLoading(true);
    axios
      .get(
        "https://texties.herokuapp.com/add?phone_number=" +
          user +
          "&textie=" +
          textie,
        {
          headers: {
            "content-type": "application/json",
          },
        }
      )
      .then((res) => {
        setLoading(false);
        Router.reload(window.location.pathname);
        setOpen(false);
      })
      .catch((err) => {
        setLoading(false);
        // handleOpenSnack();
        setOpen(false);
        console.log(err);
      });
  };

  return (
    <div>
      <IconButton
        aria-label="delete"
        className={styles.margin}
        onClick={handleClickOpen}
      >
        <AddCircleIcon fontSize="large" color="secondary" />
      </IconButton>

      <Dialog
        fullScreen
        fullWidth
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <Grid
          container
          direction="row"
          justify="flex-end"
          alignItems="flex-start"
        >
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
            style={{ marginRight: "20px" }}
          >
            <CancelIcon fontSize="large" />
          </IconButton>
        </Grid>
        <DialogContent>
          <TextField
            id="outlined-multiline-static"
            label="Add New Textie"
            multiline
            rows={8}
            defaultValue={textie}
            className={styles.dialog}
            variant="outlined"
            fullWidth
            onChange={(e) => setTextie(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          {loading ? (
            <div>
              <CircularProgress color="secondary" />
            </div>
          ) : (
            <div>
              {" "}
              <Button
                variant="contained"
                color="secondary"
                className={styles.submit}
                disableElevation
                onClick={handleSave}
                style={{ marginRight: "10px" }}
              >
                Save
              </Button>{" "}
              <br />
              <Typography
                variant="subtitle1"
                className={styles.errorText}
                gutterBottom
              >
                {errors}
              </Typography>
            </div>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
