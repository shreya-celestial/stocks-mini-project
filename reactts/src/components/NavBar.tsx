import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import UserContext from "../store/UserContext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const NavBar = () => {
  const nav = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
          {user && !user.token && (
            <AccountCircleIcon fontSize="large" sx={{ marginLeft: "auto" }} />
          )}
          {user && user.token && (
            <img
              src={user?.pictureUrl}
              alt="Profile"
              style={{
                marginLeft: "auto",
                maxHeight: "35px",
                borderRadius: "50%",
                border: "1.35px solid #FAF9F6",
              }}
            />
          )}
          {user && (
            <>
              <Button
                id="basic-button"
                color="inherit"
                sx={{ marginLeft: "12px" }}
                onClick={handleOpen}
              >
                {user.firstname}
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleLogOut}>Logout</MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
