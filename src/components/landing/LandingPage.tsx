import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, 
  ArrowRight, 
  Cpu, 
  Compass, 
  GitFork, 
  BarChart3, 
  CheckCircle2, 
  Zap, 
  Bot, 
  Award, 
  GraduationCap, 
  TrendingUp, 
  ShieldCheck, 
  Play, 
  Star
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setActiveTab, careers, setCareerGoal } = useApp();

  const features = [
    {
      icon: Cpu,
      title: "AI Skill Analysis",
      color: "from-blue-500 to-indigo-600",
      description: "Our autonomous Skill Analysis Agent evaluates your existing abilities, coursework, and projects to pinpoint your true proficiency level and uncover hidden gaps."
    },
    {
      icon: Compass,
      title: "Career Matching",
      color: "from-indigo-500 to-purple-600",
      description: "Match your current profile against live tech industry benchmarks for Full Stack Developers, AI Engineers, Data Scientists, and Cybersecurity specialists."
    },
    {
      icon: GitFork,
      title: "Personalized Roadmap",
      color: "from-purple-500 to-pink-600",
      description: "No generic video playlists. Get a sequential milestone roadmap with curated free courses, interactive tutorials, and practical portfolio projects."
    },
    {
      icon: BarChart3,
      title: "Progress & Adaptive Velocity",
      color: "from-emerald-500 to-teal-600",
      description: "Real-time assessments and weekly study hour tracking feed into our Progress Evaluation Agent to dynamically tune your roadmap difficulty."
    }
  ];

  const stats = [
    { label: "Placement Alignment", value: "94.8%" },
    { label: "Verified Core Skills", value: "14,500+" },
    { label: "Autonomous AI Agents", value: "4 Multi-Agent Mesh" },
    { label: "Average Acceleration", value: "2.4x Faster" }
  ];

  const testimonials = [
    {
      name: "Marcus Vance",
      role: "Junior Full Stack Engineer @ Stripe",
      quote: "SkillPath AI cut through the noise of 50-hour video tutorials. The 4 agents mapped my React gaps and guided me straight to a portfolio project that got me hired.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    {
      name: "Elena Rostova",
      role: "AI Research Assistant @ Berkeley",
      quote: "The adaptive roadmap updated automatically when I aced the Python and PyTorch assessments. The AI Mentor answers questions with actual project context!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80"
    },
    {
      name: "Priya Sharma",
      role: "Cybersecurity Analyst @ CrowdStrike",
      quote: "As a self-taught student, I didn't know what I was missing. SkillPath's skill gap breakdown pinpointed network protocol auditing immediately.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
    }
  ];

  return (
    <div className="space-y-24 pb-20 overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-12 pb-16 lg:pt-20 lg:pb-24">
        {/* Glow ambient background effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-brand-500/20 via-purple-500/20 to-pink-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-5xl mx-auto px-4 text-center space-y-8">
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-200 dark:border-purple-800/80 bg-white/70 dark:bg-purple-950/40 shadow-sm animate-pulse-slow">
            <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span className="text-xs font-bold text-slate-800 dark:text-purple-200">
              Next-Gen Autonomous Career Architecture
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
            <span className="text-xs text-brand-600 dark:text-brand-400 font-semibold">
              4-Agent Mesh
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
            Discover Your Skills.{' '}
            <span className="gradient-text block mt-2 sm:inline">
              Build Your Future.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-base sm:text-xl text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
            Stop guessing what to learn next. SkillPath AI deploys a collaborative 4-agent AI system that diagnoses your skill gaps, compares them with live tech market demands, and builds your personalized, adaptive learning roadmap.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => setActiveTab('dashboard')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-base gradient-brand shadow-xl shadow-brand-500/30 hover:shadow-brand-500/50 hover:scale-[1.02] transition-all flex items-center justify-center gap-2.5 group"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => setActiveTab('agents')}
              className="w-full sm:w-auto px-7 py-4 rounded-2xl font-bold text-base border border-slate-300 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 transition-all flex items-center justify-center gap-2"
            >
              <Bot className="w-5 h-5 text-purple-500" />
              <span>Explore 4 AI Agents</span>
            </button>
          </div>

          {/* Quick trust metrics */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 dark:text-slate-400 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> No credit card required
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Instant Hackathon Demo Mode
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Supabase & REST Ready
            </span>
          </div>
        </div>
      </section>

      {/* Live Interactive Hero Preview / Hackathon Teaser */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="rounded-3xl p-1 bg-gradient-to-r from-brand-500 via-indigo-500 to-purple-600 shadow-2xl">
          <div className="rounded-[22px] bg-slate-900 text-white p-6 sm:p-10 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-400">
                    Live Autonomous Multi-Agent Orchestration
                  </span>
                </div>
                <h3 className="text-2xl font-bold mt-1">
                  Watch 4 AI Agents Calibrate Your Career in Seconds
                </h3>
              </div>
              <button
                onClick={() => setActiveTab('agents')}
                className="px-5 py-2.5 rounded-xl bg-purple-600/30 border border-purple-500 text-purple-300 font-bold text-xs hover:bg-purple-600/50 transition-all flex items-center gap-2 self-start sm:self-auto"
              >
                <span>Launch Agent Visualizer</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Agent collaboration steps mock */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-2">
                <div className="flex items-center justify-between text-xs text-purple-400 font-semibold">
                  <span>Agent 1</span>
                  <span className="px-1.5 py-0.5 rounded bg-purple-950 text-[10px] text-purple-300">Auditor</span>
                </div>
                <p className="font-bold text-sm">Skill Analysis Agent</p>
                <p className="text-xs text-slate-400">Audits skills, calculates strengths & tests verified proficiencies.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-2">
                <div className="flex items-center justify-between text-xs text-blue-400 font-semibold">
                  <span>Agent 2</span>
                  <span className="px-1.5 py-0.5 rounded bg-blue-950 text-[10px] text-blue-300">Strategist</span>
                </div>
                <p className="font-bold text-sm">Career Guidance Agent</p>
                <p className="text-xs text-slate-400">Compares skills against live job market & quantifies gap percentage.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-2">
                <div className="flex items-center justify-between text-xs text-emerald-400 font-semibold">
                  <span>Agent 3</span>
                  <span className="px-1.5 py-0.5 rounded bg-emerald-950 text-[10px] text-emerald-300">Architect</span>
                </div>
                <p className="font-bold text-sm">Learning Recommendation</p>
                <p className="text-xs text-slate-400">Curates best courses, hands-on projects & milestone checklists.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-2">
                <div className="flex items-center justify-between text-xs text-amber-400 font-semibold">
                  <span>Agent 4</span>
                  <span className="px-1.5 py-0.5 rounded bg-amber-950 text-[10px] text-amber-300">Evaluator</span>
                </div>
                <p className="font-bold text-sm">Progress Evaluation Agent</p>
                <p className="text-xs text-slate-400">Adapts roadmap difficulty dynamically based on real test scores.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
            Intelligent Architecture
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Designed for Serious Career Growth
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Everything you need to audit skills, master missing requirements, and build verified credibility.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div 
                key={idx}
                className="glass-card glass-card-hover rounded-3xl p-8 space-y-5 relative overflow-hidden"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white shadow-lg`}>
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* In-Demand Career Explorer Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-purple-600 dark:text-purple-400">
              Target Career Goals
            </h2>
            <p className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              Select Your Ideal Career Track
            </p>
          </div>
          <button
            onClick={() => setActiveTab('careers')}
            className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
          >
            <span>View Full Market Requirements</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {careers.slice(0, 3).map(c => (
            <div 
              key={c.id} 
              className="glass-card rounded-2xl p-6 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {c.category}
                  </span>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    {c.growthRate}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                  {c.title}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                  {c.description}
                </p>
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                  <span className="text-slate-400">Average Salary: </span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{c.avgSalary}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setCareerGoal(c.id);
                  setActiveTab('roadmap');
                }}
                className="w-full py-2.5 rounded-xl text-xs font-bold bg-brand-50 hover:bg-brand-100 dark:bg-brand-950/60 dark:hover:bg-brand-900/60 text-brand-700 dark:text-brand-300 transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Generate {c.title} Roadmap</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Metrics Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl gradient-brand-subtle border border-slate-200/80 dark:border-slate-800/80 p-8 sm:p-12 shadow-sm">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((s, idx) => (
              <div key={idx} className="space-y-1">
                <p className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
                  {s.value}
                </p>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Student Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
            Student Success Stories
          </h2>
          <p className="text-3xl font-extrabold text-slate-900 dark:text-white">
            From Learner to Hired Engineer
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div key={idx} className="glass-card rounded-2xl p-6 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 italic leading-relaxed">
                  "{t.quote}"
                </p>
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <div className="w-9 h-9 rounded-full gradient-brand flex items-center justify-center font-bold text-xs text-white">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">{t.name}</p>
                  <p className="text-[11px] text-slate-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="max-w-5xl mx-auto px-4 text-center">
        <div className="rounded-3xl gradient-brand p-8 sm:p-14 shadow-2xl space-y-6 text-white relative overflow-hidden">
          <div className="relative z-10 space-y-4 max-w-xl mx-auto">
            <h3 className="text-3xl sm:text-4xl font-extrabold">
              Ready to Discover Your Skill Gaps?
            </h3>
            <p className="text-sm sm:text-base text-brand-100 font-normal">
              Join thousands of students and career pivoters building verified skills with personalized AI roadmaps today.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setActiveTab('dashboard')}
                className="px-8 py-4 rounded-2xl bg-white text-slate-900 font-extrabold text-sm shadow-xl hover:bg-slate-100 hover:scale-105 transition-all"
              >
                Launch Student Dashboard
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
