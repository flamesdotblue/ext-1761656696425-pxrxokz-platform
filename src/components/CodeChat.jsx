import { useMemo, useState } from 'react';
import { Play, Copy, Check, Sparkles, TerminalSquare } from 'lucide-react';

function fauxGenerateCode(model, prompt) {
  const header = `// ${model} • Suggested approach`;
  const cleaned = (prompt || 'Build a simple function').trim();
  const fnName = cleaned
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .split(' ')
    .slice(0, 3)
    .map((s, i) => (i === 0 ? s : s.charAt(0).toUpperCase() + s.slice(1)))
    .join('') || 'solveTask';

  const styleLine = {
    'GPT-4o': '// Emphasis: clarity, comments, and testable structure',
    'Claude 3.5 Sonnet': '// Emphasis: stepwise reasoning and safety checks',
    'Llama 3.1 405B': '// Emphasis: open approach, readability, modularity',
    'Gemini 1.5 Pro': '// Emphasis: long-context hints and scalability',
  }[model] || '// Generic approach';

  const body = `
${header}
${styleLine}

/**
 * ${cleaned}
 * Returns result and provides a quick example usage.
 */
export function ${fnName}(input) {
  if (input == null) throw new Error('input is required');
  // 1) Validate
  // 2) Transform
  // 3) Compute result
  const result = String(input).trim();
  return result;
}

if (import.meta.vitest == null) {
  // Example run
  console.log('${fnName} example:', ${fnName}('Hello world'));
}
`;
  return body.trim();
}

export default function CodeChat({ selectedModels }) {
  const [prompt, setPrompt] = useState('Create a function that formats dates as YYYY-MM-DD given a JS Date. Include validation and examples.');
  const models = useMemo(() => (selectedModels.length ? selectedModels : ['Universal']), [selectedModels]);
  const [outputs, setOutputs] = useState({});
  const [copied, setCopied] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    await new Promise((r) => setTimeout(r, 350));
    const next = {};
    for (const m of models) next[m] = fauxGenerateCode(m, prompt);
    setOutputs(next);
    setIsGenerating(false);
  };

  const handleCopy = async (model) => {
    const text = outputs[model] || '';
    try {
      await navigator.clipboard.writeText(text);
      setCopied(model);
      setTimeout(() => setCopied(null), 1200);
    } catch {}
  };

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <div className="lg:col-span-1">
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
          <div className="mb-3 flex items-center gap-2 text-slate-300">
            <TerminalSquare className="h-4 w-4 text-blue-300" />
            <span className="text-sm font-medium">Prompt</span>
          </div>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={8}
            className="w-full resize-y rounded-lg border border-slate-800 bg-slate-950/70 p-3 text-sm text-slate-100 placeholder-slate-500 outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
            placeholder="Describe what you want to build..."
          />
          <div className="mt-3 flex items-center justify-between">
            <div className="text-xs text-slate-400">Models: {models.join(', ')}</div>
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 px-3 py-2 text-sm font-semibold shadow-md shadow-blue-900/40 disabled:opacity-60"
            >
              <Sparkles className={`h-4 w-4 ${isGenerating ? 'animate-pulse' : ''}`} />
              {isGenerating ? 'Thinking...' : 'Generate Code'}
            </button>
          </div>
        </div>
      </div>

      <div className="lg:col-span-2">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {models.map((m) => (
            <div key={m} className="rounded-xl border border-slate-800 bg-slate-900/60">
              <div className="flex items-center justify-between border-b border-slate-800 px-4 py-2.5">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-blue-400 shadow-[0_0_10px] shadow-blue-500/60" />
                  <span className="text-sm font-medium text-slate-200">{m}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopy(m)}
                    className="inline-flex items-center gap-1.5 rounded-md border border-slate-700 bg-slate-800/60 px-2 py-1 text-xs text-slate-200 hover:border-slate-600"
                  >
                    {copied === m ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Copy className="h-3.5 w-3.5" />}
                    {copied === m ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>
              <pre className="max-h-96 overflow-auto p-4 text-xs leading-relaxed text-slate-200">
                <code>{outputs[m] || '// Press "Generate Code" to get a tailored suggestion from ' + m}</code>
              </pre>
            </div>
          ))}
        </div>

        {!models.length && (
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 text-center text-slate-400">
            Pick at least one model to compare responses side‑by‑side.
          </div>
        )}
      </div>
    </div>
  );
}
