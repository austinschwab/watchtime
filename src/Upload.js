import React, { useState } from "react";
import { Button } from "antd";
import "./App.css";
import Radium from "radium";
import ScrollAnimation from "react-animate-on-scroll";
import Menu from "./components/menu";

const UploadJSON = ({ navigation, setJsonData }) => {
  const [error, setError] = useState(null);
  const [filedUploaded, setFiledUploaded] = useState(false);

  const handleChange = (e) => {
    const fileReader = new FileReader();

    fileReader.onload = (e) => {
      let fileInput = document.getElementById("upload");
      let fileName = fileInput.files[0].name;
      let fileExtension = fileName.split(".").pop();

      if (fileExtension === "json") {
        let jsonObj = JSON.parse(e.target.result);
        setJsonData(jsonObj);
        setFiledUploaded(true);
        setError(null);
      } else {
        setError("Error");
      }
    };
    fileReader.readAsText(e.target.files[0]);
  };

  return (
    <div className="Content">
      <Menu />
      <div className="IntroSection full-width flex column margin-auto">
        <ScrollAnimation
          animateIn="animate__animated animate__fadeIn"
          duration={6}
        >
          <h1 className="white text-center welcome-text">Welcome Youtuber</h1>
        </ScrollAnimation>
        <p className="welcome-instructions-text white text-center">
          Follow the instructions below to get your Youtube stats.
        </p>

        <div
          className="UploadContainer flex column align-center margin-atuo"
          style={{
            ":hover": {
              border: "solid",
              borderColor: "#c51818",
              borderWidth: "4px",
            },
          }}
        >
          <div className="video">
            <div className="iframe-container">
              <iframe
                src="https://www.loom.com/embed/911c36117e15469aa341e2408805a0bf"
                frameborder="0"
                title="testvideo"
                webkitallowfullscreen
                mozallowfullscreen
                allowfullscreen
                className="iframe"
              ></iframe>
            </div>
          </div>
          <form className="half-width">
            <input
              id="upload"
              type="file"
              onChange={handleChange}
              className="half-width white"
            />
          </form>
          {error ? (
            <p style={{ color: "#c51818" }}>
              Wrong file type. Please upload a .json file as instructed.
            </p>
          ) : null}

          <Button
            // disabled={!filedUploaded}
            className="calculate_button"
            onClick={() => navigation.history.push("/report")}
          >
            Calculate
          </Button>
        </div>
        <div className="flex column align-start">
          <p className="instructions white">
            1) Navigate to{" "}
            <a
              href={"https://takeout.google.com/settings/takeout"}
              target="_blank"
              rel="noopener noreferrer"
              className="full-width"
            >
              Google Takeout
            </a>{" "}
            to download your own watch history.
          </p>
          <p className="instructions white">
            2) Click Deselect all, scroll down to select Youtube, click multiple
            formats, and change History to JSON.
          </p>
          <p className="instructions white">
            3) The rest of the settings are fine as is. Create export and check
            your email soon. Once you've recieved your watch history, come back
            to this page to upload watch_history.json.
          </p>
          <p className="instructions white">
            After processing your watch history, we delete the file you provided
            us. We do not store your data. Our code is public and auditable.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Radium(UploadJSON);
