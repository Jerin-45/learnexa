# Learnexa – Autonomous Career Intelligence Platform

> Modern, AI-powered career intelligence platform featuring autonomous multi-agent orchestration, adaptive roadmaps, real-time skill gap analysis, and interactive skill assessments. Built for modern tech students and career switchers.

---

## 🌟 Key Highlights & Features

### 1. Minimalist White & Black SaaS Design System
- High-contrast monochromatic design language inspired by Linear, Vercel, and Stripe.
- High-end preloader on startup with micro-linear progress indicator.
- Refined typography (Inter & JetBrains Mono), subtle borders, and balanced drop shadows.
- Seamless Dark & Light theme toggle with local persistence.
- 100% responsive layout across mobile, tablet, and desktop screens.

### 2. High-Impact Landing Page
- **Hero:** "Unlock your potential with AI-Powered learning" with inline student email enrollment.
- **Vision & Strategic Goals:** 3 photo-illustrated pillars (Personalized Velocity, Proof-of-Work, Market Calibration).
- 5-Role interactive roadmap previews.
- 4-Agent Mesh architecture showcase.
- Verified student success stories and trust metrics.

### 3. Student Dashboard
- Dynamic personalized welcome message and target career badge.
- Overall career readiness match percentage (e.g. 72%).
- Total skills acquired vs priority skills to acquire.
- Weekly learning velocity bar chart (daily study hours tracked with Recharts).
- Current active sprint milestone with practical project brief.
- Curated recommended courses with direct provider links.
- Upcoming learning activities and unlocked achievement badges.

### 4. AI Skill Analysis & Gap Engine
- Interactive skill management: add/remove skills, set proficiency level (Beginner, Intermediate, Advanced), years of experience, and portfolio projects.
- One-click **"Run Live AI Skill Analysis"** trigger with multi-agent orchestration.
- Strengths summary, missing skills categorized by importance (Essential, Important, Nice to Have).
- Skill gap percentage visual gauge and automated AI diagnostic feedback.

### 5. Career Matching Matrix
- Compare your profile against top tech roles:
  - **Full Stack Developer**
  - **AI Engineer**
  - **Data Scientist**
  - **UI/UX Designer**
  - **Cybersecurity Analyst**
- Side-by-side competency matrix: Matched requirements (✓) vs Missing requirements (!).
- Instant 1-click **"Switch Target Career"** which adaptively re-generates your roadmap.

### 6. Personalized Roadmap (roadmap.sh Architecture)
- Visual flowchart architecture with **Yellow Topic Nodes** and **Dark Project Checkpoint Nodes**.
- Sequential, milestone-based learning curriculum customized to your missing skills.
- Interactive topic inspection modals with syllabus breakdown, time commitments, and documentation links.
- Floating AI Tutor widget for immediate roadmap questions.
  - Curated free & accredited courses (freeCodeCamp, Coursera, Frontend Masters, DeepLearning.AI, etc.)
  - Deep-dive documentation and tutorials
  - Practical portfolio capstone project deliverable with tech stack tags
  - Interactive status controls (Completed, In Progress, Set as Focus)
  - One-click quiz launch to test out of milestones
- Exportable roadmap JSON plan for download.

### 7. Multi-Agent AI System Visualizer
Collaborative 4-Agent architecture:
1. **Skill Analysis Agent**: Audits skills, verifies experience, and detects proficiencies.
2. **Career Guidance Agent**: Matches skills with career benchmarks and calculates gap score.
3. **Learning Recommendation Agent**: Architects sequential milestones, curates courses, and specifies projects.
4. **Progress Evaluation Agent**: Monitors test velocity, quiz scores, and adapts roadmap difficulty.
- Live collaborative message bus showing autonomous thought logs, handoffs, and payloads.

### 8. Progress Tracking & Interactive Quizzes
- Real interactive skill assessment quizzes for **JavaScript**, **React.js**, **Node.js**, and **Python**.
- Timed questions with code snippets, multiple-choice options, and instant automated grading.
- Detailed question explanations and score breakdown.
- Automatically upgrades your skill proficiency and unlocks achievement badges upon scoring 70%+.
- Achievement badges system (First Milestone, Velocity Builder, Skill Mastery, Consistency Champion, Full Stack Pioneer).

### 9. AI Mentor Chatbot ("SkillPath Mentor")
- Dedicated floating drawer accessible from any page.
- Context-aware chatbot knowing student name, active target career, and current skill gaps.
- Actionable chips ("Explain my skill gaps", "What project should I build next?", "Switch career to AI Engineer").
- Can trigger roadmap changes and assessments directly from chat.

### 10. User Authentication & 1-Click Hackathon Personas
- Sign in / Sign up with custom profile inputs (name, email, education, career goal).
- **1-Click Hackathon Persona Switcher** in the top navigation bar:
  - **Alex Morgan**: Aspiring Full Stack Developer (HTML/CSS/JS baseline)
  - **Sarah Chen**: Aspiring AI Engineer (Python/ML foundation)
  - **David Kim**: Cybersecurity Analyst (Linux/Networking focus)
- Supabase / REST backend configuration panel for cloud synchronization.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Lucide Icons, Recharts, Canvas Confetti.
- **Backend**: Node.js, Express, REST APIs, Multi-Agent Orchestrator.
- **Architecture**: Dual-resilience engine — connects to Express backend with seamless client-side local fallback so the application works 100% out of the box in any environment.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Application
To start both the Express backend API and Vite frontend concurrently:
```bash
npm start
```
Or run the frontend independently:
```bash
npm run dev
```

The frontend will run on: `http://localhost:3000`
The backend API will run on: `http://localhost:5001`

---

## 👥 Hackathon Demonstration Guide

1. **Persona Selection**: Click the user profile icon on the top right to switch between **Alex Morgan**, **Sarah Chen**, or **David Kim**.
2. **Test AI Skill Analysis**: Navigate to *Skill Analysis*, add a new skill (e.g. `Docker`), and click *Run Live AI Skill Analysis*.
3. **Test Career Switch**: Go to *Career Matching*, click *AI Engineer* or *Cybersecurity Analyst*, and observe the roadmap adapt in real time.
4. **Test Interactive Quiz**: Go to *Progress & Quizzes*, start the *JavaScript Assessment*, complete the questions, submit, and watch the confetti burst and skill upgrade!
5. **Test Multi-Agent Mesh**: Visit the *Multi-Agent AI* tab, click *Simulate Collaboration Cycle*, and view the 4 agents passing messages on the thought stream.
6. **Chat with AI Mentor**: Click *Ask Mentor* at the top right, click an action chip, or ask any career question.
