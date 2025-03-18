import { ReactNode } from "react";
import "./Layout.scss";

const Layout = ({ children }: { children: ReactNode }) => {
  return <div className="layout">{children}</div>;
};

export default Layout;
