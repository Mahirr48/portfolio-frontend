import { useScroll, useTransform } from "framer-motion";

export const useParallax = (range = 50) => {
  const { scrollYProgress } = useScroll();

  const y = useTransform(scrollYProgress, [0, 1], [0, range]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.6]);

  return { y, opacity };
};