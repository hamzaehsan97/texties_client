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
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
    marginTop: 10,
  },
}));

export default function AddTextie() {
  const classes = useStyles();
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
        className={classes.margin}
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
        <DialogContent>
          <TextField
            id="outlined-multiline-static"
            label="Add New Textie"
            multiline
            rows={8}
            defaultValue={textie}
            className={classes.dialog}
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
                className={classes.submit}
                disableElevation
                onClick={handleSave}
                style={{ marginRight: "10px" }}
              >
                Save
              </Button>{" "}
              <Button
                variant="contained"
                className={classes.submit}
                disableElevation
                onClick={handleClose}
                style={{ marginRight: "10px" }}
              >
                Cancel
              </Button>
              <br />
              <Typography
                variant="subtitle1"
                className={classes.errorText}
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
