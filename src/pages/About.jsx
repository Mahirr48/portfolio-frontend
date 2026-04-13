import { motion } from "framer-motion";

const About = () => {
  return (
    <section className="relative py-32">

      <div className="max-w-6xl mx-auto px-6">

        {/* HERO TEXT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-24"
        >
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            I don’t just build apps — I build{" "}
            <span className="bg-gradient-to-r from-green-400 to-purple-500 bg-clip-text text-transparent">
              experiences that feel right
            </span>
          </h2>
        </motion.div>

        {/* MAIN GRID */}
        <div className="grid md:grid-cols-2 gap-12">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="
              p-8 rounded-2xl
              bg-white/60 dark:bg-white/5
              backdrop-blur-xl
              border border-black/10 dark:border-white/10
            "
          >
            <h3 className="text-xl font-semibold mb-4">
              Who I Am
            </h3>

            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              I’m a MERN stack developer focused on building modern web
              applications that are not just functional, but smooth and
              enjoyable to use. I care about the details — how things feel,
              not just how they work.
              <br /><br />
              Right now, I’m in the phase of pushing myself beyond basic
              development — building real projects, refining my thinking,
              and improving both frontend and backend skills every day.
            </p>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="
              p-8 rounded-2xl
              bg-white/60 dark:bg-white/5
              backdrop-blur-xl
              border border-black/10 dark:border-white/10
            "
          >
            <h3 className="text-xl font-semibold mb-4">
              How I Think
            </h3>

            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              I don’t like building things that just “work”. I focus on
              structure, performance, and user experience — making sure the
              end result feels clean, fast, and intuitive.
              <br /><br />
              I believe good development is not just writing code, but
              understanding systems, solving problems properly, and
              continuously improving with every project.
            </p>
          </motion.div>

        </div>

        {/* BOTTOM STATEMENT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-24 text-center"
        >
          <p className="text-lg text-gray-700 dark:text-gray-200 max-w-2xl mx-auto leading-relaxed">
            I’m currently focused on growing as a developer by building
            meaningful projects and looking for opportunities where I can
            contribute, learn fast, and work on real-world problems.
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default About;