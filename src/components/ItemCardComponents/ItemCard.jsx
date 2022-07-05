import React from "react";
import Image from "./Image";
import Description from "./Description";

function ItemCard(props) {

  return (
    <div className="itemCard">
      <h1>{props.name}</h1>
      <Image imgSrc={props.iconLSource} altDesc={props.altText} />
      <Description desc={props.descript} type={props.type} isMem={props.isMem} />
    </div>
  );
}

export default ItemCard;
