import React from "react";

function Description(props) {
  return (
    <div>
      <p>{props.desc}</p>
      <p>Type: {props.type}</p>
      <p>Members: {props.isMem}</p>
    </div>
  );
}

export default Description;
