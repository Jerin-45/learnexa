import React from 'react';
import { Sparkles, Bot, Github, Heart, Shield, Cpu, Zap } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 backdrop-blur-md transition-colors mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white">
                SkillPath <span className="gradient-text font-black">AI</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Autonomous personalized career learning platform powered by a 4-agent collaborative intelligence architecture.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>All 4 AI Agents Operational</span>
            </div>
          </div>

          {/* Col 2: Platform Modules */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Platform Modules
            </h4>
            <ul className="space-y-2 text-xs font-medium text-slate-600 dark:text-slate-400">
              <li>
                <button onClick={() => setActiveTab('dashboard')} className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Student Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('skills')} className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  AI Skill Gap Analysis
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('careers')} className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Career Matching & Benchmarks
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('roadmap')} className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Personalized Roadmap
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('progress')} className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  Assessments & Quizzes
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Multi-Agent AI System */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Multi-Agent Mesh
            </h4>
            <ul className="space-y-2 text-xs font-medium text-slate-600 dark:text-slate-400">
              <li className="flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-purple-500" />
                <span>Skill Analysis Agent</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-blue-500" />
                <span>Career Guidance Agent</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Bot className="w-3.5 h-3.5 text-emerald-500" />
                <span>Learning Recommendation Agent</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-amber-500" />
                <span>Progress Evaluation Agent</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Hackathon Project & Tech */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              College Hackathon Showcase
            </h4>
            <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs space-y-2">
              <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                <span className="font-semibold">Prototype Status:</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300">
                  Production Ready
                </span>
              </div>
              <p className="text-[11px] text-slate-500 leading-normal">
                Built with React, TypeScript, Tailwind CSS, Express Backend, and autonomous agent orchestration.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-8 mt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>© 2025 SkillPath AI. Engineered for modern personalized education.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-brand-600 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-brand-600 cursor-pointer">Terms of Service</span>
            <span className="hover:text-brand-600 cursor-pointer">API Docs</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
