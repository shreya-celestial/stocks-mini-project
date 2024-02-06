import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../store/UserContext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const NavBar = () => {
  const nav = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const handleLogOut = () => {
    setUser(null);
    sessionStorage.removeItem("user");
  };

  const handleClick = () => {
    nav("/");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <h1 style={{ cursor: "pointer" }} onClick={handleClick}>
            NStockE
          </h1>
          {!user && (
            <Link
              to={"/login/user"}
              style={{ color: "white", marginLeft: "auto" }}
            >
              <Button color="inherit">Login</Button>
            </Link>
          )}
          {!user && (
            <Link
              to={"/sign-up"}
              style={{ color: "white", marginLeft: "10px" }}
            >
              <Button color="inherit">Sign Up</Button>
            </Link>
          )}
          {user && (
            <Button
              color="inherit"
              sx={{ marginLeft: "auto" }}
              onClick={handleLogOut}
            >
              Log Out
            </Button>
          )}
          {user && (
            <AccountCircleIcon fontSize="large" sx={{ marginLeft: "10px" }} />
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
