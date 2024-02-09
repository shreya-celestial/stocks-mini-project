import { useEffect, useState } from "react";

type props = {
  timer: number;
};

const Timer = (props: props) => {
  const [time, setTime] = useState(props?.timer);
  const [bool, setBool] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setBool((prev) => !prev);
    }, props?.timer * 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    let interval: any;

    if (!bool) {
      interval = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [bool]);

  return <span>Resend in {time > 9 ? time : `0${time}`} seconds!</span>;
};

export default Timer;
