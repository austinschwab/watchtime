import React, { useState, useEffect } from "react";
import { Button } from "antd";
import "./App.css";
import Radium from "radium";
import ScrollAnimation from "react-animate-on-scroll";
import Menu from "./components/menu";

const UploadJSON = ({ navigation, setJsonData }) => {
  const [error, setError] = useState(null);
  const [filedUploaded, setFiledUploaded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
          <p className="white text-center welcome-text">
            Welcome <span style={{ fontWeight: 700 }}>Youtuber</span>
          </p>
        </ScrollAnimation>
        <p className="welcome-instructions-text white text-center">
          Follow the instructions below to download your Youtube
          watch-history.json
        </p>

        <div
          className="UploadContainer flex column align-center margin-auto"
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
                src="https://www.loom.com/embed/ff08b15400a34979b5a162163156b5e4"
                frameborder="0"
                title="watchtime"
                webkitallowfullscreen
                mozallowfullscreen
                allowfullscreen
                className="iframe"
              ></iframe>
            </div>
          </div>
          <form className="margin-auto">
            <input
              id="upload"
              type="file"
              onChange={handleChange}
              className="white"
              style={{ width: 225, marginTop: 20 }}
            />
          </form>
          {error ? (
            <p style={{ color: "#c51818" }}>
              Wrong file type. Please upload a .json file as instructed.
            </p>
          ) : null}

          <Button
            disabled={!filedUploaded}
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
            2) Click Deselect all, scroll down to the bottom to select YouTube
            and YouTube Music, click multiple formats, and change History to
            JSON.
            <p></p>
            <p>Click Next step</p>
          </p>
          <p className="instructions white">
            3) Create export and you'll receieve an email when it's ready.
            You'll now have a folder called YouTube and YouTube Music. Open
            history you'll find a file called watch-history.json.
          </p>
          <p className="instructions white">
            Your watch-history.json file contains an array of videos you've
            watched. It doesn't include any personal information. We do not
            store your data. Our code is public and auditable.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Radium(UploadJSON);
