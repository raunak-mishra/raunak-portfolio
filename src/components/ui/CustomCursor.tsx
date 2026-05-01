import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = () => {
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const x = useSpring(cursorX, { stiffness: 420, damping: 34, mass: 0.25 });
  const y = useSpring(cursorY, { stiffness: 420, damping: 34, mass: 0.25 });

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const shouldEnable = finePointer.matches && !reducedMotion.matches;

    setEnabled(shouldEnable);

    if (!shouldEnable) return;

    document.body.classList.add("has-custom-cursor");

    const handleMove = (event: MouseEvent) => {
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);
      const target = event.target as Element | null;
      setActive(Boolean(target?.closest("a, button, [data-cursor]")));
    };

    const handleLeave = () => {
      cursorX.set(-100);
      cursorY.set(-100);
      setActive(false);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseleave", handleLeave);

    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", handleLeave);
    };
  }, [cursorX, cursorY]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[90] hidden h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-200/40 bg-cyan-200/5 shadow-[0_0_34px_rgba(34,211,238,0.25)] backdrop-blur-sm mix-blend-screen md:block"
      style={{ x, y }}
      animate={{
        scale: active ? 1.7 : 1,
        opacity: active ? 0.9 : 0.58,
      }}
      transition={{ type: "spring", stiffness: 280, damping: 24 }}
    >
      <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-200" />
    </motion.div>
  );
};

export default CustomCursor;
