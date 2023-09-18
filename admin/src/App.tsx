import Pages from "./page/Pages";
import { useEffect } from "react";
import { useSocket } from "./hooks/customHooks";
import { useStore } from "./hooks/customHooks";
import { StoreAction } from "./context/StoreContext";
function App() {
  const socket = useSocket();
  const { client, dispatch } = useStore();
  useEffect(() => {
    socket.on("clientContactRequest", (data: any) => {
      console.log(data);

      if (client.includes(data)) return;
      dispatch({ type: StoreAction.GET_CLIENT, payload: data });
    });
  }, [socket]);

  return (
    <div className=" flex h-screen w-screen">
      <Pages />
    </div>
  );
}

export default App;
