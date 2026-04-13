import { useState } from "react";
import toast from "react-hot-toast";
import { createReview } from "../services/reviewService";
import { Star } from "lucide-react";

const Reviews = () => {
  const [form, setForm] = useState({
    name: "",
    message: "",
    rating: 0,
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.message || form.rating === 0) {
      toast.error("Please fill all fields + rating");
      return;
    }

    try {
      setLoading(true);

      await createReview(form);

      toast.success("Review sent ⭐");

      setForm({
        name: "",
        message: "",
        rating: 0,
      });

    } catch {
      toast.error("Failed to send review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <form
        onSubmit={handleSubmit}
        className="
          w-full max-w-md
          bg-[var(--card-bg)]
          border border-[var(--border-color)]
          p-6 rounded-2xl
          shadow-sm
          space-y-4
        "
      >
        <h2 className="text-xl font-semibold text-[var(--text-main)]">
          Leave a Review
        </h2>

        {/* NAME */}
        <input
          type="text"
          placeholder="Your name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          className="
            w-full p-2.5 rounded-lg
            bg-white dark:bg-black/30
            border border-[var(--border-color)]
            text-sm text-black dark:text-white
            transition
            focus:outline-none
            focus:ring-2 focus:ring-purple-400/30
          "
        />

        {/* ⭐ STAR RATING */}
        <div>
          <p className="text-xs text-gray-500 mb-1">Your rating</p>

          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={22}
                onClick={() =>
                  setForm({ ...form, rating: star })
                }
                className={`
                  cursor-pointer transition-all duration-200
                  ${
                    star <= form.rating
                      ? "text-yellow-400 fill-yellow-400 scale-110"
                      : "text-gray-300 hover:text-yellow-300"
                  }
                `}
              />
            ))}
          </div>
        </div>

        {/* MESSAGE */}
        <textarea
          placeholder="Your feedback"
          value={form.message}
          onChange={(e) =>
            setForm({ ...form, message: e.target.value })
          }
          rows={4}
          className="
            w-full p-2.5 rounded-lg
            bg-white dark:bg-black/30
            border border-[var(--border-color)]
            text-sm text-black dark:text-white
            resize-none
            transition
            focus:outline-none
            focus:ring-2 focus:ring-purple-400/30
          "
        />

        {/* BUTTON */}
        <button
          disabled={loading}
          className="
            w-full py-2.5 rounded-lg
            bg-gradient-to-r from-green-400 to-purple-500
            text-white font-medium
            transition-all duration-200

            hover:scale-[1.02]
            active:scale-[0.98]

            disabled:opacity-60 disabled:cursor-not-allowed
          "
        >
          {loading ? "Sending..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Reviews;