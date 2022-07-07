import React from "react";
import Image from "./Image";
import Description from "./Description";

function ItemCard(props) {

  return (
    <div  className="itemCard">
      <button onClick={() => props.clickHandler(props.id)}>X</button>
      <h1>{props.name}</h1>
      <Image imgSrc={props.iconLSource} altDesc={props.altText} />
      <Description itemID={props.itemID} price={props.price} timeStamp={props.timeStamp} />
    </div>
  );
}

export default ItemCard;
