import { ReactNode } from "react";
import "./Layout.scss";
import { Bounce, ToastContainer } from "react-toastify";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="layout">
      {children}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </div>
  );
};

export default Layout;
