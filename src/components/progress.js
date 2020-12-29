import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
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
  },
});
const quotes = [
  "Any fool can know. The point is to understand. -Albert Einstein",
  "test",
  "test",
  "The interesting thing about your personality, your essence, is that it is not more or less permanent like your leg bone. Your essence is changeable, like your mind. Every action you take, every thought you have, changes you, even if just a little, making you a little more elevated or a little more degraded.",
];

export default function LinearWithValueLabel({ progress }) {
  const classes = useStyles();
  const [intervalIndex, setIntervalIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIntervalIndex(intervalIndex + 1);
    }, 2000);
  });

  return (
    <div className={classes.root}>
      <LinearProgressWithLabel value={+progress} />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          minHeight: "100vh",
        }}
      >
        <Loading size="1rem" />
        <p style={{ color: "white" }}>{quotes[intervalIndex]}</p>
      </div>
    </div>
  );
}
