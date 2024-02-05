import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const nav = useNavigate();
  const handleClick = () => {
    nav("/");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ borderRadius: "10px 10px 0 0 " }}>
        <Toolbar>
          <h1 style={{ cursor: "pointer" }} onClick={handleClick}>
            NStockE
          </h1>
          <Button color="inherit" sx={{ marginLeft: "auto" }}>
            <Link to={""} style={{ color: "white" }}>
              Login
            </Link>
          </Button>
          <Button color="inherit" sx={{ marginLeft: "10px" }}>
            <Link to={"/sign-up"} style={{ color: "white" }}>
              Sign Up
            </Link>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
