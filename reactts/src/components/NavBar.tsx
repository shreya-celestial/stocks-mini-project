import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Link, useMatch, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import UserContext from "../store/UserContext";
import Divider from "@mui/material/Divider";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import MenuItem from "@mui/material/MenuItem";

const NavBar = () => {
  const nav = useNavigate();
  const TickerUrl = useMatch("/:id");
  const { user, setUser } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSaveStock = () => {
    console.log(TickerUrl?.params?.id);
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
          {user && TickerUrl && (
            <IconButton sx={{ marginLeft: "auto" }} onClick={handleSaveStock}>
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
                marginLeft: TickerUrl ? "12px" : "auto",
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
