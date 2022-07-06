import React, { useState, useEffect } from "react";
import Header from "./MetaComponents/Header";
import Footer from "./MetaComponents/Footer";
import ItemCard from "./ItemCardComponents/ItemCard";
import SelectionArea from "./SelectionArea/SelectionArea";
import ImageSearch from "./SelectionArea/ImageSearch";

function App() {
  // const [itemList, setItemList] = useState([]);
  // const [urlConfig, setUrlConfig] = useState({
  //   category: 1,
  //   firstLetter: "b",
  //   page: 1,
  // });
  const [hasQuery, setHasQuery] = useState(false);

  // function requestInformation(urlCategory, urlFirstLetter) {
  //   setUrlConfig({
  //     category: urlCategory,
  //     firstLetter: urlFirstLetter,
  //     page: 1,
  //   });
  // }

  // function sendRequest(event) {
  //   fetch("/getData", {
  //     method: "POST",
  //     headers: {
  //       "Content-type": "application/json",
  //       "X-Content-Type-Options": "nosniff",
  //     },
  //     body: JSON.stringify(urlConfig),
  //   })
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((data) => {
  //       console.log(typeof data);
  //       console.log(data.items);
  //       setItemList(data.items);
  //       if (data.items.length > 0) {
  //         setHasQuery(true);
  //       } else {
  //         setHasQuery(false);
  //       }
  //     });
  //   event.preventDefault();
  // }

  return (
    <div className="content-container">
      <Header />
      <h1>
        Search For Items in the <br />
        Grand Exchange.
      </h1>
      <p>Use this tool to look up items on runescape.</p>
      {/* <SelectionArea getInfo={requestInformation} sendRequest={sendRequest} /> */}
      <ImageSearch setQuery={setHasQuery} />
      {/* <div className="item-grid-container">
          {itemList.map((item) => (
            <ItemCard
              key={item.id}
              className="item-grid-item"
              iconLSource={item.icon_large}
              altText={item.name}
              name={item.name}
              descript={item.description}
              type={item.type}
              isMem={item.members}
            />
          ))}
        </div> */}
    </div>
  );
}

export default App;
