import type { ElementType, HTMLAttributes, ReactNode } from "react";

type GlassCardProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
  children: ReactNode;
  hover?: boolean;
  insetGlow?: boolean;
};

const GlassCard = ({
  as: Component = "div",
  children,
  className = "",
  hover = true,
  insetGlow = true,
  ...props
}: GlassCardProps) => {
  return (
    <Component
      className={`premium-card group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.045] shadow-[0_24px_100px_-48px_rgba(56,189,248,0.65)] backdrop-blur-2xl ${
        hover
          ? "transition duration-500 ease-out hover:-translate-y-1 hover:border-cyan-300/35 hover:bg-white/[0.07]"
          : ""
      } ${className}`}
      {...props}
    >
      {insetGlow ? (
        <>
          <div className="pointer-events-none absolute inset-px rounded-[1.7rem] bg-[linear-gradient(135deg,rgba(255,255,255,0.11),transparent_34%,rgba(34,197,94,0.08)_70%,transparent)] opacity-70" />
          <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl transition duration-700 group-hover:bg-cyan-300/20" />
        </>
      ) : null}
      <div className="relative z-10">{children}</div>
    </Component>
  );
};

export default GlassCard;
