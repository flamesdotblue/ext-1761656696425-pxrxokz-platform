import { useMemo } from 'react';
import { Brain, Settings2 } from 'lucide-react';

const ALL_MODELS = [
  { id: 'GPT-4o', desc: 'OpenAI flagship multimodal' },
  { id: 'Claude 3.5 Sonnet', desc: 'Anthropic reasoning specialist' },
  { id: 'Llama 3.1 405B', desc: 'Meta open weights (via providers)' },
  { id: 'Gemini 1.5 Pro', desc: 'Google long‑context multimodal' },
];

export default function ModelHub({ selected, onChange }) {
  const selectedSet = useMemo(() => new Set(selected), [selected]);

  const toggle = (id) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    onChange(Array.from(next));
  };

  const selectAll = () => onChange(ALL_MODELS.map((m) => m.id));
  const clearAll = () => onChange([]);

  return (
    <div id="workbench" className="w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/15 border border-blue-400/20">
            <Brain className="h-5 w-5 text-blue-300" />
          </div>
          <div>
            <h2 className="text-lg font-semibold tracking-tight">Model Hub</h2>
            <p className="text-xs text-slate-400">Pick the brains powering your personal coder</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={selectAll} className="rounded-lg border border-slate-700 bg-slate-800/60 px-3 py-1.5 text-xs text-slate-200 hover:border-slate-600">Select all</button>
          <button onClick={clearAll} className="rounded-lg border border-slate-700 bg-slate-800/60 px-3 py-1.5 text-xs text-slate-200 hover:border-slate-600">Clear</button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {ALL_MODELS.map((m) => (
          <button
            key={m.id}
            onClick={() => toggle(m.id)}
            className={`group flex flex-col items-start gap-2 rounded-xl border p-4 text-left transition ${
              selectedSet.has(m.id)
                ? 'border-blue-500/30 bg-blue-500/10 shadow-inner'
                : 'border-slate-800 bg-slate-900/50 hover:border-slate-700 hover:bg-slate-900'
            }`}
          >
            <div className="flex w-full items-center justify-between">
              <span className="text-sm font-semibold">{m.id}</span>
              <span
                className={`h-2.5 w-2.5 rounded-full ${selectedSet.has(m.id) ? 'bg-blue-400 shadow-[0_0_12px] shadow-blue-500/60' : 'bg-slate-600'}`}
              />
            </div>
            <p className="text-xs text-slate-400">{m.desc}</p>
          </button>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
        <Settings2 className="h-3.5 w-3.5" />
        <p>
          Note: This demo compares models in a unified interface. Connect your own API keys to call real endpoints.
        </p>
      </div>
    </div>
  );
}
