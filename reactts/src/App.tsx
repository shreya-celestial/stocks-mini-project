import React from "react";
import TableData from "./components/Table";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Stock from "./components/Stock";
import NavBar from "./components/NavBar";
import SignUp from "./components/SignUp";
import Login from "./components/Login";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="table">
        <NavBar />
        <Routes>
          <Route path="/" element={<TableData />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/login/user" element={<Login />} />
          <Route path="/:ticker" element={<Stock />} />
          <Route path="/*" element={<TableData />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
