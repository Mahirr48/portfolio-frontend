import { motion } from "framer-motion";

const Loader = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.4, // 🔥 faster exit
        ease: "easeOut",
      }}
      className="
        fixed inset-0 z-[9999] flex items-center justify-center
        bg-[var(--bg-main)] dark:bg-[#020617]
      "
    >
      {/* LIGHT AURORA (reduced load) */}
      <motion.div
        animate={{ x: [0, 20, -20, 0] }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute w-[500px] h-[500px] blur-[120px] // 🔥 reduced size
          bg-gradient-to-r from-green-400/10 to-purple-500/10
        "
      />

      {/* CONTENT */}
      <div className="flex flex-col items-center">

        {/* NAME */}
        <motion.h1
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="text-3xl md:text-5xl tracking-[0.2em]"
        >
          <span className="bg-gradient-to-r from-green-400 to-purple-500 bg-clip-text text-transparent">
            MAHIR
          </span>
        </motion.h1>

        {/* LOADER BAR */}
        <div className="relative mt-8 w-36 h-[2px] overflow-hidden">
          <div className="absolute inset-0 bg-black/10 dark:bg-white/10" />

          <motion.div
            animate={{ x: ["-100%", "100%"] }}
            transition={{
              duration: 1.4, // 🔥 faster
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-green-400 to-transparent"
          />
        </div>

      </div>
    </motion.div>
  );
};

export default Loader;