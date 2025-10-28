import { useState } from 'react';
import Hero3D from './components/Hero3D';
import ModelHub from './components/ModelHub';
import CodeChat from './components/CodeChat';
import FooterBar from './components/FooterBar';

export default function App() {
  const [selectedModels, setSelectedModels] = useState([
    'GPT-4o',
    'Claude 3.5 Sonnet',
    'Llama 3.1 405B',
    'Gemini 1.5 Pro',
  ]);

  return (
    <div className="min-h-screen bg-slate-950 text-white antialiased">
      <div className="relative">
        <Hero3D />
      </div>

      <main className="relative z-10 mx-auto max-w-6xl px-4 pb-24 -mt-24">
        <section className="rounded-2xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-xl shadow-2xl overflow-hidden">
          <div className="p-6 sm:p-8">
            <ModelHub selected={selectedModels} onChange={setSelectedModels} />
          </div>
          <div className="border-t border-slate-800/80" />
          <div className="p-4 sm:p-6">
            <CodeChat selectedModels={selectedModels} />
          </div>
        </section>
      </main>

      <FooterBar />
    </div>
  );
}
