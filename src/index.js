import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/js/bootstrap.min.js";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Blocks } from "react-loader-spinner";

const root = ReactDOM.createRoot(document.getElementById("root"));

const isLoading = false
root.render(
  <React.StrictMode>
    <Provider store={store}>
      {isLoading ?
        <div className="preloader-box">

          <Blocks
            height="100"
            width="100"
            color="#4fa94d"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            visible={true}
          />
        </div>
        :
        <App />}
    </Provider>
  </React.StrictMode>
);
