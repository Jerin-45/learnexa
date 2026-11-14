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
  ChevronRight
} from 'lucide-react';

interface LandingPageProps {
  onOpenAuth?: (mode?: 'login' | 'signup') => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onOpenAuth }) => {
  const { setActiveTab, careers, setCareerGoal, updateCurrentUser, switchProfile, showNotification } = useApp();

  // Inline Quick Sign Up / Sign In state on Home
  const [authTab, setAuthTab] = useState<'signup' | 'signin'>('signup');
  const [inlineName, setInlineName] = useState('');
  const [inlineEmail, setInlineEmail] = useState('');
  const [inlinePassword, setInlinePassword] = useState('');
  const [inlineCareer, setInlineCareer] = useState(careers[0]?.id || 'full-stack-developer');

  const handleInlineAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inlineEmail) return;

    if (authTab === 'signup') {
      const name = inlineName.trim() || inlineEmail.split('@')[0];
      updateCurrentUser({
        name,
        email: inlineEmail,
        careerGoal: inlineCareer
      });
      setCareerGoal(inlineCareer);
      showNotification(`Account created for ${name}! Welcome to Learnexa.`);
      setActiveTab('dashboard');
    } else {
      updateCurrentUser({
        email: inlineEmail,
        name: inlineEmail.split('@')[0]
      });
      showNotification(`Welcome back! Signed in successfully.`);
      setActiveTab('dashboard');
    }
  };

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

  const visionPillars = [
    {
      badge: "OUR VISION",
      title: "Democratize Career Intelligence",
      subtitle: "Break Free from Tutorial Hell",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=80",
      description: "Millions of students spend hundreds of hours watching generic tutorials without knowing if they possess the skills companies actually look for. Learnexa's vision is to give every learner an autonomous AI mentor that diagnoses exact skill gaps and provides verified clarity.",
      metric: "94.8% Placement Success Rate",
      highlight: "Personalized to Your Current Knowledge"
    },
    {
      badge: "OUR GOAL",
      title: "Production Proof-of-Work",
      subtitle: "Real GitHub-Ready Deliverables",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80",
      description: "Our primary goal is shifting students from passive watching to ship-ready engineering. Every milestone culminates in a hands-on project deliverable—from interactive full stack apps to AI model microservices and network security audits.",
      metric: "7-Stage Milestone Curriculum",
      highlight: "Verifiable Portfolios, Not Just Certificates"
    },
    {
      badge: "OUR GOAL",
      title: "Industry Market Calibration",
      subtitle: "Aligned with In-Demand Tech Roles",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80",
      description: "We benchmark candidate skills against real-world engineering standards for Full Stack Developers, AI Engineers, Data Scientists, and Security Analysts. When you complete a Learnexa roadmap, you are interview-ready.",
      metric: "2.4x Learning Acceleration",
      highlight: "Continuously Calibrated with Hiring Criteria"
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
      quote: "Learnexa cut through the noise of 50-hour video tutorials. The 4 agents mapped my React gaps and guided me straight to a portfolio project that got me hired.",
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
      quote: "As a self-taught student, I didn't know what I was missing. Learnexa's skill gap breakdown pinpointed network protocol auditing immediately.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
    }
  ];

  return (
    <div className="space-y-24 pb-20 overflow-hidden">
      {/* 1. HERO SECTION: IMMEDIATE VISION, GOAL, RELATABLE PICTURE & QUICK AUTH */}
      <section className="relative pt-8 pb-16 lg:pt-14 lg:pb-20">
        {/* Ambient background glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-brand-500/20 via-purple-500/20 to-pink-500/10 blur-[150px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Top Hero Grid: Pitch + Inline Sign Up/Sign In Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Col (7 Cols): Headline, Vision & Goal Highlight */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-200 dark:border-purple-800/80 bg-white/80 dark:bg-purple-950/40 shadow-sm">
                <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400 animate-pulse" />
                <span className="text-xs font-bold text-slate-800 dark:text-purple-200">
                  Welcome to Learnexa
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                <span className="text-xs text-brand-600 dark:text-brand-400 font-semibold">
                  Personalized AI Career Platform
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                Discover Your Skills.{' '}
                <span className="gradient-text block mt-1">
                  Build Your Future.
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Stop guessing what to learn next. <strong>Learnexa</strong> deploys an autonomous 4-agent AI system that audits your skill gaps, benchmarks your abilities against live tech hiring standards, and builds your adaptive learning roadmap.
              </p>

              {/* VISION & GOAL HERO SPOTLIGHT CARD */}
              <div className="p-5 rounded-2xl glass-card border border-brand-500/30 bg-gradient-to-br from-brand-50/60 via-white/70 to-purple-50/60 dark:from-slate-900/80 dark:via-slate-900/60 dark:to-purple-950/30 text-left space-y-3.5 shadow-md">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                  <Target className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                  <span>Our Vision & Strategic Goal</span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1 border-l-2 border-brand-500 pl-3">
                    <p className="font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-brand-600" />
                      Our Vision
                    </p>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
                      To bridge the gap between classroom theory and real tech careers by eliminating "tutorial hell" with personalized, autonomous AI intelligence.
                    </p>
                  </div>

                  <div className="space-y-1 border-l-2 border-purple-500 pl-3">
                    <p className="font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <Rocket className="w-3.5 h-3.5 text-purple-600" />
                      Our Goal
                    </p>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
                      Diagnose real skill gaps against industry benchmarks, deliver adaptive roadmaps, and empower students to ship verified GitHub portfolio projects.
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-1">
                <button
                  onClick={() => onOpenAuth ? onOpenAuth('signup') : setActiveTab('dashboard')}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-2xl font-bold text-sm gradient-brand shadow-xl shadow-brand-500/25 hover:shadow-brand-500/40 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                >
                  <User className="w-4 h-4" />
                  <span>Sign Up Free</span>
                </button>

                <button
                  onClick={() => onOpenAuth ? onOpenAuth('login') : setActiveTab('dashboard')}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl font-bold text-sm border border-slate-300 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 transition-all flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4 text-purple-500" />
                  <span>Sign In</span>
                </button>

                <button
                  onClick={() => setActiveTab('dashboard')}
                  className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
                >
                  <span>Launch Student Demo →</span>
                </button>
              </div>
            </div>

            {/* Right Col (5 Cols): Relatable Student Visual + Quick Auth Form */}
            <div className="lg:col-span-5 space-y-5">
              {/* Relatable Photo Banner with Live Badges */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-brand-500/30 group">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=80" 
                  alt="Students learning, collaborating and coding on computers"
                  className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />
                
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="font-extrabold text-[11px] text-white">Join 12,000+ Students Upskilling</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-brand-600 text-white">
                    4-Agent AI
                  </span>
                </div>
              </div>

              {/* Interactive Sign Up / Sign In Quick Box */}
              <div className="glass-card rounded-3xl p-6 shadow-xl border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                    {authTab === 'signup' ? 'Create Your Account' : 'Sign In to Your Path'}
                  </h3>
                  <div className="flex p-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold">
                    <button
                      type="button"
                      onClick={() => setAuthTab('signup')}
                      className={`px-3 py-1 rounded-lg transition-all ${
                        authTab === 'signup' ? 'gradient-brand text-white shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      Sign Up
                    </button>
                    <button
                      type="button"
                      onClick={() => setAuthTab('signin')}
                      className={`px-3 py-1 rounded-lg transition-all ${
                        authTab === 'signin' ? 'gradient-brand text-white shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      Sign In
                    </button>
                  </div>
                </div>

                <form onSubmit={handleInlineAuthSubmit} className="space-y-3">
                  {authTab === 'signup' && (
                    <div>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                        <input
                          type="text"
                          placeholder="Full Name (e.g. Alex Morgan)"
                          value={inlineName}
                          onChange={e => setInlineName(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs focus:ring-2 focus:ring-brand-500 outline-none"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="email"
                        placeholder="Email address"
                        value={inlineEmail}
                        onChange={e => setInlineEmail(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs focus:ring-2 focus:ring-brand-500 outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="password"
                        placeholder="Password"
                        value={inlinePassword}
                        onChange={e => setInlinePassword(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs focus:ring-2 focus:ring-brand-500 outline-none"
                      />
                    </div>
                  </div>

                  {authTab === 'signup' && (
                    <div>
                      <select
                        value={inlineCareer}
                        onChange={e => setInlineCareer(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-semibold focus:ring-2 focus:ring-brand-500 outline-none"
                      >
                        {careers.map(c => (
                          <option key={c.id} value={c.id}>{c.title}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl font-bold text-xs gradient-brand text-white shadow-md hover:scale-[1.01] transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>{authTab === 'signup' ? 'Sign Up & Generate Roadmap' : 'Sign In to Dashboard'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>

                {/* 1-Click Demo Personas */}
                <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800/80 text-center space-y-1.5">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                    Or 1-Click Instant Demo Login:
                  </span>
                  <div className="grid grid-cols-3 gap-1.5">
                    <button
                      type="button"
                      onClick={() => { switchProfile('alex'); setActiveTab('dashboard'); }}
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-brand-50 dark:bg-slate-800 text-[10px] font-bold text-slate-700 dark:text-slate-300 text-center"
                    >
                      Alex (Full Stack)
                    </button>
                    <button
                      type="button"
                      onClick={() => { switchProfile('sarah'); setActiveTab('dashboard'); }}
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-brand-50 dark:bg-slate-800 text-[10px] font-bold text-slate-700 dark:text-slate-300 text-center"
                    >
                      Sarah (AI Eng)
                    </button>
                    <button
                      type="button"
                      onClick={() => { switchProfile('david'); setActiveTab('dashboard'); }}
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-brand-50 dark:bg-slate-800 text-[10px] font-bold text-slate-700 dark:text-slate-300 text-center"
                    >
                      David (Cyber)
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DEDICATED "OUR VISION & STRATEGIC GOALS" SECTION WITH HIGH-RES RELATABLE PHOTOS */}
      <section id="vision-goals" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-100 dark:bg-brand-950/80 text-brand-700 dark:text-brand-300 text-xs font-bold border border-brand-200 dark:border-brand-800">
            <Target className="w-3.5 h-3.5" />
            <span>Mission & Philosophy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Our Vision & Strategic Goals
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Learnexa was founded on a simple conviction: technology careers should be accessible to anyone with determination, guided by intelligent AI that knows exactly what you need to learn.
          </p>
        </div>

        {/* 3 Pillars with Relatable Pictures */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {visionPillars.map((pillar, idx) => (
            <div 
              key={idx}
              className="glass-card rounded-3xl overflow-hidden flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 border border-slate-200/80 dark:border-slate-800"
            >
              <div>
                {/* Photo Frame */}
                <div className="relative h-52 overflow-hidden">
                  <img 
                    src={pillar.image} 
                    alt={pillar.title} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-extrabold tracking-wider uppercase bg-brand-600 text-white shadow">
                    {pillar.badge}
                  </span>
                  <span className="absolute bottom-3 left-3 right-3 text-xs font-bold text-white flex items-center justify-between">
                    <span>{pillar.highlight}</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <div>
                    <span className="text-[10px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                      {pillar.subtitle}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                      {pillar.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>

              {/* Bottom Metric Pill */}
              <div className="p-4 mx-6 mb-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Outcome Metric:</span>
                <span className="font-extrabold text-emerald-600 dark:text-emerald-400">{pillar.metric}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. CORE PLATFORM FEATURES */}
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

      {/* 4. LIVE MULTI-AGENT MESH VISUAL PREVIEW */}
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
                  Watch 4 AI Agents Calibrate Your Career in Real Time
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

      {/* 5. IN-DEMAND CAREER EXPLORER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-purple-600 dark:text-purple-400">
              Target Career Goals
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              Select Your Ideal Career Track
            </h2>
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

      {/* 6. METRICS BAR */}
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

      {/* 7. STUDENT TESTIMONIALS */}
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

      {/* 8. FINAL CALL TO ACTION (WITH BOTH SIGN UP & SIGN IN OPTIONS) */}
      <section className="max-w-5xl mx-auto px-4 text-center">
        <div className="rounded-3xl gradient-brand p-8 sm:p-14 shadow-2xl space-y-6 text-white relative overflow-hidden">
          <div className="relative z-10 space-y-4 max-w-xl mx-auto">
            <h3 className="text-3xl sm:text-4xl font-extrabold">
              Ready to Discover Your Skill Gaps with Learnexa?
            </h3>
            <p className="text-sm sm:text-base text-brand-100 font-normal">
              Join thousands of students and career pivoters building verified skills with personalized AI roadmaps today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
              <button
                onClick={() => onOpenAuth ? onOpenAuth('signup') : setActiveTab('dashboard')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-white text-slate-900 font-extrabold text-sm shadow-xl hover:bg-slate-100 hover:scale-105 transition-all"
              >
                Sign Up for Free
              </button>
              <button
                onClick={() => onOpenAuth ? onOpenAuth('login') : setActiveTab('dashboard')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-white/20 border border-white/30 text-white font-extrabold text-sm hover:bg-white/30 transition-all"
              >
                Sign In to Account
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
