import { ReactElement } from "react";
import "./Main.scss";

import { ReactNode } from "react";
import { useAuth } from "../../context/AuthContext";

const Main = ({ children }: { children: ReactNode }): ReactElement => {
  const { token, user } = useAuth();

  if (!token) {
    return <main className="main">{children}</main>;
  }
  return (
    <div>
      Authenticated <br />
      userID : {user?.id} <br />
      email : {user?.email}
    </div>
  );
};

export default Main;
