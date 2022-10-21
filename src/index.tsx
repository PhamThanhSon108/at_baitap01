import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import GlobalStyles from "./components/GlobalStyles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Counter from "./components/counter";
import { store } from "./state";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <GlobalStyles>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Counter />} />
            <Route path="" element={<App />} />
          </Routes>

          <App />
        </BrowserRouter>
      </GlobalStyles>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
