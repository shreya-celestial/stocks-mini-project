import Button from "@mui/material/Button";
import { useContext } from "react";
import UserContext from "../store/UserContext";

const Message = () => {
  const { user } = useContext(UserContext);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const msg = e.target.elements.msg.value;
    if (msg.trim()) {
      const data = {
        email: user?.email,
        message: msg,
      };
      const config = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      const url = "http://localhost:8080/notifications";
      try {
        const sendMessage = await fetch(url, config);
        const response = await sendMessage.json();
        if (response?.status === "success") {
          e.target.elements.msg.value = "";
          alert("Message sent successfully!");
          return;
        }
        alert("Message cannot be sent at the moment.. Please try again");
      } catch (err) {
        alert("Something went wrong.. Please try again!");
      }
      return;
    }
    alert("Please write a message to send");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Send Notifications</h2>
      <textarea
        name="msg"
        style={{
          minHeight: "50vh",
          minWidth: "50%",
          fontFamily: "cursive",
          marginBottom: "10px",
          outline: "none",
          padding: "10px",
        }}
        placeholder="Enter your message here.."
      />
      <br />
      <Button variant="contained" type="submit">
        Send
      </Button>
    </form>
  );
};

export default Message;
