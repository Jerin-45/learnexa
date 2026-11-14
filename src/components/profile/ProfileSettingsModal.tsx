import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  User, 
  Mail, 
  GraduationCap, 
  Clock, 
  Compass, 
  FolderGit2, 
  Plus, 
  Trash2, 
  Save, 
  Sparkles 
} from 'lucide-react';

interface ProfileSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileSettingsModal: React.FC<ProfileSettingsModalProps> = ({ isOpen, onClose }) => {
  const { currentUser, updateCurrentUser, careers, setCareerGoal } = useApp();

  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [education, setEducation] = useState(currentUser.education);
  const [careerGoal, setGoal] = useState(currentUser.careerGoal);
  const [experienceLevel, setExperienceLevel] = useState(currentUser.experienceLevel);
  const [weeklyHours, setWeeklyHours] = useState(currentUser.weeklyHours);
  const [newProject, setNewProject] = useState('');
  const [projects, setProjects] = useState<string[]>(currentUser.projects);

  if (!isOpen) return null;

  const handleAddProject = () => {
    if (!newProject.trim()) return;
    setProjects(prev => [...prev, newProject.trim()]);
    setNewProject('');
  };

  const handleRemoveProject = (index: number) => {
    setProjects(prev => prev.filter((_, i) => i !== index));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateCurrentUser({
      name,
      email,
      education,
      careerGoal,
      experienceLevel,
      weeklyHours: Number(weeklyHours),
      projects
    });
    if (careerGoal !== currentUser.careerGoal) {
      setCareerGoal(careerGoal);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg rounded-2xl panel shadow-modal dark:shadow-modal-dark overflow-hidden flex flex-col max-h-[88vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between shrink-0 bg-neutral-50/50 dark:bg-neutral-900/40">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-neutral-900 dark:text-white leading-tight">
                Profile & Career Goal Settings
              </h3>
              <p className="text-[11px] text-neutral-500 font-mono">
                Update account parameters, target velocity, and project portfolio
              </p>
            </div>
          </div>

          <button 
            onClick={onClose} 
            className="p-1 rounded text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-4 text-xs flex-1">
          <div>
            <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="input-field"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                Academic Background
              </label>
              <input
                type="text"
                value={education}
                onChange={e => setEducation(e.target.value)}
                className="input-field"
              />
            </div>

            <div>
              <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                Target Role
              </label>
              <select
                value={careerGoal}
                onChange={e => setGoal(e.target.value)}
                className="input-field font-medium"
              >
                {careers.map(c => (
                  <option key={c.id} value={c.id}>{c.title}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                Experience Tier
              </label>
              <select
                value={experienceLevel}
                onChange={e => setExperienceLevel(e.target.value)}
                className="input-field font-medium"
              >
                <option value="Beginner">Beginner (0-1 yrs)</option>
                <option value="Intermediate">Intermediate (1-3 yrs)</option>
                <option value="Advanced">Advanced (3+ yrs)</option>
              </select>
            </div>

            <div>
              <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                Weekly Study Commitment
              </label>
              <input
                type="number"
                min={2}
                max={60}
                value={weeklyHours}
                onChange={e => setWeeklyHours(Number(e.target.value))}
                className="input-field font-mono"
              />
            </div>
          </div>

          {/* Project Portfolio */}
          <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 space-y-2">
            <label className="block font-medium text-neutral-700 dark:text-neutral-300">
              Proof-of-Work Projects
            </label>
            <div className="space-y-1.5">
              {projects.map((proj, idx) => (
                <div key={idx} className="p-2 rounded-lg border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30 flex items-center justify-between text-xs">
                  <span className="text-neutral-800 dark:text-neutral-200">{proj}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveProject(idx)}
                    className="p-1 text-neutral-400 hover:text-rose-600 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 mt-2">
              <input
                type="text"
                placeholder="e.g. Distributed Task Queue in Go"
                value={newProject}
                onChange={e => setNewProject(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAddProject(); }}}
                className="input-field"
              />
              <button
                type="button"
                onClick={handleAddProject}
                className="btn-secondary px-3 py-2 text-xs"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="btn-ghost"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Profile Parameters</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
