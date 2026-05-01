import type { ReactNode } from "react";
import type { HTMLMotionProps } from "framer-motion";

import MagneticButton from "./MagneticButton";

type CommandButtonProps = Omit<HTMLMotionProps<"a">, "children"> & {
  children: ReactNode;
  variant?: "primary" | "secondary";
  leading?: ReactNode;
};

const CommandButton = ({
  children,
  className = "",
  variant = "secondary",
  leading,
  ...props
}: CommandButtonProps) => {
  const variantClass =
    variant === "primary"
      ? "border-cyan-100/80 bg-cyan-50 text-slate-950 shadow-[0_0_38px_rgba(103,232,249,0.28)] hover:border-cyan-200 hover:bg-cyan-100"
      : "border-white/10 bg-white/[0.035] text-slate-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] hover:border-cyan-200/35 hover:bg-cyan-200/[0.07] hover:text-white";

  return (
    <MagneticButton
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full border px-5 py-3 font-mono text-xs font-semibold uppercase tracking-[0.12em] transition duration-300 ${variantClass} ${className}`}
      {...props}
    >
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/45 to-transparent opacity-0 transition duration-700 group-hover:translate-x-full group-hover:opacity-100" />
      {leading ? (
        <span className="relative flex h-5 min-w-5 items-center justify-center font-mono text-xs">
          {leading}
        </span>
      ) : null}
      <span className="relative">{children}</span>
    </MagneticButton>
  );
};

export default CommandButton;
