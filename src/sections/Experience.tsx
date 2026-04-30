import { systemsBuilt } from "../constants/portfolio";
import SystemCard from "../components/cards/SystemCard";
import SectionHeader from "../components/ui/SectionHeader";
import SectionShell from "../components/ui/SectionShell";

const Experience = () => {
  return (
    <SectionShell id="systems">
      <SectionHeader
        eyebrow="Systems I have built"
        title="Experience as production architecture"
        description="Each role is framed as a system: the failure mode, the engineering response, and the operational impact."
      />

      <div className="space-y-5">
        {systemsBuilt.map((system, index) => (
          <SystemCard key={system.company} system={system} index={index} />
        ))}
      </div>
    </SectionShell>
  );
};

export default Experience;
