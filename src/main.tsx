import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./assets/reset.css";
import "./assets/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
// @ts-expect-error Missing type declarations for Swiper CSS
import "swiper/css";
// @ts-expect-error Missing type declarations for Swiper pagination CSS
import "swiper/css/pagination";

createRoot(document.getElementById("root")!).render(<App />);
