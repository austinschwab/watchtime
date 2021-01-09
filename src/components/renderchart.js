import React from "react";
import { Spring, config } from "react-spring/renderprops";
import VisibilitySensor from "react-visibility-sensor";
import * as constants from "../constants";
import "../App.css";
import ChartComponent from "./chart";
import TableComponent from "./table";

const RenderChart = ({ item, index }) => {
  return (
    <div className="StatsContainer column_center">
      <>
        <div
          key={index}
          id={`chart${index}`}
          style={{
            marginBottom: 100,
            paddingTop: 75,
          }}
        >
          <VisibilitySensor>
            {({ isVisible }) => (
              <Spring delay={100} to={{ opacity: isVisible ? 1 : 0 }}>
                {({ opacity }) => (
                  <div
                    className="categoryBox"
                    style={{ opacity, margin: "auto", marginBottom: 50 }}
                  >
                    <div
                      style={{
                        width: 12,
                        height: 12,
                        backgroundColor: constants.Categories[index].color,
                        borderRadius: 20,
                      }}
                    ></div>
                    <span
                      style={{
                        fontSize: 15,
                        fontWeight: 550,
                        color: "#b4b4b4",
                        marginLeft: 12,
                      }}
                    >
                      {constants.Categories[index].name}
                    </span>
                  </div>
                )}
              </Spring>
            )}
          </VisibilitySensor>

          <VisibilitySensor>
            {({ isVisible }) => (
              <Spring delay={100} to={{ opacity: isVisible ? 1 : 0 }}>
                {({ opacity }) => (
                  <div style={{ opacity, width: "90%", margin: "auto" }}>
                    {item.heading}
                    {item.subtitle}
                  </div>
                )}
              </Spring>
            )}
          </VisibilitySensor>

          {index === 4 && <TableComponent data={item.component.data} />}

          {index !== 0 &&
            (index !== 4 ? (
              <div
                style={{
                  position: "relative",
                  width: "45vw",
                  height: "45vh",
                  minWidth: 375,
                  minHeight: 375,
                  maxWidth: 600,
                  margin: "auto",
                }}
              >
                <ChartComponent
                  key={item.component.key}
                  type={item.component.type}
                  data={item.component.data}
                  labels={item.component.labels}
                  id={item.component.id}
                  title={item.component.title}
                />
              </div>
            ) : (
              <ChartComponent
                key={item.component.key}
                type={item.component.type}
                data={item.component.data}
                labels={item.component.labels}
                id={item.component.id}
                title={item.component.title}
              />
            ))}
        </div>
      </>
    </div>
  );
};

export default RenderChart;
