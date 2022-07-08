import React, { useEffect, useState } from "react";
import Header from "./MetaComponents/Header";
import ItemSearch from "./SelectionArea/ItemSearch";
import ExpandedItem from "./ItemCardComponents/ExpandedItem";

function App() {
  const [hasQuery, setHasQuery] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [graphData, setGraphData] = useState();

  let expandItem = {
    img: "",
    id: 0,
    price: 0,
    timeStamp: ""
  };

  function readData(event) {
    console.log("Reading Data");
    fetch(`/getPriceHistory?name=${event.target.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setGraphData(Object.values(data)[0]);
      })
      .catch((error) => console.log(error));
  }

  function itemCardClickHandler(event) {
    readData(event);
    
    setExpanded(true);
  }

  function expandedCardClickHandler() {
    setExpanded(false);
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
      <ItemSearch
        itemCardClickHandler={itemCardClickHandler}
        setQuery={setHasQuery}
      />
      {expanded ? (
        <ExpandedItem expand={expandedCardClickHandler} graphData={graphData} />
      ) : null}
    </div>
  );
}

export default App;
