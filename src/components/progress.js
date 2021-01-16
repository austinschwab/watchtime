import React from "react";
import PropTypes from "prop-types";
import LinearProgress from "@material-ui/core/LinearProgress";
import { Box, Typography } from "@material-ui/core";

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

export default function LinearProgressWithLabel(props) {
  return (
    <Box display="flex">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} color="secondary" />
      </Box>
      <Box minWidth={35}>
        <p className="white">{`${Math.round(props.value)}%`}</p>
      </Box>
    </Box>
  );
}
