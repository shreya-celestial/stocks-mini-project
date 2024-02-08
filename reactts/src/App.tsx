import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    const check = async () => {
      try {
        const checkData = await fetch("http://localhost:8080/user/checkUser", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(SESSION_USER),
        });
        const response = await checkData.json();
        if (response?.status !== "success") {
          alert("Session expired.. Please login again!");
          sessionStorage.removeItem("user");
          document.cookie =
            "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          setUser(null);
        }
      } catch (err) {
        alert(
          "Something went wrong while reaching the server.. Please try again later!"
        );
      }
    };
    if (SESSION_USER) {
      check();
    }
  }, []);

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
