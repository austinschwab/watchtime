import React, { useState} from "react";
import Radium from "radium";
import Report from "./Report";
import Upload from "./Upload";
import "./App.css";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import Manifesto from "./Manifesto";

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
        <Route path="/*" render={(props) => <Redirect to="/" />} />
      </BrowserRouter>
    </div>
  );
};

export default Radium(App);
