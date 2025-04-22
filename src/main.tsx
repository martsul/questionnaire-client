import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./assets/reset.css";
import "./assets/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "swiper/css";
import "swiper/css/pagination";

createRoot(document.getElementById("root")!).render(
        <App />
);
