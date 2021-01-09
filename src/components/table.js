import React from "react";
import { Table } from "antd";
import "../App.css";
import { List, Typography, Divider, Row, span } from "antd";
import Radium from "radium";

const TableComponent = ({ data }) => {
  if (data && data[0].title !== "Channel Name") {
    data.unshift({
      title: "Channel Name",
      videos: "Videos",
      time: "Time(hrs)",
    });
  }

  return (
    <div style={{ maxWidth: "40vw", margin: "auto" }}>
      {data &&
        data.map((item, index) => {
          return (
            <div key={`listContainer${index}`}>
              <div
                key={index}
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  fontSize: 18,
                  alignItems: "center",
                  color: index === 0 ? "#727272" : "#b9b9b9",
                  ":hover": {
                    color: "white",
                  },
                }}
                // className="ChangeRowColor"
              >
                <span
                  style={{
                    color: "inherit",
                    width: "10%",
                  }}
                >
                  {index === 0 ? "#" : index}
                </span>
                <span
                  style={{
                    color: "inherit",
                    width: "50%",
                  }}
                >
                  {item.title}
                </span>
                <span
                  style={{
                    color: "inherit",
                    width: "20%",
                  }}
                >
                  {item.videos}
                </span>
                <span
                  style={{
                    color: "inherit",
                    width: "20%",
                  }}
                >
                  {index === 0 ? item.time : Math.round(item.time)}
                </span>
              </div>
              <Divider style={{ borderTop: "1px solid #333" }} />
            </div>
          );
        })}
    </div>
  );
};
export default Radium(TableComponent);
