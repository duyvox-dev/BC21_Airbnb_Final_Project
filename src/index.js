import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "antd/dist/antd.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
const BASE_URL = process.env.REACT_APP_API_BASE_URL;
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
