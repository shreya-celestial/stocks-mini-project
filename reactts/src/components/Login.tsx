import styles from "./modules/signup.module.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate, Link } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "../store/UserContext";
import GoogleButton from "react-google-button";
import Loader from "./Loader";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { useCookies } from "react-cookie";
import DesignWrapper from "./DesignWrapper";

const Login = () => {
  const nav = useNavigate();
  const [cookies] = useCookies();
  const [loader, setLoader] = useState(false);
  const [view, setView] = useState(false);

  useEffect(() => {
    const gData = async () => {
      try {
        const gresp = await fetch(
          "http://localhost:8080/user/getmygoogledata",
          {
            headers: {
              Cookies: cookies?.token,
            },
          }
        );
        const response = await gresp.json();
        if (response?.status === "success") {
          localStorage.setItem("user", JSON.stringify(response?.data));
          setUser(response?.data);
          nav("/");
        } else {
          alert(response?.msg);
        }
      } catch (err) {
        alert("Something went wrong.. Please try again!");
      }
      setLoader((prev) => !prev);
    };

    if (cookies.token) {
      setLoader((prev) => !prev);
      gData();
    }
  }, [cookies]);

  const { setUser } = useContext(UserContext);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const data = {
      email: e.target.elements.email.value,
      password: e.target.elements.password.value,
    };
    try {
      const url = `http://localhost:8080/user/login?email=${data.email}&password=${data.password}`;
      const dataUser = await fetch(url);
      const response = await dataUser.json();
      if (response?.status === "success") {
        localStorage.setItem("user", JSON.stringify(response?.data));
        setUser(response?.data);
        nav("/");
      } else {
        alert(response?.msg);
      }
    } catch (err) {
      alert("Something went wrong.. Please try again!");
    }
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleGoogle = async () => {
    try {
      const url = `http://localhost:8080/user/googleRequest`;
      const dataUser = await fetch(url);
      const response = await dataUser.json();
      if (response?.url) {
        window.location.href = response?.url;
      }
    } catch (err) {
      alert("Something went wrong.. Please try again!");
    }
  };

  return (
    <DesignWrapper>
      <Loader loading={loader}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2>Login Details</h2>
          <TextField
            required
            label="Email"
            type="email"
            name="email"
            sx={{ width: "85%", marginBottom: "20px" }}
          />
          <FormControl
            sx={{ width: "85%", marginBottom: "10px" }}
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              required
              id="outlined-adornment-password"
              label="Password"
              type={view ? "text" : "password"}
              name="password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setView((prev) => !prev)}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {view ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <div
            style={{
              width: "85%",
              margin: "0 auto",
              marginBottom: "20px",
              textAlign: "end",
            }}
          >
            <Link
              to={"/forgot/user"}
              style={{
                fontWeight: "600",
                color: "#1976d2",
              }}
            >
              Forgot Password?
            </Link>
          </div>
          <Button variant="contained" type="submit">
            Login
          </Button>
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <hr style={{ flexBasis: "40%", border: "0.5px solid #1976d2" }} />
            <p style={{ color: "#1976d2" }}>OR</p>
            <hr style={{ flexBasis: "40%", border: "0.5px solid #1976d2" }} />
          </div>
          <div
            style={{
              width: "fit-content",
              display: "block",
              margin: "10px auto",
            }}
          >
            <GoogleButton onClick={handleGoogle} />
          </div>
          <p style={{ textAlign: "center", marginTop: "20px" }}>
            Doesn't have an account yet?{" "}
            <Link
              to={"/sign-up/user"}
              style={{
                fontWeight: "600",
                color: "#1976d2",
              }}
            >
              Sign Up!
            </Link>
          </p>
        </form>
      </Loader>
    </DesignWrapper>
  );
};

export default Login;
