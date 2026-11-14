import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Bot, 
  Cpu, 
  Compass, 
  BookOpen, 
  ShieldAlert, 
  Sparkles, 
  Play, 
  ArrowRight, 
  CheckCircle2, 
  Activity, 
  RefreshCw, 
  Layers, 
  Code2, 
  Clock,
  Zap,
  Radio
} from 'lucide-react';
import { AgentLog } from '../../types';

export const MultiAgentVisualizer: React.FC = () => {
  const { 
    currentUser, 
    currentCareer, 
    agentData, 
    runCollaboration, 
    isAnalyzing, 
    setActiveTab 
  } = useApp();

  const [activeAgentTab, setActiveAgentTab] = useState<number>(1);
  const [showPayloadInspection, setShowPayloadInspection] = useState<boolean>(false);

  const agents = [
    {
      id: 1,
      name: "Skill Analysis Agent",
      role: "Parser, Auditor & Diagnostic Engine",
      color: "from-purple-600 to-indigo-600",
      accent: "text-purple-600 dark:text-purple-400",
      bgLight: "bg-purple-50 dark:bg-purple-950/40",
      border: "border-purple-200 dark:border-purple-800",
      icon: Cpu,
      responsibility: "Audits declared user skills, validates claimed experience, calculates proficiency distributions, and uncovers hidden foundations.",
      currentOutput: agentData?.skillAnalysis?.summary || "Audited 3 skills. Verified advanced competency in modern web interfaces.",
      model: "Gemini 1.5 Pro / Autonomous Reasoner",
      latency: "45ms"
    },
    {
      id: 2,
      name: "Career Guidance Agent",
      role: "Benchmark Alignment & Gap Engine",
      color: "from-blue-600 to-cyan-600",
      accent: "text-blue-600 dark:text-blue-400",
      bgLight: "bg-blue-50 dark:bg-blue-950/40",
      border: "border-blue-200 dark:border-blue-800",
      icon: Compass,
      responsibility: "Compares audited skills with target career benchmark criteria, computes match vs gap percentages, and prioritizes essential roadblocks.",
      currentOutput: agentData?.careerMatch?.guidanceNote || `Calculated ${agentData?.careerMatch?.matchPercentage || 68}% career match for ${currentCareer.title}.`,
      model: "Learnexa Matcher v3",
      latency: "62ms"
    },
    {
      id: 3,
      name: "Learning Recommendation Agent",
      role: "Curriculum & Project Architect",
      color: "from-emerald-600 to-teal-600",
      accent: "text-emerald-600 dark:text-emerald-400",
      bgLight: "bg-emerald-50 dark:bg-emerald-950/40",
      border: "border-emerald-200 dark:border-emerald-800",
      icon: BookOpen,
      responsibility: "Synthesizes personalized milestone roadmap, curates top-tier video tutorials and courses, and designs hands-on portfolio projects.",
      currentOutput: `Generated tailored 7-milestone roadmap targeting ${agentData?.careerMatch?.missingSkills?.length || 4} skill gaps with deliverable specs.`,
      model: "Curriculum Synthesizer AI",
      latency: "84ms"
    },
    {
      id: 4,
      name: "Progress Evaluation Agent",
      role: "Velocity & Adaptive Calibration Monitor",
      color: "from-amber-600 to-orange-600",
      accent: "text-amber-600 dark:text-amber-400",
      bgLight: "bg-amber-50 dark:bg-amber-950/40",
      border: "border-amber-200 dark:border-amber-800",
      icon: Activity,
      responsibility: "Continuously tracks quiz scores, completion velocity, study streaks, and dynamically adjusts roadmap difficulty.",
      currentOutput: agentData?.progressEvaluation?.adaptiveNotice || "Velocity optimal: Roadmap pace calibrated at 'On Track'.",
      model: "Adaptive Feedback Engine",
      latency: "38ms"
    }
  ];

  const agentLogs: AgentLog[] = agentData?.agentLogs || [
    {
      step: 1,
      agent: "Skill Analysis Agent",
      role: "Skill Parser & Auditor",
      timestamp: "T+0.05s",
      action: "Audited declared proficiencies",
      message: `Audited ${currentUser.skills.length} skills. Validated proficiency baseline. Dispatched profile payload to Career Guidance Agent.`,
      status: "success"
    },
    {
      step: 2,
      agent: "Career Guidance Agent",
      role: "Market Alignment & Gap Engine",
      timestamp: "T+0.21s",
      action: "Matched against industry benchmark requirements",
      message: `Calculated match rate of ${agentData?.careerMatch?.matchPercentage || 68}% for ${currentCareer.title}. Flagged missing competencies. Dispatched payload to Recommendation Agent.`,
      status: "success"
    },
    {
      step: 3,
      agent: "Learning Recommendation Agent",
      role: "Curriculum Architect",
      timestamp: "T+0.42s",
      action: "Synthesized personalized milestone path",
      message: `Constructed sequential 7-step roadmap with deliverable specifications and curated courses. Dispatched to Evaluation Agent.`,
      status: "success"
    },
    {
      step: 4,
      agent: "Progress Evaluation Agent",
      role: "Adaptive Calibration Monitor",
      timestamp: "T+0.60s",
      action: "Calibrated velocity and milestone difficulty",
      message: `Validated learning velocity with 14 hrs/week pacing and ${currentUser.streakDays} day streak. Roadmap is live.`,
      status: "success"
    }
  ];

  const handleSimulate = async () => {
    await runCollaboration();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 text-xs font-bold border border-purple-200 dark:border-purple-800 mb-2">
            <Radio className="w-3.5 h-3.5 text-purple-600 animate-pulse" />
            <span>Autonomous Multi-Agent Mesh</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Multi-Agent AI Collaboration Network
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Observe the four autonomous AI agents collaborating in real time to diagnose, strategize, architect, and evaluate your career roadmap.
          </p>
        </div>

        <button
          onClick={handleSimulate}
          disabled={isAnalyzing}
          className="px-6 py-3 rounded-2xl font-bold text-xs gradient-brand shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 hover:scale-[1.02] transition-all flex items-center gap-2 self-start md:self-auto disabled:opacity-60"
        >
          {isAnalyzing ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin text-white" />
              <span>Agents Collaborating...</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-white text-white" />
              <span>Simulate Collaboration Cycle</span>
            </>
          )}
        </button>
      </div>

      {/* Visual Agent Mesh Flow Diagram */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-6 overflow-x-auto">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
            <Sparkles className="w-4 h-4 text-brand-600" />
            <span>Live Data Handoff Sequence (Agent 1 → Agent 2 → Agent 3 → Agent 4)</span>
          </div>
          <span className="text-xs font-bold text-emerald-500 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            Sub-second latency (229ms total)
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
          {agents.map((agent, index) => {
            const Icon = agent.icon;
            const isSelected = activeAgentTab === agent.id;

            return (
              <div
                key={agent.id}
                onClick={() => setActiveAgentTab(agent.id)}
                className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 space-y-3 relative ${
                  isSelected
                    ? `${agent.bgLight} ${agent.border} shadow-lg ring-2 ring-brand-500/30 scale-[1.02]`
                    : 'glass-panel hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                {/* Agent Header */}
                <div className="flex items-center justify-between">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${agent.color} flex items-center justify-center text-white shadow-md`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 font-bold">
                    Step {agent.id}
                  </span>
                </div>

                <div>
                  <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">
                    {agent.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                    {agent.role}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-200/50 dark:border-slate-800/50 flex items-center justify-between text-[10px] text-slate-400">
                  <span>Latency: {agent.latency}</span>
                  <span className="text-emerald-500 font-bold">Active</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Agent Deep Dive & Live Agent Thought Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (5 Cols): Selected Agent Inspector */}
        <div className="lg:col-span-5 space-y-6">
          {(() => {
            const selected = agents.find(a => a.id === activeAgentTab) || agents[0];
            const Icon = selected.icon;

            return (
              <div className="glass-card rounded-3xl p-6 sm:p-7 space-y-5 border-t-4 border-t-brand-500">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${selected.color} flex items-center justify-center text-white shadow-lg`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      {selected.name}
                    </h3>
                    <p className="text-xs text-brand-600 dark:text-brand-400 font-semibold">
                      {selected.role}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="font-bold text-slate-400 uppercase tracking-wider block text-[10px] mb-1">
                      Core Responsibility
                    </span>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      {selected.responsibility}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
                    <span className="font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider block text-[10px]">
                      Latest Synthesized Output
                    </span>
                    <p className="text-xs text-slate-800 dark:text-slate-200 font-medium">
                      "{selected.currentOutput}"
                    </p>
                  </div>

                  <div className="pt-2 grid grid-cols-2 gap-2 text-[11px] text-slate-500">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Underlying Model:</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{selected.model}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Execution Mode:</span>
                      <span className="font-semibold text-emerald-500">Autonomous Reactive</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setShowPayloadInspection(!showPayloadInspection)}
                  className="w-full py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 transition-colors flex items-center justify-center gap-2"
                >
                  <Code2 className="w-4 h-4 text-purple-500" />
                  <span>{showPayloadInspection ? 'Hide Agent Payload' : 'Inspect Raw Agent Payload'}</span>
                </button>

                {showPayloadInspection && (
                  <pre className="p-3 rounded-xl bg-slate-900 text-slate-200 text-[10px] font-mono overflow-x-auto max-h-48">
                    {JSON.stringify(agentData || { status: "initialized" }, null, 2)}
                  </pre>
                )}
              </div>
            );
          })()}
        </div>

        {/* Right Column (7 Cols): Real-Time Agent Collaboration Log */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-card rounded-3xl p-6 sm:p-7 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-brand-600" />
                  Live Collaborative Agent Thought Stream
                </h3>
                <p className="text-xs text-slate-500">Autonomous message bus passing context between agents</p>
              </div>
              <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                Synchronized
              </span>
            </div>

            <div className="space-y-3">
              {agentLogs.map((log, idx) => (
                <div 
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-2 hover:border-brand-500/50 transition-colors"
                >
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-brand-600 dark:text-brand-400">
                        {log.agent}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                        {log.role}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-slate-400">
                      {log.timestamp}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                    {log.message}
                  </p>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                    <span>Action: {log.action}</span>
                    <span className="text-emerald-500 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Handled
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex items-center justify-between text-xs text-slate-500">
              <span>All 4 agents active on message bus</span>
              <button
                onClick={() => setActiveTab('roadmap')}
                className="font-bold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
              >
                <span>View Generated Roadmap Result</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
