import type { AnchorHTMLAttributes, ReactNode } from "react";

type CommandButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
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
      ? "border-slate-100 bg-slate-100 text-[#0B0F14] hover:border-blue-300 hover:bg-blue-300"
      : "border-slate-700 bg-transparent text-slate-200 hover:border-slate-300 hover:text-white";

  return (
    <a
      className={`inline-flex min-h-11 items-center justify-center gap-2 border px-4 py-3 font-mono text-xs font-semibold uppercase tracking-[0.12em] transition duration-200 ${variantClass} ${className}`}
      {...props}
    >
      {leading ? (
        <span className="flex h-5 min-w-5 items-center justify-center font-mono text-xs">
          {leading}
        </span>
      ) : null}
      <span>{children}</span>
    </a>
  );
};

export default CommandButton;
