import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ShaderMaterial, Vector2 } from "three";

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;

  uniform float uTime;
  uniform float uTheme;
  uniform vec2 uPointer;
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 5; i++) {
      value += amplitude * noise(p);
      p *= 2.02;
      amplitude *= 0.52;
    }
    return value;
  }

  void main() {
    vec2 uv = vUv;
    vec2 pointer = uPointer * 0.5 + 0.5;
    float pointerGlow = smoothstep(0.62, 0.0, distance(uv, pointer));

    vec2 wave = uv;
    wave.x += sin((uv.y + uTime * 0.025) * 8.0) * 0.025;
    wave.y += cos((uv.x - uTime * 0.018) * 7.0) * 0.02;

    float field = fbm(wave * 3.2 + vec2(uTime * 0.025, -uTime * 0.018));
    float aurora = smoothstep(0.34, 0.86, field + pointerGlow * 0.24);

    vec3 darkA = vec3(0.014, 0.012, 0.032);
    vec3 darkB = vec3(0.052, 0.034, 0.082);
    vec3 darkC = vec3(0.98, 0.68, 0.30);
    vec3 lightA = vec3(0.93, 0.89, 0.81);
    vec3 lightB = vec3(0.78, 0.86, 0.92);
    vec3 lightC = vec3(0.70, 0.40, 0.12);

    vec3 base = mix(mix(darkA, lightA, uTheme), mix(darkB, lightB, uTheme), uv.y);
    vec3 accent = mix(darkC, lightC, uTheme);
    vec3 color = base + accent * aurora * mix(0.18, 0.13, uTheme);
    color += vec3(0.55, 0.88, 0.96) * pointerGlow * mix(0.10, 0.06, uTheme);
    color -= distance(uv, vec2(0.5)) * mix(0.28, 0.05, uTheme);

    gl_FragColor = vec4(color, mix(0.64, 0.74, uTheme));
  }
`;

type ShaderBackdropProps = {
  theme: "dark" | "light";
};

const BackdropPlane = ({ theme }: ShaderBackdropProps) => {
  const materialRef = useRef<ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uTheme: { value: theme === "light" ? 1 : 0 },
      uPointer: { value: new Vector2(0, 0) },
    }),
    [theme]
  );

  useFrame((state) => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    materialRef.current.uniforms.uTheme.value +=
      ((theme === "light" ? 1 : 0) - materialRef.current.uniforms.uTheme.value) * 0.045;
    materialRef.current.uniforms.uPointer.value.lerp(state.pointer, 0.08);
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2, 1, 1]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        depthWrite={false}
        depthTest={false}
        transparent
      />
    </mesh>
  );
};

const ShaderBackdrop = ({ theme }: ShaderBackdropProps) => {
  return (
    <Canvas
      className="pointer-events-none"
      dpr={[1, 1.25]}
      gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
    >
      <BackdropPlane theme={theme} />
    </Canvas>
  );
};

export default ShaderBackdrop;
