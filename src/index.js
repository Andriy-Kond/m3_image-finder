import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import css from "./styles.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App style={css} />
  </React.StrictMode>,
);
