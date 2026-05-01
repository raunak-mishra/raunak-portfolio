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
    <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-[#050713]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(56,189,248,0.18),transparent_36%),radial-gradient(circle_at_20%_80%,rgba(34,197,94,0.14),transparent_28%),linear-gradient(rgba(148,163,184,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.06)_1px,transparent_1px)] bg-[size:100%_100%,100%_100%,44px_44px,44px_44px]" />
      {lines.map((line) => (
        <span
          key={line}
          className={`absolute h-px origin-left bg-gradient-to-r from-transparent via-cyan-200/55 to-transparent ${line}`}
        />
      ))}
      {nodes.map((node, index) => (
        <span
          key={node}
          className={`absolute rounded-full border bg-[#050713] shadow-[0_0_28px_rgba(34,211,238,0.22)] ${node}`}
        >
          {index === 0 ? (
            <span className="absolute inset-[-12px] rounded-full border border-cyan-300/20" />
          ) : null}
        </span>
      ))}
      <div className="absolute left-4 top-16 rounded-full border border-white/10 bg-slate-950/70 px-3 py-2 font-mono text-xs text-slate-400 backdrop-blur-xl">
        topology.static / healthy
      </div>
    </div>
  );
};

export default TopologyFallback;
