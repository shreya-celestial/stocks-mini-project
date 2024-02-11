type props = {
  msg: any;
};

const NotificationSnack = (props: props) => {
  return (
    <>
      <p style={{ color: "#1976d2", fontSize: "small", marginRight: "10px" }}>
        {props?.msg?.title}
      </p>
    </>
  );
};

export default NotificationSnack;
