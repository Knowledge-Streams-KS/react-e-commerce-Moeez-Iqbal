import './index.css';
import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { CartContextProvider } from "./context/CartContext.jsx";
import { UserAuthContextProvider } from './context/UserAuthContext.jsx';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
  <BrowserRouter>
    <UserAuthContextProvider>
      <CartContextProvider>
        <App />
      </CartContextProvider>
    </UserAuthContextProvider>
  </BrowserRouter>
</React.StrictMode>
);

