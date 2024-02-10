import TextField from "@mui/material/TextField";
import styles from "./modules/signup.module.css";
import Button from "@mui/material/Button";
import { useContext, useState } from "react";
import UserContext from "../store/UserContext";
import { REGEX } from "../App";
import { useNavigate } from "react-router-dom";
import DesignWrapper from "./DesignWrapper";

const ChangePass = () => {
  const nav = useNavigate();
  const { user } = useContext(UserContext);
  const [disableBtn, setDisableBtn] = useState(false);

  const handlePassword = async (e: any) => {
    e.preventDefault();
    if (user) {
      const password1 = e.target.elements.password1.value;
      const password2 = e.target.elements.password2.value;
      if (password1 === password2) {
        if (REGEX.test(password1) && password1.length > 6) {
          const data = {
            password: password1,
            email: user?.email,
          };
          setDisableBtn((prev) => !prev);
          try {
            const userpassword = await fetch(
              "http://localhost:8080/user/password",
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
              }
            );
            const response = await userpassword.json();
            if (response?.status === "success") {
              alert("Password changed successfully!");
              nav("/login/user");
              return;
            }
            setDisableBtn((prev) => !prev);
            alert("Something went wrong... Please try again!");
          } catch (err) {
            alert("Something went wrong... Please try again later!");
            setDisableBtn((prev) => !prev);
          }
          return;
        }
        alert(
          "Enter atleast a 6 digit password that have atleast 1 special character, 1 uppercase letter, 1 lowercase letter and 1 digit."
        );
        return;
      }
      alert("Please make sure both the passwords match!");
      return;
    }
    alert("User does not exist!");
  };

  return (
    <DesignWrapper>
      <form className={styles.form} onSubmit={handlePassword}>
        <h2>Change Password</h2>
        <TextField
          required
          label="Enter your New Password"
          type="password"
          name="password1"
          sx={{ width: "85%", marginBottom: "20px" }}
        />
        <TextField
          required
          label="Confirm your New Password"
          type="password"
          name="password2"
          sx={{ width: "85%", marginBottom: "20px" }}
        />
        <Button variant="contained" type="submit" disabled={disableBtn}>
          Change Password
        </Button>
      </form>
    </DesignWrapper>
  );
};

export default ChangePass;
