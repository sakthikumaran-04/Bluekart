import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { CartProvider } from "./hooks/useCart hook/useCart.jsx";
import { LikeProvider } from "./hooks/useLike hook/useLike.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <CartProvider>
    <LikeProvider>
      <App />
    </LikeProvider>
  </CartProvider>
);
