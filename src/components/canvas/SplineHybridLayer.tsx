import { lazy, Suspense } from "react";

const Spline = lazy(() => import("@splinetool/react-spline"));

type SplineHybridLayerProps = {
  sceneUrl?: string;
};

const SplineHybridLayer = ({ sceneUrl }: SplineHybridLayerProps) => {
  if (!sceneUrl) {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[68%] w-[68%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgb(var(--accent)/0.24)] shadow-[0_0_90px_rgb(var(--accent)/0.12),inset_0_0_80px_rgb(var(--accent-2)/0.08)]" />
        <div className="absolute left-1/2 top-1/2 h-[46%] w-[46%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgb(var(--accent-2)/0.18)] shadow-[0_0_70px_rgb(var(--accent-2)/0.12)]" />
        <div className="absolute left-[18%] top-[22%] h-28 w-28 rounded-full bg-[rgb(var(--accent)/0.12)] blur-3xl" />
        <div className="absolute bottom-[14%] right-[16%] h-32 w-32 rounded-full bg-[rgb(var(--accent-3)/0.12)] blur-3xl" />
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0 opacity-70 mix-blend-screen">
      <Suspense fallback={null}>
        <Spline scene={sceneUrl} />
      </Suspense>
    </div>
  );
};

export default SplineHybridLayer;
