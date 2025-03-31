import { ReactElement, useEffect, useRef } from "react";
import { socket } from "../../api/socket";
import {
  addMessage,
  selectMessages,
} from "../../features/Messages/messagesApiSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Message } from "../../types/interfaces";

const Home = (): ReactElement => {
  const dispatch = useAppDispatch();
  const messages = useAppSelector(selectMessages);

  const messageRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // Listen for incoming messages from the server
    socket.on("receive_message", (data) => {
      dispatch(addMessage(data));
    });
    // Cleanup the effect by removing the event listener when the component unmounts
    return () => {
      socket.off("receive_message");
    };
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  const sendMessage = async () => {
    // Emit a socket event with the message details
    socket.emit("send_message", {
      senderId: "123", // ID of the sender
      receiverId: "456", // ID of the receiver
      message: messageRef.current
        ? messageRef.current?.value
        : "default message", // The actual message content
    });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div>HOME PAGE</div>
      <input
        ref={messageRef}
        className="w-40 mt-4 mb-4 border-2"
        type="text"
        name="message"
        id=""
      />
      <button
        className="w-40
        flex-row 
        justify-center 
        items-center 
        gap-2 
        p-2 
        bg-blue-700 
        text-white 
        rounded-md 
        cursor-pointer"
        onClick={sendMessage}
      >
        Send socket message
      </button>{" "}
      {/* Button to trigger sending a message */}
      <div className="flex flex-col mt-4 justify-center">
        <p className="underline">Websocket messages in state:</p>
        {messages.length &&
          messages.map((message: Message) => {
            return (
              <div key={Math.random()}>
                <p>Message: {message?.message}</p>{" "}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Home;
