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

  const [selectedRoleId, setSelectedRoleId] = useState<string>(currentUser.careerGoal || 'full-stack-developer');
  const [selectedTrack, setSelectedTrack] = useState<string>('All Tracks');
  const [inspectedNode, setInspectedNode] = useState<RoadmapTopicNode | null>(null);

  const [completedNodeIds, setCompletedNodeIds] = useState<Record<string, boolean>>(() => {
    return {
      'node-html': true,
      'node-css': true,
      'chk-static-webpages': true,
      'node-python': true,
      'node-sql-adv': true,
      'node-networking': true,
      'node-figma': true
    };
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* 1. TOP HEADER & ROLE SELECTOR */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="badge-neutral font-mono">
                Curriculum Graph • roadmap.sh architecture
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
              Interactive Career Roadmaps
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
              Select any role below to view its visual node graph, prerequisite topics, and hands-on project checkpoints.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setCareerGoal(selectedRoleId);
                showNotification(`Set ${activeRoleGraph.roleTitle} as your active career focus!`);
              }}
              className="btn-primary"
            >
              <Target className="w-3.5 h-3.5" />
              <span>Set as My Career Goal</span>
            </button>

            <button
              onClick={handleExport}
              className="btn-secondary"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* ROLE TABS */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {Object.values(ROLE_ROADMAPS).map(role => {
            const isSelected = selectedRoleId === role.roleId;

            return (
              <button
                key={role.roleId}
                onClick={() => {
                  setSelectedRoleId(role.roleId);
                  setSelectedTrack('All Tracks');
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                  isSelected
                    ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-sm'
                    : 'bg-white dark:bg-[#121212] border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400'
                }`}
              >
                <span>{role.roleTitle}</span>
                {isSelected && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. ROLE INTRO BANNER & LEGEND */}
      <div className="panel rounded-2xl p-6 sm:p-7 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-neutral-100 dark:border-neutral-800 pb-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2.5">
              <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white">
                {activeRoleGraph.roleTitle}
              </h2>
              <span className="badge-neutral text-xs font-mono">
                {activeRoleGraph.category}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
              {activeRoleGraph.description}
            </p>
            <p className="text-[11px] font-mono text-neutral-400">
              {activeRoleGraph.targetAudience}
            </p>
          </div>

          {/* ROADMAP.SH LEGEND BOX */}
          <div className="p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40 space-y-2 shrink-0 min-w-[220px]">
            <span className="text-[10px] font-mono uppercase text-neutral-400 block font-semibold">
              Legend / Key
            </span>
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-5 h-4 rounded bg-amber-400 border border-amber-500 flex items-center justify-center text-[9px] font-bold text-neutral-950">
                  T
                </div>
                <span className="text-neutral-700 dark:text-neutral-300">Key topic to learn</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-4 rounded bg-neutral-900 dark:bg-neutral-800 border border-neutral-700 flex items-center justify-center text-[9px] font-bold text-white">
                  P
                </div>
                <span className="text-neutral-700 dark:text-neutral-300">Practical project checkpoint</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-4 rounded border-2 border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-[9px] font-bold text-emerald-600">
                  ✓
                </div>
                <span className="text-neutral-700 dark:text-neutral-300">Verified completed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tracks Filter Bar */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-neutral-400 text-xs mr-1 font-mono">Filter Track:</span>
          {activeRoleGraph.tracks.map(track => (
            <button
              key={track}
              onClick={() => setSelectedTrack(track)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                selectedTrack === track
                  ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-xs'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
              }`}
            >
              {track}
            </button>
          ))}
        </div>
      </div>

      {/* 3. VISUAL NODE GRAPH / FLOWCHART */}
      <div className="panel rounded-3xl p-6 sm:p-10 space-y-12 bg-white dark:bg-[#0E0E0E] relative min-h-[600px] border border-neutral-200 dark:border-neutral-800">
        
        {/* Sequence */}
        <div className="space-y-12 max-w-4xl mx-auto">
          {activeRoleGraph.sections.map((section) => {
            return (
              <div key={section.id} className="relative space-y-5">
                {/* Section Title Pill */}
                <div className="flex items-center gap-3">
                  <div className="px-3 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                    {section.title}
                  </div>
                  <div className="flex-1 h-px bg-neutral-200 dark:bg-neutral-800" />
                </div>

                {/* Topics Row (Yellow Boxes like roadmap.sh) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {section.nodes.map(node => {
                    const isDone = completedNodeIds[node.id];

                    return (
                      <div
                        key={node.id}
                        onClick={() => setInspectedNode(node)}
                        className={`group relative p-4 rounded-xl cursor-pointer transition-all duration-200 border-2 select-none flex flex-col justify-between ${
                          isDone
                            ? 'bg-amber-300 dark:bg-amber-400 text-neutral-950 border-emerald-500 shadow-sm'
                            : 'bg-amber-400 hover:bg-amber-300 text-neutral-950 border-amber-500 hover:border-neutral-900 shadow-sm hover:-translate-y-0.5'
                        }`}
                      >
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] font-mono font-bold uppercase tracking-wider bg-neutral-950 text-white px-1.5 py-0.5 rounded">
                              {node.track}
                            </span>
                            <button
                              type="button"
                              onClick={(e) => toggleNodeCompletion(e, node.id)}
                              className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${
                                isDone 
                                  ? 'bg-emerald-600 text-white font-bold' 
                                  : 'bg-neutral-950/20 hover:bg-neutral-950/40 text-neutral-900'
                              }`}
                              title={isDone ? "Completed" : "Mark as completed"}
                            >
                              <Check className="w-3 h-3 stroke-[3]" />
                            </button>
                          </div>

                          <h4 className="font-bold text-xs text-neutral-950 leading-tight">
                            {node.title}
                          </h4>
                          <p className="text-[11px] text-neutral-800 line-clamp-2 leading-snug">
                            {node.description}
                          </p>
                        </div>

                        <div className="pt-2 mt-2 border-t border-neutral-950/20 flex items-center justify-between text-[10px] font-bold text-neutral-900">
                          <span>{node.duration || '2 Weeks'}</span>
                          <span className="group-hover:underline">Inspect Details →</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Vertical Connector Down to Checkpoint */}
                <div className="flex flex-col items-center py-0.5">
                  <div className="w-0.5 h-5 bg-neutral-300 dark:bg-neutral-700" />
                  <ArrowDown className="w-3.5 h-3.5 text-neutral-400 -mt-1" />
                </div>

                {/* Checkpoint Node (Dark Box like roadmap.sh) */}
                {section.checkpoint && (
                  <div
                    onClick={() => setInspectedNode(section.checkpoint)}
                    className={`relative p-4 rounded-xl cursor-pointer transition-all duration-200 border-2 select-none group max-w-2xl mx-auto ${
                      completedNodeIds[section.checkpoint.id]
                        ? 'bg-neutral-950 text-white border-emerald-500 shadow-md'
                        : 'bg-neutral-900 hover:bg-neutral-850 text-white border-neutral-700 hover:border-amber-400 shadow-md hover:-translate-y-0.5'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-mono uppercase font-bold bg-amber-400 text-neutral-950">
                            Practical Project
                          </span>
                          <h4 className="font-bold text-xs text-white group-hover:text-amber-300 transition-colors">
                            {section.checkpoint.title}
                          </h4>
                        </div>
                        <p className="text-[11px] text-neutral-300 line-clamp-1">
                          {section.checkpoint.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={(e) => toggleNodeCompletion(e, section.checkpoint!.id)}
                          className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-all ${
                            completedNodeIds[section.checkpoint.id]
                              ? 'bg-emerald-600 text-white'
                              : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700'
                          }`}
                        >
                          {completedNodeIds[section.checkpoint.id] ? '✓ Done' : 'Mark Finished'}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Milestone Capstone Banner */}
        <div className="pt-8 text-center space-y-3 max-w-md mx-auto border-t border-neutral-200 dark:border-neutral-800">
          <div className="w-10 h-10 mx-auto rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-neutral-900 dark:text-white">
            {activeRoleGraph.roleTitle} Capstone Ready
          </h3>
          <p className="text-xs text-neutral-500">
            Completing all topic nodes and verified checkpoints qualifies you for job placement matching across verified tech partners.
          </p>
        </div>
      </div>

      {/* 4. MODAL / INSPECTION DRAWER */}
      {inspectedNode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-xl rounded-2xl panel shadow-modal dark:shadow-modal-dark overflow-hidden flex flex-col max-h-[85vh]">
            {/* Modal Header */}
            <div className={`p-4 flex items-center justify-between ${
              inspectedNode.type === 'topic' ? 'bg-amber-400 text-neutral-950' : 'bg-neutral-900 text-white'
            }`}>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-950" />
                <div>
                  <h3 className="font-bold text-sm leading-tight">
                    {inspectedNode.title}
                  </h3>
                  <p className="text-[10px] font-mono opacity-80">
                    Track: {inspectedNode.track} • {inspectedNode.type === 'topic' ? 'Core Competency' : 'Practical Project'}
                  </p>
                </div>
              </div>

              <button 
                onClick={() => setInspectedNode(null)} 
                className="p-1 rounded hover:bg-black/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-4 text-xs">
              <div>
                <span className="text-[10px] font-mono uppercase text-neutral-400 block mb-1">
                  Description & Context
                </span>
                <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed text-xs">
                  {inspectedNode.description}
                </p>
              </div>

              {/* Courses if available */}
              {inspectedNode.courses && inspectedNode.courses.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase text-neutral-400 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-neutral-600" />
                    Recommended Courses & Modules
                  </span>
                  <div className="space-y-1.5">
                    {inspectedNode.courses.map((course, cIdx) => (
                      <div 
                        key={cIdx} 
                        className="p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 flex items-center justify-between"
                      >
                        <div>
                          <p className="font-semibold text-neutral-900 dark:text-white">{course.name}</p>
                          <p className="text-[10px] text-neutral-400">{course.provider} • {course.duration}</p>
                        </div>
                        <a 
                          href={course.url} 
                          target="_blank" 
                          rel="noreferrer"
                          className="btn-secondary px-2.5 py-1 text-xs"
                        >
                          <span>Open</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Deliverables if checkpoint */}
              {inspectedNode.deliverable && (
                <div className="space-y-2 p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800">
                  <span className="text-[10px] font-mono uppercase text-neutral-500 block">
                    Proof of Work Checklist:
                  </span>
                  <div className="space-y-1">
                    {inspectedNode.deliverable.map((del, dIdx) => (
                      <div key={dIdx} className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{del}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-neutral-100 dark:border-neutral-800">
                <button
                  type="button"
                  onClick={() => {
                    toggleNodeCompletion({ stopPropagation: () => {} } as any, inspectedNode.id);
                    setInspectedNode(null);
                  }}
                  className="btn-primary"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Toggle Completion Status</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating AI Tutor Bar */}
      <div className="fixed bottom-6 right-6 z-40 hidden sm:block">
        <div 
          onClick={toggleChat}
          className="px-4 py-2.5 rounded-full bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 border border-neutral-700 dark:border-neutral-300 shadow-modal cursor-pointer hover:scale-105 transition-all flex items-center gap-2.5 text-xs font-semibold"
        >
          <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Bot className="w-3.5 h-3.5" />
          </div>
          <span>AI Tutor: Have a question about this roadmap?</span>
        </div>
      </div>

    </div>
  );
};
