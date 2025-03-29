import { ReactElement } from "react";
import "./Aside.scss";

const Aside = (): ReactElement => {
  return (
    <aside className="aside">
      <div className="Bgc(#00FF00)">
        <h1 className="C(#FFFFFF)">Atomic css</h1>
      </div>

      <div className="container">
        <h1 className="D(1):h">Atomic css</h1>
      </div>
    </aside>
  );
};

export default Aside;
