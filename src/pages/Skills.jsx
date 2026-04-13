import {
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiExpress,
} from "react-icons/si";
import { motion, useMotionValue, useSpring } from "framer-motion";

const coreSkills = [
  "Building Scalable Web Apps",
  "Clean Architecture & Code Structure",
  "Modern UI/UX with Smooth Animations",
  "REST API Design & Integration",
];

const techStack = [
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Node.js", icon: SiNodedotjs, color: "#3C873A" },
  { name: "MongoDB", icon: SiMongodb, color: "#4DB33D" },
  { name: "Express", icon: SiExpress, color: "#888888" },
];

// 🔥 SINGLE RESPONSIBILITY COMPONENT
const TechCard = ({ tech }) => {
  const Icon = tech.icon;

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const smoothX = useSpring(x, { stiffness: 120, damping: 15 });
  const smoothY = useSpring(y, { stiffness: 120, damping: 15 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set((e.clientX - centerX) / 10);
    y.set((e.clientY - centerY) / 10);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{
        rotateX: smoothY,
        rotateY: smoothX,
      }}
      whileHover={{ scale: 1.04 }}
      className="relative group"
    >
      {/* Glow */}
      <motion.div
        style={{ x: smoothX, y: smoothY }}
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 blur-xl bg-gradient-to-br from-green-400/20 to-purple-500/20"
      />

      {/* Border */}
      <div className="absolute inset-0 rounded-xl p-[1px] bg-gradient-to-br from-green-400/30 to-purple-500/30 opacity-0 group-hover:opacity-100 transition">
        <div className="w-full h-full bg-[var(--bg-main)] dark:bg-[#020617] rounded-xl" />
      </div>

      {/* Card */}
      <div className="relative z-10 p-5 rounded-xl bg-white/70 dark:bg-white/5 border border-black/10 dark:border-white/10 flex flex-col items-center gap-3">
        <Icon
          className="text-2xl group-hover:scale-110 transition"
          style={{ color: tech.color, opacity: 0.7 }}
        />
        <p className="text-sm font-medium">{tech.name}</p>
      </div>
    </motion.div>
  );
};

const Skills = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      
      {/* BACKGROUND */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="w-[500px] h-[500px] bg-green-400/20 blur-[140px] rounded-full top-[-200px] left-[-200px] absolute" />
        <div className="w-[500px] h-[500px] bg-purple-500/20 blur-[140px] rounded-full bottom-[-200px] right-[-200px] absolute" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* HEADING */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-center mb-20"
        >
          What I{" "}
          <span className="bg-gradient-to-r from-green-400 to-purple-500 bg-clip-text text-transparent">
            Actually Do
          </span>
        </motion.h2>

        {/* CORE */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {coreSkills.map((skill, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12 }}
              className="p-7 rounded-2xl bg-white/70 dark:bg-white/5 border border-black/10 dark:border-white/10"
            >
              <h3 className="text-lg font-semibold">{skill}</h3>
            </motion.div>
          ))}
        </div>

        {/* TECH GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto">
          {techStack.map((tech, i) => (
            <TechCard key={i} tech={tech} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Skills;