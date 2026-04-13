import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";
import { motion } from "framer-motion";

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  const fetchProject = async () => {
    try {
      const { data } = await API.get(`/projects/${id}`);
      setProject(data);
    } catch (error) {
      console.error("Error fetching project", error);
    }
  };

  useEffect(() => {
    fetchProject();
  }, [id]);

  if (!project) {
    return <p className="text-center mt-20 text-gray-400">Loading...</p>;
  }

  return (
    <div className="pt-24">

      {/* HERO IMAGE */}
      <div className="relative h-[350px] md:h-[450px] overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />

        {/* overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* title */}
        <div className="absolute bottom-10 left-6 md:left-16">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-bold text-white"
          >
            {project.title}
          </motion.h1>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-5xl mx-auto px-6 py-16">

        {/* ACTION BUTTONS */}
        <div className="flex flex-wrap gap-4 mb-10">
          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              className="
                px-6 py-3 rounded-xl
                bg-gradient-to-r from-green-400 to-purple-500
                text-black font-semibold

                hover:scale-105
                transition
              "
            >
              Live Preview →
            </a>
          )}

          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              className="
                px-6 py-3 rounded-xl
                border border-white/20
                backdrop-blur-lg

                hover:bg-white/10
                transition
              "
            >
              View Code
            </a>
          )}
        </div>

        {/* DESCRIPTION */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-3">Overview</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* TECH STACK */}
        {project.techStack && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Tech Stack</h2>

            <div className="flex flex-wrap gap-3">
              {project.techStack.map((tech, index) => (
                <motion.span
                  key={index}
                  whileHover={{ scale: 1.1, y: -3 }}
                  className="
                    px-4 py-2 rounded-full text-sm

                    bg-white/60 dark:bg-white/10
                    backdrop-blur-md

                    border border-black/10 dark:border-white/10
                  "
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ProjectDetail;