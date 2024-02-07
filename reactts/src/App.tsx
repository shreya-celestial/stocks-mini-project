import React, { useState } from "react";
import TableData from "./components/Table";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Stock from "./components/Stock";
import NavBar from "./components/NavBar";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import UserContext from "./store/UserContext";

let SESSION_USER = sessionStorage.getItem("user");
SESSION_USER = SESSION_USER ? JSON.parse(SESSION_USER) : null;

const App: React.FC = () => {
  const [user, setUser] = useState(SESSION_USER);

  const handleUser = (data: any) => {
    setUser(data);
  };

  const globalUser = {
    user: user,
    setUser: handleUser,
  };

  return (
    <UserContext.Provider value={globalUser}>
      <BrowserRouter>
        <div className="table">
          <NavBar />
          <Routes>
            <Route path="/" element={<TableData />} />
            {!user && <Route path="/sign-up/user" element={<SignUp />} />}
            {!user && <Route path="/login/user" element={<Login />} />}
            <Route path="/:ticker" element={<Stock />} />
            <Route path="/*" element={<TableData />} />
          </Routes>
        </div>
      </BrowserRouter>
    </UserContext.Provider>
  );
};

export default App;
