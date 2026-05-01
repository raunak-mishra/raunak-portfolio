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
      className={`premium-card group relative overflow-hidden rounded-[1.75rem] border border-[rgb(var(--border))] bg-[rgb(var(--panel)/0.46)] shadow-[0_24px_100px_-48px_rgb(var(--accent)/0.58)] backdrop-blur-2xl ${
        hover
          ? "transition duration-500 ease-out hover:-translate-y-1 hover:border-[rgb(var(--accent)/0.38)] hover:bg-[rgb(var(--panel)/0.62)]"
          : ""
      } ${className}`}
      {...props}
    >
      {insetGlow ? (
        <>
          <div className="pointer-events-none absolute inset-px rounded-[1.7rem] bg-[linear-gradient(135deg,rgb(255_255_255/0.11),transparent_34%,rgb(var(--accent)/0.08)_70%,transparent)] opacity-70" />
          <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-[rgb(var(--accent)/0.12)] blur-3xl transition duration-700 group-hover:bg-[rgb(var(--accent)/0.2)]" />
        </>
      ) : null}
      <div className="relative z-10">{children}</div>
    </Component>
  );
};

export default GlassCard;
