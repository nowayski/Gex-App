import React, { useState } from "react";
import ItemCard from "../ItemCardComponents/ItemCard";

function capitalizeFirstLetter(string) {
  string = string.toLowerCase();
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function ImageSearch(props) {
  const [textVal, setTextVal] = useState("");
  const [itemList, setItemList] = useState([]);

  function checkValidImage(url) {
    fetch(url)
      .then((res) => {
        if (res.status !== 404) {
          return false;
        } else {
          return true;
        }
      })
      .catch((error) => console.log("HTML Error caught"));
  }

  function changeHandler(event) {
    let newVal = event.target.value;
    setTextVal(newVal);
  }

  function submitHandler(event) {
    let itemName = textVal;
    itemName = capitalizeFirstLetter(itemName);
    itemName = itemName.replace(/ /g, "_");
    let newUrl = "https://runescape.wiki/images/" + itemName + "_detail.png";


    fetch("/getData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ name: textVal }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        let newName = Object.keys(data)[0];
        setItemList((prevValues) => {
          return [
            ...prevValues,
            {
              imageUrl: newUrl,
              name: newName,
              itemID: data[newName].id,
              price: data[newName].price,
              timeStamp: data[newName].timestamp.substring(0,10),
            },
          ];
        });
      });

    props.setQuery(true);
    event.preventDefault();
  }

  function deleteItem(id) {
    setItemList((prevItems) => {
      return prevItems.filter((val, index) => {
        return index !== id;
      });
    });
    console.log(itemList.length);
    if (itemList.length === 1) {
      props.setQuery(false);
    }
  }

  return (
    <div>
      <form onSubmit={submitHandler}>
        <input
          onChange={changeHandler}
          className="search-bar"
          type="text"
          value={textVal}
          placeholder="Start typing to search for an item.."
        />
      </form>
      <div className="item-grid-container">
        {itemList.map((item, index) => (
          <ItemCard
            key={index}
            id={index}
            className="item-grid-item"
            iconLSource={item.imageUrl}
            altText={item.name}
            itemID={item.itemID}
            name={capitalizeFirstLetter(item.name)}
            price={item.price}
            timeStamp={item.timeStamp}
            clickHandler={deleteItem}
          />
        ))}
      </div>
    </div>
  );
}

export default ImageSearch;
