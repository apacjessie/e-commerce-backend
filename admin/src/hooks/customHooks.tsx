import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import { SocketContext } from "../context/SocketContext";

export const useStore = () => {
  return useContext(StoreContext);
};

export const useSocket = () => {
  return useContext(SocketContext);
};
