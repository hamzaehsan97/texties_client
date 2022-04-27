import React, { useState, useEffect } from "react";
import { IconButton } from "@material-ui/core";
import TimelineIcon from "@material-ui/icons/Timeline";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
export default function Graph(props) {
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://texties-test.herokuapp.com/get?type=weight&phone_number=" +
          props.user
      )
      .then((res) => {
        setLoading(false);
        setNotes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.data]);
  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      style={{ minHeight: 50 + "vh" }}
    >
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>{notes.map((note) => note.textie)}</div>
      )}
    </Grid>
  );
}
