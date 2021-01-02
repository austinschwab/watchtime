import React, { useState, useEffect, Item } from "react";
import { Button } from "antd";
import Radium from "radium";
import Report from "./Report";
import "./App.css";
import * as constants from "./constants";

const App = () => {
  const [jsonfile, setJsonfile] = useState(constants.TestData);
  const [error, setError] = useState(null);
  const [getReport, setGetReport] = useState(false);

  const handleChange = (e) => {
    const fileReader = new FileReader();

    fileReader.onload = (e) => {
      // console.log("e.target.result", e.target.result);
      let fileInput = document.getElementById("upload");
      let fileName = fileInput.files[0].name;
      let fileExtension = fileName.split(".").pop();

      if (fileExtension === "json") {
        let jsonObj = JSON.parse(e.target.result);
        setJsonfile(jsonObj);
        setError(null);
      } else {
        setError("Error");
        console.log(error);
      }
    };
    fileReader.readAsText(e.target.files[0]);
  };

  return (
    <div className="App Body">
      {/* <Button type="primary" onClick={() => generateCompleteReportData()}>
    Generate Report
  </Button> */}
      {getReport ? (
        <Report json={jsonfile} />
      ) : (
        <div className="Content">
          <div className="Menu">
            <img
              src={process.env.PUBLIC_URL + "images/watchtime_logo.png"}
              alt="img"
              style={{ width: 200 }}
            />
            <div style={{ float: "right" }}>
              <a
                href={"https://takeout.google.com/settings/takeout"}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: 20, color: "white" }}
              >
                Manifesto
              </a>{" "}
            </div>
          </div>

          <div className="Content">
            <div className="IntroSection">
              <h1
                style={{
                  fontSize: 48,
                  fontWeight: 700,
                  color: "white",
                  textAlign: "center",
                }}
              >
                Welcome Youtuber
              </h1>
              <p
                style={{
                  fontSize: 20,
                  color: "white",
                  textAlign: "center",
                  fontWeight: 400,
                }}
              >
                Follow the instructions below to get your Youtube stats.
              </p>

              <div
                className="UploadContainer"
                style={{
                  ":hover": {
                    border: "solid",
                    borderColor: "#c51818",
                    borderWidth: "4px",
                  },
                }}
              >
                <div className="video">
                  <div
                    style={{
                      position: "relative",
                      paddingBottom: "66.66666666666666%",
                      height: 0,
                    }}
                  >
                    <iframe
                      src="https://www.loom.com/embed/911c36117e15469aa341e2408805a0bf"
                      frameborder="0"
                      title="testvideo"
                      webkitallowfullscreen
                      mozallowfullscreen
                      allowfullscreen
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: 266,
                        height: 189,
                      }}
                    ></iframe>
                  </div>
                </div>
                <form style={{ width: "50%" }}>
                  <input
                    id="upload"
                    type="file"
                    onChange={handleChange}
                    style={{ color: "white", width: "50%" }}
                  />
                </form>
                {error ? (
                  <p style={{ color: "#c51818" }}>
                    Wrong file type. Please upload a .json file as instructed.
                  </p>
                ) : null}

                <Button
                  className="calculate_button"
                  onClick={() => setGetReport(true)}
                >
                  Calculate
                </Button>
              </div>
              <div className="InstructionsContainer">
                <p className="instructions">
                  1) Navigate to{" "}
                  <a
                    href={"https://takeout.google.com/settings/takeout"}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ width: "100%" }}
                  >
                    Google Takeout
                  </a>{" "}
                  to download your own watch history.
                </p>
                <p className="instructions">
                  2) Click Deselect all, scroll down to select Youtube, click
                  multiple formats, and change History to JSON.
                </p>
                <p className="instructions">
                  3) The rest of the settings are fine as is. Create export and
                  check your email soon. Once you've recieved your watch
                  history, come back to this page to upload watch_history.json.
                </p>
                <p className="instructions">
                  After processing your watch history, we delete the file you
                  provided us. We do not store your data. Our code is public and
                  auditable.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Radium(App);
