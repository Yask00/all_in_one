import { ReactElement } from "react";
import "./Spinner.scss";

const Spinner = (): ReactElement => {
  return (
    <div className="loading-screen">
      <div className="loading-spinner"></div>
    </div>
  );
};

export default Spinner;
