import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import Lenis from "lenis";
import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";
import "./index.css";

function SmoothScrollProvider({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return children;
}

createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <BrowserRouter>
      <SmoothScrollProvider>
        <App />
      </SmoothScrollProvider>
    </BrowserRouter>
  </ThemeProvider>
);