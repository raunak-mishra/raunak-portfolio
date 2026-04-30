type BadgeProps = {
  children: React.ReactNode;
  tone?: "blue" | "green" | "neutral";
};

const toneClasses = {
  blue: "border-blue-500/40 text-blue-200",
  green: "border-green-500/40 text-green-200",
  neutral: "border-slate-700 text-slate-300",
};

const Badge = ({ children, tone = "neutral" }: BadgeProps) => {
  return (
    <span
      className={`inline-flex items-center border bg-transparent px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.14em] ${toneClasses[tone]}`}
    >
      {children}
    </span>
  );
};

export default Badge;
