import React from 'react';
import { Sparkles, Bot, Github, Heart, Shield, Cpu, Zap } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-[#0A0A0A]/70 backdrop-blur-md transition-colors mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-white dark:text-black" />
              </div>
              <span className="font-bold text-base tracking-tight text-neutral-900 dark:text-white">
                Learnexa
              </span>
            </div>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Autonomous personalized career learning platform powered by a 4-agent collaborative intelligence architecture.
            </p>
            <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>4-Agent Mesh Operational</span>
            </div>
          </div>

          {/* Col 2: Platform Modules */}
          <div>
            <h4 className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-3 font-semibold">
              Platform Modules
            </h4>
            <ul className="space-y-2 text-xs text-neutral-600 dark:text-neutral-400">
              <li>
                <button onClick={() => setActiveTab('dashboard')} className="hover:text-neutral-900 dark:hover:text-white transition-colors">
                  Student Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('skills')} className="hover:text-neutral-900 dark:hover:text-white transition-colors">
                  AI Skill Gap Analysis
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('careers')} className="hover:text-neutral-900 dark:hover:text-white transition-colors">
                  Career Matching & Benchmarks
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('roadmap')} className="hover:text-neutral-900 dark:hover:text-white transition-colors">
                  Interactive Role Roadmaps
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('progress')} className="hover:text-neutral-900 dark:hover:text-white transition-colors">
                  Assessments & Quizzes
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: AI Architecture */}
          <div>
            <h4 className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-3 font-semibold">
              Agent Intelligence
            </h4>
            <ul className="space-y-2 text-xs text-neutral-600 dark:text-neutral-400">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                <span>Skill Analysis Agent</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                <span>Career Guidance Agent</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                <span>Learning Recommendation Agent</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                <span>Progress Evaluation Agent</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Tech & Compliance */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-3 font-semibold">
              Engineering Specs
            </h4>
            <p className="text-xs text-neutral-500">
              Deterministic skill ontology calibrated against real-world tech hiring rubrics.
            </p>
            <div className="pt-2 text-[11px] font-mono text-neutral-400 space-y-1">
              <p>Stack: React 18 • TypeScript • Tailwind</p>
              <p>Backend: Node.js Express • AI Mesh</p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-neutral-100 dark:border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} Learnexa AI. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs">
            <span className="hover:text-neutral-800 dark:hover:text-neutral-200 cursor-pointer">Security Protocol</span>
            <span className="hover:text-neutral-800 dark:hover:text-neutral-200 cursor-pointer">API Reference</span>
            <span className="hover:text-neutral-800 dark:hover:text-neutral-200 cursor-pointer">Privacy & Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
