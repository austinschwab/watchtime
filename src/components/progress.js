import React from "react";
import PropTypes from "prop-types";
import LinearProgress from "@material-ui/core/LinearProgress";
import Box from "@material-ui/core/Box";

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

export default function LinearProgressWithLabel(props) {
  return (
    <Box display="flex">
      <Box width="100%">
        <LinearProgress variant="determinate" {...props} color="secondary" />
      </Box>
    </Box>
  );
}
