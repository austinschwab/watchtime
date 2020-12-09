import React, { useState, useEffect, Item, button } from "react";
import * as classes from "./App.css";
import Upload from "rc-upload";

const UploadJSON = () => {
  return (
    <div className="App">
      <div className="Content">
        <div className="Menu">
          <img
            src={process.env.PUBLIC_URL + "images/watchtime_logo.png"}
            alt="img"
            style={{ width: 200, padding: 40 }}
          />
        </div>
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
                    width: "100%",
                    height: "100%",
                  }}
                ></iframe>
              </div>
            </div>
            <Upload>
              <button className="upload_button">
                <img
                  src={process.env.PUBLIC_URL + "images/upload.svg"}
                  alt="upload"
                />
              </button>
            </Upload>
            <button className="calculate_button">
              <p style={{ color: "#111", alignText: "center" }}>Calculate</p>
            </button>
          </div>
          <p
            style={{
              fontSize: 20,
              color: "white",
              textAlign: "center",
              fontWeight: 400,
            }}
          >
            Navigate to Google Takeout to download your own watch history
          </p>
        </div>
      </div>{" "}
    </div>
  );
};

export default UploadJSON;
