import { ReactElement } from "react";
import "./Navigation.scss";
import { useAuth } from "../../context/AuthContext";
import { NavLink, useNavigate } from "react-router";
import useCookie from "../../hooks/useCookie";

const Navigation = (): ReactElement => {
  const { setToken, setUser } = useAuth();
  const { user } = useAuth();
  const navigate = useNavigate();

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

  return (
    <nav className="nav">
      <img src="https://placehold.co/70x50" alt="" className="logo" />
      <ul className="nav__menu">
        {user ? (
          <>
            <li className="nav__menu__item">
              <NavLink to="/" end>
                Home
              </NavLink>
            </li>
            <li className="nav__menu__item">
              <NavLink to="/todos" end>
                Todos
              </NavLink>
            </li>
            <li className="nav__menu__item">
              <NavLink to="/todos/add" end>
                Add Todo
              </NavLink>
            </li>
            <li onClick={logoutHandler} className="nav__menu__item">
              Logout
            </li>
          </>
        ) : (
          <li className="nav__menu__item">
            <NavLink to="/login" end>
              Login
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
