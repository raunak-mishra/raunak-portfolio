import { motion } from "framer-motion";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

const SectionHeader = ({ eyebrow, title, description }: SectionHeaderProps) => {
  return (
    <motion.div
      className="mb-10 grid gap-6 md:mb-14 md:grid-cols-[0.32fr_0.68fr]"
      initial={{ opacity: 0, y: 22, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-start gap-3">
        <span className="mt-1.5 h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_24px_rgba(110,231,183,0.8)]" />
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan-100/70">
          {eyebrow}
        </p>
      </div>
      <div>
        <h2 className="max-w-4xl font-display text-3xl font-semibold tracking-[-0.04em] text-slate-50 md:text-5xl">
          {title}
        </h2>
        {description ? (
          <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-400 md:text-base md:leading-8">
            {description}
          </p>
        ) : null}
      </div>
    </motion.div>
  );
};

export default SectionHeader;
