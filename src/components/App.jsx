import React, { useState, useEffect } from "react";
import Header from "./MetaComponents/Header";
import Footer from "./MetaComponents/Footer";
import ItemCard from "./ItemCardComponents/ItemCard";
import SelectionArea from "./SelectionArea/SelectionArea";

function App() {
  const [itemList, setItemList] = useState([]);
  const [urlConfig, setUrlConfig] = useState({
    category: 1,
    firstLetter: "b",
    page: 1,
  });

  function requestInformation(urlCategory, urlFirstLetter) {
    setUrlConfig({
      category: urlCategory,
      firstLetter: urlFirstLetter,
      page: 1,
    });

    fetch("/getData", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "X-Content-Type-Options": "nosniff",
      },
      body: JSON.stringify(urlConfig),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(typeof data);
        console.log(data.items);
        setItemList(data.items);
      });
  }

  return (
    <div>
      <Header />
      <SelectionArea getInfo={requestInformation} />
      <div className="item-grid-container">
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
      </div>
      <Footer />
    </div>
  );
}

export default App;
