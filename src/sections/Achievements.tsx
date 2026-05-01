import { motion } from "framer-motion";

import { achievements } from "../constants/portfolio";
import GlassCard from "../components/ui/GlassCard";
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
          <motion.div
            key={achievement.title}
            initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.62, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
          >
            <GlassCard as="article" className="h-full p-5">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-slate-500">
                0{index + 1}
              </p>
              <h3 className="mt-4 min-h-16 font-display text-xl font-semibold tracking-[-0.03em] text-slate-100">
                {achievement.title}
              </h3>
              <p className="mt-4 font-mono text-sm text-emerald-200">
                {achievement.detail}
              </p>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  );
};

export default Achievements;
