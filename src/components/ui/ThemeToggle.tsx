import { motion } from "framer-motion";

import { useTheme } from "./ThemeProvider";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      aria-pressed={!isDark}
      className="relative flex h-10 w-[5.75rem] items-center rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--panel)/0.58)] p-1 text-[rgb(var(--muted))] shadow-[inset_0_1px_0_rgb(255_255_255/0.08)] backdrop-blur-2xl transition hover:border-[rgb(var(--accent)/0.5)]"
      onClick={toggleTheme}
      data-cursor="button"
    >
      <motion.span
        className="absolute top-1 h-8 w-8 rounded-full bg-[rgb(var(--accent))] shadow-[0_0_28px_rgb(var(--accent)/0.38)]"
        animate={{ x: isDark ? 0 : 52 }}
        transition={{ type: "spring", stiffness: 360, damping: 28 }}
      />
      <span className={`relative z-10 flex flex-1 justify-center font-mono text-[10px] ${isDark ? "text-slate-950" : ""}`}>
        D
      </span>
      <span className={`relative z-10 flex flex-1 justify-center font-mono text-[10px] ${isDark ? "" : "text-slate-950"}`}>
        L
      </span>
    </button>
  );
};

export default ThemeToggle;
