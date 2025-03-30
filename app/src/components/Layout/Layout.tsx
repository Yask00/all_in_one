import { ReactNode, useEffect } from "react";
import "./Layout.scss";
import { socket } from "../../api/socket";
import { toast } from "react-toastify";

const Layout = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    socket.on("todo_added", (data) => {
      console.log(data); // Log the received message data to the console
      toast.success("Todo added");
    });
    // Cleanup the effect by removing the event listener when the component unmounts
    return () => {
      socket.off("todo_added");
    };
  }, []); // Empty dependency array ensures this runs only once when the component mounts
  return <div className="layout">{children}</div>;
};

export default Layout;
