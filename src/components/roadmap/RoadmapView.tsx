import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  GitFork, 
  CheckCircle2, 
  Clock, 
  BookOpen, 
  Award, 
  Zap, 
  ExternalLink, 
  Download, 
  Layers, 
  Check,
  Code2,
  ChevronDown,
  ChevronUp,
  Bot,
  Sparkles,
  Info,
  ArrowDown,
  Target,
  FileCheck2,
  X
} from 'lucide-react';
import { ROLE_ROADMAPS, RoadmapTopicNode, RoadmapSection } from '../../data/roadmapGraphData';

export const RoadmapView: React.FC = () => {
  const { 
    currentUser, 
    currentCareer, 
    setCareerGoal, 
    openAssessment, 
    showNotification,
    toggleChat
  } = useApp();

  // Active role selected in the roadmap view (defaults to user's careerGoal or full-stack-developer)
  const [selectedRoleId, setSelectedRoleId] = useState<string>(currentUser.careerGoal || 'full-stack-developer');
  const [selectedTrack, setSelectedTrack] = useState<string>('All Tracks');
  const [inspectedNode, setInspectedNode] = useState<RoadmapTopicNode | null>(null);
  const [infoOpen, setInfoOpen] = useState<boolean>(true);

  // Completed node IDs tracked in local state + user roadmap progress
  const [completedNodeIds, setCompletedNodeIds] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {
      'node-html': true,
      'node-css': true,
      'chk-static-webpages': true,
      'node-python': true,
      'node-sql-adv': true,
      'node-networking': true,
      'node-figma': true
    };
    return initial;
  });

  const activeRoleGraph = ROLE_ROADMAPS[selectedRoleId] || ROLE_ROADMAPS['full-stack-developer'];

  const toggleNodeCompletion = (e: React.MouseEvent, nodeId: string) => {
    e.stopPropagation();
    setCompletedNodeIds(prev => {
      const updated = { ...prev, [nodeId]: !prev[nodeId] };
      showNotification(updated[nodeId] ? 'Node marked as Completed! ✓' : 'Node set to In Progress');
      return updated;
    });
  };

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({
      role: activeRoleGraph.roleTitle,
      student: currentUser.name,
      sections: activeRoleGraph.sections,
      completedNodes: Object.keys(completedNodeIds).filter(k => completedNodeIds[k])
    }, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `Learnexa_${activeRoleGraph.roleId}_Roadmap.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showNotification('Roadmap exported successfully!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      {/* 1. TOP HEADER & ROLE SELECTOR (FOR EVERY ROLE) */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 text-xs font-bold border border-amber-200 dark:border-amber-800 mb-2">
              <GitFork className="w-3.5 h-3.5" />
              <span>Interactive Role Flowchart • Inspired by roadmap.sh</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Interactive Career Roadmaps
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
              Select any role below to view its visual node graph, prerequisite topics, and hands-on project checkpoints.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setCareerGoal(selectedRoleId);
                showNotification(`Set ${activeRoleGraph.roleTitle} as your active career focus!`);
              }}
              className="px-4 py-2.5 rounded-xl gradient-brand text-white font-bold text-xs shadow-md hover:scale-105 transition-all flex items-center gap-1.5"
            >
              <Target className="w-4 h-4" />
              <span>Set as My Career Goal</span>
            </button>

            <button
              onClick={handleExport}
              className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 transition-colors flex items-center gap-1.5"
            >
              <Download className="w-4 h-4 text-slate-500" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* ROLE TABS (ALL 5 ROLES) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-2">
          {Object.values(ROLE_ROADMAPS).map(role => {
            const isSelected = selectedRoleId === role.roleId;

            return (
              <button
                key={role.roleId}
                onClick={() => {
                  setSelectedRoleId(role.roleId);
                  setSelectedTrack('All Tracks');
                }}
                className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold whitespace-nowrap transition-all duration-200 flex items-center gap-2 ${
                  isSelected
                    ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20 ring-2 ring-amber-400/50 scale-[1.02]'
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-amber-400'
                }`}
              >
                <span>{role.roleTitle}</span>
                {isSelected && (
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-ping" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. ROLE INTRO BANNER & ROADMAP.SH LEGEND (MATCHING IMAGE 2) */}
      <div className="glass-card rounded-3xl p-6 sm:p-7 space-y-6 border border-slate-200/80 dark:border-slate-800">
        {/* Accordion Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-100 dark:border-slate-800/80 pb-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                {activeRoleGraph.roleTitle}
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                {activeRoleGraph.category}
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {activeRoleGraph.description}
            </p>
            <p className="text-[11px] text-slate-500 italic">
              {activeRoleGraph.targetAudience}
            </p>
          </div>

          {/* ROADMAP.SH LEGEND BOX (EXACT VISUAL FROM IMAGE 2) */}
          <div className="p-4 rounded-2xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2.5 shrink-0 min-w-[240px]">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
              Legend / Key
            </span>
            <div className="space-y-2 text-xs font-semibold">
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-5 rounded bg-amber-400 border border-amber-500 flex items-center justify-center text-[9px] font-bold text-slate-950">
                  Topic
                </div>
                <span className="text-slate-700 dark:text-slate-300">Key topics to learn</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-5 rounded bg-slate-900 border border-slate-700 flex items-center justify-center text-[9px] font-bold text-white">
                  Proj
                </div>
                <span className="text-slate-700 dark:text-slate-300">Project ideas & checkpoints</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-5 rounded border-2 border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-[9px] font-bold text-emerald-600">
                  ✓
                </div>
                <span className="text-slate-700 dark:text-slate-300">Verified Completed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tracks Filter Bar */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-400 font-bold mr-1">Filter Tracks:</span>
          {activeRoleGraph.tracks.map(track => (
            <button
              key={track}
              onClick={() => setSelectedTrack(track)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                selectedTrack === track
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {track}
            </button>
          ))}
        </div>
      </div>

      {/* 3. VISUAL NODE GRAPH / FLOWCHART (MATCHING ROADMAP.SH TREE STRUCTURE) */}
      <div className="relative glass-card rounded-3xl p-6 sm:p-10 space-y-12 overflow-x-auto border-2 border-slate-200/80 dark:border-slate-800 bg-gradient-to-b from-white via-slate-50/50 to-white dark:from-slate-950 dark:via-slate-900/40 dark:to-slate-950">
        
        {/* Visual Root Marker */}
        <div className="text-center space-y-2">
          <div className="inline-block px-5 py-2 rounded-2xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-black text-sm uppercase tracking-wider shadow-md">
            Start {activeRoleGraph.roleTitle} Roadmap
          </div>
          <div className="w-0.5 h-8 bg-slate-300 dark:bg-slate-700 mx-auto" />
        </div>

        {/* Sections Sequence */}
        <div className="space-y-16 max-w-4xl mx-auto">
          {activeRoleGraph.sections.map((section, sIdx) => {
            return (
              <div key={section.id} className="relative space-y-6">
                {/* Section Title Pill */}
                <div className="flex items-center gap-3">
                  <div className="px-3.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300">
                    {section.title}
                  </div>
                  <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
                </div>

                {/* Topics Row (Yellow Boxes like roadmap.sh) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {section.nodes.map(node => {
                    const isDone = completedNodeIds[node.id];

                    return (
                      <div
                        key={node.id}
                        onClick={() => setInspectedNode(node)}
                        className={`group relative p-4 rounded-xl cursor-pointer transition-all duration-200 border-2 select-none flex flex-col justify-between ${
                          isDone
                            ? 'bg-amber-300 dark:bg-amber-400 text-slate-950 border-emerald-500 shadow-md ring-2 ring-emerald-500/30'
                            : 'bg-amber-400 hover:bg-amber-300 text-slate-950 border-amber-500 hover:border-slate-900 shadow-md hover:-translate-y-1'
                        }`}
                      >
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black uppercase tracking-wider bg-slate-950 text-white px-2 py-0.5 rounded">
                              {node.track}
                            </span>
                            <button
                              type="button"
                              onClick={(e) => toggleNodeCompletion(e, node.id)}
                              className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                                isDone 
                                  ? 'bg-emerald-600 text-white font-bold' 
                                  : 'bg-slate-950/20 hover:bg-slate-950/40 text-slate-900'
                              }`}
                              title={isDone ? "Completed" : "Mark as completed"}
                            >
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            </button>
                          </div>

                          <h4 className="font-extrabold text-sm text-slate-950 leading-tight">
                            {node.title}
                          </h4>
                          <p className="text-[11px] text-slate-800 line-clamp-2 leading-snug">
                            {node.description}
                          </p>
                        </div>

                        <div className="pt-2 mt-2 border-t border-slate-950/20 flex items-center justify-between text-[10px] font-bold text-slate-900">
                          <span>{node.duration || '2 Weeks'}</span>
                          <span className="text-slate-950 group-hover:underline">Click for Curriculum →</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Vertical Connector Down to Checkpoint */}
                <div className="flex flex-col items-center py-1">
                  <div className="w-0.5 h-6 bg-slate-400 dark:bg-slate-600" />
                  <ArrowDown className="w-4 h-4 text-slate-400 -mt-1" />
                </div>

                {/* Checkpoint Node (Dark/Black Box like roadmap.sh) */}
                {section.checkpoint && (
                  <div
                    onClick={() => setInspectedNode(section.checkpoint)}
                    className={`relative p-5 rounded-2xl cursor-pointer transition-all duration-300 border-2 select-none group max-w-2xl mx-auto ${
                      completedNodeIds[section.checkpoint.id]
                        ? 'bg-slate-900 text-white border-emerald-500 ring-2 ring-emerald-500/40 shadow-xl'
                        : 'bg-slate-900 hover:bg-slate-850 text-white border-slate-700 hover:border-amber-400 shadow-xl hover:-translate-y-0.5'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-amber-400 text-slate-950">
                            Practical Project
                          </span>
                          <h4 className="font-extrabold text-sm text-white group-hover:text-amber-300 transition-colors">
                            {section.checkpoint.title}
                          </h4>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {section.checkpoint.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={(e) => toggleNodeCompletion(e, section.checkpoint.id)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                            completedNodeIds[section.checkpoint.id]
                              ? 'bg-emerald-500 text-white'
                              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                          }`}
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>{completedNodeIds[section.checkpoint.id] ? 'Verified' : 'Verify'}</span>
                        </button>
                      </div>
                    </div>

                    {section.checkpoint.deliverable && (
                      <div className="pt-3 mt-3 border-t border-slate-800 flex flex-wrap gap-2">
                        {section.checkpoint.deliverable.map((del, dIdx) => (
                          <span 
                            key={dIdx}
                            className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-800 text-slate-300 border border-slate-700"
                          >
                            ✓ {del}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Section Separator */}
                {sIdx < activeRoleGraph.sections.length - 1 && (
                  <div className="flex flex-col items-center pt-2">
                    <div className="w-0.5 h-8 border-l-2 border-dashed border-slate-400 dark:border-slate-600" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Completion Milestone Finish Flag */}
        <div className="text-center pt-8 border-t border-slate-200 dark:border-slate-800 space-y-3">
          <div className="w-14 h-14 mx-auto rounded-3xl gradient-brand flex items-center justify-center text-white shadow-xl shadow-brand-500/30">
            <Award className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-black text-slate-900 dark:text-white">
            {activeRoleGraph.roleTitle} Capstone Ready!
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Completing all topic nodes and verified checkpoints qualifies you for job placement matching across verified tech industry partners.
          </p>
        </div>
      </div>

      {/* 4. MODAL / INSPECTION DRAWER FOR CLICKED TOPIC OR CHECKPOINT */}
      {inspectedNode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-xl rounded-3xl glass-panel shadow-2xl border border-amber-400/40 overflow-hidden flex flex-col max-h-[85vh]">
            {/* Modal Header */}
            <div className={`p-5 flex items-center justify-between ${
              inspectedNode.type === 'topic' ? 'bg-amber-400 text-slate-950' : 'bg-slate-900 text-white'
            }`}>
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-slate-950" />
                <div>
                  <h3 className="font-black text-base leading-tight">
                    {inspectedNode.title}
                  </h3>
                  <p className="text-[11px] opacity-80">
                    Track: {inspectedNode.track} • {inspectedNode.type === 'topic' ? 'Core Competency' : 'Practical Project'}
                  </p>
                </div>
              </div>

              <button 
                onClick={() => setInspectedNode(null)} 
                className="p-1 rounded-lg hover:bg-black/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-5 text-xs">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Description & Roadmap Context
                </span>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-xs">
                  {inspectedNode.description}
                </p>
              </div>

              {/* Courses if available */}
              {inspectedNode.courses && inspectedNode.courses.length > 0 && (
                <div className="space-y-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-brand-600" />
                    Recommended Accredited Courses & Modules
                  </span>
                  <div className="space-y-2">
                    {inspectedNode.courses.map((course, cIdx) => (
                      <div 
                        key={cIdx} 
                        className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center justify-between"
                      >
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white">{course.name}</p>
                          <p className="text-[10px] text-slate-500">{course.provider} • {course.duration}</p>
                        </div>
                        <a 
                          href={course.url} 
                          target="_blank" 
                          rel="noreferrer"
                          className="px-2.5 py-1 rounded-lg text-xs font-semibold text-brand-600 hover:underline flex items-center gap-1"
                        >
                          <span>Open</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tutorials */}
              {inspectedNode.tutorials && (
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5 text-purple-600" />
                    Recommended Deep Dive Tutorials
                  </span>
                  <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400">
                    {inspectedNode.tutorials.map((tut, tIdx) => (
                      <li key={tIdx}>{tut}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Deliverables if checkpoint */}
              {inspectedNode.deliverable && (
                <div className="space-y-2 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 block">
                    Proof of Work Checklist:
                  </span>
                  <div className="space-y-1.5">
                    {inspectedNode.deliverable.map((del, dIdx) => (
                      <div key={dIdx} className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{del}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons inside modal */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
                <button
                  onClick={(e) => {
                    toggleNodeCompletion(e, inspectedNode.id);
                    setInspectedNode(null);
                  }}
                  className={`flex-1 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 ${
                    completedNodeIds[inspectedNode.id]
                      ? 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      : 'gradient-brand text-white shadow-md'
                  }`}
                >
                  <Check className="w-4 h-4" />
                  <span>{completedNodeIds[inspectedNode.id] ? 'Mark Incomplete' : 'Mark as Completed'}</span>
                </button>

                <button
                  onClick={() => {
                    openAssessment(inspectedNode.title.split(' ')[0] || 'JavaScript');
                    setInspectedNode(null);
                  }}
                  className="px-4 py-2.5 rounded-xl border border-purple-200 dark:border-purple-800 text-xs font-bold text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-950/60 transition-colors flex items-center gap-1.5"
                >
                  <Award className="w-4 h-4" />
                  <span>Take Quiz</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. FLOATING AI TUTOR BAR (EXACT FEATURE SHOWN AT BOTTOM OF IMAGE 2) */}
      <div className="sticky bottom-4 z-30 max-w-md mx-auto">
        <div 
          onClick={toggleChat}
          className="p-3.5 rounded-2xl bg-slate-900 text-white border-2 border-amber-400 shadow-2xl flex items-center justify-between gap-3 cursor-pointer hover:scale-105 transition-all select-none"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-400 flex items-center justify-center text-slate-950 font-bold shadow">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold flex items-center gap-1.5">
                <span>AI Tutor for {activeRoleGraph.roleTitle}</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </p>
              <p className="text-[10px] text-slate-400">Have a question about this roadmap? Click here</p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-xl text-xs font-bold bg-amber-400 text-slate-950">
            Ask
          </span>
        </div>
      </div>
    </div>
  );
};
