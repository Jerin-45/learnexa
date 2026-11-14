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
  Radio,
  Terminal,
  ChevronRight,
  Sliders,
  Check,
  AlertCircle
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
      role: "Parser & Diagnostic Engine",
      tool: "SkillOntologyParser.v2",
      icon: Cpu,
      responsibility: "Audits declared user competencies, validates claimed proficiency years, calculates distributions, and flags missing prerequisites.",
      currentOutput: agentData?.skillAnalysis?.summary || "Audited existing skills. Validated baseline competencies against market rubrics.",
      model: "Gemini 1.5 Pro / Semantic Parser",
      latency: "45ms",
      status: isAnalyzing ? "Thinking" : "Completed"
    },
    {
      id: 2,
      name: "Career Guidance Agent",
      role: "Market Alignment & Gap Engine",
      tool: "BenchmarkMatcher.v3",
      icon: Compass,
      responsibility: "Benchmarks audited skills against live industry requirements for the target role, computing exact readiness vs gap ratios.",
      currentOutput: agentData?.careerMatch?.guidanceNote || `Calculated ${agentData?.careerMatch?.matchPercentage || 68}% career match for ${currentCareer.title}.`,
      model: "Learnexa Matcher v3",
      latency: "62ms",
      status: isAnalyzing ? "Queued" : "Completed"
    },
    {
      id: 3,
      name: "Learning Recommendation Agent",
      role: "Curriculum & Project Architect",
      tool: "CurriculumSynthesizer.v1",
      icon: BookOpen,
      responsibility: "Constructs sequential milestone roadmap, selects high-impact coursework, and generates production portfolio project specifications.",
      currentOutput: `Synthesized tailored milestones targeting ${agentData?.careerMatch?.missingSkills?.length || 4} skill gaps with deliverable verification criteria.`,
      model: "Curriculum Synthesizer AI",
      latency: "84ms",
      status: isAnalyzing ? "Queued" : "Completed"
    },
    {
      id: 4,
      name: "Progress Evaluation Agent",
      role: "Velocity & Adaptive Calibration Monitor",
      tool: "VelocityCalibrator.v2",
      icon: Activity,
      responsibility: "Monitors assessment scores, completion pacing, and weekly commitment hours to dynamically tune roadmap velocity.",
      currentOutput: agentData?.progressEvaluation?.adaptiveNotice || "Velocity optimal: Roadmap pace calibrated at 'On Track'.",
      model: "Adaptive Feedback Engine",
      latency: "38ms",
      status: isAnalyzing ? "Queued" : "Completed"
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
      message: `Calculated readiness score of ${agentData?.careerMatch?.matchPercentage || 68}% for ${currentCareer.title}. Flagged priority gaps. Dispatched payload to Recommendation Agent.`,
      status: "success"
    },
    {
      step: 3,
      agent: "Learning Recommendation Agent",
      role: "Curriculum Architect",
      timestamp: "T+0.42s",
      action: "Synthesized personalized milestone path",
      message: `Constructed sequential milestone roadmap with deliverable specifications and curated courses. Dispatched to Evaluation Agent.`,
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="badge-neutral font-mono">
              Architecture • Multi-Agent System
            </span>
            <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              4 Agents Mesh Online
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Autonomous Multi-Agent AI Network
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1 max-w-2xl">
            Four specialized AI agents collaborate sequentially to parse skills, benchmark market gaps, architect roadmaps, and monitor velocity.
          </p>
        </div>

        <button
          onClick={handleSimulate}
          disabled={isAnalyzing}
          className="btn-primary"
        >
          {isAnalyzing ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Agents Executing Collaboration Cycle...</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Trigger Live Collaboration Cycle</span>
            </>
          )}
        </button>
      </div>

      {/* 4 Agent Orchestration Cards */}
      <div className="panel rounded-2xl p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-3">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Agent Data Pipeline (Stage 1 → Stage 2 → Stage 3 → Stage 4)</span>
          </div>
          <span className="text-[11px] font-mono text-neutral-500">
            Avg execution latency: 229ms
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {agents.map((agent) => {
            const Icon = agent.icon;
            const isSelected = activeAgentTab === agent.id;

            return (
              <div
                key={agent.id}
                onClick={() => setActiveAgentTab(agent.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 space-y-3 ${
                  isSelected
                    ? 'border-neutral-900 bg-neutral-50 dark:border-white dark:bg-neutral-900 shadow-sm'
                    : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-700 bg-white dark:bg-[#121212]'
                }`}
              >
                {/* Agent Header */}
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 flex items-center justify-center">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-medium ${
                    agent.status === 'Completed'
                      ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60'
                      : agent.status === 'Thinking'
                      ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800/60 animate-pulse'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500'
                  }`}>
                    {agent.status}
                  </span>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-neutral-900 dark:text-white">
                    {agent.name}
                  </h4>
                  <p className="text-[11px] text-neutral-500 truncate mt-0.5">
                    {agent.role}
                  </p>
                </div>

                <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between text-[10px] font-mono text-neutral-400">
                  <span>Tool: {agent.tool.split('.')[0]}</span>
                  <span>{agent.latency}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Agent Deep Dive & Live Agent Thought Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (5 Cols): Selected Agent Inspector */}
        <div className="lg:col-span-5 space-y-6">
          {(() => {
            const selected = agents.find(a => a.id === activeAgentTab) || agents[0];
            const Icon = selected.icon;

            return (
              <div className="panel rounded-2xl p-6 space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                      {selected.name}
                    </h3>
                    <p className="text-xs text-neutral-500 font-medium">
                      {selected.role}
                    </p>
                  </div>
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <span className="font-mono text-neutral-400 uppercase text-[10px] block mb-1">
                      Responsibility & Objective
                    </span>
                    <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                      {selected.responsibility}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 space-y-1">
                    <span className="font-mono text-neutral-400 uppercase text-[10px] block">
                      Synthesized Output Payload
                    </span>
                    <p className="text-xs text-neutral-800 dark:text-neutral-200 font-medium leading-relaxed">
                      "{selected.currentOutput}"
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-[11px] font-mono text-neutral-500 pt-1">
                    <div>
                      <span className="text-neutral-400 block text-[10px]">Underlying Model:</span>
                      <span className="font-semibold text-neutral-800 dark:text-neutral-200 truncate block">
                        {selected.model}
                      </span>
                    </div>
                    <div>
                      <span className="text-neutral-400 block text-[10px]">Execution Mode:</span>
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400 block">
                        Reactive Deterministic
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setShowPayloadInspection(!showPayloadInspection)}
                  className="btn-secondary w-full py-2 text-xs flex items-center justify-center gap-2"
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>{showPayloadInspection ? 'Hide Raw Agent State' : 'Inspect Raw Agent State'}</span>
                </button>

                {showPayloadInspection && (
                  <pre className="p-3.5 rounded-xl bg-neutral-900 text-neutral-200 text-[10px] font-mono overflow-x-auto max-h-48 border border-neutral-800">
                    {JSON.stringify(agentData || { status: "initialized" }, null, 2)}
                  </pre>
                )}
              </div>
            );
          })()}
        </div>

        {/* Right Column (7 Cols): Real-Time Agent Collaboration Log */}
        <div className="lg:col-span-7 space-y-6">
          <div className="panel rounded-2xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-3">
              <div>
                <h3 className="text-sm font-semibold text-neutral-900 dark:text-white flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-neutral-500" />
                  <span>Agent Message Bus & Execution Stream</span>
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">Sequential context propagation across agent nodes</p>
              </div>
              <span className="badge-neutral font-mono text-[10px]">
                Synchronized
              </span>
            </div>

            <div className="space-y-3">
              {agentLogs.map((log, idx) => (
                <div 
                  key={idx}
                  className="p-3.5 rounded-xl border border-neutral-200/70 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30 space-y-1.5"
                >
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-neutral-900 dark:text-white text-xs">
                        {log.agent}
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                        {log.role}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-neutral-400">
                      {log.timestamp}
                    </span>
                  </div>

                  <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans">
                    {log.message}
                  </p>

                  <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 pt-1">
                    <span>Action: {log.action}</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      Handled
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex items-center justify-between text-xs text-neutral-500 border-t border-neutral-100 dark:border-neutral-800">
              <span className="font-mono text-[11px]">All 4 agents synchronized</span>
              <button
                onClick={() => setActiveTab('roadmap')}
                className="btn-ghost font-semibold text-neutral-900 dark:text-white flex items-center gap-1"
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
