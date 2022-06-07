import React from "react";
import { Router } from "./routing/Router";
import { Menu } from "./components/Menu";

function App() {
  return (
    <div className="app">
      <div className="content">
        <Router />
      </div>
      <Menu />
    </div>
  );
}

export { App };
