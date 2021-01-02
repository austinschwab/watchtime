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
    backgroundColor: "black",
  },
});
const quotes = [
  "Your worldview is a portfolio of stories. —Jack Butcher",
  "If you’re not paying for the product, then you are the product. —Daniel Hövermann",
  "Nothing vast enters the life of mortals without a curse. —Sophocles",
  "We’re training and conditioning a whole new generation of people that when we are uncomfortable or lonely or uncertain or afraid we have a digital pacifier for ourselves that is kind of atrophying our own ability to deal with that. —Tristan Harris",
  "Don’t think about turning your smartphone off once in a while...think about turning it on once in a while. -Bodo Schäfer",
];

export default function LinearWithValueLabel({ progress }) {
  const classes = useStyles();
  const [intervalIndex, setIntervalIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIntervalIndex(intervalIndex + 1);
    }, 7000);
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
        <p
          style={{
            marginTop: 90,
            color: "white",
            fontSize: 25,
            fontWeight: 500,
            maxWidth: "60%",
          }}
        >
          {quotes[intervalIndex]}
        </p>
      </div>
    </div>
  );
}
