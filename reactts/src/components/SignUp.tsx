import styles from "./modules/signup.module.css";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { REGEX } from "../App";

const SignUp = () => {
  const [pin, setPin] = useState("");
  const [country, setCountry] = useState("");
  const [ustate, setUstate] = useState("");
  const [city, setCity] = useState([]);
  const nav = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (
      REGEX.test(e.target.elements.password.value) &&
      e.target.elements.password.value.length > 6
    ) {
      const data = {
        fname: e.target.elements.firstname.value,
        lname: e.target.elements.lastname.value,
        email: e.target.elements.email.value,
        password: e.target.elements.password.value,
        pin: e.target.elements.pincode.value,
        country: e.target.elements.country.value,
        state: e.target.elements.state.value,
        city: e.target.elements.city.value,
        address1: e.target.elements.address1.value,
        address2: e.target.elements.address2.value,
      };
      try {
        const postData = await fetch("http://localhost:8080/user/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const response = await postData.json();
        if (response?.status === "success") {
          nav("/login/user");
        } else {
          alert(response?.msg);
        }
      } catch (err) {
        alert("Something went wrong... Please try again!");
      }
      return;
    }
    alert(
      "Enter atleast a 6 digit password that have atleast 1 special character, 1 uppercase letter, 1 lowercase letter and 1 digit."
    );
  };

  useEffect(() => {
    const getAddress = async () => {
      const url = `https://app.zipcodebase.com/api/v1/search?apikey=d69e8be0-c406-11ee-b459-6bbf3bd26569&codes=${pin}`;
      const addData = await fetch(url);
      const response = await addData.json();
      if (response?.results[`${pin}`]?.length) {
        setCountry(response?.results[`${pin}`][0]?.country_code);
        setUstate(response?.results[`${pin}`][0]?.state);
        setCity((prev) => response?.results[`${pin}`]);
      }
    };

    const timer = setTimeout(() => {
      if (pin && pin.trim()) {
        getAddress();
      }
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [pin]);

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
      style={{
        background: "white",
        marginTop: "0",
        borderRadius: "0",
        padding: "10px 0 30px",
      }}
    >
      <h2>Basic Details</h2>
      <div className={styles.nameInps}>
        <TextField
          required
          label="First Name"
          name="firstname"
          sx={{ width: "49%" }}
        />
        <TextField
          required
          label="Last Name"
          name="lastname"
          sx={{ width: "49%" }}
        />
      </div>
      <TextField
        required
        label="Email"
        type="email"
        name="email"
        sx={{ width: "96.7%", marginBottom: "20px" }}
      />
      <TextField
        required
        label="Password"
        type="password"
        name="password"
        sx={{ width: "96.7%", marginBottom: "20px" }}
      />
      <hr />
      <h2>Address Details</h2>
      <div className={styles.nameInps}>
        <TextField
          required
          label="Pin Code"
          type="number"
          name="pincode"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          sx={{ width: "49%" }}
        />
        <TextField
          required
          label="Country"
          name="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          sx={{ width: "49%" }}
        />
      </div>
      <div className={styles.nameInps}>
        <TextField
          required
          label="State"
          sx={{ width: "49%" }}
          name="state"
          value={ustate}
          onChange={(e) => setUstate(e.target.value)}
        />
        <FormControl sx={{ width: "49%" }}>
          <InputLabel id="demo-simple-select-label">City</InputLabel>
          <Select label="City" name="city" required>
            {city.length > 0 ? (
              city?.map((detail: any, index: number) => (
                <MenuItem value={detail.city} key={index}>
                  {detail.city}
                </MenuItem>
              ))
            ) : (
              <MenuItem value={""}></MenuItem>
            )}
          </Select>
        </FormControl>
        {/* <TextField required label="City" sx={{ width: "49%" }} name="city" /> */}
      </div>
      <TextField
        required
        label="Address Line 1"
        name="address1"
        sx={{ width: "96.7%", marginBottom: "20px" }}
      />
      <TextField
        required
        label="Address Line 2"
        name="address2"
        sx={{ width: "96.7%", marginBottom: "20px" }}
      />
      <Button variant="contained" type="submit">
        Sign Up
      </Button>
    </form>
  );
};

export default SignUp;
