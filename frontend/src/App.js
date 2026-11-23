import React from "react";
import { Roouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/addItem" element={<ItemAdd/>}/>
      </Routes>
    </div>
  );
}

export default App;
