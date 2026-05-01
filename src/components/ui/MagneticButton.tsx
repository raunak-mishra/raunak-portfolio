import type { ReactNode } from "react";
import {
  motion,
  type HTMLMotionProps,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

type MagneticButtonProps = Omit<HTMLMotionProps<"a">, "children"> & {
  children: ReactNode;
};

const MagneticButton = ({
  children,
  className = "",
  onMouseLeave,
  onMouseMove,
  ...props
}: MagneticButtonProps) => {
  const prefersReducedMotion = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 180, damping: 18, mass: 0.22 });
  const y = useSpring(rawY, { stiffness: 180, damping: 18, mass: 0.22 });

  return (
    <motion.a
      className={`group relative isolate overflow-hidden ${className}`}
      data-cursor="button"
      style={prefersReducedMotion ? undefined : { x, y }}
      whileTap={prefersReducedMotion ? undefined : { scale: 0.985 }}
      onMouseMove={(event) => {
        if (!prefersReducedMotion) {
          const rect = event.currentTarget.getBoundingClientRect();
          rawX.set((event.clientX - rect.left - rect.width / 2) * 0.18);
          rawY.set((event.clientY - rect.top - rect.height / 2) * 0.18);
        }
        onMouseMove?.(event);
      }}
      onMouseLeave={(event) => {
        rawX.set(0);
        rawY.set(0);
        onMouseLeave?.(event);
      }}
      {...props}
    >
      {children}
    </motion.a>
  );
};

export default MagneticButton;
