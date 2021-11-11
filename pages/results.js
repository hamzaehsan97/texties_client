import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { InputLabel, Select, MenuItem, Paper } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import TextieIcon from "./layout/textie_icon";
import {
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@material-ui/core";
import { useContext } from "react";
import UserContext from "../components/UserContext";
import SignOutButton from "./layout/signout_button";
import TextieContent from "./layout/textie_content";
import AddTextie from "./layout/add_textie";
import Router from "next/router";
import styles from "../public/static/results.module.css";

const returnDate = (date) => {
  var dateObj = new Date(date);
  var fullDate = dateObj.toString();
  var listDate = fullDate.split(" ");
  return listDate[0] + " " + listDate[1] + " " + listDate[2];
};

const columns = [
  { id: "textie", label: "Textie" },
  { id: "date", label: "Date", minWidth: 105 },
];

export default function Home() {
  const { signOut, user } = useContext(UserContext);
  const [notes, setNotes] = useState([]);
  const [type, setType] = useState("note");
  const [loading, setLoading] = useState(true);
  const [searchText, setSeachText] = useState("");
  const handleChange = (e) => {
    setLoading(true);
    axios
      .get(
        "https://texties-test.herokuapp.com/get?type=" +
          type +
          "&phone_number=" +
          user
      )
      .then((res) => {
        setLoading(false);
        setNotes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSearchChange = (e) => {
    // setLoading(true);
    setSeachText(e);
    axios
      .get(
        "https://texties.herokuapp.com/search?type=" +
          type +
          "&search_text=" +
          e +
          "&phone_number=" +
          user
      )
      .then((res) => {
        setLoading(false);
        setNotes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (user === null) {
      Router.push("/");
    }
    axios
      .get(
        "https://texties-test.herokuapp.com/get?type=" +
          type +
          "&phone_number=" +
          user
      )
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
        <div className={styles.paper}>
          <TextieIcon />
          <form className={styles.form}>
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
              className={styles.select}
            >
              {" "}
              <MenuItem value="" disabled>
                Type
              </MenuItem>
              <MenuItem value={"note"}>Notes</MenuItem>
              <MenuItem value={"idea"}>Ideas</MenuItem>
              <MenuItem value={"weight"}>Weight</MenuItem>
            </Select>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Grid item>
                <Button
                  variant="contained"
                  color="secondary"
                  className={styles.submit}
                  onClick={handleChange}
                >
                  Submit
                </Button>
              </Grid>

              <Grid item style={{ marginLeft: "-10px" }}>
                <AddTextie />
              </Grid>
            </Grid>
          </form>

          <Paper className={styles.paper}>
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="center"
            >
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Search Texties"
                  variant="outlined"
                  value={searchText}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  style={{ paddingTop: "5px", paddingBottom: "10px" }}
                />
              </Grid>
            </Grid>
            {loading ? (
              <div>
                <CircularProgress color="secondary" />
              </div>
            ) : (
              <div>
                <TableContainer>
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        {columns.map((column) => (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{
                              minWidth: column.minWidth,
                              fontWeight: "bold",
                            }}
                          >
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {notes
                        .slice(0)
                        .reverse()
                        .map((note) => (
                          <TextieContent
                            textie={note.textie}
                            date={returnDate(note.created_date)}
                            id={note.id}
                          />
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            )}
          </Paper>
          <SignOutButton />
        </div>
      </Grid>
    </Container>
  );
}
