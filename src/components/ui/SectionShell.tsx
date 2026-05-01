import AnimatedSection from "./AnimatedSection";

type SectionShellProps = {
  id: string;
  children: React.ReactNode;
  className?: string;
};

const SectionShell = ({ id, children, className = "" }: SectionShellProps) => {
  return (
    <AnimatedSection
      id={id}
      className={`cinematic-section relative mx-auto w-full max-w-7xl scroll-mt-24 px-5 py-16 sm:px-8 lg:px-10 lg:py-24 ${className}`}
    >
      {children}
    </AnimatedSection>
  );
};

export default SectionShell;
