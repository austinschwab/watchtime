import React, { useState, useEffect, Item, button } from "react";
import * as classes from "./App.css";
import Upload from "rc-upload";

const UploadJSON = () => {
  const [jsonfile, setJsonfile] = useState();

  const props = {
    action: (file) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(setJsonfile(file));
        }, 2000);
      });
    },
    multiple: false,
    onStart(file) {
      console.log("onStart", file, file.name);
    },
    onSuccess(ret) {
      console.log("onSuccess", ret);
    },
    onError(err) {
      console.log("onError", err);
    },
  };

  return (
    <div className="App">
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
                borderWidth: "1px",
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
                  webkitallowfullscreen
                  mozallowfullscreen
                  allowfullscreen
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: 266,
                  }}
                ></iframe>
              </div>
            </div>
            <Upload {...props}>
              <button className="upload_button">
                <img
                  src={process.env.PUBLIC_URL + "images/upload.svg"}
                  alt="upload"
                />
              </button>
              {}
            </Upload>
            <button className="calculate_button">
              <p style={{ color: "#111", alignText: "center" }}>Calculate</p>
            </button>
          </div>

          {/* steps */}
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
              check your email soon. Once you've recieved your watch history,
              come back to this page to upload watch_history.json.
            </p>
          </div>
        </div>
      </div>{" "}
    </div>
  );
};

export default UploadJSON;
