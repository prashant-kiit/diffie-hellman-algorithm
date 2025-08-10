import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

const KEY = "mysecretkey";
// const oldkey = localStorage.getItem("KEY");
// if (!oldkey)
localStorage.setItem("KEY", KEY);

createRoot(document.getElementById("root")!).render(<App />);
