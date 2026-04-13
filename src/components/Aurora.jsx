import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const AuroraShader = () => {
  const meshRef = useRef();

  useFrame(({ clock }) => {
    meshRef.current.material.uniforms.uTime.value = clock.getElapsedTime();
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[10, 10]} />

      <shaderMaterial
        uniforms={{
          uTime: { value: 0 },
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

          float noise(vec2 p){
            return sin(p.x)*sin(p.y);
          }

          void main() {
            vec2 uv = vUv;

            float wave = sin(uv.x * 10.0 + uTime * 1.5) * 0.2;
            uv.y += wave;

            float n = noise(uv * 3.0 + uTime * 0.3);

            vec3 color = vec3(0.0);

            color += vec3(0.2, 1.0, 0.6) * n;
            color += vec3(0.2, 0.6, 1.0) * sin(uTime + uv.x * 5.0);
            color += vec3(0.6, 0.3, 1.0) * cos(uTime + uv.y * 5.0);

            gl_FragColor = vec4(color * 0.5, 1.0);
          }
        `}
      />
    </mesh>
  );
};

export default function AuroraCanvas() {
  return (
    <Canvas
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 0,
      }}
    >
      <AuroraShader />
    </Canvas>
  );
}