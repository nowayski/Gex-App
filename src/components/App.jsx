import React from "react";
import Header from "./MetaComponents/Header";
import Footer from "./MetaComponents/Footer";
import ItemCard from "./ItemCardComponents/ItemCard";
import SelectionArea from "./SelectionArea/SelectionArea";

function App() {
  return (
    <div>
      <Header />
      <SelectionArea />
      <div>
        <ItemCard />
      </div>
      <Footer />
    </div>
  );
}

export default App;
