import { motion } from "framer-motion";
import { Star } from "lucide-react";

const ReviewCard = ({ r }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} // ✅ entry animation
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }} // ✅ subtle (not aggressive)
      transition={{ duration: 0.3 }}
      className="
        min-w-[300px] max-w-[300px]
        p-6 rounded-2xl relative overflow-hidden

        bg-white border border-[var(--border-color)] shadow-sm
        dark:bg-white/5 dark:border-white/10 dark:backdrop-blur-xl
      "
    >
      {/* LIGHT OVERLAY */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none bg-gradient-to-b from-white/40 to-transparent opacity-60 dark:hidden" />

      {/* SUBTLE BACK GLOW (lighter + cheaper) */}
      <motion.div
        animate={{ opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute -z-10 inset-0 blur-xl bg-purple-400 dark:bg-purple-500"
      />

      {/* MESSAGE */}
      <p className="text-sm leading-relaxed mb-4 text-[var(--text-muted)] dark:text-gray-300">
        “{r?.message || "No message"}”
      </p>

      {/* RATING */}
      <div className="flex gap-1 mb-3">
        {[...Array(r?.rating || 0)].map((_, i) => (
          <Star
            key={i}
            size={14}
            className="text-yellow-400 fill-yellow-400"
          />
        ))}
      </div>

      {/* NAME */}
      <p className="text-xs font-medium text-purple-500 dark:text-green-400">
        — {r?.name || "Anonymous"}
      </p>
    </motion.div>
  );
};

export default ReviewCard;