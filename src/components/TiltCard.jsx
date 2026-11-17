import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/**
 * TiltCard — 3D mouse-tilt wrapper.
 * Rotates the card in 3D following the cursor (rotateX/rotateY with springs)
 * and projects a radial "glare" highlight at the cursor position.
 * Content sits on its own translateZ layer for genuine depth.
 */
export default function TiltCard({ children, className = "", max = 9, glare = true }) {
  const ref = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);

  const srx = useSpring(rx, { stiffness: 180, damping: 22, mass: 0.6 });
  const sry = useSpring(ry, { stiffness: 180, damping: 22, mass: 0.6 });

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * max * 2);
    rx.set((0.5 - py) * max * 2);
    gx.set(px * 100);
    gy.set(py * 100);
  };

  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <div className="tilt-outer">
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }}
        className={`tilt-wrap ${className}`}
      >
        <div className="tilt-content">{children}</div>
        {glare && (
          <div
            className="tilt-glare"
            style={{ background: `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.14), transparent 48%)` }}
          />
        )}
      </motion.div>
    </div>
  );
}
