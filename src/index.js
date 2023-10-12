import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import { actionApi } from "./api/api";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ApiProvider api={actionApi}>
      <App />
    </ApiProvider>
  </React.StrictMode>
);
