import { ReactElement, ReactNode } from "react";
import "./Main.scss";

const Main = ({ children }: { children: ReactNode }): ReactElement => {
  return <div className="main">{children}</div>;
};

export default Main;
