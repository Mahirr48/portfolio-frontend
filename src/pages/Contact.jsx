import { useState } from "react";
import API from "../services/api";
import { motion, useMotionValue, useSpring } from "framer-motion";
import toast from "react-hot-toast";

const Contact = () => {
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    name: "",
    email: "",
    projectType: "",
    timeline: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  // 🔥 cursor glow
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 80, damping: 20 });
  const smoothY = useSpring(y, { stiffness: 80, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const validate = () => {
  const newErrors = {};

  if (!form.name) newErrors.name = "Required";
  if (!form.email) newErrors.email = "Required";
  if (!form.projectType) newErrors.projectType = "Required";
  if (!form.timeline) newErrors.timeline = "Required";
  if (!form.message) newErrors.message = "Required";

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      await API.post("/contact", form);
      toast.success("Message sent ");

      setForm({
        name: "",
        email: "",
        projectType: "",
      
        timeline: "",
        message: "",
      });
    } catch {
      toast.error("Failed ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative py-32 overflow-hidden"
    >
      {/* 🔥 BACKGROUND GLOW */}
      <motion.div
        style={{ left: smoothX, top: smoothY }}
        className="pointer-events-none absolute w-[350px] h-[350px]
        -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]
        bg-gradient-to-r from-green-400/20 to-purple-500/20"
      />

      <div className="max-w-4xl mx-auto px-6 relative z-10">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-bold">
            Start something{" "}
            <span className="bg-gradient-to-r from-green-400 to-purple-500 bg-clip-text text-transparent">
              real
            </span>
          </h2>

          <p className="mt-4 text-gray-500 dark:text-gray-400">
            Tell me about your idea — I’ll handle the rest.
          </p>
        </motion.div>

        {/* FORM */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="
            relative p-8 md:p-10 rounded-3xl

            bg-white/70 dark:bg-white/5
            backdrop-blur-2xl

            border border-black/10 dark:border-white/10
            shadow-xl
          "
        >
          {/* subtle border glow */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-green-400/10 to-purple-500/10 opacity-30 pointer-events-none" />

          <div className="grid md:grid-cols-2 gap-5">

            {/* INPUT COMPONENT */}
            {["name", "email"].map((field) => (
              <motion.input
                key={field}
                name={field}
                value={form[field]}
                onChange={handleChange}
                placeholder={field === "name" ? "Your Name" : "Your Email"}
                whileFocus={{ scale: 1.02 }}
                className="
                  p-3 rounded-xl text-sm

                  bg-white/80 dark:bg-black/30
                  border border-black/10 dark:border-white/10

                  focus:outline-none
                  focus:ring-2 focus:ring-green-400/40
                  focus:border-green-400/40

                  transition-all
                "
              />
            ))}

            {/* SELECTS */}
            {[
              {
                name: "projectType",
                options: ["Website", "Web App", "Portfolio", "Other"],
                placeholder: "Project Type",
              },
              
              
              {
                name: "timeline",
                options: ["ASAP", "1-2 weeks", "Flexible"],
                placeholder: "Timeline",
              },
            ].map((field, i) => (
              <motion.select
                key={i}
                name={field.name}
                value={form[field.name]}
                onChange={handleChange}
                whileFocus={{ scale: 1.02 }}
                className="
                  p-3 rounded-xl text-sm

                  bg-white/80 dark:bg-black/30
                  border border-black/10 dark:border-white/10

                  focus:outline-none
                  focus:ring-2 focus:ring-purple-400/40

                  transition-all
                "
              >
                <option value="">{field.placeholder}</option>
                {field.options.map((opt, idx) => (
                  <option key={idx}>{opt}</option>
                ))}
              </motion.select>
            ))}

            {/* MESSAGE */}
            <motion.textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={4}
              placeholder="Tell me about your idea..."
              whileFocus={{ scale: 1.01 }}
              className="
                md:col-span-2 p-3 rounded-xl text-sm

                bg-white/80 dark:bg-black/30
                border border-black/10 dark:border-white/10

                focus:outline-none
                focus:ring-2 focus:ring-purple-400/40
              "
            />
          </div>

          {/* BUTTON */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            className="
              mt-8 w-full py-3 rounded-xl

              bg-gradient-to-r from-green-400 to-purple-500
              text-black font-semibold

              shadow-lg shadow-green-400/20

              transition-all
            "
          >
            {loading ? "Sending..." : "Start Project"}
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;