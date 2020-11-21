import React from "react";
import { Table } from "antd";
import MaterialTable, { MTableToolbar } from "material-table";
import styles from "../App.css";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
  },
];
const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
  },
];

const TableComponent = ({ data }) => {
  let columns = [
    { title: "#", field: "number" },
    { title: "Channel Name", field: "title" },
    { title: "Videos", field: "count" },
    { title: "Time(hrs)", field: "time" },
  ];
  return (
    <MaterialTable
      columns={columns}
      data={data}
      style={{
        backgroundColor: "#111111",
        color: "#b9b9b9",
        fontSize: 18,
      }}
      options={{
        paging: false,
        search: false,
        headerStyle: { backgroundColor: "#111111", color: "#727272" },
      }}
      components={{
        Groupbar: (props) => (
          <div style={{ backgroundColor: "D4AF37", borderColor: "yellow" }}>
            {" "}
            <MTableToolbar {...props} /> {props.children}{" "}
          </div>
        ),
      }}
      // size="middle"
      // rowClassName={(record, index) =>
      //   record.count > 0 ? "transparent" : "transparent"
      // }
    />
  );
};
export default TableComponent;
