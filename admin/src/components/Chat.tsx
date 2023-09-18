import { FormEvent, useEffect, useState, useRef } from "react";
import { useSocket, useStore } from "../hooks/customHooks";
import { IoMdSend } from "react-icons/io";
import { StoreAction } from "../context/StoreContext";
import { nanoid } from "nanoid";

const Chat = ({ client }: any) => {
  const socket = useSocket();
  const { chats, dispatch } = useStore();
  const [message, setMessage] = useState<string>("");
  const chatBottom = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const receivedMessageHandler = (data: any) => {
      console.log("received");
      dispatch({ type: StoreAction.UPDATE_CHAT, payload: data });
      setTimeout(() => {
        chatBottom.current?.scrollIntoView({ behavior: "smooth" });
      }, 0);
    };

    socket.on("receivedMessage", receivedMessageHandler);
    return () => {
      socket.off("receivedMessage", receivedMessageHandler);
    };
  }, [socket]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim() === "") return;
    setMessage("");
    dispatch({
      type: StoreAction.UPDATE_CHAT,
      payload: { sender: "You", message: message.trim() },
    });
    socket.emit("sendMessage", {
      socketID: client.socketID,
      email: "admin@exclsv.com",
      message: message.trim(),
    });
    setTimeout(() => {
      chatBottom.current?.scrollIntoView({ behavior: "smooth" });
    }, 0);
  };

  return (
    <section className="flex h-full flex-col ">
      <div className="scroll flex-1 overflow-y-auto p-1 py-2 scrollbar-thin scrollbar-thumb-blue-500">
        {chats &&
          chats.map((chat: any) => (
            <div
              className={`${
                chat.sender === "You" ? "items-end" : "items-start"
              } flex flex-col`}
              key={nanoid()}
            >
              <p>{chat.sender}</p>
              <p className="bg-blue-500 p-2">{chat.message}</p>
            </div>
          ))}
        <div ref={chatBottom}></div>
      </div>
      <form
        className="relative flex items-center bg-gray-700"
        onSubmit={(e) => handleSubmit(e)}
      >
        <input
          type="text"
          value={message}
          className="w-full  bg-transparent p-2 outline-0"
          onChange={(e) => setMessage(e.target.value)}
        />
        <button>
          <IoMdSend
            className="right-1 h-8 w-8 cursor-pointer text-gray-500
        transition duration-200 hover:text-blue-500"
          />
        </button>
      </form>
    </section>
  );
};

export default Chat;
