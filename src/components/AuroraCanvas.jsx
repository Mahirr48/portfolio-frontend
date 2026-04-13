import { useEffect, useRef } from "react";

const AuroraCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    let mouseX = w / 2;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);

    let t = 0;
    let animationId;

    function draw() {
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < 3; i++) {
        ctx.beginPath();

        // 🔥 reduce resolution (BIG PERFORMANCE BOOST)
        for (let x = 0; x < w; x += 3) {
          const y =
            h / 2 +
            Math.sin(x * 0.002 + t + i) * 80 +
            Math.sin(x * 0.004 + t * 1.2) * 40 +
            (mouseX / w - 0.5) * 100;

          ctx.lineTo(x, y);
        }

        const gradient = ctx.createLinearGradient(0, 0, w, h);
        gradient.addColorStop(0, "rgba(34,197,94,0.4)");
        gradient.addColorStop(1, "rgba(168,85,247,0.4)");

        ctx.strokeStyle = gradient;

        // 🔥 reduce thickness (less GPU load)
        ctx.lineWidth = 100;

        // 🔥 remove heavy shadow blur (main lag cause)
        ctx.shadowBlur = 20;
        ctx.shadowColor = "rgba(168,85,247,0.3)";

        ctx.stroke();
      }

      ctx.shadowBlur = 0;

      t += 0.01;
      animationId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 opacity-70"
    />
  );
};

export default AuroraCanvas;