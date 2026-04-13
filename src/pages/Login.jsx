import { useState, useRef, useEffect } from "react";
import API from "../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Loader from "../components/Loader"; // ✅ ADD THIS

const Login = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const [step, setStep] = useState(1);

  const [loading, setLoading] = useState(false); // ✅ ONLY FOR OTP
  const [pageLoading, setPageLoading] = useState(true); // ✅ LOADER

  const navigate = useNavigate();
  const emailRef = useRef();

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  // 🔥 PAGE LOADER (FIXED)
  useEffect(() => {
    const hasSeenLoginLoader = sessionStorage.getItem("loginLoader");

    if (!hasSeenLoginLoader) {
      setTimeout(() => {
        setPageLoading(false);
        sessionStorage.setItem("loginLoader", "true");
      }, 1200);
    } else {
      setPageLoading(false);
    }
  }, []);

  // ⛔ BLOCK UI ONLY FOR PAGE LOADING
  if (pageLoading) return <Loader />;

  // ================= SEND OTP =================
  const handleSendOTP = async () => {
    if (!email) return toast.error("Email required ");

    try {
      setLoading(true);

      await API.post("/auth/send-otp", { email });

      toast.success("OTP sent ");
      setStep(2);

    } catch {
      toast.error("Failed to send OTP ");
    } finally {
      setLoading(false);
    }
  };

  // ================= VERIFY OTP =================
  const handleVerifyOTP = async () => {
    if (!otp) return toast.error("Enter OTP ");

    try {
      setLoading(true);

      const res = await API.post("/auth/verify-otp", {
        email,
        otp,
      });

      sessionStorage.setItem("token", res.data.token);

      toast.success("Logged in ");
      navigate("/admin", { replace: true });

    } catch {
      toast.error("Invalid or expired OTP ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden bg-gradient-to-br from-green-100 via-white to-purple-100 dark:from-[#020617] dark:via-[#020617] dark:to-purple-900/80 transition-colors duration-500">

      {/* BLOBS */}
      <div className="absolute w-[500px] h-[500px] bg-green-300/30 blur-[140px] top-[-150px] left-[-150px] rounded-full dark:hidden"></div>
      <div className="absolute w-[500px] h-[500px] bg-purple-300/30 blur-[140px] bottom-[-150px] right-[-150px] rounded-full dark:hidden"></div>

      <div className="hidden dark:block absolute w-[600px] h-[600px] bg-green-500/20 blur-[140px] top-[-200px] left-[-200px] rounded-full"></div>
      <div className="hidden dark:block absolute w-[600px] h-[600px] bg-purple-500/20 blur-[140px] bottom-[-200px] right-[-200px] rounded-full"></div>

      {/* CARD */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 w-full max-w-sm p-8 rounded-2xl bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-md dark:shadow-none"
      >
        <h1 className="text-2xl font-bold mb-8 text-center text-black dark:text-white">
          Admin Login
        </h1>

        <div className="space-y-5">

          {/* EMAIL */}
          <div className="relative">
            <input
              ref={emailRef}
              type="email"
              value={email}
              disabled={step === 2}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="peer w-full p-3 pt-5 rounded-lg bg-white/80 dark:bg-black/30 border border-black/10 dark:border-white/10 text-black dark:text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-green-400/50"
            />
            <label className="absolute left-3 top-2 text-xs text-gray-500 dark:text-gray-400 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs transition-all">
              Email
            </label>
          </div>

          {/* STEP 1 */}
          {step === 1 && (
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={handleSendOTP}
              disabled={loading}
              className="w-full p-3 rounded-lg bg-gradient-to-r from-green-400 to-purple-500 text-black font-semibold hover:opacity-90 disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send OTP"}
            </motion.button>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                className="w-full p-3 rounded-lg bg-white/80 dark:bg-black/30 border border-black/10 dark:border-white/10 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-400/50"
              />

              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={handleVerifyOTP}
                disabled={loading}
                className="w-full p-3 rounded-lg bg-gradient-to-r from-green-400 to-purple-500 text-black font-semibold hover:opacity-90 disabled:opacity-60"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </motion.button>

              <button
                onClick={handleSendOTP}
                className="text-sm text-gray-500 hover:text-black dark:hover:text-white transition"
              >
                Resend OTP
              </button>
            </>
          )}

        </div>
      </motion.div>
    </div>
  );
};

export default Login;