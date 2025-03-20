import { ReactElement, useRef, useState } from "react";
import "./Login.scss";
import useCookie from "../../hooks/useCookie";

const Login = (): ReactElement => {
  const [isRememberingMe, setIsRememberingMe] = useState<boolean>(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
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

  const styles = {
    backgroundColor: "#f1f1f1",
  };

  const rememberMeHandler = (): void => {
    setIsRememberingMe(!isRememberingMe);
  };

  const submitHandler = (e: React.FormEvent<HTMLButtonElement>): void => {
    e.preventDefault();

    fetch("http://localhost:3000/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          // TODO: handle with notification or form validation
          throw new Error("Invalid credentials");
        }
        return res.json();
      })
      .then((data) => {
        updateCookie(data.accessToken, {});
        updateUserCookie(JSON.stringify(data.user));
        window.location.href = "/"; // TODO: Router Navigate
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div id="id01" className="modal">
      <form className="modal-content">
        <div className="imgcontainer">
          <img
            src="https://placehold.co/50x50"
            alt="Avatar"
            className="avatar"
          />
        </div>

        <div className="container">
          <label htmlFor="uname">
            <b>Username</b>
          </label>
          <input
            ref={emailRef}
            // value={username}
            // onChange={(e) => setusername(e.target.value)}
            type="text"
            placeholder="Enter Username"
            id="uname"
            required
          />

          <label htmlFor="psw">
            <b>Password</b>
          </label>
          <input
            type="password"
            ref={passwordRef}
            // value={password}
            // onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
            id="psw"
            required
          />

          <button type="submit" onClick={submitHandler}>
            Login
          </button>
          <label>
            <input
              type="checkbox"
              onChange={rememberMeHandler}
              checked={isRememberingMe}
              name="remember"
            />{" "}
            Remember me
          </label>
        </div>

        <div
          className="container"
          style={{ backgroundColor: styles.backgroundColor }}
        >
          <button type="button" onClick={() => {}} className="cancelbtn">
            Cancel
          </button>
          <span className="psw">
            Forgot <a href="">password?</a>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;
