import React from "react";
import TableData from "./components/Table";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Stock from "./components/Stock";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="table">
        <Routes>
          <Route path="/" element={<TableData />} />
          <Route path="/:ticker" element={<Stock />} />
          <Route path="/*" element={<TableData />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
