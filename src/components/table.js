import React from "react";
import { Table } from "antd";
import styles from "../App.css";
import { List, Typography, Divider, Row, Col } from "antd";

const TableComponent = ({ data }) => {
  console.log(data);
  if (data && data[0].title !== "Channel Name") {
    data.unshift({
      title: "Channel Name",
      videos: "Videos",
      time: "Time(hrs)",
    });
  }
  return (
    <List>
      {data &&
        data.map((item, index) => {
          return (
            <div style={{ fontSize: 18 }}>
              <Row style={{ width: "100%" }}>
                <Col
                  span={4}
                  style={{
                    color: index === 0 ? "#727272" : "#b9b9b9",
                  }}
                >
                  {index === 0 ? "#" : index}
                </Col>
                <Col
                  span={12}
                  style={{ color: index === 0 ? "#727272" : "#b9b9b9" }}
                >
                  {item.title}
                </Col>
                <Col
                  span={3}
                  style={{ color: index === 0 ? "#727272" : "#b9b9b9" }}
                >
                  {item.videos}
                </Col>
                <Col
                  span={3}
                  style={{ color: index === 0 ? "#727272" : "#b9b9b9" }}
                >
                  {index === 0 ? item.time : Math.round(item.time)}
                </Col>
              </Row>
              <Divider style={{ borderTop: "1px solid #333" }} />
            </div>
          );
        })}
    </List>
  );
};
export default TableComponent;
