import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/stylesheet.css";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import { SpinnerContextProvider } from "./contexts";
import { DefaultToastContainer, SpinnerContainer } from "./components";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="oc6.eu.auth0.com"
      clientId="chPM83h1wb4RHlVWcgzL9dr5INn5e3D9"
      redirectUri={window.location.origin}
      audience="https://api.drengedag.oc6.dk">
      <SpinnerContextProvider>
        <SpinnerContainer />
        <DefaultToastContainer />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SpinnerContextProvider>
    </Auth0Provider>
  </React.StrictMode >
);