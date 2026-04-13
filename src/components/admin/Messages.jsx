import { useEffect, useState } from "react";
import API from "../../services/api";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const Messages = () => {
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    try {
      const res = await API.get("/contact");
      setMessages(res.data);
    } catch {
      toast.error("Failed to load messages");
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id) => {
    try {
      await API.delete(`/contact/${id}`);
      setMessages((prev) => prev.filter((m) => m._id !== id));
      toast.success("Message deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleQuickReply = async (msg) => {
    try {
      await API.post("/contact/reply", {
        id: msg._id,
        email: msg.email,
        name: msg.name,
      });

      // update UI instantly
      setMessages((prev) =>
        prev.map((m) =>
          m._id === msg._id ? { ...m, replied: true } : m
        )
      );

      toast.success("Quick reply sent 🚀");
    } catch (err) {
      console.log(err);
      toast.error("Failed to send reply");
    }
  };

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-3xl font-bold">Messages</h1>
<p className="text-gray-600 dark:text-gray-400 text-sm">
            Client inquiries & contact form submissions
        </p>
      </div>

      {messages.length === 0 ? (
        <div className="text-center text-gray-600 dark:text-gray-400 py-20">
          No messages yet 🚫
        </div>
      ) : (
        <div className="grid gap-4 sm:gap-5">

  {messages.map((msg, index) => (
    <motion.div
      key={msg._id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
     className="
p-4 sm:p-5 rounded-xl
bg-black/[0.03] dark:bg-white/5 backdrop-blur-xl
border border-black/10 dark:border-white/10
hover:border-green-500/40
hover:bg-black/[0.06] dark:hover:bg-white/10
shadow-sm dark:shadow-none
transition-all duration-300
"
    >

      {/* TOP */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">

        {/* LEFT */}
        <div>
<h2 className="font-semibold text-base sm:text-lg text-black dark:text-white">
              {msg.name}
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 break-all">
            {msg.email}
          </p>
        </div>

        {/* ACTIONS */}
        <div className="flex gap-2 w-full sm:w-auto">
          <button
            onClick={() => handleDelete(msg._id)}
            className="
              flex-1 sm:flex-none
              text-xs px-3 py-2 rounded-md
              bg-red-500/10 dark:bg-red-500/20
hover:bg-red-500/20 dark:hover:bg-red-500/30
text-red-500 dark:text-red-400
            "
          >
            Delete
          </button>

          <button
            onClick={() => handleQuickReply(msg)}
            disabled={msg.replied}
            className={`
              flex-1 sm:flex-none
              text-xs px-3 py-2 rounded-md
              ${
                msg.replied
  ? "bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400"
  : "bg-green-500/10 dark:bg-green-500/20 text-green-600 dark:text-green-400"
              }
            `}
          >
            {msg.replied ? "Replied" : "Reply"}
          </button>
        </div>
      </div>

      {/* MESSAGE */}
      <p className="mt-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
        {msg.message}
      </p>

      {/* FOOTER */}
      <div className="mt-4 flex flex-col sm:flex-row sm:justify-between gap-2 text-xs text-gray-500 dark:text-gray-500">

        <span>
          {new Date(msg.createdAt).toLocaleString()}
        </span>

        <span
          className={`w-fit px-2 py-1 rounded ${
            msg.replied
              ? "bg-blue-400/10 text-blue-400"
              : "bg-green-400/10 text-green-400"
          }`}
        >
          {msg.replied ? "Replied" : "New"}
        </span>
      </div>

    </motion.div>
  ))}

</div>
      )}
    </div>
  );
};

export default Messages;