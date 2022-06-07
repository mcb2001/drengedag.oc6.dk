import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/stylesheet.scss";
import { BrowserRouter } from "react-router-dom";
import { } from "./util/ArrayExtensions";
import { Router } from "./routing";
import { DefaultLayout } from "./components";
import { App } from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode >
);