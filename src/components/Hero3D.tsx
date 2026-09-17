'use client';

import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, Stars } from '@react-three/drei';

function CameraRig() {
  useFrame((state) => {
    const x = state.pointer.x * 1.1;
    const y = state.pointer.y * 0.7;
    state.camera.position.x += (x - state.camera.position.x) * 0.04;
    state.camera.position.y += (y - state.camera.position.y) * 0.04;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

function Core() {
  const ref = useRef<any>(null);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.18;
    ref.current.rotation.x += delta * 0.06;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.1}>
      <mesh ref={ref} position={[2.4, 0.1, 0]}>
        <icosahedronGeometry args={[1.7, 1]} />
        <meshStandardMaterial color="#16a34a" wireframe transparent opacity={0.6} />
      </mesh>
      <mesh position={[2.4, 0.1, 0]} scale={1.001}>
        <icosahedronGeometry args={[1.7, 0]} />
        <meshBasicMaterial color="#22c55e" wireframe transparent opacity={0.1} />
      </mesh>
      <mesh position={[-2.8, -1.4, -1.5]}>
        <torusGeometry args={[0.9, 0.28, 16, 48]} />
        <meshStandardMaterial color="#0ea5e9" wireframe transparent opacity={0.28} />
      </mesh>
    </Float>
  );
}

export default function Hero3D() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(query.matches);
    const onChange = (event: MediaQueryListEvent) => setReducedMotion(event.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  if (reducedMotion) {
    return (
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_70%_30%,rgba(34,197,94,0.22),transparent_70%),radial-gradient(40%_35%_at_20%_80%,rgba(14,165,233,0.16),transparent_70%)]"
      />
    );
  }

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={1.1} />
        <pointLight position={[-6, -3, 4]} intensity={18} color="#22c55e" />
        <Stars radius={70} depth={30} count={2200} factor={3} saturation={0} fade speed={0.6} />
        <Sparkles count={90} scale={[13, 7, 6]} size={2.4} speed={0.35} color="#4ade80" opacity={0.65} />
        <Core />
        <CameraRig />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/70 dark:to-dark-950/80" />
    </div>
  );
}
