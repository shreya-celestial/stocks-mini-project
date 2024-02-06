import styles from "./modules/signup.module.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../store/UserContext";

const Login = () => {
  const nav = useNavigate();
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
        sessionStorage.setItem("user", JSON.stringify(response?.data));
        setUser(response?.data);
        nav("/");
      } else {
        alert(response?.msg);
      }
    } catch (err) {
      alert("Something went wrong.. Please try again!");
    }
  };
  return (
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
    </form>
  );
};

export default Login;
