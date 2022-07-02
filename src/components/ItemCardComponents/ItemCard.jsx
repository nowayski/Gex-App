import React from "react";
import Image from "./Image";
import Description from "./Description";
import gexMock from "../../DataFiles/gex_mock";

function destructGexQuery(requiredOutput) {
  const { total, items } = gexMock;
  
  return items[0][requiredOutput];
}

function ItemCard(props) {
  let iconLSource = destructGexQuery("icon_large");
  let altText = destructGexQuery("description");
  let name = destructGexQuery("name");
  let descript = destructGexQuery("description");
  let type = destructGexQuery("type");
  let isMem = destructGexQuery("members");

  return (
    <div className="itemCard">
      <h1>{name}</h1>
      <Image imgSrc={iconLSource} altDesc={altText} />
      <Description desc={descript} type={type} isMem={isMem} />
    </div>
  );
}

export default ItemCard;
