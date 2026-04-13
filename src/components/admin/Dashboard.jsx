import { useEffect, useState } from "react";
import API from "../../services/api";
import { motion } from "framer-motion";

const Dashboard = () => {
  const [stats, setStats] = useState({
    projects: 0,
    messages: 0,
  });

  const fetchStats = async () => {
    try {
      const [projectsRes, messagesRes] = await Promise.all([
        API.get("/projects"),
        API.get("/contact"),
      ]);

      setStats({
        projects: projectsRes.data.length,
        messages: messagesRes.data.length,
      });
    } catch (err) {
      console.error("Stats error", err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
className="
p-6 rounded-2xl

bg-white/5
backdrop-blur-xl

border border-white/10

hover:border-green-400/30
hover:shadow-[0_10px_40px_rgba(0,0,0,0.3)]

transition-all duration-300
"
        >
          <p className="text-sm text-gray-400">Projects</p>
          <h2 className="text-4xl font-bold mt-2 text-green-400">
            {stats.projects}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20 shadow-lg"
        >
          <p className="text-sm text-gray-400">Messages</p>
          <h2 className="text-4xl font-bold mt-2 text-blue-400">
            {stats.messages}
          </h2>
        </motion.div>

      </div>
    </>
  );
};

export default Dashboard;