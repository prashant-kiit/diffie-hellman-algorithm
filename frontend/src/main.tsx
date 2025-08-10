import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

const response = await fetch("http://localhost:8000/key");
if (response.ok) {
  const result = await response.json();
  localStorage.setItem("KEY", result?.key);
}

createRoot(document.getElementById("root")!).render(<App />);
