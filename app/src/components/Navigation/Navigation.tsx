import { ReactElement, useState } from "react";
import "./Navigation.scss";
import { useAuth } from "../../context/AuthContext";
import { NavLink, useNavigate } from "react-router";
import useCookie from "../../hooks/useCookie";
import { useTranslation } from "react-i18next";

const lngs = {
  en: "en", // { nativeName: "English" },
  bg: "bg", // { nativeName: "Bulgarian" },
};

const Navigation = (): ReactElement => {
  const { setToken, setUser } = useAuth();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(lngs.en);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookie, getCookie, updateCookie, deleteCookie] = useCookie("jwt") as [
    string,
    (name: string) => string | undefined,
    (newValue: string, options?: Cookies.CookieAttributes) => void,
    (name: string) => void,
  ];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userCookie, getUserCookie, updateUserCookie, deleteUserCookie] =
    useCookie("user") as [
      string,
      (name: string) => string | undefined,
      (newValue: string, options?: Cookies.CookieAttributes) => void,
      (name: string) => void,
    ];

  const logoutHandler = () => {
    deleteCookie("jwt");
    deleteUserCookie("user");
    setToken("");
    setUser(null);
    navigate("/login");
  };

  const changeLanguage = () => {
    const nextlanguage = language === lngs.bg ? lngs.en : lngs.bg;
    setLanguage(nextlanguage);
    i18n.changeLanguage(nextlanguage);
  };

  return (
    <nav className="nav">
      <img src="https://placehold.co/70x50" alt="" className="logo" />
      <ul className="nav__menu">
        {user ? (
          <>
            <li className="nav__menu__item">
              <NavLink to="/" end>
                {t("navigation.home")}
              </NavLink>
            </li>
            <li className="nav__menu__item">
              <NavLink to="/todos" end>
                {t("navigation.todos")}
              </NavLink>
            </li>
            <li className="nav__menu__item">
              <NavLink to="/todos/add" end>
                {t("navigation.addTodo")}
              </NavLink>
            </li>
            <li onClick={logoutHandler} className="nav__menu__item">
              {t("navigation.logout")}
            </li>
          </>
        ) : (
          <li className="nav__menu__item">
            <NavLink to="/login" end>
              {t("navigation.login")}
            </NavLink>
          </li>
        )}
        <li className="nav__menu__item" onClick={changeLanguage}>
          {language.toUpperCase()}
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
