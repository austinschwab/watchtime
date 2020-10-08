import React, { useEffect } from "react";
import data from "./data/watch-history1.json";
import "./App.css";
import { timesBarChartData } from "./functions/chartFunctions";
import BarChart from "./charts/barChart";
function App() {
  let data = timesBarChartData();
  useEffect(() => {}, []);
  return (
    <div className="App">
      <BarChart data={data} />
    </div>
  );
}

export default App;
