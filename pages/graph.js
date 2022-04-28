import React, { useState, useEffect } from "react";
import { IconButton } from "@material-ui/core";
import TimelineIcon from "@material-ui/icons/Timeline";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import { MenuItem, Select } from "@material-ui/core";
import { InputLabel } from "@material-ui/core";
import {
  LineChart,
  ResponsiveContainer,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { useContext } from "react";
import UserContext from "../components/UserContext";
import CircularProgress from "@material-ui/core/CircularProgress";
// import styles from "../public/static/globals.css";
export default function Graph(props) {
  const Scale_arr = [
    {
      value: "auto",
    },
    {
      value: "linear",
    },
    {
      value: "log",
    },
    {
      value: "pow",
    },
    {
      value: "sqrt",
    },
    {
      value: "identity",
    },
    {
      value: "time",
    },
    {
      value: "ordinal",
    },
    {
      value: "quantile",
    },
    {
      value: "quantize",
    },
    {
      value: "utc",
    },
    {
      value: "sequential",
    },
    {
      value: "threshold",
    },
  ];

  const line_type = [
    {
      value: "basis",
    },
    {
      value: "basisClosed",
    },
    {
      value: "basisOpen",
    },
    {
      value: "linear",
    },
    {
      value: "linearClosed",
    },
    {
      value: "natural",
    },
    {
      value: "monotoneX",
    },
    {
      value: "monotoneY",
    },
    {
      value: "monotone",
    },
    {
      value: "step",
    },
    {
      value: "stepBefore",
    },
    {
      value: "stepAfter",
    },
  ];
  const handleChange = (e) => {
    setYScale(e.target.value);
  };
  const returnDate = (date) => {
    var dateObj = new Date(date);
    var fullDate = dateObj.toString();
    var listDate = fullDate.split(" ");
    return listDate[1] + " " + listDate[2];
  };
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState([]);
  const [yScale, setYScale] = useState("auto");
  const [xScale, setXScale] = useState("auto");
  const [lineType, setLineType] = useState("basis");
  const { user } = useContext(UserContext);

  useEffect(() => {
    axios
      .get(
        "https://texties-test.herokuapp.com/get?type=weight&phone_number=" +
          user
      )
      .then((res) => {
        setLoading(false);
        for (const obj of res.data) {
          obj.created_date = returnDate(obj.created_date);
        }
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
      style={{ minHeight: 40 + "vh" }}
    >
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid
          container
          direction="row"
          alignItems="center"
          justify="center"
          style={{
            minWidth: 100 + "vw",
            minHeight: 50 + "vh",
          }}
          className="pt-30"
        >
          <Grid item xs={12} md={1} />
          <Grid item xs={12} md={2}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              className="flex-row"
            >
              <div className="pt-20">
                <InputLabel id="y-axis-label">Y-axis scale</InputLabel>
                <Select
                  labelId="y-axis-label"
                  value={yScale}
                  label="Y-axis Scale"
                  onChange={(e) => handleChange(e)}
                >
                  {Scale_arr.map((item) => (
                    <MenuItem value={item.value}>{item.value}</MenuItem>
                  ))}
                </Select>
              </div>
              <div className="pt-20">
                <InputLabel id="y-axis-label">X-axis scale</InputLabel>
                <Select
                  labelId="x-axis-label"
                  value={xScale}
                  label="X-axis Scale"
                  onChange={(e) => setXScale(e.target.value)}
                >
                  {Scale_arr.map((item) => (
                    <MenuItem value={item.value}>{item.value}</MenuItem>
                  ))}
                </Select>
              </div>
              <div className="pt-20 pr-20">
                <InputLabel id="line-label">Line Type</InputLabel>
                <Select
                  labelId="line-label"
                  value={lineType}
                  label="Line Type"
                  onChange={(e) => setLineType(e.target.value)}
                >
                  {line_type.map((item) => (
                    <MenuItem value={item.value}>{item.value}</MenuItem>
                  ))}
                </Select>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <ResponsiveContainer
              minWidth={500}
              minHeight={300}
              width="100%"
              height={400}
            >
              <LineChart
                data={notes}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="5 3" />
                <XAxis
                  dataKey="created_date"
                  interval="preserveEnd"
                  scale={xScale}
                />
                <YAxis
                  domain={["dataMin - 20", "dataMax + 20"]}
                  label="Weight"
                  scale={yScale}
                  unit=" lbs"
                />
                <Tooltip />
                <Legend />
                <Line
                  type={lineType}
                  dataKey="textie"
                  stroke="#8884d8"
                  legendType="none"
                  activeDot={{ stroke: "red", strokeWidth: 2, r: 8 }}
                  name="Weight"
                />
              </LineChart>
            </ResponsiveContainer>
          </Grid>
          <Grid item xs={12} md={3} />
        </Grid>
      )}
    </Grid>
  );
}
