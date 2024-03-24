import React from "react";
import ReactDOM from "react-dom";
import { createElement } from "react";
import { createRoot } from "react-dom/client";
// import "./index.css";
import App from "./app";
import "./style/app.less";
// import * as serviceWorker from "./serviceWorker";

// console.log("process env", process.env);
// const Welcome = () => <h1>Welcome</h1>;
const rootElem = document.getElementById("root");
if (rootElem)
  createRoot(rootElem).render(
    createElement(
      App,
      {
        message:
          "Hello World! A Counter App built on ESBuild + React + Typescript",
      },
      null
    )
  );
else alert('Cannot find element with id "root", something went wrong');
if (process.env.NODE_ENV === "development")
  new EventSource("/esbuild").addEventListener("change", () =>
    location.reload()
  );
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
