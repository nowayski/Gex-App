import React from "react";
import Image from "./Image";
import Description from "./Description";

function ItemCard(props) {

  return (
    <div className="itemCard" >
      <button className="closeButton" onClick={() => props.clickHandler(props.id)}>X</button>
      <h1>{props.name}</h1>
      <Image imgSrc={props.iconLSource} altDesc={props.altText} />
      <Description itemID={props.itemID} price={props.price} timeStamp={props.timeStamp} />
      <button id={props.itemID} className="expandButton" onClick={props.itemCardClickHandler}>Price History</button>
    </div>
  );
}

export default ItemCard;
