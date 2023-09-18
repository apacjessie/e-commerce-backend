import { MdHeadsetMic, MdEmojiEmotions } from "react-icons/md";
import { useState, useRef, useEffect } from "react";
import { useStore } from "../hooks/customHooks";
import { useSocket } from "../hooks/customHooks";
import Chat from "./Chat";
import { StoreAction } from "../context/StoreContext";
import ClientList from "./ClientList";

const LiveChat = () => {
  const { client, supportedClient, dispatch } = useStore();
  const [openChat, setOpenChat] = useState<boolean>(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const socket = useSocket();

  useEffect(() => {
    socket.on("clientDisconnected", (data: any) => {
      if (supportedClient?.socketID === data?.socketID) {
        const updateClient = client.filter(
          (user: any) => user.socketID !== supportedClient.socketID
        );
        dispatch({
          type: StoreAction.UPDATE_CLIENT,
          payload: updateClient,
        });
        dispatch({ type: StoreAction.GET_SUPPORTED_CLIENT, payload: null });
      }
    });
  }, [socket, supportedClient]);

  useEffect(() => {
    const handleClicking = (e: MouseEvent) => {
      if (
        openChat &&
        chatRef.current &&
        !chatRef.current.contains(e.target as HTMLElement)
      ) {
        setOpenChat((prev) => !prev);
      }
    };

    window.addEventListener("click", handleClicking);

    return () => window.removeEventListener("click", handleClicking);
  }, [openChat]);

  const handleAcception = (client: any) => {
    socket.emit("acceptRequest", { socketID: client.socketID });
    dispatch({ type: StoreAction.GET_SUPPORTED_CLIENT, payload: client });
  };

  const handleDisconnecting = () => {
    socket.emit("adminDisconnectToChat", {
      clientSocketID: supportedClient.socketID,
    });
    dispatch({ type: StoreAction.CLEAR_CHAT });
    dispatch({ type: StoreAction.GET_SUPPORTED_CLIENT, payload: null });
    const updateClient = client.filter(
      (user: any) => user.socketID !== supportedClient.socketID
    );
    dispatch({
      type: StoreAction.UPDATE_CLIENT,
      payload: updateClient,
    });
  };

  return (
    <section className="absolute bottom-4 right-4 flex  p-2" ref={chatRef}>
      <div className="relative">
        <button className="z-[100] rounded-full bg-slate-900 p-3 transition duration-200 hover:scale-105">
          <MdHeadsetMic
            className="h-8 w-8 text-gray-200"
            onClick={() => setOpenChat((prev) => !prev)}
          />
        </button>

        <div
          className={`${
            openChat ? "flex" : "hidden"
          } absolute  -left-[34rem] -top-[28.5rem] 
         z-50 h-[30rem] w-[35rem] flex-col bg-slate-900 p-2 py-2 text-gray-200`}
        >
          <div className="flex justify-between  border-b border-gray-500 p-2">
            <h1 className="h-fit w-full text-lg font-bold">
              Live Chat Customer Support
            </h1>
            {supportedClient && (
              <button
                className="bg-blue-500 px-2 hover:bg-blue-400"
                onClick={handleDisconnecting}
              >
                Disconnect
              </button>
            )}
          </div>
          <section className="h-full  w-full flex-1 flex-col overflow-y-auto p-2 pt-4 scrollbar-thin scrollbar-thumb-blue-500">
            {client.length <= 0 && supportedClient === null && (
              <div className="flex h-full w-full flex-col items-center justify-center text-gray-400">
                <MdEmojiEmotions className="h-24 w-24 text-gray-400" />
                <p>Seems like no user needed our assistant.</p>
              </div>
            )}

            {client.length > 0 && supportedClient === null && (
              <ClientList client={client} handleAcception={handleAcception} />
            )}

            {supportedClient !== null && <Chat client={supportedClient} />}
          </section>
        </div>
      </div>
    </section>
  );
};

export default LiveChat;
