import { motion } from "framer-motion";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

const SectionHeader = ({ eyebrow, title, description }: SectionHeaderProps) => {
  return (
    <motion.div
      className="mb-10 grid gap-6 border-t border-slate-800 pt-8 md:mb-14 md:grid-cols-[0.32fr_0.68fr]"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500">
        {eyebrow}
      </p>
      <div>
        <h2 className="font-display text-3xl font-semibold tracking-normal text-slate-100 md:text-5xl">
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
