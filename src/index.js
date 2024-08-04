import React from "react";
import ReactDOM from "react-dom/client";
import AppV1 from "./App_v1";
import css from "./styles.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppV1 style={css} />
  </React.StrictMode>,
);
