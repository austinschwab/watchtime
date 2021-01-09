import React from "react";
const GithubContainer = () => {
  return (
    <div className="Github_Container" style={{ margin: "auto" }}>
      <p style={{ textAlign: "center", color: "#9d9d9d" }}>
        After processing your report, {""}
        <span style={{ color: "white" }}>we do not store any data. {""}</span>
        Our code is public and auditable.
      </p>

      <a href="https://github.com">
        <div className="github_btn" key="github">
          <img
            src={process.env.PUBLIC_URL + "images/github.png"}
            alt="img"
            style={{ width: 24 }}
          />
          <span className="github_text" key="gittext">
            Github
          </span>
        </div>
      </a>
    </div>
  );
};
export default GithubContainer;
