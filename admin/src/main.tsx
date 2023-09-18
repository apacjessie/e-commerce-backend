import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "tailwindcss/tailwind.css";
import { StoreProvider } from "./context/StoreContext.tsx";
import SocketProvider from "./context/SocketContext.tsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <StoreProvider>
      <SocketProvider>
        <App />
      </SocketProvider>
    </StoreProvider>
  </BrowserRouter>
);
