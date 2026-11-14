import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, 
  Wand2, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  AlertTriangle, 
  Award, 
  Layers, 
  Zap, 
  Cpu, 
  FileText, 
  FolderGit2, 
  ArrowRight,
  TrendingUp,
  BrainCircuit,
  Check,
  AlertCircle
} from 'lucide-react';
import { ProficiencyLevel } from '../../types';

export const SkillAnalysis: React.FC = () => {
  const { 
    currentUser, 
    currentCareer, 
    addSkill, 
    removeSkill, 
    runCollaboration, 
    isAnalyzing, 
    agentData, 
    setActiveTab, 
    openAssessment 
  } = useApp();

  // Input states for adding new skill
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState<ProficiencyLevel>('Intermediate');
  const [newSkillYears, setNewSkillYears] = useState(1);

  // Suggested popular skills chips
  const popularSkills = [
    "JavaScript", "TypeScript", "React.js", "Node.js", "Python", 
    "SQL / PostgreSQL", "Docker", "Git & GitHub", "Tailwind CSS", "REST APIs", 
    "Figma", "AWS", "PyTorch", "Linux"
  ];

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;
    addSkill({
      name: newSkillName.trim(),
      level: newSkillLevel,
      years: Number(newSkillYears),
      verified: false
    });
    setNewSkillName('');
  };

  const handleQuickAdd = (skillName: string) => {
    addSkill({
      name: skillName,
      level: 'Intermediate',
      years: 1,
      verified: false
    });
  };

  const matchPercentage = agentData?.careerMatch?.matchPercentage ?? 65;
  const gapPercentage = agentData?.careerMatch?.gapPercentage ?? (100 - matchPercentage);
  const matchedSkills = agentData?.careerMatch?.matchedSkills ?? [];
  const missingSkills = agentData?.careerMatch?.missingSkills ?? [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="badge-neutral font-mono">
              Diagnostic • Skill Analysis Engine
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
            AI Skill Gap Diagnostics & Profiling
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1">
            Audit your competencies against benchmark criteria for{' '}
            <span className="font-semibold text-neutral-900 dark:text-white">{currentCareer.title}</span>.
          </p>
        </div>

        <button
          onClick={() => runCollaboration()}
          disabled={isAnalyzing}
          className="btn-primary"
        >
          {isAnalyzing ? (
            <>
              <Wand2 className="w-3.5 h-3.5 animate-spin" />
              <span>Auditing Competency Graph...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5" />
              <span>Run Live AI Skill Diagnostic</span>
            </>
          )}
        </button>
      </div>

      {/* Top 3 Diagnostic Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Gap Percentage Meter */}
        <div className="panel rounded-xl p-5 flex flex-col justify-between space-y-3">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
              Skill Gap Diagnostic
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-bold font-mono text-neutral-900 dark:text-white">
                {gapPercentage}%
              </span>
              <span className="badge-warning text-[10px]">
                Skill Gaps Remaining
              </span>
            </div>
            <p className="text-xs text-neutral-500 mt-1">
              You possess {matchPercentage}% of verified core competencies.
            </p>
          </div>

          <div className="w-full bg-neutral-100 dark:bg-neutral-800 h-2 rounded-full overflow-hidden flex">
            <div 
              className="bg-neutral-900 dark:bg-white h-full transition-all duration-500"
              style={{ width: `${matchPercentage}%` }}
              title={`Matched: ${matchPercentage}%`}
            />
            <div 
              className="bg-amber-400 h-full transition-all duration-500"
              style={{ width: `${gapPercentage}%` }}
              title={`Missing: ${gapPercentage}%`}
            />
          </div>
        </div>

        {/* Verified Strengths */}
        <div className="panel rounded-xl p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-semibold">
              Verified Strengths
            </span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-3xl font-bold font-mono text-neutral-900 dark:text-white">
            {currentUser.skills.length}
          </p>
          <p className="text-xs text-neutral-500">
            Validated working proficiencies in modern engineering standards and tools.
          </p>
        </div>

        {/* Priority Missing Skills */}
        <div className="panel rounded-xl p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400 font-semibold">
              Identified Roadblocks
            </span>
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-3xl font-bold font-mono text-neutral-900 dark:text-white">
            {missingSkills.length}
          </p>
          <p className="text-xs text-neutral-500">
            Required technologies blocking full qualification for {currentCareer.title}.
          </p>
        </div>

      </div>

      {/* Main Section: Skill Intake Form + Current vs Missing Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (5 Cols): Add New Skills & Profile Details */}
        <div className="lg:col-span-5 space-y-6">
          <div className="panel rounded-2xl p-6 space-y-5">
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-white flex items-center gap-2">
              <Plus className="w-4 h-4 text-neutral-500" />
              <span>Add Skill to Your Profile</span>
            </h3>

            <form onSubmit={handleAddSkill} className="space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Skill / Technology Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. React.js, Docker, Python..."
                  value={newSkillName}
                  onChange={e => setNewSkillName(e.target.value)}
                  className="input-field"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                    Proficiency
                  </label>
                  <select
                    value={newSkillLevel}
                    onChange={e => setNewSkillLevel(e.target.value as ProficiencyLevel)}
                    className="input-field font-medium"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                    Experience
                  </label>
                  <select
                    value={newSkillYears}
                    onChange={e => setNewSkillYears(Number(e.target.value))}
                    className="input-field font-medium"
                  >
                    <option value={0.5}>&lt; 1 Year</option>
                    <option value={1}>1-2 Years</option>
                    <option value={3}>3+ Years</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="btn-primary w-full py-2.5 text-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Skill & Recalculate Gaps</span>
              </button>
            </form>

            {/* Quick Add Suggestions */}
            <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 space-y-2">
              <span className="text-[10px] font-mono uppercase text-neutral-400">
                Popular Quick Adds
              </span>
              <div className="flex flex-wrap gap-1.5">
                {popularSkills.map(s => {
                  const alreadyHas = currentUser.skills.some(cs => cs.name.toLowerCase() === s.toLowerCase());
                  if (alreadyHas) return null;
                  return (
                    <button
                      key={s}
                      onClick={() => handleQuickAdd(s)}
                      className="px-2 py-1 rounded-md text-[11px] font-medium bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 transition-colors flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3 text-neutral-400" />
                      <span>{s}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Education & Projects Card */}
          <div className="panel rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-white flex items-center gap-2">
              <FolderGit2 className="w-4 h-4 text-neutral-500" />
              <span>Background & Declared Projects</span>
            </h3>

            <div className="space-y-2.5 text-xs">
              <div>
                <span className="text-neutral-400">Education: </span>
                <span className="font-semibold text-neutral-800 dark:text-neutral-200">{currentUser.education}</span>
              </div>
              <div>
                <span className="text-neutral-400">Experience Tier: </span>
                <span className="font-semibold text-neutral-800 dark:text-neutral-200">{currentUser.experienceLevel}</span>
              </div>
              <div className="space-y-1.5 pt-1">
                <span className="text-neutral-400">Portfolio Projects:</span>
                {currentUser.projects.map((p, idx) => (
                  <div key={idx} className="p-2 rounded-lg bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200/60 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 dark:bg-white" />
                    <span>{p}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (7 Cols): Current Skills vs Missing Requirements */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Active Skills in Profile */}
          <div className="panel rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-3">
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Your Current Skills ({currentUser.skills.length})</span>
              </h3>
              <span className="text-[10px] font-mono text-neutral-400">Take quiz to verify</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentUser.skills.map((skill, idx) => (
                <div 
                  key={idx}
                  className="p-3.5 rounded-xl border border-neutral-200/70 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30 flex items-center justify-between gap-3"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <p className="text-xs font-semibold text-neutral-900 dark:text-white">
                        {skill.name}
                      </p>
                      {skill.verified && (
                        <span className="badge-success text-[9px] py-0">
                          Verified
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-neutral-500 font-mono">
                      <span>{skill.level}</span>
                      <span>• {skill.years || 1}y</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openAssessment(skill.name)}
                      className="p-1.5 rounded-lg text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                      title={`Take ${skill.name} Assessment`}
                    >
                      <Award className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => removeSkill(skill.name)}
                      className="p-1.5 rounded-lg text-neutral-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                      title="Remove Skill"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Missing Skills & Recommendations */}
          <div className="panel rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-3">
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-white flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-500" />
                <span>Target Role Skill Gaps ({missingSkills.length})</span>
              </h3>
              <button
                onClick={() => setActiveTab('roadmap')}
                className="btn-ghost text-xs"
              >
                <span>View Full Roadmap →</span>
              </button>
            </div>

            <div className="space-y-2.5">
              {missingSkills.map((missing: any, idx: number) => (
                <div 
                  key={idx}
                  className="p-3.5 rounded-xl border border-neutral-200/70 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30 flex items-center justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-semibold text-neutral-900 dark:text-white">
                        {missing.name}
                      </p>
                      <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-medium ${
                        missing.importance === 'Essential'
                          ? 'badge-danger'
                          : 'badge-neutral'
                      }`}>
                        {missing.importance}
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-500 mt-0.5">
                      Curated tutorials and milestone projects available in roadmap
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      addSkill({
                        name: missing.name,
                        level: 'Beginner',
                        years: 0.5,
                        verified: false
                      });
                    }}
                    className="btn-secondary px-2.5 py-1 text-[11px]"
                    title="Mark as started"
                  >
                    <span>Add to Profile</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
