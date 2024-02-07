import { ReactNode } from "react";
import styles from "./modules/loader.module.css";
import CircularProgress from "@mui/material/CircularProgress";

type props = {
  children?: ReactNode;
  loading?: boolean;
};

const Loader = (props: props) => {
  return (
    <div>
      <div className={props.loading ? styles.overlay : styles.noneShown}>
        <div>
          <CircularProgress />
          <h5>Logging you in...</h5>
        </div>
      </div>
      {props?.children}
    </div>
  );
};

export default Loader;
