import React, { useState } from 'react';
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
  Star,
  Target,
  Eye,
  Rocket,
  Check,
  Lock,
  Mail,
  User,
  BookOpen,
  Code2,
  Users,
  Briefcase,
  Layers,
  Clock,
  Calendar,
  Search,
  Plus,
  ChevronRight,
  ExternalLink,
  Shield,
  Palette
} from 'lucide-react';

interface LandingPageProps {
  onOpenAuth?: (mode?: 'login' | 'signup' | 'forgot', defaultEmail?: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onOpenAuth }) => {
  const { 
    setActiveTab, 
    careers, 
    setCareerGoal, 
    updateCurrentUser, 
    switchProfile, 
    showNotification,
    isAuthenticated,
    navigateWithAuth
  } = useApp();

  const [heroEmail, setHeroEmail] = useState('');

  const handleHeroEnroll = (e: React.FormEvent) => {
    e.preventDefault();
    if (!heroEmail.trim()) return;
    if (isAuthenticated) {
      setActiveTab('dashboard');
    } else if (onOpenAuth) {
      onOpenAuth('signup', heroEmail.trim());
    } else {
      navigateWithAuth('dashboard');
    }
  };

  const features = [
    {
      icon: Cpu,
      title: "AI Skill Analysis",
      description: "Our autonomous Skill Analysis Agent evaluates your existing competencies, projects, and coursework to pinpoint true proficiency and identify roadblocks."
    },
    {
      icon: Compass,
      title: "Career Matching",
      description: "Match your current profile against live technology industry benchmarks for Full Stack Developers, AI Engineers, Data Scientists, and Cybersecurity Analysts."
    },
    {
      icon: GitFork,
      title: "Personalized Roadmap",
      description: "No generic video playlists. Receive a sequential milestone curriculum with curated free courses, interactive tutorials, and verified portfolio projects."
    },
    {
      icon: BarChart3,
      title: "Adaptive Velocity & Tracking",
      description: "Real-time assessments and weekly study pace feed into our Progress Evaluation Agent to dynamically tune your roadmap difficulty."
    }
  ];

  const visionPillars = [
    {
      badge: "OUR VISION",
      title: "Democratize Career Intelligence",
      subtitle: "Break Free from Tutorial Hell",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=80",
      description: "Millions of students spend hundreds of hours watching generic tutorials without knowing if they possess the skills companies actually evaluate. Learnexa provides an autonomous AI mentor that diagnoses exact skill gaps with verified clarity.",
      metric: "94.8% Placement Success Rate",
      highlight: "Calibrated to Your Actual Knowledge"
    },
    {
      badge: "OUR GOAL",
      title: "Production Proof-of-Work",
      subtitle: "Real GitHub-Ready Deliverables",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80",
      description: "Shift from passive video watching to shipping software. Every milestone culminates in a hands-on project deliverable—from interactive full stack applications to AI model microservices and security audits.",
      metric: "7-Stage Milestone Architecture",
      highlight: "Verifiable Portfolios, Not Just Certificates"
    },
    {
      badge: "OUR GOAL",
      title: "Industry Market Calibration",
      subtitle: "Aligned with In-Demand Roles",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80",
      description: "Benchmark candidate skills against real-world engineering standards for Full Stack Developers, AI Engineers, Data Scientists, and Security Analysts so you graduate interview-ready.",
      metric: "2.4x Learning Acceleration",
      highlight: "Continuously Calibrated with Hiring Criteria"
    }
  ];

  const stats = [
    { label: "Placement Alignment", value: "94.8%" },
    { label: "Verified Core Skills", value: "14,500+" },
    { label: "Autonomous AI Agents", value: "4-Agent Mesh" },
    { label: "Learning Acceleration", value: "2.4x Faster" }
  ];

  const testimonials = [
    {
      name: "Marcus Vance",
      role: "Junior Full Stack Engineer @ Stripe",
      quote: "Learnexa cut through the noise of 50-hour video playlists. The 4 agents mapped my exact React gaps and guided me straight to a portfolio project that got me hired.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    {
      name: "Elena Rostova",
      role: "AI Research Assistant @ Berkeley",
      quote: "The adaptive roadmap updated automatically when I aced the Python and PyTorch assessments. The AI Mentor answers questions with actual project context.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80"
    },
    {
      name: "Priya Sharma",
      role: "Cybersecurity Analyst @ CrowdStrike",
      quote: "As a self-taught student, I didn't know what I was missing. Learnexa's skill gap breakdown pinpointed network protocol auditing immediately.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
    }
  ];

  return (
    <div className="space-y-24 pb-20 overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-16 pb-12 lg:pt-28 lg:pb-20 text-center">
        {/* Subtle ambient lighting */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-neutral-200/40 dark:bg-neutral-800/20 blur-[140px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-3xl mx-auto px-4 space-y-6 animate-fade-in">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/60 backdrop-blur-sm text-xs font-medium text-neutral-700 dark:text-neutral-300 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Autonomous Career Intelligence v2.4</span>
          </div>

          {/* Centered Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-[1.1]">
            Unlock your potential with{' '}
            <span className="text-neutral-950 dark:text-neutral-100 underline decoration-neutral-300 dark:decoration-neutral-700 decoration-wavy decoration-1 underline-offset-8">
              AI-Powered learning
            </span>
          </h1>

          {/* Centered Subtitle */}
          <p className="max-w-xl mx-auto text-sm sm:text-base text-neutral-500 leading-relaxed font-normal">
            Personalised milestone roadmaps, automated skill gap audits, and expert-driven insights to help you master verified engineering skills.
          </p>

          {/* Centered Pill Email Input Bar */}
          <form 
            onSubmit={handleHeroEnroll}
            className="max-w-md mx-auto p-1.5 rounded-full bg-white dark:bg-[#121212] border border-neutral-200 dark:border-neutral-800 shadow-elevated dark:shadow-elevated-dark flex items-center justify-between transition-all focus-within:border-neutral-400 dark:focus-within:border-neutral-600"
          >
            <input 
              type="email"
              placeholder="Personal or student email"
              value={heroEmail}
              onChange={e => setHeroEmail(e.target.value)}
              className="px-4 py-2 bg-transparent text-xs sm:text-sm text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none flex-1"
              required
            />
            <button
              type="submit"
              className="btn-primary rounded-full px-5 py-2.5 text-xs font-semibold shrink-0"
            >
              <span>Enroll for free</span>
            </button>
          </form>

          {/* Terms Disclaimer */}
          <p className="text-[11px] text-neutral-400">
            By enrolling, you agree to Learnexa's Terms of Service and Privacy Policy.
          </p>

          {/* 1-Click Demo Persona Pills */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-1.5 text-xs">
            <span className="text-neutral-400 text-[11px] font-mono">Test Demo Persona:</span>
            <button 
              type="button" 
              onClick={() => { switchProfile('alex'); setActiveTab('dashboard'); }}
              className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-500 transition-colors"
            >
              Alex (Full Stack)
            </button>
            <button 
              type="button" 
              onClick={() => { switchProfile('sarah'); setActiveTab('dashboard'); }}
              className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-500 transition-colors"
            >
              Sarah (AI Eng)
            </button>
            <button 
              type="button" 
              onClick={() => { switchProfile('david'); setActiveTab('dashboard'); }}
              className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-500 transition-colors"
            >
              David (Cyber)
            </button>
          </div>
        </div>
      </section>

      {/* 2. DEDICATED "OUR VISION & STRATEGIC GOALS" SECTION */}
      <section id="vision-goals" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="badge-neutral font-mono">
            Mission & Philosophy
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white tracking-tight">
            Our Vision & Strategic Goals
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
            Technology careers should be accessible to anyone with determination, guided by intelligent AI that pinpoints what companies actually hire for.
          </p>
        </div>

        {/* 3 Pillars with Relatable Pictures */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visionPillars.map((pillar, idx) => (
            <div 
              key={idx}
              className="panel rounded-2xl overflow-hidden flex flex-col justify-between hover:border-neutral-400 dark:hover:border-neutral-700 transition-all duration-200"
            >
              <div>
                {/* Photo Frame */}
                <div className="relative h-48 overflow-hidden bg-neutral-100 dark:bg-neutral-900">
                  <img 
                    src={pillar.image} 
                    alt={pillar.title} 
                    className="w-full h-full object-cover hover:scale-102 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold bg-neutral-900 text-white dark:bg-white dark:text-black">
                    {pillar.badge}
                  </span>
                  <span className="absolute bottom-3 left-3 right-3 text-xs font-semibold text-white flex items-center justify-between">
                    <span>{pillar.highlight}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 space-y-2">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-neutral-400">
                      {pillar.subtitle}
                    </span>
                    <h3 className="text-base font-bold text-neutral-900 dark:text-white mt-0.5">
                      {pillar.title}
                    </h3>
                  </div>
                  <p className="text-xs text-neutral-500 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>

              {/* Bottom Metric Pill */}
              <div className="p-3 mx-5 mb-5 rounded-xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-xs">
                <span className="text-neutral-500 text-[11px]">Outcome Metric:</span>
                <span className="font-bold text-neutral-900 dark:text-white font-mono">{pillar.metric}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. INTERACTIVE ROLE ROADMAPS HIGHLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="badge-neutral font-mono mb-2">
              Structured Roadmap Graphs
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white tracking-tight">
              Interactive Roadmaps for Every Role
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              Visual roadmap.sh-style flowcharts with key topics, practical checkpoints, and quizzes.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('roadmap')}
            className="btn-primary"
          >
            <span>Explore All 5 Roadmaps</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {[
            { id: "full-stack-developer", title: "Full Stack Developer", icon: Code2, nodes: "8 Checkpoints", category: "Web & Distributed" },
            { id: "ai-engineer", title: "AI Engineer", icon: Cpu, nodes: "6 Checkpoints", category: "ML & Deep Learning" },
            { id: "data-scientist", title: "Data Scientist", icon: BarChart3, nodes: "5 Checkpoints", category: "Analytics & Models" },
            { id: "ui-ux-designer", title: "UI/UX Designer", icon: Palette, nodes: "6 Checkpoints", category: "Figma & Systems" },
            { id: "cybersecurity-analyst", title: "Cybersecurity Analyst", icon: Shield, nodes: "6 Checkpoints", category: "Networks & Audits" }
          ].map(r => {
            const Icon = r.icon;
            return (
              <div 
                key={r.id}
                onClick={() => {
                  setCareerGoal(r.id);
                  setActiveTab('roadmap');
                }}
                className="panel rounded-xl p-4 space-y-3 cursor-pointer hover:border-neutral-400 dark:hover:border-neutral-600 transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 flex items-center justify-center">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-neutral-900 dark:text-white">
                      {r.title}
                    </h4>
                    <p className="text-[10px] text-neutral-400 font-mono">{r.nodes}</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-neutral-500 flex items-center gap-1 pt-2 border-t border-neutral-100 dark:border-neutral-800">
                  Open Flowchart →
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. CORE PLATFORM FEATURES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="badge-neutral font-mono">
            Platform Capabilities
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white tracking-tight">
            Engineered for High-Velocity Skill Acquisition
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500">
            Everything you need to audit competencies, master missing skills, and build a verified portfolio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div 
                key={idx}
                className="panel rounded-2xl p-6 space-y-4 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-neutral-500 leading-relaxed mt-1">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. MULTI-AGENT ARCHITECTURE HIGHLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="panel rounded-3xl p-8 sm:p-10 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-6">
            <div className="space-y-1">
              <span className="badge-neutral font-mono">
                Multi-Agent AI Mesh
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white">
                Collaborative 4-Agent Intelligence Pipeline
              </h3>
            </div>
            <button
              onClick={() => navigateWithAuth('agents', () => onOpenAuth && onOpenAuth('signup'))}
              className="btn-secondary text-xs"
            >
              <span>Inspect Agent Execution Graph</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30 space-y-1.5">
              <span className="text-[10px] font-mono text-neutral-400 uppercase">Agent 01</span>
              <p className="font-bold text-xs text-neutral-900 dark:text-white">Skill Analysis Agent</p>
              <p className="text-[11px] text-neutral-500">Parses existing competencies and validates proficiency claims.</p>
            </div>

            <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30 space-y-1.5">
              <span className="text-[10px] font-mono text-neutral-400 uppercase">Agent 02</span>
              <p className="font-bold text-xs text-neutral-900 dark:text-white">Career Guidance Agent</p>
              <p className="text-[11px] text-neutral-500">Compares skills against tech industry benchmarks to quantify gap ratios.</p>
            </div>

            <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30 space-y-1.5">
              <span className="text-[10px] font-mono text-neutral-400 uppercase">Agent 03</span>
              <p className="font-bold text-xs text-neutral-900 dark:text-white">Recommendation Agent</p>
              <p className="text-[11px] text-neutral-500">Synthesizes sequential roadmap steps and hands-on deliverables.</p>
            </div>

            <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30 space-y-1.5">
              <span className="text-[10px] font-mono text-neutral-400 uppercase">Agent 04</span>
              <p className="font-bold text-xs text-neutral-900 dark:text-white">Progress Evaluator</p>
              <p className="text-[11px] text-neutral-500">Monitors quiz accuracy and dynamic learning velocity to tune roadmap pace.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. METRICS BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="panel rounded-2xl p-6 sm:p-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {stats.map((s, idx) => (
              <div key={idx} className="space-y-1">
                <p className="text-2xl sm:text-3xl font-bold font-mono text-neutral-900 dark:text-white">
                  {s.value}
                </p>
                <p className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. STUDENT TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="badge-neutral font-mono">
            Proof of Impact
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white tracking-tight">
            From Learner to Production Engineer
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, idx) => (
            <div key={idx} className="panel rounded-xl p-5 space-y-4 flex flex-col justify-between">
              <div className="space-y-2.5">
                <div className="flex items-center gap-1 text-neutral-900 dark:text-white">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>
              <div className="flex items-center gap-2.5 pt-3 border-t border-neutral-100 dark:border-neutral-800">
                <div className="w-8 h-8 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 flex items-center justify-center font-bold text-xs">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-xs font-semibold text-neutral-900 dark:text-white">{t.name}</p>
                  <p className="text-[10px] text-neutral-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. FINAL CALL TO ACTION */}
      <section className="max-w-5xl mx-auto px-4 text-center">
        <div className="rounded-3xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 p-8 sm:p-12 shadow-elevated-dark space-y-5">
          <div className="space-y-3 max-w-lg mx-auto">
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Ready to Discover Your Skill Gaps?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 dark:text-neutral-600 font-normal">
              Join students and engineers accelerating career readiness with verified proof-of-work roadmaps today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-2">
              <button
                onClick={() => {
                  if (isAuthenticated) {
                    setActiveTab('dashboard');
                  } else if (onOpenAuth) {
                    onOpenAuth('signup');
                  } else {
                    navigateWithAuth('dashboard');
                  }
                }}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-white text-neutral-900 dark:bg-neutral-900 dark:text-white font-semibold text-xs shadow hover:scale-[1.02] transition-all"
              >
                {isAuthenticated ? 'Go to Student Dashboard →' : 'Register Free & Get Started →'}
              </button>
              <button
                onClick={() => {
                  if (isAuthenticated) {
                    setActiveTab('roadmap');
                  } else if (onOpenAuth) {
                    onOpenAuth('login');
                  } else {
                    navigateWithAuth('dashboard');
                  }
                }}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl border border-neutral-700 dark:border-neutral-300 text-xs font-semibold hover:bg-white/10 dark:hover:bg-black/10 transition-all"
              >
                {isAuthenticated ? 'Explore Roadmaps' : 'Sign In to Account'}
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
