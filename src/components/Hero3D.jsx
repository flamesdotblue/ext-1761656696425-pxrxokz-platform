import Spline from '@splinetool/react-spline';
import { Rocket, Code2 } from 'lucide-react';

export default function Hero3D() {
  return (
    <header className="relative h-[78vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/pDXeCthqjmzYX5Zk/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/10 via-slate-950/40 to-slate-950" />

      <div className="relative z-10 mx-auto flex h-full max-w-6xl items-end px-4 pb-16">
        <div className="w-full rounded-2xl bg-slate-900/60 backdrop-blur-md border border-slate-800/70 p-6 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-3 py-1 text-blue-300 border border-blue-400/20">
                <Rocket className="h-4 w-4" />
                <span className="text-xs font-medium tracking-wide">Personal Coder • Multi‑Model</span>
              </div>
              <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight bg-gradient-to-r from-blue-300 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
                Blue, smooth and powerful AI coding companion
              </h1>
              <p className="mt-3 max-w-2xl text-slate-300/90">
                Orchestrate top AI models side‑by‑side. Compare answers, generate code, and build faster — all in one serene blue workspace.
              </p>
            </div>
            <div className="pointer-events-auto">
              <a
                href="#workbench"
                className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 px-4 py-3 text-sm font-semibold shadow-lg shadow-blue-900/40 transition hover:shadow-blue-800/60"
              >
                <Code2 className="h-4 w-4 transition-transform group-hover:scale-110" />
                Open Workbench
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
