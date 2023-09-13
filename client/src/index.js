import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { ContextProvider } from "./context/Context";
import { CookiesProvider } from "react-cookie";

ReactDOM.render(
  <ContextProvider>
    <Router>
      <CookiesProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </CookiesProvider>
    </Router>
  </ContextProvider>,
  document.getElementById("root")
);
