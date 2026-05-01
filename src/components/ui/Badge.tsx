type BadgeProps = {
  children: React.ReactNode;
  tone?: "blue" | "green" | "neutral";
};

const toneClasses = {
  blue: "border-[rgb(var(--accent-2)/0.35)] bg-[rgb(var(--accent-2)/0.07)] text-[rgb(var(--text))] shadow-[0_0_24px_rgb(var(--accent-2)/0.08)]",
  green:
    "border-[rgb(var(--accent)/0.35)] bg-[rgb(var(--accent)/0.07)] text-[rgb(var(--text))] shadow-[0_0_24px_rgb(var(--accent)/0.08)]",
  neutral: "border-[rgb(var(--border))] bg-[rgb(var(--panel)/0.38)] text-[rgb(var(--muted))]",
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
