const nodes = [
  "left-[49%] top-[45%] h-5 w-5 border-blue-400",
  "left-[25%] top-[30%] h-3.5 w-3.5 border-green-400",
  "left-[72%] top-[32%] h-3.5 w-3.5 border-blue-300",
  "left-[30%] top-[68%] h-3 w-3 border-slate-300",
  "left-[68%] top-[66%] h-3 w-3 border-green-300",
];

const lines = [
  "left-[30%] top-[39%] w-[22%] rotate-[18deg]",
  "left-[51%] top-[40%] w-[23%] -rotate-[17deg]",
  "left-[31%] top-[62%] w-[22%] -rotate-[27deg]",
  "left-[51%] top-[62%] w-[20%] rotate-[26deg]",
  "left-[28%] top-[50%] w-[43%] rotate-[0deg]",
];

const TopologyFallback = () => {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#0B0F14]">
      {lines.map((line) => (
        <span
          key={line}
          className={`absolute h-px origin-left bg-slate-600 ${line}`}
        />
      ))}
      {nodes.map((node, index) => (
        <span
          key={node}
          className={`absolute border bg-[#0B0F14] ${node}`}
        >
          {index === 0 ? (
            <span className="absolute inset-[-12px] border border-slate-800" />
          ) : null}
        </span>
      ))}
      <div className="absolute left-0 top-16 border border-slate-800 bg-[#0B0F14] px-3 py-2 font-mono text-xs text-slate-400">
        topology.static / healthy
      </div>
    </div>
  );
};

export default TopologyFallback;
