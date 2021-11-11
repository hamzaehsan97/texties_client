import { TableCell } from "@material-ui/core";
import { TableRow } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";
import { TextField } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";
import Router from "next/router";
import React from "react";
import { useState } from "react";
import { Typography } from "@material-ui/core";
import { CircularProgress } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import { Grid } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import styles from "../../public/static/layout/textie_content.module.css";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function TextieContent(props) {
  const [snackOpen, setSnackOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [textieText, setTextieText] = useState(props.textie);
  const [errors, setErrorText] = useState("");
  const [open, setOpen] = React.useState(false);

  const handleOpenSnack = () => {
    setSnackOpen(true);
  };

  const handleSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    setLoading(true);
    axios
      .get("https://texties.herokuapp.com/delete?id=" + props.id)
      .then((res) => {
        setLoading(false);
        Router.reload(window.location.pathname);
        setOpen(false);
      })
      .catch((err) => {
        setLoading(false);
        handleOpenSnack();
        setOpen(false);
        console.log(err);
      });
  };

  const handleUpdate = () => {
    setLoading(true);
    axios
      .get(
        "https://texties.herokuapp.com/update?id=" +
          props.id +
          "&textie=" +
          textieText
      )
      .then((res) => {
        setLoading(false);
        Router.reload(window.location.pathname);
        setOpen(false);
      })
      .catch((err) => {
        setLoading(false);
        handleOpenSnack();
        setOpen(false);
        console.log(err);
      });
  };

  return (
    <TableRow key={props.id}>
      <TableCell component="th" scope="row" onClick={handleClickOpen}>
        {props.textie}
      </TableCell>
      <TableCell component="th" scope="row">
        {props.date}
      </TableCell>
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
        <DialogContent>
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
            >
              <CancelIcon fontSize="large" />
            </IconButton>
          </Grid>
          <TextField
            id="outlined-multiline-static"
            label="Edit Textie"
            multiline
            rows={8}
            defaultValue={props.textie}
            className={styles.dialog}
            variant="outlined"
            fullWidth
            onChange={(e) => setTextieText(e.target.value)}
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
              <IconButton aria-label="delete" onClick={handleDelete}>
                <DeleteIcon fontSize="large" />
              </IconButton>
              <Button
                variant="contained"
                color="secondary"
                className={styles.submit}
                disableElevation
                onClick={handleUpdate}
              >
                Update
              </Button>
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
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={snackOpen}
        autoHideDuration={6000}
        onClose={handleSnackClose}
        message="An Error Occured"
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleSnackClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </TableRow>
  );
}
