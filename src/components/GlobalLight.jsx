import { motion, useMotionValue, useSpring } from "framer-motion";

const GlobalLight = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const smoothX = useSpring(x, { stiffness: 80, damping: 20 });
  const smoothY = useSpring(y, { stiffness: 80, damping: 20 });

  const handleMove = (e) => {
    x.set(e.clientX - 200);
    y.set(e.clientY - 200);
  };

  return (
    <div onMouseMove={handleMove} className="fixed inset-0 pointer-events-none z-0">
      <motion.div
        style={{ x: smoothX, y: smoothY }}
        className="
          w-[400px] h-[400px]
          bg-gradient-to-r from-green-400/10 via-purple-500/10 to-blue-400/10
          blur-[120px]
          rounded-full
        "
      />
    </div>
  );
};

export default GlobalLight;