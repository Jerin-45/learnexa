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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg rounded-3xl glass-panel shadow-2xl border border-purple-500/30 overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-5 gradient-brand flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-white" />
            <h3 className="font-extrabold text-base">Edit Student Profile & Career Goals</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/20 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-4 text-xs flex-1">
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs focus:ring-2 focus:ring-brand-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs focus:ring-2 focus:ring-brand-500 outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Education</label>
              <input
                type="text"
                value={education}
                onChange={e => setEducation(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs focus:ring-2 focus:ring-brand-500 outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Desired Career Goal</label>
              <select
                value={careerGoal}
                onChange={e => setGoal(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-semibold focus:ring-2 focus:ring-brand-500 outline-none"
              >
                {careers.map(c => (
                  <option key={c.id} value={c.id}>{c.title}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Experience Level</label>
              <select
                value={experienceLevel}
                onChange={e => setExperienceLevel(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-semibold focus:ring-2 focus:ring-brand-500 outline-none"
              >
                <option value="Beginner">Beginner / Student</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced / Professional</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Weekly Study Hours</label>
              <input
                type="number"
                min={2}
                max={60}
                value={weeklyHours}
                onChange={e => setWeeklyHours(Number(e.target.value))}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs focus:ring-2 focus:ring-brand-500 outline-none"
              />
            </div>
          </div>

          {/* Projects */}
          <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <label className="block font-semibold text-slate-700 dark:text-slate-300">Portfolio Projects</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. Distributed Key-Value Store"
                value={newProject}
                onChange={e => setNewProject(e.target.value)}
                className="flex-1 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs outline-none"
              />
              <button
                type="button"
                onClick={handleAddProject}
                className="px-3 py-1.5 rounded-xl bg-brand-600 text-white font-bold text-xs"
              >
                Add
              </button>
            </div>

            <div className="space-y-1.5 pt-1">
              {projects.map((proj, idx) => (
                <div key={idx} className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-between text-xs">
                  <span>{proj}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveProject(idx)}
                    className="text-slate-400 hover:text-red-500"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl font-bold text-xs gradient-brand text-white shadow-md hover:scale-[1.01] transition-all flex items-center justify-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              <span>Save & Recalculate Roadmap</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
