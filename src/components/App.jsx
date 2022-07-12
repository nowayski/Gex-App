import React, { useEffect, useState } from "react";
import Header from "./MetaComponents/Header";
import ItemSearch from "./SelectionArea/ItemSearch";

function App() {
  const [hasQuery, setHasQuery] = useState(false);

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
        <br />
        When you are satisfied with your list, press save favourites (persists through reload).
      </p>
      <ItemSearch setQuery={setHasQuery} />
    </div>
  );
}

export default App;
