import { motion } from "framer-motion";

const ValueSection = () => {
  const items = [
    {
      title: "Performance First",
      desc: "Fast, optimized, and smooth user experiences built with modern tools.",
    },
    {
      title: "Clean Architecture",
      desc: "Scalable structure that makes projects maintainable and production-ready.",
    },
    {
      title: "Modern UI Thinking",
      desc: "Not just functional — interfaces that feel alive and intuitive.",
    },
  ];

  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6">

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-semibold text-center mb-16"
        >
          What makes my work{" "}
          <span className="bg-gradient-to-r from-green-400 to-purple-500 bg-clip-text text-transparent">
            different
          </span>
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="
                group p-6 rounded-2xl

                bg-white/60 dark:bg-white/5
                backdrop-blur-xl

                border border-black/10 dark:border-white/10

                hover:scale-[1.03]
                transition
              "
            >
              <h3 className="text-lg font-semibold mb-2">
                {item.title}
              </h3>

              <p className="text-sm text-gray-600 dark:text-gray-300">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ValueSection;