import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line, Preload } from "@react-three/drei";
import type { Group } from "three";

type Node = {
  position: [number, number, number];
  color: string;
  size: number;
};

const GraphScene = () => {
  const groupRef = useRef<Group>(null);
  const nodes = useMemo<Node[]>(
    () => [
      { position: [0, 0, 0], color: "#F6C979", size: 0.11 },
      { position: [-1.15, 0.45, -0.35], color: "#7DD3FC", size: 0.07 },
      { position: [1.05, 0.55, -0.2], color: "#9CA3AF", size: 0.07 },
      { position: [-0.9, -0.75, 0.2], color: "#9CA3AF", size: 0.06 },
      { position: [0.85, -0.65, 0.25], color: "#C4B5FD", size: 0.06 },
      { position: [0.05, 1.05, 0.35], color: "#E5E7EB", size: 0.045 },
      { position: [-0.25, -1.15, -0.25], color: "#E5E7EB", size: 0.045 },
    ],
    []
  );
  const edges = useMemo<[number, number][]>(
    () => [
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],
      [1, 5],
      [2, 5],
      [3, 6],
      [4, 6],
      [1, 3],
      [2, 4],
    ],
    []
  );

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.16;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.25) * 0.08;
  });

  return (
    <group ref={groupRef}>
      {edges.map(([from, to]) => (
        <Line
          key={`${from}-${to}`}
          points={[nodes[from].position, nodes[to].position]}
          color="#475569"
          lineWidth={1}
          transparent
          opacity={0.72}
        />
      ))}

      {nodes.map((node, index) => (
        <mesh key={index} position={node.position}>
          <sphereGeometry args={[node.size, 32, 32]} />
          <meshStandardMaterial
            color={node.color}
            emissive={node.color}
            emissiveIntensity={index === 0 ? 0.22 : 0.08}
            roughness={0.8}
          />
        </mesh>
      ))}
    </group>
  );
};

const SystemGraph = () => {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 4.2], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.7} />
        <pointLight position={[3, 3, 3]} intensity={1.3} color="#E5E7EB" />
        <pointLight position={[-3, -2, 2]} intensity={0.7} color="#7DD3FC" />
        <GraphScene />
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default SystemGraph;
