import React from "react";
import { Table } from "antd";
import styles from "../App.css";
import { List, Typography, Divider, Row, Col } from "antd";

const TableComponent = ({ data }) => {
  let columns = [
    { title: "#", field: "number" },
    { title: "Channel Name", field: "title" },
    { title: "Videos", field: "count" },
    { title: "Time(hrs)", field: "time" },
  ];
  console.log(data);
  data.unshift({
    title: "Channel Name",
    count: "Videos",
    time: "Time(hrs)",
  });
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
                  {item.count}
                </Col>
                <Col
                  span={3}
                  style={{ color: index === 0 ? "#727272" : "#b9b9b9" }}
                >
                  {item.time}
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
