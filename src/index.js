import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { QuizzesProvider } from "./context/QuizzesContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <QuizzesProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </QuizzesProvider>
);
