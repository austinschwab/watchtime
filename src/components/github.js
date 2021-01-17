import React from "react";
const GithubContainer = () => {
  return (
    <div className="GithubContainer flex column align-center white margin-auto">
      <span className="text-center grey">
        After processing your report, {""}
        <span className="white">we do not store any data. {""}</span>
        Our code is public and auditable.
      </span>

      <a href="https://github.com/austinschwab/watchtime">
        <div
          className="github_btn flex row align-center justify-start"
          key="github"
        >
          <img
            src={process.env.PUBLIC_URL + "images/github.png"}
            alt="img"
            style={{ width: 24 }}
          />
          <span className="github_text text-center grey" key="gittext">
            Github
          </span>
        </div>
      </a>
    </div>
  );
};
export default GithubContainer;
