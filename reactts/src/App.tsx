import React, { useEffect, useState } from "react";
import TableData from "./components/Table";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Stock from "./components/Stock";
import NavBar from "./components/NavBar";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import UserContext from "./store/UserContext";
import ForgotPass from "./components/ForgotPass";
import ChangePass from "./components/ChangePass";
import History from "./components/History";
import NotificationSnack from "./components/Notification";
import Snackbar from "@mui/material/Snackbar";
import { getToken } from "firebase/messaging";
import { messaging } from "./firebase";
import Message from "./components/Message";

let SESSION_USER = localStorage.getItem("user");
SESSION_USER = SESSION_USER ? JSON.parse(SESSION_USER) : null;

const App: React.FC = () => {
  const [user, setUser] = useState<any | null>(SESSION_USER);
  const [open, setOpen] = useState(false);
  const [notifyMsg, setNotifyMsg] = useState<any | null>(null);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

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
          localStorage.removeItem("user");
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

  useEffect(() => {
    const notiPermission = async () => {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        const token = await getToken(messaging, {
          vapidKey:
            "BFrTzXS-4hbN_8ciAYj3pDwqkNw-1tT14qDnYWZ0pkhCVi8x1rw96Q4lhZyCrIfij21XdcPoEMvKI3C5S4QwiHg",
        });
        if (token) {
          const body = {
            email: user?.email,
            deviceToken: token,
          };
          const registerToken = await fetch(
            "http://localhost:8080/user/device",
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(body),
            }
          );
          const response = await registerToken.json();
          if (response?.status !== "success") {
            alert("Something went wrong... Please try again!");
            return;
          }
          return;
        }
        alert("Something went wrong... Please try again!");
      }
      alert("Your notifications will be muted");
    };

    if (user) {
      notiPermission();
    }
  }, [user]);

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
          <NavBar handleSnack={setOpen} notifyMsgHandler={setNotifyMsg} />
          <Routes>
            <Route path="/" element={<TableData />} />
            {!user && <Route path="/sign-up/user" element={<SignUp />} />}
            {!user && <Route path="/login/user" element={<Login />} />}
            {!user && <Route path="/forgot/user" element={<ForgotPass />} />}
            {user && <Route path="/history/user" element={<History />} />}
            {user && <Route path="/message/user" element={<Message />} />}
            {user && <Route path="/:ticker" element={<Stock />} />}
            {user && <Route path="/password/user" element={<ChangePass />} />}
            <Route path="/*" element={<TableData />} />
          </Routes>
          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message={notifyMsg?.body}
            action={<NotificationSnack msg={notifyMsg} />}
            sx={{
              maxWidth: "250px",
              textWrap: "wrap",
              wordBreak: "break-all",
              wordWrap: "break-word",
            }}
          />
        </div>
      </BrowserRouter>
    </UserContext.Provider>
  );
};

export default App;

export const REGEX = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])/;
