import React from "react";
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

export default function LinearWithValueLabel({ progress }) {
  const classes = useStyles();

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
      </div>
    </div>
  );
}
