import { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { useStore } from "../hooks/customHooks";
import { Outlet, useNavigate } from "react-router-dom";
import LiveChat from "../components/LiveChat";
import { useSocket } from "../hooks/customHooks";
import { StoreAction } from "../context/StoreContext";

const Dashboard = () => {
  const { user } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) return navigate("/");
  }, []);

  const socket = useSocket();
  const { dispatch } = useStore();

  useEffect(() => {
    socket.emit("connected", {
      user: { type: "admin", email: "admin@exclsv.com", id: "00000" },
    });
  }, [socket]);

  return (
    <div className="relative flex h-screen w-screen">
      <Sidebar />
      <div className="flex-1 overflow-auto bg-gray-200 px-10 py-5">
        <Outlet />
      </div>
      <LiveChat />
    </div>
  );
};

export default Dashboard;
