import { motion } from "framer-motion";

import { achievements } from "../constants/portfolio";
import SectionHeader from "../components/ui/SectionHeader";
import SectionShell from "../components/ui/SectionShell";

const Achievements = () => {
  return (
    <SectionShell id="achievements">
      <SectionHeader
        eyebrow="Achievements"
        title="Signals beyond shipped systems"
        description="Competitive programming, certification, and practice signals that support strong fundamentals."
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {achievements.map((achievement, index) => (
          <motion.article
            key={achievement.title}
            className="border border-slate-800 bg-transparent p-5"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.35, delay: index * 0.04, ease: "easeOut" }}
          >
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-slate-500">
              0{index + 1}
            </p>
            <h3 className="mt-4 min-h-16 font-display text-xl font-semibold text-slate-100">
              {achievement.title}
            </h3>
            <p className="mt-4 font-mono text-sm text-green-300">
              {achievement.detail}
            </p>
          </motion.article>
        ))}
      </div>
    </SectionShell>
  );
};

export default Achievements;
