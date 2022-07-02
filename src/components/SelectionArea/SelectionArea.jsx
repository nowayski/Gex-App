import React, {useState} from "react";
import DropDown from "./DropDown";
import Selection from "./Selection";

function SelectionArea(props) {
    const [categoryValue, setCategoryValue] = useState("");

    function getValueFromList(val){
        setCategoryValue(val);
    }

  return (
    <div className="grid-container">
      <div className="grid-item">
        <DropDown clickCategory={getValueFromList} />
        <Selection newVal={categoryValue}/>
      </div>
      <div className="grid-item">
        <DropDown />
        <Selection />
      </div>
    </div>
  );
}

export default SelectionArea;
