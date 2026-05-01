import type { ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type AnimatedSectionProps = {
  id: string;
  children: ReactNode;
  className?: string;
};

const AnimatedSection = ({ id, children, className = "" }: AnimatedSectionProps) => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -28]);

  return (
    <motion.section
      id={id}
      className={className}
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div style={{ y }} className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[rgb(var(--accent)/0.26)] to-transparent" />
      {children}
    </motion.section>
  );
};

export default AnimatedSection;
