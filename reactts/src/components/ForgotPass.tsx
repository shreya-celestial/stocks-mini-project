import TextField from "@mui/material/TextField";
import styles from "./modules/signup.module.css";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import Timer from "./Timer";
import { useNavigate } from "react-router-dom";

const TIMEOUT = 120;
const ForgotPass = () => {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [countdown, setCountdown] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);

  const handleSendOtp = async () => {
    try {
      const url = `http://localhost:8080/mail?email=${email}`;
      const userOtp = await fetch(url, {
        method: "GET",
      });
      const response = await userOtp.json();
      return response;
    } catch (err) {
      alert("Something went wrong... Please try again later!");
      return;
    }
  };

  const handleCountdown = async () => {
    handleTimer();
    handleSendOtp();
  };

  const handleTimer = () => {
    setCountdown((prev) => !prev);
    setTimeout(() => {
      setCountdown((prev) => !prev);
    }, TIMEOUT * 1000);
  };

  const handleEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisableBtn((prev) => !prev);
    const response = await handleSendOtp();
    setDisableBtn((prev) => !prev);
    if (response?.status === "success") {
      setEmailVerified((prev) => !prev);
      handleTimer();
      return;
    }
    alert("Entered email is not registed yet!");
  };

  const handleOtp = async (e: any) => {
    e.preventDefault();
    const otp = e.target.elements.otp.value;
    if (otp?.length === 4) {
      setDisableBtn((prev) => !prev);
      try {
        const url = `http://localhost:8080/mail/verifyOtp?email=${email}&otp=${otp}`;
        const checkOtp = await fetch(url);
        const response = await checkOtp.json();
        setDisableBtn((prev) => !prev);
        if (response?.status === "success") {
          setOtpVerified((prev) => !prev);
          return;
        }
        alert("Invalid OTP! Please enter a valid OTP");
      } catch (err) {
        alert("Something went wrong... Please try again!");
      }
      return;
    }
    alert("Enter a valid OTP!");
  };

  const handlePassword = async (e: any) => {
    e.preventDefault();
    const password = e.target.elements.password.value;
    if (password.length > 6) {
      const data = {
        password,
        email,
      };
      setOtpVerified((prev) => !prev);
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
        alert("Something went wrong... Please try again later!");
      } catch (err) {
        alert("Something went wrong... Please try again later!");
      }
      return;
    }
    alert("Enter atleast a 6 digit password");
  };

  return (
    <form
      className={styles.form}
      onSubmit={
        !emailVerified ? handleEmail : !otpVerified ? handleOtp : handlePassword
      }
    >
      <h2>Forgot Password?</h2>
      <TextField
        required
        label="Enter your email:"
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={emailVerified}
        sx={{ width: "94.4%", marginBottom: "20px" }}
      />
      {emailVerified && !otpVerified && (
        <TextField
          required
          label="Enter your OTP:"
          type="number"
          name="otp"
          sx={{ width: "94.4%", marginBottom: "20px" }}
        />
      )}
      {emailVerified && otpVerified && (
        <>
          <TextField
            required
            label="Enter your New Password"
            type="password"
            name="password"
            sx={{ width: "94.4%", marginBottom: "20px" }}
          />
        </>
      )}
      <Button variant="contained" type="submit" disabled={disableBtn}>
        {!emailVerified
          ? "Send OTP"
          : !otpVerified
          ? "Verify OTP!"
          : "Reset Password"}
      </Button>
      {emailVerified && !otpVerified && (
        <div
          style={{
            textAlign: "center",
            display: "block",
            width: "fit-content",
            textWrap: "wrap",
            margin: "20px auto",
          }}
        >
          <p>
            Didn't get an OTP? {countdown && <Timer timer={TIMEOUT} />}
            {!countdown && (
              <span
                onClick={handleCountdown}
                style={{
                  color: "#1976d2",
                  cursor: "pointer",
                }}
              >
                Resend OTP
              </span>
            )}
          </p>
        </div>
      )}
    </form>
  );
};

export default ForgotPass;
