import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import Box from "@material-ui/core/Box";
import Carousel from "./carousel";
import _ from "lodash";
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

  return (
    <div className={classes.root}>
      <LinearProgressWithLabel value={+progress} />
      <div
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <Carousel />
      </div>
    </div>
  );
}
