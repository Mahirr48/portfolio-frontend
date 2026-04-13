import { useRef } from "react";

const MagneticButton = ({ children, className, ...props }) => {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    ref.current.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  };

  const reset = () => {
    ref.current.style.transform = "translate(0px, 0px)";
  };

  return (
    <button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      className={`transition-transform duration-200 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default MagneticButton;