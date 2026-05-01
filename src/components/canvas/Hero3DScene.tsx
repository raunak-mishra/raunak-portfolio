import { Suspense, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  AdditiveBlending,
  BufferGeometry,
  Float32BufferAttribute,
  Line as ThreeLine,
  LineBasicMaterial,
  ShaderMaterial,
  type Group,
  type Mesh,
  type Points,
  Vector2,
  Vector3,
} from "three";

import SplineHybridLayer from "./SplineHybridLayer";

type HeroNode = {
  id: string;
  label: string;
  detail: string;
  position: [number, number, number];
  color: string;
  size: number;
};

const heroNodes: HeroNode[] = [
  {
    id: "core",
    label: "Node.js",
    detail: "high-throughput APIs",
    position: [0, 0, 0.18],
    color: "#f6c979",
    size: 0.16,
  },
  {
    id: "kafka",
    label: "Kafka",
    detail: "event streams",
    position: [-1.45, 0.68, -0.2],
    color: "#7dd3fc",
    size: 0.095,
  },
  {
    id: "gcp",
    label: "GCP",
    detail: "managed infrastructure",
    position: [1.32, 0.78, -0.34],
    color: "#c4b5fd",
    size: 0.09,
  },
  {
    id: "bigquery",
    label: "BigQuery",
    detail: "streaming warehouse",
    position: [1.2, -0.82, 0.12],
    color: "#fb7185",
    size: 0.085,
  },
  {
    id: "webhooks",
    label: "Webhooks",
    detail: "delivery telemetry",
    position: [-1.28, -0.75, 0.06],
    color: "#99f6e4",
    size: 0.085,
  },
  {
    id: "observability",
    label: "Observability",
    detail: "production ownership",
    position: [-0.2, 1.3, -0.48],
    color: "#e0f2fe",
    size: 0.07,
  },
  {
    id: "apis",
    label: "APIs",
    detail: "P99 latency focus",
    position: [0.22, -1.34, -0.34],
    color: "#bfdbfe",
    size: 0.07,
  },
];

const edges: [number, number][] = [
  [0, 1],
  [0, 2],
  [0, 3],
  [0, 4],
  [0, 5],
  [0, 6],
  [1, 4],
  [1, 5],
  [2, 3],
  [3, 6],
  [4, 6],
];

const ConnectionLine = ({
  from,
  to,
  color,
  opacity,
}: {
  from: [number, number, number];
  to: [number, number, number];
  color: string;
  opacity: number;
}) => {
  const geometry = useMemo(() => {
    const lineGeometry = new BufferGeometry();
    lineGeometry.setFromPoints([new Vector3(...from), new Vector3(...to)]);
    return lineGeometry;
  }, [from, to]);
  const line = useMemo(
    () =>
      new ThreeLine(
        geometry,
        new LineBasicMaterial({
          color,
          transparent: true,
          opacity,
        })
      ),
    [color, geometry, opacity]
  );

  return <primitive object={line} />;
};

const particleVertexShader = `
  uniform float uTime;
  uniform vec2 uPointer;
  varying float vAlpha;

  void main() {
    vec3 transformed = position;
    float proximity = smoothstep(1.2, 0.0, distance(position.xy, uPointer * 2.4));
    transformed.xy += normalize(position.xy - uPointer * 2.4 + 0.001) * proximity * 0.22;
    transformed.z += sin(uTime * 0.65 + position.x * 2.7 + position.y * 2.1) * 0.08;
    vAlpha = 0.28 + proximity * 0.72;

    vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.0);
    gl_PointSize = (2.1 + proximity * 4.4) * (4.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const particleFragmentShader = `
  precision highp float;
  varying float vAlpha;

  void main() {
    vec2 center = gl_PointCoord - 0.5;
    float glow = 1.0 - smoothstep(0.08, 0.5, length(center));
    vec3 color = mix(vec3(0.50, 0.86, 0.96), vec3(0.96, 0.74, 0.42), vAlpha);
    gl_FragColor = vec4(color, glow * vAlpha);
  }
