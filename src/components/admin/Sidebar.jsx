import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

const tabs = [
  { id: "dashboard", label: "Dashboard" },
  { id: "projects", label: "Projects" },
  { id: "messages", label: "Messages" },
  { id: "reviews", label: "Reviews" },
];

const Sidebar = ({ tab, setTab }) => {
  const [open, setOpen] = useState(false);

  const handleClick = (value) => {
    setTab(value);
    setOpen(false);
  };

  return (
    <>
      {/* MOBILE TOP BAR */}
      <div className="md:hidden fixed top-0 left-0 w-full h-16 flex items-center justify-between px-4 bg-black/40 backdrop-blur-xl z-50 border-b border-white/10">
        <h2 className="font-semibold">Admin</h2>
        <Menu onClick={() => setOpen(true)} className="cursor-pointer" />
      </div>

      {/* OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`
        fixed top-0 left-0 h-full w-64 z-50
        transform transition-transform duration-500

        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}
      >
        {/* GLASS BACKGROUND */}
        <div className="absolute inset-0 bg-white/5 backdrop-blur-xl border-r border-white/10" />

        <div className="relative z-10 p-6 mt-10 md:mt-0 flex flex-col h-full">

          {/* LOGO */}
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-xl font-bold tracking-wide">
              Mahir<span className="text-green-400">.admin</span>
            </h1>
            <X className="md:hidden cursor-pointer" onClick={() => setOpen(false)} />
          </div>

          {/* NAV LINKS */}
          <div className="flex flex-col gap-2">
            {tabs.map((item) => {
              const active = tab === item.id;

              return (
                <motion.div
                  key={item.id}
                  onClick={() => handleClick(item.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className={`
                    relative px-4 py-2 rounded-lg cursor-pointer
                    transition-all duration-300

                    ${
                      active
                        ? "text-white"
                        : "text-gray-400 hover:text-white"
                    }
                  `}
                >
                  {item.label}

                  {/* ACTIVE GLOW BAR */}
                  {active && (
                    <motion.div
                      layoutId="activeTab"
                      className="
                        absolute inset-0 rounded-lg
                        bg-gradient-to-r from-green-400/20 to-purple-500/20
                        border border-white/10
                      "
                    />
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* SPACER */}
          <div className="flex-1" />

          {/* LOGOUT */}
          <button
            onClick={() => {
              sessionStorage.removeItem("token");
              window.location.href = "/login";
            }}
            className="
              mt-6 text-red-400
              hover:text-red-500
              transition
            "
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;