import { useState, useEffect } from "react";
import Hero from "../components/Hero";
import ProjectsSection from "../components/ProjectsSection";
import { Link } from "react-router-dom";
import ValueSection from "../components/ValueSection";
import { motion } from "framer-motion";
import { useParallax } from "../hooks/useParallax";
import { getFeaturedReviews } from "../services/reviewService";
import { Star } from "lucide-react";
import { useAnimation } from "framer-motion";

const Home = () => {
  const [reviews, setReviews] = useState([]);
  const { y, opacity } = useParallax(40);
  const controls = useAnimation();

  // ✅ FETCH REVIEWS (CORRECT)
useEffect(() => {
  const load = async () => {
    const data = await getFeaturedReviews();
    setReviews(data);

    // 🔥 wait for next paint (important)
    requestAnimationFrame(() => {
      controls.start({
        x: ["0%", "-50%"],
        transition: {
          duration: 20,
          ease: "linear",
          repeat: Infinity,
        },
      });
    });
  };

  load();
}, []);

  return (
    <div className="min-h-[calc(100vh-64px)]">
      
      {/* HERO */}
      <motion.div style={{ y, opacity }}>
        <Hero />
      </motion.div>

      {/* VALUE */}
      <ValueSection />

      {/* PROJECTS */}
      <ProjectsSection limit={3} />

      {/* CTA */}
      <div className="text-center py-20">
        <h2 className="text-3xl font-semibold mb-4">
          Want to see more?
        </h2>

        <Link
          to="/projects"
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-400 to-purple-500 text-black font-semibold hover:scale-105 transition"
        >
          View All Projects →
        </Link>
      </div>

      {/* REVIEWS */}
      <div className="overflow-hidden relative will-change-transform">
        <section className="mt-20 px-6">
          
          <h2 className="text-3xl font-bold mb-8 text-[var(--text-main)]">
            What people say
          </h2>

          <div className="overflow-hidden relative">

            {/* ✅ ONLY RENDER WHEN DATA EXISTS */}
{reviews.length > 0 ? (
      <motion.div
    className="flex gap-6 w-max"
    initial={{ x: "0%" }} // 🔥 FIX THIS
animate={controls}
   
    
  >
    {[...reviews, ...reviews].map((r, index) => (
      <div
        key={r._id + index}
        className="
          min-w-[280px] max-w-[280px]
          p-5 rounded-xl backdrop-blur-xl
          transition-transform duration-300 ease-out
          bg-white border border-[var(--border-color)] shadow-sm
          dark:bg-white/5 dark:border-white/10
        "
      >
        <p className="text-sm mb-3 text-[var(--text-muted)] dark:text-gray-300">
          "{r.message}"
        </p>

        <div className="flex gap-1 mb-2">
          {[...Array(r.rating || 0)].map((_, i) => (
            <Star
              key={i}
              size={14}
              className="text-yellow-400 fill-yellow-400"
            />
          ))}
        </div>

        <p className="text-xs text-purple-500 dark:text-green-400">
          — {r.name}
        </p>
      </div>
    ))}
  </motion.div>
) : (
  <p className="text-sm text-gray-400">Loading reviews...</p>
)}
          </div>

          {/* CTA */}
          <div className="text-center mt-8">
            <Link
              to="/reviews"
              className="
                px-5 py-2 rounded-lg transition
                border border-[var(--border-color)] text-[var(--text-main)] hover:bg-black/5
                dark:border-white/10 dark:text-white dark:hover:bg-white/10
              "
            >
              Leave your review →
            </Link>
          </div>

        </section>
      </div>
    </div>
  );
};

export default Home;