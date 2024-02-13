import { ReactNode } from "react";
import Grid from "@mui/material/Grid";
import bg from "../assets/bg.png";
import { useMatch } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

type props = {
  children?: ReactNode;
};

const DesignWrapper = (props: props) => {
  const isLogin = useMatch("/login/user");
  const isMobile = useMediaQuery({ query: `(max-width: 599.9px)` });
  console.log(isMobile);

  return (
    <Grid
      container
      rowSpacing={1}
      columnSpacing={{
        xs: isLogin ? 0 : 1,
        sm: isLogin ? 0 : 2,
        md: isLogin ? 0 : 3,
      }}
      sx={{
        backgroundImage: `url(${bg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: isLogin ? "unset" : "100vh",
      }}
    >
      {isLogin && (
        <>
          <Grid
            item
            xs={0}
            sm={7}
            md={8}
            sx={{
              display: isMobile ? "none" : "",
            }}
          >
            <div
              style={{
                textAlign: "start",
                margin: "30px",
                maxWidth: "78%",
              }}
            >
              <h1
                style={{
                  fontSize: "xxx-large",
                }}
              >
                Start Your Journey With NStocksE
              </h1>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Voluptatibus ut voluptates aut minima quo, nam distinctio itaque
                alias facere expedita architecto vero ea laborum, iusto soluta
                eum? Ipsa, in praesentium. Lorem, ipsum dolor sit amet
                consectetur adipisicing elit. Voluptatibus ut voluptates aut
                minima quo, nam distinctio itaque alias facere expedita
                architecto vero ea laborum, iusto soluta eum? Ipsa, in
                praesentium.
              </p>
            </div>
          </Grid>
          <Grid item xs={12} sm={5} md={4}>
            {props?.children}
          </Grid>
        </>
      )}
      {!isLogin && (
        <>
          <Grid item xs={1} sm={3} md={4}></Grid>
          <Grid item xs={10} sm={6} md={4}>
            {props?.children}
          </Grid>
          <Grid item xs={1} sm={3} md={4}></Grid>
        </>
      )}
    </Grid>
  );
};

export default DesignWrapper;
