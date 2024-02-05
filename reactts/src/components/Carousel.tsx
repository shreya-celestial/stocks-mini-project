import { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import styles from "./modules/carousel.module.css";
import { Link } from "react-router-dom";

export default function Carousel(props: any) {
  const [clickInterval, setClickInterval] = useState(true);
  const theme = useTheme();
  const steps = props?.images?.length;
  const [activeStep, setActiveStep] = useState(0);

  const handleClick = () => {
    setClickInterval((prev) => !prev);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => {
      if (prevActiveStep === steps - 1) {
        return 0;
      }
      return prevActiveStep + 1;
    });
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => {
      if (prevActiveStep === 0) {
        return steps - 1;
      }
      return prevActiveStep - 1;
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [clickInterval]);

  return (
    <div>
      {props?.images?.map((image: any, index: number) => (
        <div
          key={index}
          className={activeStep === index ? styles.shown : styles.hidden}
        >
          <img src={image?.thumbnail} alt={`Source: ${image?.source}`} />
          <div>
            <p>{image?.snippet}</p>
            <Link to={image?.link}>View More</Link>
          </div>
        </div>
      ))}
      <MobileStepper
        variant="dots"
        steps={steps}
        position="static"
        activeStep={activeStep}
        sx={{ maxWidth: "100%", flexGrow: 1 }}
        nextButton={
          <Button
            size="small"
            onClick={() => {
              handleClick();
              handleNext();
            }}
            disabled={activeStep === 5}
          >
            Next
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button
            size="small"
            onClick={() => {
              handleClick();
              handleBack();
            }}
          >
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </div>
  );
}
