import React,{useState} from "react";
import categories from "../../DataFiles/categories";

function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}


function DropDown(props) {
const catVals = Object.values(categories);
const [isShowing, setIsShowing] = useState(false);

function selectionHandler(event){
    let val = event.target.textContent;
    props.clickCategory(val);
    setIsShowing(false);
}

  return (
    <div className="dropdown">
      <button className="dropbtn">Categories</button>
      <div className="dropdown-content">
        {catVals.map((val) => {
          return (
            <p onClick={selectionHandler} key={val}>
              {val}
            </p>
          );
        })}
      </div>
    </div>
  );
}

export default DropDown;
