import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];

const PageWrapper = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{
        duration: 0.6,
        ease,
      }}
    >
      {children}
    </motion.div>
  );
};

export default PageWrapper;