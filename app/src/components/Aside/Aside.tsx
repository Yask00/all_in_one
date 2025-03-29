import { ReactElement } from "react";
import "./Aside.scss";

const Aside = (): ReactElement => {
  return (
    <aside className="aside">
      <div className="Bgc(#00FF00)">
        <h2 className="C(#FFFFFF)">Atomic css</h2>
      </div>

      <div className="container">
        <h2 className="D(1):h">Atomic css</h2>
      </div>

      <div className="aside-text">
        A11Y example:
        <ul>
          <li>line-height</li>
          <li>text-align</li>
          <li>max-width</li>
          <li aria-hidden="true">@media print</li>
          <li>aria-hidden</li>
          <li>contrast checks</li>
          <li>dont skip outline</li>
          <li>axe DevTools</li>
        </ul>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus
        facilis veniam repellat corporis reiciendis assumenda quisquam quo nobis
        delectus provident inventore totam, harum libero doloremque dolorum
        blanditiis officia consectetur tempore.
        <br />
        <a href="http://test.com">test.com</a>
      </div>
    </aside>
  );
};

export default Aside;
