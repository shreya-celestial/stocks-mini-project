import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Link, useMatch, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import UserContext from "../store/UserContext";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Divider from "@mui/material/Divider";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import MenuItem from "@mui/material/MenuItem";
import { useSelector } from "react-redux";
import { getMessaging, onMessage } from "firebase/messaging";

type Reducer = {
  stock: any;
};

type props = {
  handleSnack: any;
  notifyMsgHandler: any;
};

const NavBar = (props: props) => {
  const nav = useNavigate();
  const [countState, setCountState] = useState(false);
  const [count, setCount] = useState(0);
  const stock = useSelector((state: Reducer) => state.stock);
  const TickerUrl = useMatch("/:id");
  const { user, setUser } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorElNoti, setAnchorElNoti] = useState<null | HTMLElement>(null);
  const [notifs, setNotifs] = useState<any[] | null>(null);
  const open = Boolean(anchorEl);
  const openNoti = Boolean(anchorElNoti);

  const messaging = getMessaging();
  onMessage(messaging, async (payload) => {
    const permissions = await navigator.permissions.query({
      name: "notifications",
    });

    if (user?.email !== payload?.notification?.title) {
      if (permissions?.state === "granted") {
        props?.notifyMsgHandler(payload?.notification);
        props?.handleSnack(true);
      }
      if (payload?.notification?.title !== "Admin") {
        setCountState((prev) => !prev);
      }
    }
  });

  useEffect(() => {
    if (countState) {
      setCount((prev) => prev + 1);
    }
  }, [countState]);

  const handleOpenNoti = async (event: any) => {
    try {
      setAnchorElNoti(event.currentTarget);
      const url = `http://localhost:8080/notifications?email=${user?.email}`;
      const notifs = await fetch(url);
      const response = await notifs.json();

      if (response?.status === "success") {
        setNotifs(response?.data);
        setCount(0);
      } else {
        alert(response?.msg);
      }
    } catch (err) {
      alert("Something went wrong.. Please try again!");
    }
  };

  const handleCloseNoti = () => {
    setAnchorElNoti(null);
  };

  const handleOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSaveStock = async () => {
    if (typeof stock === "object") {
      try {
        const dataToSend = {
          ticker: stock?.ticker,
          price: stock?.response?.summary?.price,
          email: user?.email,
        };
        const sendData = await fetch("http://localhost:8080/prices", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        });
        const response = await sendData.json();
        if (response?.status !== "success") {
          alert(response?.msg);
          return;
        }
        alert("Stock added successfully!");
      } catch (err) {
        alert("Something went wrong... Please try again later!");
      }
      return;
    }
    alert("Something went wrong... Please try again later!");
  };

  const handleLogOut = async () => {
    handleClose();
    if (user?.token) {
      try {
        const logResp = await fetch(
          `http://localhost:8080/user/logoutgoogle/${user?.id}`
        );
        const response = await logResp.json();
        if (response?.status !== "success") {
          alert("Cannot log you out at this moment. Try again later!");
          return;
        }
      } catch (err) {
        alert("Something went wrong... Please try again!");
        return;
      }
    }
    setUser(null);
    localStorage.removeItem("user");
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    nav("/login/user");
  };

  const handleClick = () => {
    nav("/");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <h1 style={{ cursor: "pointer" }} onClick={handleClick}>
            NStocksE
          </h1>
          {!user && (
            <Link
              to={"/login/user"}
              style={{ color: "white", marginLeft: "auto" }}
            >
              <Button color="inherit">Login</Button>
            </Link>
          )}
          {user && (
            <IconButton sx={{ marginLeft: "auto" }} onClick={handleOpenNoti}>
              <Badge badgeContent={count} color="error" overlap="circular">
                <NotificationsIcon
                  sx={{ color: "white", fontSize: "xx-large" }}
                />
              </Badge>
            </IconButton>
          )}
          {user && (
            <Menu
              id="basic-menu"
              anchorEl={anchorElNoti}
              open={openNoti}
              onClose={handleCloseNoti}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&::before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 15,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <div
                style={{
                  maxHeight: "80vh",
                  overflowY: "scroll",
                  overflowX: "hidden",
                  maxWidth: "300px",
                }}
              >
                {notifs &&
                  notifs.map((notif) => (
                    <MenuItem
                      key={notif?.id}
                      sx={{
                        textWrap: "wrap",
                        wordBreak: "break-all",
                        wordWrap: "break-word",
                        margin: "5px auto",
                      }}
                    >
                      <p>
                        <b>{notif?.user?.email}</b>:<br />
                        {notif?.message}
                      </p>
                    </MenuItem>
                  ))}
              </div>
              {!notifs?.length && <MenuItem>No messages to display</MenuItem>}
            </Menu>
          )}
          {user && TickerUrl && (
            <IconButton sx={{ marginLeft: "12px" }} onClick={handleSaveStock}>
              <BookmarkAddIcon sx={{ color: "white", fontSize: "xx-large" }} />
            </IconButton>
          )}
          {user && !user.token && (
            <IconButton onClick={handleOpen}>
              <AccountCircleIcon fontSize="large" sx={{ marginLeft: "auto" }} />
            </IconButton>
          )}
          {user && user.token && (
            <img
              src={user?.pictureUrl}
              onClick={handleOpen}
              alt="Profile"
              style={{
                marginLeft: "12px",
                maxHeight: "35px",
                borderRadius: "50%",
                border: "1.35px solid #FAF9F6",
                cursor: "pointer",
              }}
            />
          )}
          {user && (
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&::before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem>
                <b>{`${user?.firstname} ${user?.lastname}`}</b>
              </MenuItem>
              <MenuItem>
                <i>{user?.email}</i>
              </MenuItem>
              <Divider />
              <MenuItem
                onClick={() => {
                  handleClose();
                  nav("/history/user");
                }}
              >
                History
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleClose();
                  nav("/message/user");
                }}
              >
                Send Messages
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleClose();
                  nav("/password/user");
                }}
              >
                Change Password
              </MenuItem>
              <MenuItem onClick={handleLogOut}>Logout</MenuItem>
            </Menu>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
