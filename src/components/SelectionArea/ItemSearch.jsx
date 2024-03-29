import React, { useEffect, useState } from "react";
import ItemCard from "../ItemCardComponents/ItemCard";
import useDebounce from "../../useDebounce.js";

function ItemSearch(props) {
  const [textVal, setTextVal] = useState("");
  const [itemList, setItemList] = useState([]);
  const [validItemText, setValidItemText] = useState("");
  const debouncedValue = useDebounce(textVal, 500);
  const [favourites, setFavourites] = useState(
    localStorage.getItem("favourites") ?? ""
  );

  //This function will allow any on click or any other function to be delayed once clicked.
  //This was added in order to stop the user spam clicking the "getFavourites" button.
  function debounceFunction(func, timeout = 300) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  }

  //Simple function to capitalise the first word in a string in order to format the url properly.
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
  //This gets called on the search bar's text value, when the value has been unchanged for half a second.
  //This can be changed in the useDebounce declaration at the top of the function.

  function populateList(inputListName) {
    let inputList = splitThenURL(inputListName);
    checkValidImages(inputList).then((url) => {
      setValidItemText("");
      fetch("/getData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ name: inputListName }),
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

              setTextVal("");
            });
          } else if (data.success === false && textVal !== "") {
            setValidItemText("Please enter a valid search.");
          }
        });
      return "";
    });

    props.setQuery(true);
  }

  useEffect(() => {
    populateList(textVal);
  }, [debouncedValue]);

  //Simple delete item handler, that utilises an id check to determine which list item it is.
  //See function call in the ItemCard component.
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

  //Once a list has been populated, this click handler will push the list of names
  //To localStorage as a string.
  function saveFavourites() {
    let toWrite = "";
    itemList.forEach((item) => (toWrite += item.name + ","));
    toWrite = toWrite.slice(0, -1);
    localStorage.setItem("favourites", toWrite);
    setFavourites(localStorage.getItem("favourites"));
  }

  //This click handler retrieves and issues necessary fetch requests for favourited
  //items.
  function getFavourites() {
    populateList(favourites);
  }

  const favouriteHandler = debounceFunction(() => getFavourites());

  return (
    <div>
      <input
        onChange={changeHandler}
        className="search-bar"
        type="text"
        value={textVal}
        placeholder="Start typing to search for an item.."
      />
      {validItemText !== "" ? <p>{validItemText}</p> : <p></p>}
      <button onClick={saveFavourites} className="favouriteButton">
        Save Favourites
      </button>
      <button onClick={favouriteHandler} className="favouriteButton">
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
