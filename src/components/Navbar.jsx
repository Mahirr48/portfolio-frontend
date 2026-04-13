import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { dark, setDark } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handler = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { path: "/", label: "Home" },
    { path: "/projects", label: "Projects" },
    { path: "/skills", label: "Skills" },
    { path: "/contact", label: "Contact" },
    { path: "/about", label: "About" },
  ];

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`
        fixed top-4 left-0 w-full z-50 px-4 md:px-6
        transition-all duration-500
        ${
          scrolled
  ? `
    bg-white/80 dark:bg-white/5
    backdrop-blur-lg
    border border-[var(--border-color)] dark:border-white/10
    shadow-sm dark:shadow-[0_10px_40px_rgba(0,0,0,0.25)]
  `
  : `
    bg-transparent
    border border-transparent
  `
        }
      `}
    >
      <div className="flex items-center justify-between h-14 md:h-16">

        {/* LOGO */}
        <motion.div
          onClick={() => navigate("/")}
          className="relative cursor-pointer group select-none"
          whileTap={{ scale: 0.92 }}
        >
          <div className="absolute inset-0 blur-xl opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-r from-green-400/30 to-purple-500/30" />

          <motion.div
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = (e.clientX - rect.left - rect.width / 2) * 0.15;
              const y = (e.clientY - rect.top - rect.height / 2) * 0.15;
              e.currentTarget.style.transform = `rotateX(${ -y }deg) rotateY(${ x }deg)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "rotateX(0deg) rotateY(0deg)";
            }}
            className="
              relative w-10 h-10 flex items-center justify-center rounded-xl
              border border-[var(--border-color)] dark:border-white/10
              backdrop-blur-lg
              bg-white/80 dark:bg-white/5
              shadow-sm dark:shadow-lg
            "
          >
            <motion.div
              className="absolute inset-0 rounded-xl"
              style={{
                background:
                  "linear-gradient(120deg, #4ade80, #34d399, #a855f7, #4ade80)",
                backgroundSize: "200% 200%",
              }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            <div className="absolute inset-[1.5px] rounded-xl bg-[var(--bg-main)]" />

            <span className="relative text-sm font-semibold tracking-wider bg-gradient-to-r from-green-400 to-purple-500 bg-clip-text text-transparent">
              MK
            </span>
          </motion.div>
        </motion.div>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-10">
          {links.map((link) => (
            <NavLink key={link.path} to={link.path}>
              {({ isActive }) => (
                <motion.div className="group relative cursor-pointer">

                  <span
                    className={`
                      text-sm tracking-[0.14em] transition-all duration-500
                      ${
                        isActive
                          ? "text-[var(--text-main)] dark:text-white"
                          : "text-[var(--text-muted)] hover:text-[var(--text-main)] dark:text-white/40 dark:hover:text-white/80"
                      }
                    `}
                  >
                    {link.label}
                  </span>

                  <span
                    className="
                      absolute left-0 -bottom-2 h-[1px] w-0
                      bg-[var(--text-muted)] dark:bg-white/40
                      transition-all duration-500
                      group-hover:w-full
                    "
                  />

                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute left-0 -bottom-2 h-[2px] w-full bg-[var(--text-main)] dark:bg-white"
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 30,
                      }}
                    />
                  )}
                </motion.div>
              )}
            </NavLink>
          ))}
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-2">

          <button
            onClick={() => setDark(!dark)}
            className="
              w-10 h-10 rounded-full flex items-center justify-center
              bg-black/10 dark:bg-white/10
              border border-[var(--border-color)] dark:border-white/10
            "
          >
            {dark ? "☀️" : "🌙"}
          </button>

          {/* HAMBURGER */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center"
          >
            <div>
              <span className="block w-5 h-[2px] bg-[var(--text-main)] dark:bg-white mb-1" />
              <span className="block w-5 h-[2px] bg-[var(--text-main)] dark:bg-white mb-1" />
              <span className="block w-5 h-[2px] bg-[var(--text-main)] dark:bg-white" />
            </div>
          </button>

        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="
            md:hidden mt-3 rounded-xl p-4
            bg-white dark:bg-black/40
            backdrop-blur-xl
            border border-[var(--border-color)] dark:border-white/10
          "
        >
          <div className="flex flex-col gap-3">
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setMenuOpen(false)}
              >
                {({ isActive }) => (
                  <div
                    className={`
                      px-4 py-3 rounded-lg text-sm transition
                      ${
                        isActive
                          ? "bg-black/5 text-[var(--text-main)] dark:bg-white/10 dark:text-white"
                          : "text-[var(--text-muted)] hover:bg-black/5 dark:text-white/60 dark:hover:bg-white/5"
                      }
                    `}
                  >
                    {link.label}
                  </div>
                )}
              </NavLink>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;