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
  ExternalLink
} from 'lucide-react';

interface LandingPageProps {
  onOpenAuth?: (mode?: 'login' | 'signup') => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onOpenAuth }) => {
  const { setActiveTab, careers, setCareerGoal, updateCurrentUser, switchProfile, showNotification } = useApp();

  const [heroEmail, setHeroEmail] = useState('');

  const handleHeroEnroll = (e: React.FormEvent) => {
    e.preventDefault();
    if (!heroEmail) return;
    updateCurrentUser({
      email: heroEmail,
      name: heroEmail.split('@')[0]
    });
    showNotification(`Welcome to Learnexa, ${heroEmail.split('@')[0]}!`);
    setActiveTab('dashboard');
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
      {/* 1. HERO SECTION (MATCHING EXACT DRIBBBLE SKILLSYNC AI AESTHETIC FROM USER IMAGE 1) */}
      <section className="relative pt-12 pb-16 lg:pt-20 lg:pb-28 text-center">
        {/* Soft radial blue/indigo ambient glow in center */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[780px] h-[480px] bg-gradient-to-tr from-brand-400/20 via-indigo-400/20 to-purple-400/15 blur-[160px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-4xl mx-auto px-4 space-y-6">
          {/* Centered Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
            Unlock your potential with{' '}
            <span className="gradient-text block sm:inline">
              AI-Powered learning
            </span>
          </h1>

          {/* Centered Subtitle */}
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
            Personalised courses and expert-driven insights to help you master new skills and accelerate your career.
          </p>

          {/* Centered Pill Email Input Bar (Exact match to Image 1) */}
          <form 
            onSubmit={handleHeroEnroll}
            className="max-w-md mx-auto p-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl shadow-brand-500/10 flex items-center justify-between transition-all focus-within:ring-2 focus-within:ring-brand-500"
          >
            <input 
              type="email"
              placeholder="Personal email"
              value={heroEmail}
              onChange={e => setHeroEmail(e.target.value)}
              className="px-5 py-2.5 bg-transparent text-xs sm:text-sm text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none flex-1"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-full text-xs font-bold bg-brand-600 hover:bg-brand-700 text-white shadow-md shadow-brand-500/25 transition-all hover:scale-105 shrink-0"
            >
              Enroll for free
            </button>
          </form>

          {/* Disclaimer */}
          <p className="text-[11px] text-slate-400">
            By submitting this form, you agree to the Learnexa <span className="underline cursor-pointer">Terms</span> & <span className="underline cursor-pointer">Privacy Policy</span>.
          </p>

          {/* 1-Click Demo Persona Pills */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="text-slate-400 text-[11px]">Or test 1-click persona:</span>
            <button 
              type="button" 
              onClick={() => { switchProfile('alex'); setActiveTab('dashboard'); }}
              className="px-3 py-1 rounded-full text-[11px] font-bold bg-slate-100 hover:bg-brand-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors"
            >
              Alex (Full Stack)
            </button>
            <button 
              type="button" 
              onClick={() => { switchProfile('sarah'); setActiveTab('dashboard'); }}
              className="px-3 py-1 rounded-full text-[11px] font-bold bg-slate-100 hover:bg-brand-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors"
            >
              Sarah (AI Eng)
            </button>
            <button 
              type="button" 
              onClick={() => { switchProfile('david'); setActiveTab('dashboard'); }}
              className="px-3 py-1 rounded-full text-[11px] font-bold bg-slate-100 hover:bg-brand-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors"
            >
              David (Cyber)
            </button>
          </div>
        </div>

        {/* 2. FLOATING REALISTIC STUDENT DASHBOARD SHOWCASE MOCKUP (EXACT MATCH TO IMAGE 1) */}
        <div className="max-w-6xl mx-auto px-4 pt-12 animate-float">
          <div className="rounded-3xl p-1 bg-gradient-to-b from-slate-200/80 via-white to-slate-200/80 dark:from-slate-700 dark:via-slate-900 dark:to-slate-800 shadow-2xl shadow-brand-500/10">
            <div className="rounded-[22px] bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 overflow-hidden text-left shadow-inner">
              
              {/* Window Controls Bar */}
              <div className="px-5 py-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/60 dark:bg-slate-900/60">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-[11px] font-mono text-slate-400 ml-2">app.learnexa.ai/dashboard</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">Live AI Mesh Active</span>
                </div>
              </div>

              {/* Main Dashboard Layout Preview */}
              <div className="grid grid-cols-12 min-h-[460px]">
                {/* Left Mini Sidebar */}
                <div className="col-span-12 md:col-span-3 border-r border-slate-100 dark:border-slate-800 p-4 space-y-6 hidden md:block bg-slate-50/40 dark:bg-slate-900/30">
                  <div className="flex items-center gap-2 px-2">
                    <div className="w-7 h-7 rounded-lg gradient-brand flex items-center justify-center text-white">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-extrabold text-sm text-slate-900 dark:text-white">Learnexa</span>
                  </div>

                  <div className="space-y-1 text-xs font-semibold">
                    <button 
                      onClick={() => setActiveTab('dashboard')}
                      className="w-full text-left px-3 py-2 rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-300 font-bold flex items-center gap-2"
                    >
                      <BarChart3 className="w-4 h-4" />
                      <span>Dashboard</span>
                    </button>
                    <button 
                      onClick={() => setActiveTab('roadmap')}
                      className="w-full text-left px-3 py-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2"
                    >
                      <GitFork className="w-4 h-4" />
                      <span>My Roadmaps</span>
                    </button>
                    <button 
                      onClick={() => setActiveTab('progress')}
                      className="w-full text-left px-3 py-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2"
                    >
                      <Award className="w-4 h-4" />
                      <span>Achievements</span>
                    </button>
                  </div>

                  <div className="pt-4 border-t border-slate-200/50 dark:border-slate-800/50 space-y-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 px-2 block">
                      Analytics
                    </span>
                    <div className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
                      <div className="px-3 py-1.5 flex items-center gap-2">
                        <TrendingUp className="w-3.5 h-3.5 text-slate-400" />
                        <span>My Progress</span>
                      </div>
                      <div className="px-3 py-1.5 flex items-center gap-2">
                        <Zap className="w-3.5 h-3.5 text-slate-400" />
                        <span>Skill Analysis</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Center & Right Content (Matching Image 1) */}
                <div className="col-span-12 md:col-span-9 p-5 sm:p-6 space-y-6">
                  {/* Top Bar inside mockup */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                    <div className="relative flex-1 max-w-sm">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                      <input 
                        type="text" 
                        readOnly 
                        value="Search for courses, topics, roadmaps..." 
                        className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-[11px] text-slate-500 outline-none" 
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right hidden sm:block">
                        <p className="text-xs font-bold text-slate-900 dark:text-white">George V.</p>
                        <p className="text-[10px] text-brand-600 dark:text-brand-400 font-semibold">Pro Learner</p>
                      </div>
                      <div className="w-8 h-8 rounded-full gradient-brand flex items-center justify-center font-bold text-xs text-white">
                        G
                      </div>
                    </div>
                  </div>

                  {/* Welcome Greeting Banner */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-black text-slate-900 dark:text-white">
                        Welcome Back, George! 👋
                      </h3>
                      <p className="text-xs text-slate-500">
                        Your current progress & weekly learning activity
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveTab('dashboard')}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-brand-600 text-white flex items-center gap-1.5 hover:bg-brand-700 transition-colors self-start sm:self-auto shadow-sm"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Open Full Dashboard</span>
                    </button>
                  </div>

                  {/* 3 Top Stat Cards (Exact match to Image 1: 42.5 hrs, 10 courses, 1,250 skill points) */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/60 dark:border-blue-900/40 space-y-1">
                      <div className="flex items-center justify-between text-xs font-semibold text-blue-700 dark:text-blue-300">
                        <span>Learning Hours</span>
                        <Clock className="w-4 h-4 text-blue-500" />
                      </div>
                      <p className="text-2xl font-black text-slate-900 dark:text-white">42.5</p>
                      <p className="text-[10px] text-emerald-600 font-bold">+12.5% last week</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200/60 dark:border-purple-900/40 space-y-1">
                      <div className="flex items-center justify-between text-xs font-semibold text-purple-700 dark:text-purple-300">
                        <span>Completed Courses</span>
                        <BookOpen className="w-4 h-4 text-purple-500" />
                      </div>
                      <p className="text-2xl font-black text-slate-900 dark:text-white">10</p>
                      <p className="text-[10px] text-emerald-600 font-bold">+2 this month</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40 space-y-1">
                      <div className="flex items-center justify-between text-xs font-semibold text-amber-700 dark:text-amber-300">
                        <span>Skill Points</span>
                        <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                      </div>
                      <p className="text-2xl font-black text-slate-900 dark:text-white">1,250</p>
                      <p className="text-[10px] text-emerald-600 font-bold">+200 this week</p>
                    </div>
                  </div>

                  {/* Continue Learning + Current Course Grid (Exact match to Image 1) */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                    {/* Continue Learning Thumbnails (8 Cols) */}
                    <div className="lg:col-span-7 space-y-3">
                      <span className="text-xs font-extrabold text-slate-900 dark:text-white">
                        Continue Learning (3)
                      </span>
                      <div className="grid grid-cols-3 gap-2.5">
                        <div 
                          onClick={() => setActiveTab('roadmap')}
                          className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 cursor-pointer group bg-slate-900 text-white"
                        >
                          <div className="h-16 bg-gradient-to-br from-indigo-500 to-purple-600 p-2 flex flex-col justify-between">
                            <span className="text-[8px] uppercase tracking-wider font-bold opacity-80">UI/UX</span>
                            <Play className="w-4 h-4 text-white group-hover:scale-125 transition-transform" />
                          </div>
                          <div className="p-1.5">
                            <p className="text-[10px] font-bold truncate">Best Figma Courses</p>
                            <p className="text-[8px] text-slate-400">Lesson 4 of 12</p>
                          </div>
                        </div>

                        <div 
                          onClick={() => setActiveTab('roadmap')}
                          className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 cursor-pointer group bg-slate-900 text-white"
                        >
                          <div className="h-16 bg-gradient-to-br from-blue-600 to-cyan-600 p-2 flex flex-col justify-between">
                            <span className="text-[8px] uppercase tracking-wider font-bold opacity-80">Dev</span>
                            <Play className="w-4 h-4 text-white group-hover:scale-125 transition-transform" />
                          </div>
                          <div className="p-1.5">
                            <p className="text-[10px] font-bold truncate">A New Way of Coding</p>
                            <p className="text-[8px] text-slate-400">Lesson 2 of 8</p>
                          </div>
                        </div>

                        <div 
                          onClick={() => setActiveTab('roadmap')}
                          className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 cursor-pointer group bg-slate-900 text-white"
                        >
                          <div className="h-16 bg-gradient-to-br from-emerald-500 to-teal-600 p-2 flex flex-col justify-between">
                            <span className="text-[8px] uppercase tracking-wider font-bold opacity-80">AI</span>
                            <Play className="w-4 h-4 text-white group-hover:scale-125 transition-transform" />
                          </div>
                          <div className="p-1.5">
                            <p className="text-[10px] font-bold truncate">Deep Learning AI</p>
                            <p className="text-[8px] text-slate-400">Lesson 6 of 15</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Current Active Course Card (5 Cols) */}
                    <div className="lg:col-span-5 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-3">
                      <div>
                        <span className="text-[9px] uppercase font-extrabold tracking-wider text-slate-400">
                          Current Focus
                        </span>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">
                          Figma design system
                        </h4>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-[10px] font-bold">
                          <span className="text-slate-500">Progress</span>
                          <span className="text-brand-600 dark:text-brand-400">65%</span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-brand-600 h-full rounded-full w-[65%]" />
                        </div>
                      </div>

                      <button
                        onClick={() => setActiveTab('roadmap')}
                        className="w-full py-2 rounded-xl text-xs font-bold bg-brand-600 hover:bg-brand-700 text-white shadow-sm transition-all"
                      >
                        Continue Learning
                      </button>

                      <div className="pt-2 border-t border-slate-200 dark:border-slate-800 text-[10px] text-slate-500">
                        <span className="font-semibold text-slate-800 dark:text-slate-200">Next Up: </span>
                        <span>How to design better components (40 min)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DEDICATED "OUR VISION & STRATEGIC GOALS" SECTION WITH RELATABLE PHOTOS */}
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

      {/* 3. INTERACTIVE ROLE ROADMAPS HIGHLIGHT (DIRECT JUMP TO ROADMAP.SH TREE VIEW) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 text-xs font-bold border border-amber-200 dark:border-amber-800 mb-2">
              <GitFork className="w-3.5 h-3.5" />
              <span>Interactive Visual Flowcharts for Every Role</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Explore Roadmaps for Every Role
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Structured like roadmap.sh with yellow topic nodes, dark checkpoint deliverables, and quizzes.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('roadmap')}
            className="px-5 py-2.5 rounded-2xl text-xs font-bold gradient-brand text-white shadow-md hover:scale-105 transition-all flex items-center gap-2 self-start sm:self-auto"
          >
            <span>Launch Interactive Flowchart</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { id: "full-stack-developer", title: "Full Stack Developer", icon: "🌐", nodes: "8 Checkpoints", color: "from-blue-500 to-cyan-500" },
            { id: "ai-engineer", title: "AI Engineer", icon: "🤖", nodes: "6 Checkpoints", color: "from-purple-500 to-indigo-500" },
            { id: "data-scientist", title: "Data Scientist", icon: "📊", nodes: "5 Checkpoints", color: "from-emerald-500 to-teal-500" },
            { id: "ui-ux-designer", title: "UI/UX Designer", icon: "🎨", nodes: "6 Checkpoints", color: "from-pink-500 to-rose-500" },
            { id: "cybersecurity-analyst", title: "Cybersecurity Analyst", icon: "🛡️", nodes: "6 Checkpoints", color: "from-amber-500 to-orange-500" }
          ].map(r => (
            <div 
              key={r.id}
              onClick={() => {
                setCareerGoal(r.id);
                setActiveTab('roadmap');
              }}
              className="glass-card rounded-2xl p-5 space-y-3 cursor-pointer hover:border-amber-400 hover:-translate-y-1 transition-all"
            >
              <div className="text-3xl">{r.icon}</div>
              <div>
                <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                  {r.title}
                </h4>
                <p className="text-[11px] text-slate-500">{r.nodes}</p>
              </div>
              <span className="text-[10px] font-bold text-amber-500 flex items-center gap-1">
                View Node Graph →
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 4. CORE PLATFORM FEATURES */}
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

      {/* 5. MULTI-AGENT COLLABORATION MESH */}
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

      {/* 8. FINAL CALL TO ACTION */}
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
