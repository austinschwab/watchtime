import React from "react";
import { Divider } from "antd";
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
    <div className="Table margin-auto">
      {data &&
        data.map((item, index) => {
          return (
            <div key={`listContainer${index}`}>
              <div
                key={index}
                className="flex full-width row align-center table_row"
                style={{
                  color: index === 0 ? "#727272" : "#b9b9b9",
                  ":hover": {
                    color: "white",
                  },
                }}
              >
                <span
                  className="inherit-color "
                  style={{
                    width: "10%",
                  }}
                >
                  {index === 0 ? "#" : index}
                </span>
                <span className="inherit-color" style={{ width: "55%" }}>
                  {item.title}
                </span>
                <span
                  className="inherit-color text-center"
                  style={{
                    width: "20%",
                  }}
                >
                  {item.videos}
                </span>
                <span
                  className="inherit-color text-center"
                  style={{
                    width: "15%",
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
