import React, { useState } from "react";
import Image from "./Image";
import Description from "./Description";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

function ItemCard(props) {
  const [expanded, setExpanded] = useState(false);
  const [graphData, setGraphData] = useState();
  const [buttonText, setButtonText] = useState("Price History");

  //Issues a GET request using a query string for the past 90 day item price history
  //This is picked up by express server and returns a list of JSON objects, which is set with setGraphData.
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

  //Expands the item card to have a fixed central property with a higher z-index.
  //Set's a state to expanded, hence making the graph appear.
  function itemCardClickHandler(event) {
    let classToSet = "";
    let classToRemove = "";
    readData(event);
    setExpanded(!expanded);
    if (expanded) {
      setButtonText("Price History");
      classToSet = "itemCard";
      classToRemove = "expanded-div";
    } else {
      setButtonText("Back");
      
      classToRemove = "itemCard";
      classToSet = "expanded-div";
    }
    event.target.parentElement.classList.remove(classToRemove);
    event.target.parentElement.classList.add(classToSet);
  }

  return (
    <div className="itemCard">
      <button
        className="closeButton"
        onClick={() => props.clickHandler(props.id)}
      >
        X
      </button>
      <h1>{props.name}</h1>
      <Image imgSrc={props.iconLSource} altDesc={props.altText} />
      <Description
        itemID={props.itemID}
        price={props.price}
        timeStamp={props.timeStamp}
      />

      {expanded ? (
        <div className="graphDiv">
          <LineChart width={900} height={400} data={graphData}>
            <Line
              type="monotone"
              dataKey="price"
              stroke="#ffd369"
              dot={false}
              activeDot={{ r: 8 }}
            />
            <CartesianGrid strokeDasharray="0" />
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </div>
      ) : null}

      <button
        id={props.itemID}
        className="expandButton"
        onClick={itemCardClickHandler}
      >
        {buttonText}
      </button>
    </div>
  );
}

export default ItemCard;
