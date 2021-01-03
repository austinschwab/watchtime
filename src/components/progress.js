import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import * as constants from "../constants";
import { Loading } from "react-loading-dot";

function LinearProgressWithLabel(props) {
  return (
    <Box display="flex">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} color="secondary" />
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

const useStyles = makeStyles({
  root: {
    width: "100vw",
    height: "100vh",
    backgroundColor: "black",
  },
});

export default function LinearWithValueLabel({ progress }) {
  const classes = useStyles();
  const [intervalIndex, setIntervalIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIntervalIndex(intervalIndex + 1);
    }, 5000);
  });

  return (
    <div className={classes.root}>
      <LinearProgressWithLabel value={+progress} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {constants.quotes[intervalIndex].image}
        </div>
        <p
          style={{
            marginTop: 10,
            color: "white",
            fontSize: 25,
            fontWeight: 500,
            maxWidth: "60%",
          }}
        >
          {constants.quotes[intervalIndex].description}
          <p
            style={{
              marginTop: 10,
              color: "white",
              fontSize: 15,
              fontWeight: 300,
            }}
          >
            Art by Visualize Value
          </p>
        </p>
      </div>
    </div>
  );
}
