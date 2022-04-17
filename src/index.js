import React, { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { FilterProvider } from "./filter-context";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <FilterProvider>
      <App />
    </FilterProvider>
  </StrictMode>,
  rootElement
);
