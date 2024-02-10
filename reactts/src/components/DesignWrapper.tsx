import { ReactNode } from "react";
import Grid from "@mui/material/Grid";
import bg from "../assets/bg.png";

type props = {
  children?: ReactNode;
};

const DesignWrapper = (props: props) => {
  return (
    <Grid
      container
      rowSpacing={1}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      sx={{
        backgroundImage: `url(${bg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "100vh",
      }}
    >
      <Grid item xs={1} sm={3} md={4}></Grid>
      <Grid item xs={10} sm={6} md={4}>
        {props?.children}
      </Grid>
      <Grid item xs={1} sm={3} md={4}></Grid>
    </Grid>
  );
};

export default DesignWrapper;
