import { Suspense, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  AdditiveBlending,
  BufferGeometry,
  Float32BufferAttribute,
  Line as ThreeLine,
  LineBasicMaterial,
  type Group,
  type Mesh,
  type Points,
  Vector3,
} from "three";

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
    color: "#38bdf8",
    size: 0.16,
  },
  {
    id: "kafka",
    label: "Kafka",
    detail: "event streams",
    position: [-1.45, 0.68, -0.2],
    color: "#22c55e",
    size: 0.095,
  },
  {
    id: "gcp",
    label: "GCP",
    detail: "managed infrastructure",
    position: [1.32, 0.78, -0.34],
    color: "#60a5fa",
    size: 0.09,
  },
  {
    id: "bigquery",
    label: "BigQuery",
    detail: "streaming warehouse",
    position: [1.2, -0.82, 0.12],
    color: "#a78bfa",
    size: 0.085,
  },
  {
    id: "webhooks",
    label: "Webhooks",
    detail: "delivery telemetry",
    position: [-1.28, -0.75, 0.06],
    color: "#34d399",
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

const StarField = () => {
  const pointsRef = useRef<Points>(null);
  const geometry = useMemo(() => {
    const positions = new Float32Array(360 * 3);

    for (let index = 0; index < positions.length; index += 3) {
      positions[index] = (Math.random() - 0.5) * 7;
      positions[index + 1] = (Math.random() - 0.5) * 4.6;
      positions[index + 2] = -Math.random() * 4.5;
    }

    const starGeometry = new BufferGeometry();
    starGeometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
    return starGeometry;
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = clock.elapsedTime * 0.012;
    pointsRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.18) * 0.02;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        color="#bae6fd"
        size={0.012}
        transparent
        opacity={0.58}
        depthWrite={false}
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
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.22} />
      </mesh>
      <mesh rotation={[Math.PI / 2.15, 0.24, 0.3]}>
        <torusGeometry args={[1.38, 0.003, 8, 180]} />
        <meshBasicMaterial color="#22c55e" transparent opacity={0.14} />
      </mesh>
      <mesh rotation={[Math.PI / 1.85, -0.3, -0.2]}>
        <torusGeometry args={[2.24, 0.003, 8, 180]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.1} />
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
      <StarField />
      <group ref={groupRef}>
        <AtmosphereRing />

        {edges.map(([from, to], index) => (
          <ConnectionLine
            key={`${from}-${to}`}
            from={heroNodes[from].position}
            to={heroNodes[to].position}
            color={index % 3 === 0 ? "#38bdf8" : "#64748b"}
            opacity={index % 3 === 0 ? 0.52 : 0.34}
          />
        ))}

        {edges.map(([from, to], index) => (
          <PulsePacket
            key={`packet-${from}-${to}`}
            from={heroNodes[from].position}
            to={heroNodes[to].position}
            color={index % 2 === 0 ? "#38bdf8" : "#22c55e"}
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

  return (
    <div className="relative h-full w-full">
      <Canvas
        dpr={[1, 1.55]}
        camera={{ position: [0, 0.05, 4.6], fov: 40 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        onPointerMissed={() => setHovered(null)}
      >
        <Suspense fallback={null}>
          <fog attach="fog" args={["#050713", 4.4, 8]} />
          <ambientLight intensity={0.55} />
          <pointLight position={[2.8, 2.6, 2.8]} intensity={2.4} color="#38bdf8" />
          <pointLight position={[-2.4, -2.2, 2.2]} intensity={1.8} color="#22c55e" />
          <pointLight position={[0, 1.6, -2.5]} intensity={1.2} color="#a78bfa" />
          <GraphScene hovered={hovered} onHover={setHovered} />
        </Suspense>
      </Canvas>

      {hoveredNode ? (
        <div className="pointer-events-none absolute right-4 top-16 rounded-2xl border border-cyan-200/20 bg-slate-950/75 px-3 py-2 text-right shadow-[0_18px_60px_rgba(8,47,73,0.55)] backdrop-blur-xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-200">
            {hoveredNode.label}
          </p>
          <p className="mt-1 text-[11px] text-slate-300">{hoveredNode.detail}</p>
        </div>
      ) : null}
    </div>
  );
};

export default Hero3DScene;
