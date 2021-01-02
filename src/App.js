import React, { useState, useEffect, Item } from "react";
import Radium from "radium";
import Report from "./Report";
import Upload from "./Upload";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import Manifesto from "./Manifesto";

// constants.sampleReportData ? constants.sampleReportData : null

const App = () => {
  const [jsonData, setJsonData] = useState(null);
  return (
    <div className="App">
      <BrowserRouter>
        <Route
          path="/"
          exact
          render={(props) => <Report navigation={props} sample={true} />}
        />
        <Route
          path="/upload"
          exact
          render={(props) => (
            <Upload navigation={props} setJsonData={setJsonData} />
          )}
        />
        <Route
          path="/report"
          exact
          render={(props) => (
            <Report navigation={props} sample={false} json={jsonData} />
          )}
        />
        <Route
          path="/manifesto"
          exact
          render={(props) => <Manifesto navigation={props} />}
        />
      </BrowserRouter>
    </div>
  );
};

export default Radium(App);
