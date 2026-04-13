import { useEffect, useState } from "react";

export default function useScrollPause() {
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let timeout;

    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(timeout);

      timeout = setTimeout(() => {
        setIsScrolling(false);
      }, 150); // 👈 smooth resume
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return isScrolling;
}