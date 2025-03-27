import { ReactElement, useEffect, useState } from "react";

const Clock = (): ReactElement => {
  const [time, setTime] = useState(new Date().toLocaleTimeString("en-US"));

  useEffect(() => {
    const time = () => {
      const event = new Date();
      setTime(event.toLocaleTimeString("en-US"));
    };
    const intervalId = setInterval(time, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return <>{time}</>;
};

export default Clock;
