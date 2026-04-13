import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, memo, useEffect, useState } from "react";
import { useScroll, useTransform } from "framer-motion";

const AuroraLayer = ({ speed = 0.8, isLight = false }) => {
  
  const ref = useRef();
  let last = 0;

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // 🔥 FPS LIMIT (stable smoothness)
    if (t - last < 1 / 30) return;
    last = t;

    if (ref.current) {
      ref.current.uniforms.uTime.value = t * speed;
      ref.current.uniforms.uLight.value = isLight ? 1 : 0;
    }
  });

  return (
    <mesh scale={[1.5, 1.5, 1]}>
      <planeGeometry args={[2, 2]} />

      <shaderMaterial
        ref={ref}
        transparent
        uniforms={{
          uTime: { value: 0 },
          uLight: { value: isLight ? 1 : 0 },
        }}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          varying vec2 vUv;
          uniform float uTime;
          uniform float uLight;

          float hash(vec2 p) {
            return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453);
          }

          float noise(vec2 p){
            vec2 i = floor(p);
            vec2 f = fract(p);

            float a = hash(i);
            float b = hash(i + vec2(1.0,0.0));
            float c = hash(i + vec2(0.0,1.0));
            float d = hash(i + vec2(1.0,1.0));

            vec2 u = f*f*(3.0-2.0*f);

            return mix(a,b,u.x) +
                   (c-a)*u.y*(1.0-u.x) +
                   (d-b)*u.x*u.y;
          }

          // 🔥 Optimized FBM
          float fbm(vec2 p){
            float v = 0.0;
            float a = 0.5;
            for(int i=0;i<2;i++){
              v += a * noise(p);
              p *= 2.0;
              a *= 0.5;
            }
            return v;
          }

          void main() {
            vec2 uv = vUv;
            float t = uTime * 0.2;

            float wave = sin(uv.x * 5.0 + t * 2.0) * 0.12;
            uv.y += wave;

            float n = fbm(uv * 3.0 + t);

            float intensity = smoothstep(0.25, 0.9, uv.y + n * 0.3);

            // 🌙 DARK COLORS
            vec3 darkCol =
              vec3(0.0, 1.0, 0.6) * intensity +
              vec3(0.2, 0.6, 1.0) * (n * 0.35) +
              vec3(0.5, 0.2, 1.0) * (n * 0.15);

            // ☀️ LIGHT COLORS (SOFT PASTEL)
            vec3 lightCol =
              vec3(0.6, 1.0, 0.85) * intensity * 0.6 +
              vec3(0.7, 0.85, 1.0) * (n * 0.25) +
              vec3(0.9, 0.75, 1.0) * (n * 0.15);

            vec3 col = mix(darkCol, lightCol, uLight);

            float fade =
              smoothstep(0.0, 0.3, uv.y) *
              smoothstep(1.0, 0.6, uv.y);

            col *= fade;

            float alpha = mix(0.65, 0.35, uLight);

            gl_FragColor = vec4(col, alpha);
          }
        `}
      />
    </mesh>
  );
};

function CinematicAurora() {
  const { scrollYProgress } = useScroll();

const opacity = useTransform(
  scrollYProgress,
  [0, 0.6],
  [1, 0.2]
);
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const updateTheme = () => {
      setIsLight(document.documentElement.classList.contains("light"));
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <Canvas
      
      frameloop="always"
      dpr={[1, 1.2]}
      gl={{
        antialias: false,
        powerPreference: "high-performance",
      }}
      style={{
        opacity : opacity,
        position: "absolute",
        inset: 0,
        zIndex: 0,
      }}
    >
      <AuroraLayer isLight={isLight} />
    </Canvas>
  );
}

export default memo(CinematicAurora);