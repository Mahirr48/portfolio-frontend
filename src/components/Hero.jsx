import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";

const Hero = () => {
  const { scrollY } = useScroll();
  const navigate = useNavigate();

  const ySlow = useTransform(scrollY, [0, 500], [0, 40]);
  const yFast = useTransform(scrollY, [0, 500], [0, 100]);

  const opacity = useTransform(scrollY, [0, 200], [1, 0.85]);
  const scale = useTransform(scrollY, [0, 200], [1, 0.98]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 120, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 120, damping: 20 });

  const handleMouseMove = (e) => {
    const { innerWidth, innerHeight } = window;
    mouseX.set((e.clientX / innerWidth - 0.5) * 50);
    mouseY.set((e.clientY / innerHeight - 0.5) * 50);
  };

  return (
    <section
      onMouseMove={handleMouseMove}
className="relative min-h-[85vh] md:min-h-screen flex items-center md:items-center px-5 md:px-16 pt-20 md:pt-0 overflow-hidden"    >
      {/* CURSOR LIGHT */}
      <motion.div
        style={{ x: smoothX, y: smoothY }}
        className="
          pointer-events-none absolute w-[450px] h-[450px] rounded-full blur-[60px]
          bg-gradient-to-r from-green-400/15 to-purple-500/15
          dark:from-green-400/25 dark:to-purple-500/25
        "
      />

      {/* MAIN */}
      <motion.div
        style={{ y: ySlow, opacity, scale }}
        className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center w-full max-w-7xl mx-auto"
      >
        {/* LEFT */}
        <motion.div
          className="pt-4 md:pt-0"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12 } },
          }}
        >
          {/* ROLE */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 10 },
              show: { opacity: 1, y: 0 },
            }}
            className="text-[10px] md:text-xs tracking-[0.3em] text-[var(--text-muted)] dark:text-gray-500 uppercase mb-3 md:mb-6"
          >
            Full Stack Developer
          </motion.p>

          {/* HEADING */}
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 30, scale: 0.98 },
              show: { opacity: 1, y: 0, scale: 1 },
            }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.1]"
          >
            <span className="text-[var(--text-muted)] dark:text-gray-300">
              Hey, I’m
            </span>
            <br />
            <motion.span
              animate={{
                backgroundPosition: ["0%", "100%", "0%"],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
              className="bg-gradient-to-r from-green-400 via-emerald-300 to-purple-500 bg-[length:200%_200%] bg-clip-text text-transparent"
            >
              Mahir
            </motion.span>
          </motion.h1>

          {/* TAGLINE */}
          <motion.p
  variants={{
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
  }}
  className="mt-3 md:mt-6 text-[var(--text-muted)] dark:text-gray-400 max-w-md mx-auto md:mx-0 text-base md:text-lg"
>
  I build{" "}
<span className="
  bg-gradient-to-r 
  font-semibold
  font-serif
  from-indigo-600 via-purple-600 to-pink-600 
  dark:from-purple-400 dark:via-pink-400 dark:to-indigo-400 
  bg-clip-text text-transparent
  drop-shadow-[0_0_6px_rgba(99,102,241,0.4)]
  dark:drop-shadow-[0_0_10px_rgba(168,85,247,0.6)]
">
      <TypeAnimation
      sequence={[
        "impressive",
        1000,
        "fast",
        1000,
        "immersive",
        1000,
      ]}
      speed={60}
      repeat={Infinity}
    />
  </span>{" "}
  web experiences.
</motion.p>
          {/* BUTTONS */}
          <div className="mt-6 md:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 items-center md:items-start">
            {/* PRIMARY */}
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => navigate("/projects")}
              className="w-full sm:w-auto px-6 md:px-8 py-3 rounded-xl 
              bg-gradient-to-r from-green-400 to-purple-500 
              text-black font-semibold shadow-lg shadow-green-500/20"
            >
              Explore Work
            </motion.button>

            {/* SECONDARY */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/contact")}
              className="
                w-full sm:w-auto px-6 md:px-8 py-3 rounded-xl 
                border border-[var(--border-color)] dark:border-white/10
                bg-white/60 dark:bg-white/5
                text-[var(--text-main)] dark:text-white/80
                hover:bg-black/5 dark:hover:bg-white/10 transition
              "
            >
              Contact
            </motion.button>
          </div>

          {/* MOBILE CARD */}
          <motion.div
            style={{ y: yFast }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex md:hidden justify-center mt-8"
          >
            <motion.div
              style={{ rotateX: smoothY, rotateY: smoothX }}
              className="
                w-[260px] rounded-2xl p-4 shadow-xl

                bg-white border border-[var(--border-color)]
                dark:bg-white/5 dark:border-white/10 dark:backdrop-blur-xl
              "
            >
              <div className="flex gap-2 mb-3">
                <div className="w-2.5 h-2.5 bg-red-400 rounded-full" />
                <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full" />
                <div className="w-2.5 h-2.5 bg-green-400 rounded-full" />
              </div>

              <p className="text-green-400 text-xs">$ mahir deploy</p>
              <p className="text-purple-400 text-xs">✔ live</p>

              <div className="mt-4 grid grid-cols-2 gap-3 text-[10px] text-[var(--text-muted)] dark:text-gray-300">
                <div>
                  <p className="text-gray-400 dark:text-gray-500">Frontend</p>
                  <p>React</p>
                </div>
                <div>
                  <p className="text-gray-400 dark:text-gray-500">Backend</p>
                  <p>Node</p>
                </div>
                <div>
                  <p className="text-gray-400 dark:text-gray-500">DB</p>
                  <p>MongoDB</p>
                </div>
                <div>
                  <p className="text-gray-400 dark:text-gray-500">Focus</p>
                  <p>UX + Perf</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* DESKTOP CARD */}
        <motion.div
          style={{ y: yFast }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="hidden md:flex relative h-[420px] items-center justify-center"
        >
          <motion.div
            style={{ rotateX: smoothY, rotateY: smoothX }}
            className="
              w-[320px] rounded-2xl p-6 shadow-2xl

              bg-white border border-[var(--border-color)]
              dark:bg-white/5 dark:border-white/10 dark:backdrop-blur-xl
            "
          >
            <div className="flex gap-2 mb-4">
              <div className="w-3 h-3 bg-red-400 rounded-full" />
              <div className="w-3 h-3 bg-yellow-400 rounded-full" />
              <div className="w-3 h-3 bg-green-400 rounded-full" />
            </div>

            <p className="text-green-400 text-sm">$ mahir deploy</p>
            <p className="text-purple-400 text-sm">✔ live</p>

            <div className="mt-6 grid grid-cols-2 gap-4 text-xs text-[var(--text-muted)] dark:text-gray-300">
              <div>
                <p className="text-gray-400 dark:text-gray-500">Frontend</p>
                <p>React</p>
              </div>
              <div>
                <p className="text-gray-400 dark:text-gray-500">Backend</p>
                <p>Node</p>
              </div>
              <div>
                <p className="text-gray-400 dark:text-gray-500">DB</p>
                <p>MongoDB</p>
              </div>
              <div>
                <p className="text-gray-400 dark:text-gray-500">Focus</p>
                <p>UX + Perf</p>
              </div>
            </div>
          </motion.div>

          {/* BLOBS */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute w-[200px] h-[120px] bg-purple-500/10 blur-xl rounded-2xl top-10 left-10"
          />

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 12, repeat: Infinity }}
            className="absolute w-[180px] h-[100px] bg-green-400/10 blur-xl rounded-2xl bottom-10 right-10"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;