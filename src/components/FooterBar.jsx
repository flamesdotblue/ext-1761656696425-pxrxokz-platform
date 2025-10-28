import { Github, ShieldCheck } from 'lucide-react';

export default function FooterBar() {
  return (
    <footer className="relative z-10 border-t border-slate-800/60 bg-slate-950/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-slate-400">
          <span className="text-sm">© {new Date().getFullYear()} Personal Coder</span>
          <span className="text-slate-600">•</span>
          <span className="text-sm">Blue & Smooth Experience</span>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-2 text-sm text-slate-200 hover:border-slate-700"
          >
            <Github className="h-4 w-4" />
            Star on GitHub
          </a>
          <div className="inline-flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-2 text-xs text-slate-300">
            <ShieldCheck className="h-4 w-4 text-green-400" />
            No data is sent to servers in this demo
          </div>
        </div>
      </div>
    </footer>
  );
}
