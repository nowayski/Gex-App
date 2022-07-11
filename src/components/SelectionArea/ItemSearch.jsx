import React, { useEffect, useState } from "react";
import ItemCard from "../ItemCardComponents/ItemCard";
import useDebounce from "../../useDebounce";

function capitalizeFirstLetter(string) {
  string = string.toLowerCase();
  return string.charAt(0).toUpperCase() + string.slice(1);
}

//A function to make an array of urls in order to check if they are valid items on
//the rs3 wiki.
function splitThenURL(vals) {
  let itemList = vals.split(",");
  itemList = itemList.map((item) => item.replace(/^\s+/g, ""));
  itemList = itemList.map((item) => item.replace(/ /g, "_"));
  itemList = itemList.map((item) => capitalizeFirstLetter(item));
  itemList = itemList.map(
    (item) => "https://runescape.wiki/images/" + item + "_detail.png"
  );
  return itemList;
}

//A function to make an image url, this will only get called when appending a new object
//using setItemList stateful setter.
function makeSingleUrl(name) {
  let newName = name;
  newName = newName.replace(/ /g, "_");
  let finalUrl = "https://runescape.wiki/images/" + newName + "_detail.png";
  return finalUrl;
}

function ItemSearch(props) {
  const [textVal, setTextVal] = useState("");
  const [itemList, setItemList] = useState([]);
  const [validItemText, setValidItemText] = useState("");
  const [favourites, setFavourites] = useState(
    localStorage.getItem("favourites") ?? ""
  );

  //This is an async function that utilises await so it acts as a proper
  //validity, as the back end will then only get issues a POST request
  //if the image is also valid therefore being a valid item.

  function checkValidImages(urls) {
    return Promise.all(
      (urls = urls.map((url) =>
        fetch(url).then((res) => {
          if (!res.ok) {
            return "";
          } else {
            return url;
          }
        })
      ))
    );
  }

  function changeHandler(event) {
    let newVal = event.target.value;
    setTextVal(newVal);
  }

  //Handler function: This will firstly turn the current textVal from the form's input into a usable format
  //for the url of the image.
  //Then it will check to see if it's a valid image, and use the /getData POST fetch as a callback function
  //If the promise doesn't throw an error.

  function submitHandler(event) {
    console.log(textVal);
    let inputList = splitThenURL(textVal);

    checkValidImages(inputList).then((url) => {
      setValidItemText("");
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
          if (data.success !== false) {
            Object.keys(data).forEach((key) => {
              setItemList((prevValues) => {
                return [
                  ...prevValues,
                  {
                    imageUrl: makeSingleUrl(key),
                    name: key,
                    itemID: data[key].id,
                    price: data[key].price.toLocaleString("en-US"),
                    timeStamp: data[key].timestamp.substring(0, 10),
                  },
                ];
              });
            });
          } else {
            setValidItemText("Please enter a valid search.");
          }
        });
      setTextVal("");
      return "";
    });

    props.setQuery(true);
    event.preventDefault();
  }

  //Simple delete item handler, that utilises an id check to determine which list item it is.
  function deleteItem(id) {
    setItemList((prevItems) => {
      return prevItems.filter((val, index) => {
        return index !== id;
      });
    });
    if (itemList.length === 1) {
      props.setQuery(false);
    }
  }

  function saveFavourites() {
    let toWrite = "";
    itemList.forEach((item) => (toWrite += item.name + ","));
    toWrite = toWrite.slice(0,-1);
    localStorage.setItem("favourites", toWrite);
    setFavourites(localStorage.getItem("favourites"));
  }

  function getFavourites() {
    let inputList = splitThenURL(favourites);
    checkValidImages(inputList).then((url) => {
      setValidItemText("");
      fetch("/getData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ name: favourites}),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data.success !== false) {
            Object.keys(data).forEach((key) => {
              setItemList((prevValues) => {
                return [
                  ...prevValues,
                  {
                    imageUrl: makeSingleUrl(key),
                    name: key,
                    itemID: data[key].id,
                    price: data[key].price.toLocaleString("en-US"),
                    timeStamp: data[key].timestamp.substring(0, 10),
                  },
                ];
              });
            });
          } else {
            setValidItemText("Please enter a valid search.");
          }
        });
      setTextVal("");
      return "";
    });
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
      {validItemText !== "" ? <p>{validItemText}</p> : <p></p>}
      <button onClick={saveFavourites} className="favouriteButton">
        Save Favourites
      </button>
      <button onClick={getFavourites} className="favouriteButton">
        Load Favourites
      </button>
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

export default ItemSearch;
