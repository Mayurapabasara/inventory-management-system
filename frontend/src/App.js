import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./componet/Home/Home";
import Item from "./componet/Item/Item";
import UpdateItem from "./componet/Item/UpdateItem";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/addItem" element={<Item/>}/>
        <Route path="/updateItem/:id" element={<UpdateItem/>}/>s
      </Routes>
    </div>
  );
}

export default App;
