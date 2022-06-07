import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/stylesheet.scss";
import { App } from "./App";
import { BrowserRouter } from "react-router-dom";
import { } from "./util/ArrayExtensions";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);