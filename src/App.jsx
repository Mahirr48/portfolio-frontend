import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import ProjectDetail from "./pages/ProjectDetail";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Skills from "./pages/Skills";
import About from "./pages/About";
import CursorGlow from "./components/GlobalLight";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import { useState, useEffect } from "react";
import PageWrapper from "./components/PageWrapper";

import CinematicAurora from "./components/CinematicAurora";
import Reviews from "./pages/Reviews";
import { motion } from "framer-motion";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  const isAdminOrLogin =
    location.pathname.startsWith("/admin") ||
    location.pathname === "/login";

  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-[var(--bg-main)] text-[var(--text-main)]">

      {/* BACKGROUND */}
      {isDark && <CinematicAurora />}

      {/* MAIN UI */}
      <div className="relative z-10">
        <ScrollToTop />

        {!isAdminOrLogin && <Navbar />}

        <CursorGlow />

        <Toaster
  position="top-center"
  containerStyle={{
    top: "35%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  }}
  toastOptions={{
    style: {
      background: "#0b0f14",
      color: "#fff",
      border: "1px solid rgba(255,255,255,0.1)",
    },
  }}
/>

        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route path="/login" element={<Login />} />

            <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
            <Route path="/projects" element={<PageWrapper><Projects /></PageWrapper>} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/skills" element={<PageWrapper><Skills /></PageWrapper>} />
            <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
            <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
            <Route path="/reviews" element={<PageWrapper><Reviews /></PageWrapper>} />

            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <PageWrapper><Admin /></PageWrapper>
                </ProtectedRoute>
              }
            />
          </Routes>
        </AnimatePresence>

        {!isAdminOrLogin && <Footer />}
      </div>

      {/* LOADER */}
      <AnimatePresence>
        {loading && <Loader key="loader" />}
      </AnimatePresence>
    </div>
  );
}

export default App;