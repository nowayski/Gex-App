import React, { useEffect, useState } from "react";
import Header from "./MetaComponents/Header";
import ItemSearch from "./SelectionArea/ItemSearch";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

function App() {
  const [hasQuery, setHasQuery] = useState(false);

  const data = [
    { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
    { name: "Page B", uv: 200, pv: 2400, amt: 2400 },
    { name: "Page C", uv: 100, pv: 2400, amt: 2400 },
  ];

  function getGraphData() {
    fetch(
      "https://api.weirdgloop.org/exchange/history/rs/last90d?name=salmon",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "User-Agent": "GEX Query App",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        return data;
      })
      .catch((error) => console.log(error));
  }


  return (
    <div className="content-container">
      <Header />
      <h1>
        Search For Items in the <br />
        Grand Exchange.
      </h1>
      <p>
        Use this tool to look up items on runescape.
        <br /> Searches may be separated by commas. e.g. "Cod, Salmon, Bronze
        Spear".
        <br />
        Click an item to view price history information.
      </p>
      <ItemSearch setQuery={setHasQuery} />

      <LineChart width={500} height={300} data={data}>
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
      </LineChart>
    </div>
  );
}

export default App;
