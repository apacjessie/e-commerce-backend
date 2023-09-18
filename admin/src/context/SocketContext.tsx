import React, { createContext } from "react";
import io from "socket.io-client";

export const SocketContext = createContext<any>({});

const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const socket = io("http://localhost:3000");

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
