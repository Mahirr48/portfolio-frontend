import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ProjectsSection = ({ limit }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
    const displayedProjects = limit 
  ? projects.slice(0, limit) 
  : projects;

  const fetchProjects = async () => {
    try {
      const { data } = await API.get("/projects");
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects", error);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
  <motion.section
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}
  className="relative pt-28 pb-20 overflow-hidden"
>

  {/* ✅ FULL-WIDTH BACKGROUND (IMPORTANT) */}

  
  {/* CONTENT */}
  <div className="px-6 max-w-6xl mx-auto relative z-10">

    <h2 className="text-4xl md:text-5xl font-bold text-center mb-14 text-black dark:text-white">
      Featured{" "}
      <span className="bg-gradient-to-r from-green-400 to-purple-500 bg-clip-text text-transparent">
        Projects
      </span>
    </h2>

    {loading ? (
      
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="
            h-64 rounded-2xl 
            bg-black/5 dark:bg-white/5
            border border-black/10 dark:border-white/10
            animate-pulse
          "
          />
        ))}
        
      </div>
    ) : (
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {displayedProjects.map((project, index) => (
        <motion.div
  key={project._id || index}
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ delay: index * 0.1 }}
  viewport={{ once: true }}
  onMouseMove={(e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    e.currentTarget.style.transform = `
      perspective(800px)
      rotateX(${y * -6}deg)
      rotateY(${x * 6}deg)
      scale(1.02)
    `;
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = `
      perspective(800px)
      rotateX(0deg)
      rotateY(0deg)
      scale(1)
    `;
  }}
  className="
    group relative rounded-2xl overflow-hidden cursor-pointer
    transition-transform duration-200 will-change-transform

    /* LIGHT fallback */
    bg-white border border-[var(--border-color)] shadow-sm

    /* DARK keeps your style */
    dark:bg-transparent dark:border-white/10
  "
>
  {/* IMAGE */}
  <div className="relative h-60 overflow-hidden">
    <img
      src={project.image || "https://source.unsplash.com/600x400/?technology"}
      alt={project.title}
      className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
    />

    {/* OVERLAY (adaptive) */}
    <div
      className="
        absolute inset-0 transition duration-500

        /* LIGHT */
        bg-white/10 group-hover:bg-white/30

        /* DARK (your original feel) */
        dark:bg-black/30 dark:group-hover:bg-black/60
      "
    />
  </div>

  {/* CONTENT */}
  <div
    className="
      absolute inset-0 flex flex-col justify-end
      p-6
      translate-y-10 group-hover:translate-y-0
      transition duration-500
    "
  >
    <h3 className="
      text-xl font-semibold

      text-[var(--text-main)]
      dark:text-white
    ">
      {project.title}
    </h3>

    <p
      className="
        text-sm mt-2 opacity-0 group-hover:opacity-100 transition duration-500

        text-[var(--text-muted)]
        dark:text-gray-300
      "
    >
      {project.description}
    </p>

    {/* ACTIONS */}
    <div
      className="
        flex gap-4 mt-4
        opacity-0 group-hover:opacity-100
        transition duration-500
      "
    >
      {project.githubLink && (
        <a
          href={project.githubLink}
          target="_blank"
          className="text-green-500 dark:text-green-400 hover:underline"
        >
          Code
        </a>
      )}

      {project.liveLink && (
        <a
          href={project.liveLink}
          target="_blank"
          className="text-purple-500 dark:text-purple-400 hover:underline"
        >
          Live
        </a>
      )}

      <button
        onClick={() => navigate(`/projects/${project._id}`)}
        className="
          ml-auto font-semibold
          text-[var(--text-main)] dark:text-white
        "
      >
        View →
      </button>
    </div>
  </div>
</motion.div>
        ))}
      </div>
    )}
  </div>
</motion.section>
  );
};

export default ProjectsSection;