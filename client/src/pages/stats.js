import React from "react";
import HeaderStats from "../components/HeaderStats";
import BarGraph from "../components/BarGraph";
import DoughnutChart from "../components/DoughnutChart"

function Stats() {
  return (
    <div>
      <HeaderStats />
      <BarGraph />
      <DoughnutChart />
    </div>
  );
}

export default Stats;
