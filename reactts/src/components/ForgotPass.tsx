import TextField from "@mui/material/TextField";
import styles from "./modules/signup.module.css";
import Button from "@mui/material/Button";

const ForgotPass = () => {
  const handleSubmit = () => {};
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Forgot Password?</h2>
      <TextField
        required
        label="Enter your email:"
        type="email"
        name="email"
        sx={{ width: "94.4%", marginBottom: "20px" }}
      />
      <Button variant="contained" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default ForgotPass;
