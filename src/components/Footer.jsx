import { motion, useMotionValue, useSpring } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { useEffect } from "react";

const MagneticIcon = ({ children, href, color }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 200, damping: 15 });
  const springY = useSpring(y, { stiffness: 200, damping: 15 });

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);

    x.set(dx * 0.3);
    y.set(dy * 0.3);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      href={href}
      target="_blank"
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: springX, y: springY }}
      className={`
        relative p-3 rounded-full
        border border-[var(--border-color)]
        text-[var(--text-muted)]
        transition
        ${color}
      `}
    >
      {children}

      {/* proximity glow */}
      <div className="absolute inset-0 rounded-full bg-white/10 blur-md opacity-0 group-hover:opacity-100 transition" />
    </motion.a>
  );
};

const Footer = () => {
  // 🔥 aurora blend (subtle top fade)
  useEffect(() => {
    const footer = document.querySelector("#elite-footer");
    if (!footer) return;

    footer.style.background =
      "linear-gradient(to top, var(--bg-main), transparent)";
  }, []);

  return (
    <footer id="elite-footer" className="relative mt-28 px-6 pb-10 pt-16">

      {/* 🔥 AURORA BLEND FADE */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-transparent to-[var(--bg-main)] pointer-events-none" />

      {/* 🔥 TOP LINE (VERY SUBTLE) */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-white/10" />

      <div className="max-w-5xl mx-auto">

        {/* MAIN CONTENT */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center md:text-left"
          >
            <h2 className="text-lg font-semibold text-[var(--text-main)]">
              Mahir Khan
            </h2>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              Smooth experiences. Clean architecture. No compromises.
            </p>
          </motion.div>

          {/* CENTER (MAGNETIC ICONS) */}
          <div className="flex items-center gap-5 group">

            <MagneticIcon
              href="https://github.com/mahirr48"
              color="hover:text-green-400 hover:border-green-400/40"
            >
              <FaGithub />
            </MagneticIcon>

            <MagneticIcon
              href="https://linkedin.com/in/mahir-khan-4b6030363"
              color="hover:text-purple-400 hover:border-purple-400/40"
            >
              <FaLinkedin />
            </MagneticIcon>

            <MagneticIcon
              href="mailto:mahirrkhan48@gmail.com"
              color="hover:text-green-400 hover:border-green-400/40"
            >
              <FaEnvelope />
            </MagneticIcon>

          </div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-xs text-[var(--text-muted)] text-center md:text-right"
          >
            © {new Date().getFullYear()} Mahir.dev
          </motion.div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;