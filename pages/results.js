import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { InputLabel, Select, MenuItem, Paper } from "@material-ui/core";
// import { LockOutlinedIcon } from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import Copyright from "./layout/copyright";
import TextieIcon from "./layout/textie_icon";
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(5),
    padding: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minWidth: 200,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    minWidth: 300,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    marginTop: 10,
  },
  select: { minHeight: 50, fontSize: 1.5 + "em" },
  textieTitle: {
    textAlign: "center",
  },
}));

export default function Home() {
  const classes = useStyles();
  const [notes, setNotes] = useState([]);
  const [type, setType] = useState("notes");
  const [loading, setLoading] = useState(true);
  const handleChange = (e) => {
    // setType(e.target.value);
    setLoading(true);
    axios
      .get("https://texties.herokuapp.com/get/" + type)
      .then((res) => {
        setLoading(false);
        setNotes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    axios
      .get("https://texties.herokuapp.com/get/" + type)
      .then((res) => {
        setLoading(false);
        setNotes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <Container component="main" maxWidth="xs">
      <Grid container direction="column" justify="center" alignItems="center">
        <CssBaseline />
        <div className={classes.paper}>
          <TextieIcon />
          <form className={classes.form}>
            <InputLabel id="type" required={true}>
              Textie Type
            </InputLabel>

            <Select
              fullWidth
              label="Textie Type"
              id="type"
              value={type}
              displayEmpty
              onChange={(e) => setType(e.target.value)}
              //   onChange={handleSubmit}
              className={classes.select}
            >
              {" "}
              <MenuItem value="" disabled>
                Type
              </MenuItem>
              <MenuItem value={"notes"}>Notes</MenuItem>
              <MenuItem value={"ideas"}>Ideas</MenuItem>
              <MenuItem value={"weight"}>Weight</MenuItem>
            </Select>
            <Button
              variant="contained"
              color="secondary"
              className={classes.submit}
              onClick={handleChange}
            >
              Submit
            </Button>
          </form>
          <Paper className={classes.paper}>
            {loading ? (
              <div>
                <CircularProgress color="secondary" />
              </div>
            ) : (
              <div>
                <ul>
                  {notes.map((note) => (
                    <li key={note.id}>
                      <Typography>{note.textie}</Typography>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Paper>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Grid>
    </Container>
  );
}
