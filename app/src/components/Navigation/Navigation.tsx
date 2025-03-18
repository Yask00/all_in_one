import { ReactElement } from "react";
import "./Navigation.scss";

const Navigation = (): ReactElement => {
  return (
    <nav className="nav">
      <img src="https://placehold.co/70x50" alt="" className="logo" />
      <ul className="nav__menu">
        <li className="nav__menu__item">Nav1</li>
        <li className="nav__menu__item">Nav2</li>
        <li className="nav__menu__item">Nav3</li>
        <li className="nav__menu__item">Nav4</li>
      </ul>
    </nav>
  );
};

export default Navigation;
