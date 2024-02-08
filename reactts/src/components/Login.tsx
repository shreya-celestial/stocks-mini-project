import styles from "./modules/signup.module.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import UserContext from "../store/UserContext";
import GoogleButton from "react-google-button";
import Loader from "./Loader";
import { useCookies } from "react-cookie";

const Login = () => {
  const nav = useNavigate();
  const [cookies] = useCookies();
  const [loader, setLoader] = useState(false);

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
        <h2>Basic Details</h2>
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
          type="password"
          name="password"
          sx={{ width: "94.4%", marginBottom: "20px" }}
        />
        <Button variant="contained" type="submit">
          Login
        </Button>
        <div
          style={{
            width: "fit-content",
            display: "block",
            margin: "10px auto",
          }}
        >
          <GoogleButton onClick={handleGoogle} />
        </div>
      </form>
    </Loader>
  );
};

export default Login;
