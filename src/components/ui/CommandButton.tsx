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
      ? "border-[rgb(var(--accent)/0.8)] bg-[rgb(var(--accent))] text-slate-950 shadow-[0_0_38px_rgb(var(--accent)/0.28)] hover:border-[rgb(var(--accent)/0.95)] hover:bg-[rgb(var(--accent)/0.9)]"
      : "border-[rgb(var(--border))] bg-[rgb(var(--panel)/0.42)] text-[rgb(var(--text))] shadow-[inset_0_1px_0_rgb(255_255_255/0.08)] hover:border-[rgb(var(--accent)/0.38)] hover:bg-[rgb(var(--accent)/0.08)]";

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
