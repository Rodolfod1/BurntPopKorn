import React from "react";
import HeaderStats from "../components/HeaderStats";
import BarGraph from "../components/BarGraph";
import DoughnutChart from "../components/DoughnutChart";
import BetterDonut from "../components/BetterDonut";
// BetterDonut will replace the DoughnutChart to include the labels , R. Diaz 
function Stats() {
  return (
    <div>
      <HeaderStats />
      <BarGraph />
      {/* <DoughnutChart /> */}
      <BetterDonut />
    </div>
  );
}

export default Stats;
