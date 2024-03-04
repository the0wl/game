import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import WebGL from 'three/addons/capabilities/WebGL.js';
import { WebGLNotSupported } from './components';
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    { (WebGL.isWebGLAvailable()) ? <App /> : <WebGLNotSupported /> }	
  </React.StrictMode>,
);
