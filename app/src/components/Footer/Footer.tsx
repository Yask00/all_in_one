import { ReactElement } from "react";
import "./Footer.scss";
import Clock from "./Clock";

const options: Intl.DateTimeFormatOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

const Footer = (): ReactElement => {
  const date = new Intl.DateTimeFormat("en-US", options).format(new Date());
  return (
    <footer className="footer">
      {date} - <Clock />
    </footer>
  );
};

export default Footer;
