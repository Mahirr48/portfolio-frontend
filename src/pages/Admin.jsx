import { useState, useEffect } from "react";
import Sidebar from "../components/admin/Sidebar";
import ProjectsAdmin from "../components/admin/ProjectsAdmin";
import Dashboard from "../components/admin/Dashboard";
import Messages from "../components/admin/Messages";
import { useNavigate } from "react-router-dom";

import {
  getAllReviews,
  toggleApprove,
  toggleFeature,
} from "../services/reviewService";

import toast from "react-hot-toast";

const Admin = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState("dashboard");

  const [reviews, setReviews] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  // 🔥 FETCH REVIEWS
  useEffect(() => {
    if (tab === "reviews") {
      getAllReviews().then((data) =>
  setReviews(data)
);
    }
  }, [tab]);

  // 🔥 CLEAN TOKEN ON EXIT
  useEffect(() => {
    return () => {
      sessionStorage.removeItem("token");
    };
  }, []);

  // 🔥 APPROVE HANDLER
  const handleApprove = async (id) => {
    try {
      setLoadingId(id);
const updated = await toggleApprove(id);

toast.success(
  updated.approved
    ? "Review approved ✅"
    : "Review unapproved ❌"
);

setReviews((prev) =>
  prev.map((r) =>
    r._id === id ? updated : r
  )
);
    } catch (err) {
  toast.error(err || "Failed to update");
}finally {
      setLoadingId(null);
    }
  };

  // 🔥 FEATURE HANDLER
  const handleFeature = async (id) => {
    try {
      setLoadingId(id);

      const updated = await toggleFeature(id);

toast.success(
  updated.featured
    ? "Added to homepage ⭐"
    : "Removed from homepage"
);

setReviews((prev) =>
  prev.map((r) =>
    r._id === id ? updated : r
  )
);
} catch (err) {
  toast.error(err || "Failed to update");
}finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="relative flex min-h-screen text-black dark:text-white">
      {/* BACKGROUND */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="w-[600px] h-[600px] bg-green-400/20 blur-[120px] rounded-full top-[-200px] left-[-200px] absolute" />
        <div className="w-[600px] h-[600px] bg-purple-500/20 blur-[120px] rounded-full bottom-[-200px] right-[-200px] absolute" />
      </div>

      {/* SIDEBAR */}
      <Sidebar tab={tab} setTab={setTab} />

      {/* MAIN */}
      <main className="flex-1 md:ml-64 p-6 md:p-10 relative z-10">
        <div className="max-w-6xl mx-auto">

          {/* HEADER */}
          <div className="mb-8 flex justify-between items-center">
            <h1 className="text-2xl font-semibold">
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </h1>
            <div className="text-sm text-gray-500">
              Admin Panel
            </div>
          </div>

          {/* CONTENT */}
          <div className="p-6 rounded-2xl bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-black/10 dark:border-white/10">

            {tab === "dashboard" && <Dashboard />}
            {tab === "projects" && <ProjectsAdmin />}
            {tab === "messages" && <Messages />}

            {/* 🔥 REVIEWS TAB */}
            {tab === "reviews" && (
              <div className="space-y-4">
                {reviews.length === 0 && (
                  <p className="text-gray-400 text-sm">
                    No reviews yet...
                  </p>
                )}

                {reviews.map((r) => (
                  <div
                    key={r._id}
                    className="p-4 rounded-xl bg-white/5 border border-white/10"
                  >
                    <p className="text-sm text-gray-300">
                      "{r.message}"
                    </p>
                    <p className="text-xs text-green-400 mt-1">
                      — {r.name}
                    </p>

                    {/* STATUS BADGES */}
                    <div className="flex gap-2 mt-2 text-[10px]">
                      {r.approved && (
                        <span className="px-2 py-0.5 bg-green-500/20 rounded">
                          Approved
                        </span>
                      )}
                      {r.featured && (
                        <span className="px-2 py-0.5 bg-purple-500/20 rounded">
                          Featured
                        </span>
                      )}
                    </div>

                    {/* ACTIONS */}
                    <div className="flex gap-3 mt-3">
                      <button
                        disabled={loadingId === r._id}
                        onClick={() => handleApprove(r._id)}
                        className="px-3 py-1 text-xs bg-green-500/20 rounded hover:bg-green-500/30 transition disabled:opacity-50"
                      >
                        {r.approved ? "Unapprove" : "Approve"}
                      </button>

                    <button
  disabled={loadingId === r._id || !r.approved}
  onClick={() => handleFeature(r._id)}
  className={`
    px-3 py-1 text-xs rounded transition
    ${
      !r.approved
        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
        : "bg-purple-500/20 hover:bg-purple-500/30"
    }
    disabled:opacity-50
  `}
>
  {r.featured ? "Unfeature" : "Feature"}
</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;