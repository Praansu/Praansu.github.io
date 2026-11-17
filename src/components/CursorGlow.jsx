import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/**
 * CursorGlow — soft ambient light that follows the pointer with spring lag.
 * Pure decoration; hidden on touch devices via CSS.
 */
export default function CursorGlow() {
  const x = useMotionValue(-600);
  const y = useMotionValue(-600);
  const sx = useSpring(x, { stiffness: 120, damping: 20, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 120, damping: 20, mass: 0.4 });

  useEffect(() => {
    const onMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [x, y]);

  return (
    <motion.div
      className="cursor-glow"
      aria-hidden="true"
      style={{ left: sx, top: sy }}
    />
  );
}