`;

const ReactiveParticleField = () => {
  const pointsRef = useRef<Points>(null);
  const materialRef = useRef<ShaderMaterial>(null);
  const geometry = useMemo(() => {
    const positions = new Float32Array(620 * 3);

    for (let index = 0; index < positions.length; index += 3) {
      positions[index] = (Math.random() - 0.5) * 6.4;
      positions[index + 1] = (Math.random() - 0.5) * 4.2;
      positions[index + 2] = -Math.random() * 4.8;
    }

    const starGeometry = new BufferGeometry();
    starGeometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
    return starGeometry;
  }, []);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPointer: { value: new Vector2(0, 0) },
    }),
    []
  );

  useFrame(({ clock, pointer }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.elapsedTime * 0.012;
      pointsRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.18) * 0.02;
    }

    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.elapsedTime;
      materialRef.current.uniforms.uPointer.value.x +=
        (pointer.x - materialRef.current.uniforms.uPointer.value.x) * 0.08;
      materialRef.current.uniforms.uPointer.value.y +=
        (pointer.y - materialRef.current.uniforms.uPointer.value.y) * 0.08;
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={particleVertexShader}
        fragmentShader={particleFragmentShader}
        transparent
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </points>
  );
};

const PulsePacket = ({
  from,
  to,
  color,
  offset,
}: {
  from: [number, number, number];
  to: [number, number, number];
  color: string;
  offset: number;
}) => {
  const packetRef = useRef<Mesh>(null);
  const start = useMemo(() => new Vector3(...from), [from]);
  const end = useMemo(() => new Vector3(...to), [to]);

  useFrame(({ clock }) => {
    if (!packetRef.current) return;
    const progress = (clock.elapsedTime * 0.22 + offset) % 1;
    packetRef.current.position.lerpVectors(start, end, progress);
    const scale = 0.65 + Math.sin(progress * Math.PI) * 0.65;
    packetRef.current.scale.setScalar(scale);
  });

  return (
    <mesh ref={packetRef}>
      <sphereGeometry args={[0.025, 16, 16]} />
      <meshBasicMaterial color={color} transparent opacity={0.85} />
    </mesh>
  );
};

const NodeOrb = ({
  node,
  index,
  isActive,
  onHover,
}: {
  node: HeroNode;
  index: number;
  isActive: boolean;
  onHover: (id: string | null) => void;
}) => {
  const groupRef = useRef<Group>(null);
  const meshRef = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.position.y =
        node.position[1] + Math.sin(clock.elapsedTime * 0.75 + index) * 0.045;
      groupRef.current.rotation.y = clock.elapsedTime * 0.18 + index * 0.12;
    }

    if (meshRef.current) {
      const pulse = Math.sin(clock.elapsedTime * 1.6 + index * 0.72) * 0.08;
      meshRef.current.scale.setScalar(isActive ? 1.34 : 1 + pulse);
    }
  });

  return (
    <group ref={groupRef} position={node.position}>
      <mesh
        ref={meshRef}
        onPointerOver={(event) => {
          event.stopPropagation();
          onHover(node.id);
        }}
        onPointerOut={() => onHover(null)}
      >
        <sphereGeometry args={[node.size, 36, 36]} />
        <meshStandardMaterial
          color={node.color}
          emissive={node.color}
          emissiveIntensity={isActive ? 2.2 : 1.15}
          roughness={0.25}
          metalness={0.25}
        />
      </mesh>
      <mesh scale={isActive ? 2.55 : 2.05}>
        <sphereGeometry args={[node.size, 32, 32]} />
        <meshBasicMaterial
          color={node.color}
          transparent
          opacity={isActive ? 0.18 : 0.08}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};

const AtmosphereRing = () => {
  const ringRef = useRef<Group>(null);

  useFrame(({ clock }) => {
    if (!ringRef.current) return;
    ringRef.current.rotation.z = clock.elapsedTime * 0.08;
    ringRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.18) * 0.15;
  });

  return (
    <group ref={ringRef}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.85, 0.004, 8, 180]} />
        <meshBasicMaterial color="#f6c979" transparent opacity={0.22} />
      </mesh>
      <mesh rotation={[Math.PI / 2.15, 0.24, 0.3]}>
        <torusGeometry args={[1.38, 0.003, 8, 180]} />
        <meshBasicMaterial color="#7dd3fc" transparent opacity={0.14} />
      </mesh>
      <mesh rotation={[Math.PI / 1.85, -0.3, -0.2]}>
        <torusGeometry args={[2.24, 0.003, 8, 180]} />
        <meshBasicMaterial color="#c4b5fd" transparent opacity={0.1} />
      </mesh>
    </group>
  );
};

const GraphScene = ({
  hovered,
  onHover,
}: {
  hovered: string | null;
  onHover: (id: string | null) => void;
}) => {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y =
      state.pointer.x * 0.22 + Math.sin(state.clock.elapsedTime * 0.18) * 0.08;
    groupRef.current.rotation.x =
      -state.pointer.y * 0.16 + Math.sin(state.clock.elapsedTime * 0.22) * 0.05;
  });

  return (
    <>
      <ReactiveParticleField />
      <group ref={groupRef}>
        <AtmosphereRing />

        {edges.map(([from, to], index) => (
          <ConnectionLine
            key={`${from}-${to}`}
            from={heroNodes[from].position}
            to={heroNodes[to].position}
            color={index % 3 === 0 ? "#f6c979" : "#64748b"}
            opacity={index % 3 === 0 ? 0.52 : 0.34}
          />
        ))}

        {edges.map(([from, to], index) => (
          <PulsePacket
            key={`packet-${from}-${to}`}
            from={heroNodes[from].position}
            to={heroNodes[to].position}
            color={index % 2 === 0 ? "#f6c979" : "#7dd3fc"}
            offset={index * 0.11}
          />
        ))}

        {heroNodes.map((node, index) => (
          <NodeOrb
            key={node.id}
            node={node}
            index={index}
            isActive={hovered === node.id}
            onHover={onHover}
          />
        ))}
      </group>
    </>
  );
};

const Hero3DScene = () => {
  const [hovered, setHovered] = useState<string | null>(null);
  const hoveredNode = heroNodes.find((node) => node.id === hovered);
  const splineSceneUrl = import.meta.env.VITE_SPLINE_HERO_SCENE as string | undefined;

  return (
    <div className="relative h-full w-full">
      <SplineHybridLayer sceneUrl={splineSceneUrl} />
      <Canvas
        dpr={[1, 1.55]}
        camera={{ position: [0, 0.05, 4.6], fov: 40 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        onPointerMissed={() => setHovered(null)}
      >
        <Suspense fallback={null}>
          <fog attach="fog" args={["#07040d", 4.4, 8]} />
          <ambientLight intensity={0.55} />
          <pointLight position={[2.8, 2.6, 2.8]} intensity={2.4} color="#f6c979" />
          <pointLight position={[-2.4, -2.2, 2.2]} intensity={1.8} color="#7dd3fc" />
          <pointLight position={[0, 1.6, -2.5]} intensity={1.2} color="#c4b5fd" />
          <GraphScene hovered={hovered} onHover={setHovered} />
        </Suspense>
      </Canvas>

      {hoveredNode ? (
        <div className="pointer-events-none absolute right-4 top-16 rounded-2xl border border-[rgb(var(--accent)/0.24)] bg-[rgb(var(--panel-strong)/0.78)] px-3 py-2 text-right shadow-[0_18px_60px_rgb(var(--shadow))] backdrop-blur-xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[rgb(var(--accent))]">
            {hoveredNode.label}
          </p>
          <p className="mt-1 text-[11px] text-[rgb(var(--muted))]">{hoveredNode.detail}</p>
        </div>
      ) : null}
    </div>
  );
};

export default Hero3DScene;
