import styles from "./modules/signup.module.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate, Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import UserContext from "../store/UserContext";
import GoogleButton from "react-google-button";
import Loader from "./Loader";
import { useCookies } from "react-cookie";

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
    <Loader loading={loader}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Login Details</h2>
        <TextField
          required
          label="Email"
          type="email"
          name="email"
          sx={{ width: "94.4%", marginBottom: "20px" }}
        />
        <TextField
          required
          label="Password"
          type={view ? "text" : "password"}
          name="password"
          sx={{ width: "94.4%", marginBottom: "10px" }}
        />
        <div
          style={{
            width: "94.4%",
            margin: "0 auto",
            marginBottom: "10px",
            textAlign: "start",
          }}
        >
          <label>
            <input
              type="checkbox"
              checked={view}
              onChange={() => {
                setView((prev) => !prev);
              }}
            />
            Show Password
          </label>
        </div>
        <div
          style={{
            marginBottom: "10px",
            textAlign: "end",
            marginRight: "35px",
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
          <hr style={{ flexBasis: "40%", border: "0.5px solid #D3D3D3" }} />
          <p style={{ color: "#A9A9A9" }}>OR</p>
          <hr style={{ flexBasis: "40%", border: "0.5px solid #D3D3D3" }} />
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
  );
};

export default Login;
