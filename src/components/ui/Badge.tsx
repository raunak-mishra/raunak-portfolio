type BadgeProps = {
  children: React.ReactNode;
  tone?: "blue" | "green" | "neutral";
};

const toneClasses = {
  blue: "border-cyan-300/35 bg-cyan-300/[0.07] text-cyan-100 shadow-[0_0_24px_rgba(34,211,238,0.08)]",
  green:
    "border-emerald-300/35 bg-emerald-300/[0.07] text-emerald-100 shadow-[0_0_24px_rgba(52,211,153,0.08)]",
  neutral: "border-white/10 bg-white/[0.035] text-slate-300",
};

const Badge = ({ children, tone = "neutral" }: BadgeProps) => {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.14em] backdrop-blur-xl ${toneClasses[tone]}`}
    >
      {children}
    </span>
  );
};

export default Badge;
