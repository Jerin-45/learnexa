import { Career, UserProfile, Assessment } from '../types';

export const DEFAULT_CAREERS: Career[] = [
  {
    id: "full-stack-developer",
    title: "Full Stack Developer",
    category: "Software Engineering",
    description: "Design and build complete web applications from responsive frontends to scalable backend architectures and databases.",
    avgSalary: "$105,000 - $145,000",
    growthRate: "+22% (High Demand)",
    difficulty: "Intermediate",
    requiredSkills: [
      { name: "HTML & CSS", category: "Frontend", importance: "Essential", minLevel: "Advanced" },
      { name: "JavaScript", category: "Core", importance: "Essential", minLevel: "Advanced" },
      { name: "React.js", category: "Frontend", importance: "Essential", minLevel: "Intermediate" },
      { name: "Node.js", category: "Backend", importance: "Essential", minLevel: "Intermediate" },
      { name: "Express.js", category: "Backend", importance: "Essential", minLevel: "Intermediate" },
      { name: "Database Management (SQL/MongoDB)", category: "Database", importance: "Essential", minLevel: "Intermediate" },
      { name: "REST APIs & GraphQL", category: "Backend", importance: "Important", minLevel: "Intermediate" },
      { name: "Git & Version Control", category: "DevOps", importance: "Essential", minLevel: "Intermediate" },
      { name: "Docker & Containerization", category: "DevOps", importance: "Nice to have", minLevel: "Basic" as any },
      { name: "Full Stack Project Deployment", category: "DevOps", importance: "Essential", minLevel: "Intermediate" }
    ],
    defaultRoadmap: [
      {
        id: "step-1",
        stepNumber: 1,
        title: "Modern HTML5, Semantic Web & CSS3 Mastery",
        skill: "HTML & CSS",
        duration: "2 Weeks",
        description: "Master modern layout techniques including Flexbox, CSS Grid, responsive design principles, and accessibility (a11y).",
        courses: [
          { name: "Responsive Web Design Certification", provider: "freeCodeCamp", url: "https://www.freecodecamp.org", duration: "15 hrs" },
          { name: "Modern CSS from Beginning to Pro", provider: "Learnexa Academy", url: "#", duration: "12 hrs" }
        ],
        tutorials: ["CSS Grid Deep Dive", "Building Fluid Responsive Layouts without Media Queries"],
        project: {
          title: "SaaS Landing Page with Glassmorphism",
          description: "Build a pixel-perfect, accessible, mobile-first product landing page with dark mode support.",
          techStack: ["HTML5", "CSS3 / Tailwind", "Semantic HTML"]
        },
        status: "COMPLETED",
        priority: "COMPLETED"
      },
      {
        id: "step-2",
        stepNumber: 2,
        title: "Modern JavaScript (ES6+) & Async Programming",
        skill: "JavaScript",
        duration: "3 Weeks",
        description: "Deep dive into closures, prototypal inheritance, promises, async/await, DOM manipulation, and Event Loops.",
        courses: [
          { name: "JavaScript: The Hard Parts", provider: "Frontend Masters", url: "#", duration: "16 hrs" },
          { name: "Complete JavaScript Mastery 2025", provider: "Udemy / Learnexa", url: "#", duration: "24 hrs" }
        ],
        tutorials: ["Event Loop and Microtasks in V8", "Functional Programming in Modern JS"],
        project: {
          title: "Interactive Financial Analytics Dashboard",
          description: "Build an interactive client-side dashboard with state management, chart visualization, and localStorage persistence.",
          techStack: ["JavaScript ES6+", "Canvas API", "Web Storage API"]
        },
        status: "IN_PROGRESS",
        priority: "HIGH"
      },
      {
        id: "step-3",
        stepNumber: 3,
        title: "Component Architecture with React.js & State Systems",
        skill: "React.js",
        duration: "4 Weeks",
        description: "Build scalable user interfaces with React hooks, context API, custom hooks, component lifecycles, and performance memoization.",
        courses: [
          { name: "Epic React with Kent C. Dodds", provider: "EpicReact.dev", url: "#", duration: "28 hrs" },
          { name: "React 18/19 Complete Guide", provider: "Coursera", url: "#", duration: "20 hrs" }
        ],
        tutorials: ["Custom Hooks Architecture", "React Performance Optimization Secrets"],
        project: {
          title: "Collaborative Task & Kanban Workspace",
          description: "Develop a real-time Kanban board with drag-and-drop, optimistic updates, and keyboard shortcuts.",
          techStack: ["React.js", "TypeScript", "Tailwind CSS"]
        },
        status: "NEXT_UP",
        priority: "HIGH"
      },
      {
        id: "step-4",
        stepNumber: 4,
        title: "Server-side Engineering with Node.js & Architecture",
        skill: "Node.js",
        duration: "3 Weeks",
        description: "Understand Node.js asynchronous architecture, streams, buffer management, cluster module, and file systems.",
        courses: [
          { name: "Node.js Developer Masterclass", provider: "NodeSource / edX", url: "#", duration: "18 hrs" }
        ],
        tutorials: ["Node.js Event-Driven Architecture", "Memory Leaks and Profiling in Node"],
        project: {
          title: "High-Throughput CLI File Processing Tool",
          description: "Create a CLI tool that parses, converts, and indexes large CSV/JSON streams with low memory footprint.",
          techStack: ["Node.js", "Streams API", "CLI Commander"]
        },
        status: "LOCKED",
        priority: "HIGH"
      },
      {
        id: "step-5",
        stepNumber: 5,
        title: "RESTful API Development & Middleware with Express.js",
        skill: "Express.js",
        duration: "2 Weeks",
        description: "Design production-ready REST APIs, JWT authentication, rate limiting, validation schemas, and error-handling middleware.",
        courses: [
          { name: "Production Ready Node Express APIs", provider: "Learnexa Pro", url: "#", duration: "14 hrs" }
        ],
        tutorials: ["Securing APIs with Helmet, CORS and JWT", "Clean Architecture in Express"],
        project: {
          title: "Secure E-Commerce & Payment Gateway API",
          description: "Build a complete REST API with role-based auth, product search, cart logic, and Stripe webhook handling.",
          techStack: ["Express.js", "JWT", "Zod Validation"]
        },
        status: "LOCKED",
        priority: "HIGH"
      },
      {
        id: "step-6",
        stepNumber: 6,
        title: "Database Engineering (PostgreSQL & MongoDB)",
        skill: "Database Management (SQL/MongoDB)",
        duration: "3 Weeks",
        description: "Master relational schema design, indexing, ACID transactions, Prisma/Mongoose ORMs, and query optimization.",
        courses: [
          { name: "PostgreSQL for Professionals", provider: "Datacamp", url: "#", duration: "16 hrs" },
          { name: "MongoDB University Certification", provider: "MongoDB University", url: "#", duration: "12 hrs" }
        ],
        tutorials: ["B-Tree Indexes and EXPLAIN ANALYZE", "Normalization vs Denormalization Tradeoffs"],
        project: {
          title: "Multi-tenant Social Community Platform Database",
          description: "Design relational models for user profiles, follows, posts, comments, tags, and audit logging with indexes.",
          techStack: ["PostgreSQL", "Prisma ORM", "Redis Caching"]
        },
        status: "LOCKED",
        priority: "HIGH"
      },
      {
        id: "step-7",
        stepNumber: 7,
        title: "Capstone: Production Full Stack Project & Deployment",
        skill: "Full Stack Project Deployment",
        duration: "4 Weeks",
        description: "Integrate the complete stack with CI/CD pipelines, Docker containers, cloud hosting on AWS/Vercel, and monitoring.",
        courses: [
          { name: "Docker and Kubernetes Fundamentals", provider: "Linux Foundation", url: "#", duration: "15 hrs" },
          { name: "Full Stack DevOps & Cloud Deployments", provider: "AWS Training", url: "#", duration: "20 hrs" }
        ],
        tutorials: ["GitHub Actions Automated CI/CD", "Production Observability with OpenTelemetry"],
        project: {
          title: "Learnexa AI Cloud Application",
          description: "Deploy an end-to-end full stack web application with containerization, automated testing, and custom domain SSL.",
          techStack: ["Docker", "GitHub Actions", "Vercel / Render"]
        },
        status: "LOCKED",
        priority: "HIGH"
      }
    ]
  },
  {
    id: "ai-engineer",
    title: "AI Engineer",
    category: "Artificial Intelligence",
    description: "Build intelligent systems, fine-tune LLMs, integrate neural models, and design agentic architectures for real-world automation.",
    avgSalary: "$130,000 - $185,000",
    growthRate: "+38% (Explosive)",
    difficulty: "Advanced",
    requiredSkills: [
      { name: "Python", category: "Core", importance: "Essential", minLevel: "Advanced" },
      { name: "Machine Learning Foundations", category: "AI/ML", importance: "Essential", minLevel: "Intermediate" },
      { name: "Deep Learning (PyTorch/TensorFlow)", category: "AI/ML", importance: "Essential", minLevel: "Intermediate" },
      { name: "Large Language Models & Prompt Engineering", category: "AI/ML", importance: "Essential", minLevel: "Advanced" },
      { name: "Vector Databases & RAG Pipelines", category: "Data", importance: "Essential", minLevel: "Intermediate" },
      { name: "LangChain / LlamaIndex / Agent Frameworks", category: "AI/ML", importance: "Essential", minLevel: "Intermediate" },
      { name: "FastAPI / Model Serving", category: "Backend", importance: "Important", minLevel: "Intermediate" }
    ],
    defaultRoadmap: [
      {
        id: "ai-1",
        stepNumber: 1,
        title: "Python for Data Science & Scientific Computing",
        skill: "Python",
        duration: "2 Weeks",
        description: "Master NumPy, Pandas, vectorization, object-oriented Python, and asynchronous IO for model inference.",
        courses: [
          { name: "Python for Everybody", provider: "University of Michigan / Coursera", url: "#", duration: "20 hrs" }
        ],
        tutorials: ["Vectorized NumPy Performance", "High-performance Python with AsyncIO"],
        project: {
          title: "Data Preprocessing & EDA Pipeline",
          description: "Build an automated cleaning and feature engineering pipeline on real-world tabular data.",
          techStack: ["Python", "NumPy", "Pandas"]
        },
        status: "IN_PROGRESS",
        priority: "HIGH"
      },
      {
        id: "ai-2",
        stepNumber: 2,
        title: "Classical Machine Learning Foundations",
        skill: "Machine Learning Foundations",
        duration: "3 Weeks",
        description: "Supervised and unsupervised learning, gradient descent, regularizations, ensemble models (XGBoost), and evaluation metrics.",
        courses: [
          { name: "Machine Learning Specialization", provider: "DeepLearning.AI / Andrew Ng", url: "#", duration: "30 hrs" }
        ],
        tutorials: ["Bias-Variance Tradeoff in Depth", "Hyperparameter Tuning with Optuna"],
        project: {
          title: "Predictive Customer Churn Engine",
          description: "Train, validate, and compare Random Forest and XGBoost classifiers with ROC-AUC analysis.",
          techStack: ["Scikit-learn", "XGBoost", "Matplotlib"]
        },
        status: "LOCKED",
        priority: "HIGH"
      },
      {
        id: "ai-3",
        stepNumber: 3,
        title: "Deep Learning Architectures with PyTorch",
        skill: "Deep Learning (PyTorch/TensorFlow)",
        duration: "4 Weeks",
        description: "Neural network backpropagation, CNNs, Transformers, attention mechanisms, and PyTorch training loops.",
        courses: [
          { name: "Deep Learning Specialization", provider: "DeepLearning.AI", url: "#", duration: "35 hrs" }
        ],
        tutorials: ["Attention Is All You Need Paper Breakdown", "Writing PyTorch Modules from Scratch"],
        project: {
          title: "Custom Transformer Text Classifier",
          description: "Implement multi-head self-attention layer in PyTorch and train sentiment classifier.",
          techStack: ["PyTorch", "Hugging Face", "CUDA"]
        },
        status: "LOCKED",
        priority: "HIGH"
      },
      {
        id: "ai-4",
        stepNumber: 4,
        title: "RAG Systems & Vector Database Integration",
        skill: "Vector Databases & RAG Pipelines",
        duration: "3 Weeks",
        description: "Embeddings, vector indexing (HNSW), semantic search with Pinecone/Qdrant/Chroma, and hybrid retrieval.",
        courses: [
          { name: "Building Production-grade RAG", provider: "DeepLearning.AI", url: "#", duration: "12 hrs" }
        ],
        tutorials: ["Chunking Strategies for Complex Documents", "Context Compression and Reranking"],
        project: {
          title: "Intelligent PDF Knowledge Assistant",
          description: "Create an enterprise document Q&A engine with vector search and citations.",
          techStack: ["ChromaDB", "LangChain", "OpenAI / Gemini"]
        },
        status: "LOCKED",
        priority: "HIGH"
      }
    ]
  },
  {
    id: "data-scientist",
    title: "Data Scientist",
    category: "Data Science & Analytics",
    description: "Extract actionable insights, create predictive statistical models, and translate complex data patterns into strategic decisions.",
    avgSalary: "$115,000 - $160,000",
    growthRate: "+28% (High Demand)",
    difficulty: "Intermediate to Advanced",
    requiredSkills: [
      { name: "Python / R", category: "Core", importance: "Essential", minLevel: "Advanced" },
      { name: "SQL & Advanced Querying", category: "Database", importance: "Essential", minLevel: "Advanced" },
      { name: "Statistics & Probability", category: "Math", importance: "Essential", minLevel: "Intermediate" },
      { name: "Data Visualization (Tableau/Seaborn)", category: "Analytics", importance: "Essential", minLevel: "Intermediate" },
      { name: "Exploratory Data Analysis (EDA)", category: "Analytics", importance: "Essential", minLevel: "Advanced" },
      { name: "Machine Learning Modeling", category: "AI/ML", importance: "Essential", minLevel: "Intermediate" }
    ],
    defaultRoadmap: [
      {
        id: "ds-1",
        stepNumber: 1,
        title: "Advanced SQL & Relational Data Extraction",
        skill: "SQL & Advanced Querying",
        duration: "3 Weeks",
        description: "Window functions, CTEs, recursive queries, query execution plans, and data transformations.",
        courses: [{ name: "Advanced SQL for Data Scientists", provider: "Mode Analytics", url: "#", duration: "15 hrs" }],
        tutorials: ["Window Functions Demystified", "Optimizing Slow Analytical SQL Queries"],
        project: { title: "Cohort Retention Analysis in SQL", description: "Write analytical queries to calculate monthly retention cohorts." },
        status: "NEXT_UP",
        priority: "HIGH"
      }
    ]
  },
  {
    id: "ui-ux-designer",
    title: "UI/UX Designer",
    category: "Design & Product",
    description: "Craft engaging, user-centered digital interfaces, design systems, interactive prototypes, and usability test plans.",
    avgSalary: "$90,000 - $130,000",
    growthRate: "+18% (Steady Demand)",
    difficulty: "Beginner to Intermediate",
    requiredSkills: [
      { name: "Figma & Wireframing", category: "Design Tools", importance: "Essential", minLevel: "Advanced" },
      { name: "User Research & Personas", category: "UX", importance: "Essential", minLevel: "Intermediate" },
      { name: "Design Systems & Component Libraries", category: "UI", importance: "Essential", minLevel: "Advanced" },
      { name: "Prototyping & Micro-interactions", category: "UI", importance: "Essential", minLevel: "Intermediate" },
      { name: "Usability Testing & Accessibility (WCAG)", category: "UX", importance: "Important", minLevel: "Intermediate" }
    ],
    defaultRoadmap: [
      {
        id: "ux-1",
        stepNumber: 1,
        title: "Figma Mastery & High-Fidelity UI Design",
        skill: "Figma & Wireframing",
        duration: "3 Weeks",
        description: "Auto Layout 5.0, variables, responsive constraints, and visual hierarchy mastery.",
        courses: [{ name: "Figma UI Masterclass", provider: "DesignCode", url: "#", duration: "18 hrs" }],
        tutorials: ["Auto Layout Secrets for Complex Tables", "Typography Systems & 8pt Grid Scaling"],
        project: { title: "Mobile Banking App UI Concept", description: "Design 15+ screens for fintech following HIG." },
        status: "NEXT_UP",
        priority: "HIGH"
      }
    ]
  },
  {
    id: "cybersecurity-analyst",
    title: "Cybersecurity Analyst",
    category: "Information Security",
    description: "Defend organizational digital assets, audit security postures, analyze vulnerabilities, and respond to threats in real time.",
    avgSalary: "$100,000 - $145,000",
    growthRate: "+32% (Very High Demand)",
    difficulty: "Intermediate to Advanced",
    requiredSkills: [
      { name: "Networking Fundamentals (TCP/IP, DNS)", category: "Network", importance: "Essential", minLevel: "Advanced" },
      { name: "Linux & Bash Scripting", category: "Systems", importance: "Essential", minLevel: "Intermediate" },
      { name: "Vulnerability Assessment & Penetration Testing", category: "Security", importance: "Essential", minLevel: "Intermediate" },
      { name: "SIEM & Threat Monitoring (Splunk)", category: "Security", importance: "Essential", minLevel: "Intermediate" },
      { name: "OWASP Top 10 & Web Security", category: "AppSec", importance: "Essential", minLevel: "Advanced" }
    ],
    defaultRoadmap: [
      {
        id: "sec-1",
        stepNumber: 1,
        title: "Network Protocols & Packet Inspection with Wireshark",
        skill: "Networking Fundamentals (TCP/IP, DNS)",
        duration: "3 Weeks",
        description: "Deep dive into OSI layers, TCP three-way handshake, routing, firewalls, and deep packet inspection.",
        courses: [{ name: "CompTIA Network+ Training", provider: "Professor Messer", url: "#", duration: "22 hrs" }],
        tutorials: ["Analyzing Malicious Traffic in Wireshark", "DNS Poisoning & Mitigations"],
        project: { title: "Network Intrusion Traffic Analysis Report", description: "Analyze a real pcap capture of a simulated brute-force attack." },
        status: "NEXT_UP",
        priority: "HIGH"
      }
    ]
  }
];

export const DEMO_PROFILES: Record<string, UserProfile> = {
  alex: {
    id: "usr_alex_01",
    name: "Alex Morgan",
    email: "alex.morgan@stanford.edu",
    education: "B.S. in Computer Science (Junior)",
    careerGoal: "full-stack-developer",
    skills: [
      { name: "HTML & CSS", level: "Advanced", years: 2, verified: true },
      { name: "JavaScript", level: "Intermediate", years: 1.5, verified: true },
      { name: "Git & Version Control", level: "Intermediate", years: 1, verified: false }
    ],
    experienceLevel: "Intermediate",
    projects: [
      "Personal Portfolio Site (HTML/CSS/JS)",
      "Weather Forecaster App (Fetch API)"
    ],
    roadmapProgress: {
      "step-1": { status: "COMPLETED", completedAt: "2025-01-10" },
      "step-2": { status: "IN_PROGRESS", progress: 65 }
    },
    assessmentScores: {
      "JavaScript": { score: 3, maxScore: 4, takenAt: "2025-01-12", percentage: 75 }
    },
    weeklyHours: 14,
    streakDays: 8
  },
  sarah: {
    id: "usr_sarah_02",
    name: "Sarah Chen",
    email: "sarah.chen@berkeley.edu",
    education: "B.S. in Data Science & Mathematics",
    careerGoal: "ai-engineer",
    skills: [
      { name: "Python", level: "Advanced", years: 3, verified: true },
      { name: "Machine Learning Foundations", level: "Intermediate", years: 1, verified: true },
      { name: "SQL & Advanced Querying", level: "Intermediate", years: 1.5, verified: false }
    ],
    experienceLevel: "Intermediate",
    projects: [
      "Customer Churn Random Forest Model",
      "Sentiment Analysis with NLTK"
    ],
    roadmapProgress: {
      "ai-1": { status: "COMPLETED", completedAt: "2025-01-15" }
    },
    assessmentScores: {
      "Python": { score: 2, maxScore: 2, takenAt: "2025-01-14", percentage: 100 }
    },
    weeklyHours: 18,
    streakDays: 14
  },
  david: {
    id: "usr_david_03",
    name: "David Kim",
    email: "david.kim@cmu.edu",
    education: "B.S. in Information Systems",
    careerGoal: "cybersecurity-analyst",
    skills: [
      { name: "Linux & Bash Scripting", level: "Intermediate", years: 1, verified: true },
      { name: "Networking Fundamentals (TCP/IP, DNS)", level: "Intermediate", years: 1, verified: false }
    ],
    experienceLevel: "Beginner",
    projects: [
      "Home Lab Network with WireGuard and Pi-hole",
      "Basic Port Scanner in Python"
    ],
    roadmapProgress: {
      "sec-1": { status: "IN_PROGRESS", progress: 40 }
    },
    assessmentScores: {},
    weeklyHours: 11,
    streakDays: 4
  }
};

export const LOCAL_ASSESSMENTS: Record<string, Assessment> = {
  "JavaScript": {
    skill: "JavaScript",
    title: "JavaScript ES6+ & Core Architecture Assessment",
    timeLimit: 10,
    questions: [
      {
        id: "js-q1",
        question: "What will be printed to the console given this code snippet?",
        code: `console.log(1);\nsetTimeout(() => console.log(2), 0);\nPromise.resolve().then(() => console.log(3));\nconsole.log(4);`,
        options: [
          "1, 2, 3, 4",
          "1, 4, 3, 2",
          "1, 4, 2, 3",
          "1, 3, 4, 2"
        ],
        correctIndex: 1,
        explanation: "Synchronous code runs first (1, 4). Microtasks from Promise resolution run before macrotasks (3), and setTimeout callback runs in the next macrotask turn (2)."
      },
      {
        id: "js-q2",
        question: "Which of the following creates a genuine lexical closure in JavaScript?",
        code: `function createCounter() {\n  let count = 0;\n  return function() {\n    return ++count;\n  };\n}`,
        options: [
          "An inner function referencing a variable defined in its outer enclosing function scope",
          "Passing an object by reference to another function",
          "Using the 'bind' method on an arrow function",
          "Declaring variables with 'var' instead of 'let'"
        ],
        correctIndex: 0,
        explanation: "A closure is formed when an inner function retains access to its enclosing lexical scope even after the outer function has executed."
      },
      {
        id: "js-q3",
        question: "What is the primary difference between Promise.all() and Promise.allSettled()?",
        options: [
          "Promise.all returns immediately with undefined, while allSettled returns an array",
          "Promise.all rejects immediately if any promise rejects; Promise.allSettled waits for all promises to settle regardless of rejection",
          "Promise.allSettled only works in Node.js environments",
          "Promise.all executes promises sequentially whereas allSettled runs in parallel"
        ],
        correctIndex: 1,
        explanation: "Promise.all fails-fast on the first rejection, whereas Promise.allSettled returns an array of objects describing each outcome."
      },
      {
        id: "js-q4",
        question: "What does the 'typeof NaN' expression evaluate to in JavaScript?",
        options: [
          "'undefined'",
          "'null'",
          "'number'",
          "'NaN'"
        ],
        correctIndex: 2,
        explanation: "In JavaScript, NaN (Not-a-Number) is a special numeric value defined by IEEE 754, so typeof NaN === 'number'."
      }
    ]
  },
  "React.js": {
    skill: "React.js",
    title: "React.js Component Architecture & Hooks Assessment",
    timeLimit: 10,
    questions: [
      {
        id: "react-q1",
        question: "Why should you never call React Hooks inside loops, conditions, or nested functions?",
        options: [
          "It causes TypeScript compilation errors only",
          "React relies on the exact order in which Hooks are called across multiple renders to preserve state",
          "Hooks execute synchronously in the browser main thread and cause stack overflows",
          "React requires all hooks to be async functions"
        ],
        correctIndex: 1,
        explanation: "React relies on a predictable hook invocation order on each render to match up hook states with their internal linked list."
      },
      {
        id: "react-q2",
        question: "When should you use the 'useCallback' hook in a React component?",
        options: [
          "To fetch remote API data inside useEffect",
          "To cache the returned value of an expensive calculation",
          "To preserve referential identity of a callback passed to an optimized child component wrapped in React.memo",
          "To force a component to re-render without state update"
        ],
        correctIndex: 2,
        explanation: "useCallback caches the function instance between renders, preventing unnecessary child re-renders when children depend on reference equality."
      },
      {
        id: "react-q3",
        question: "What is the purpose of the key prop when rendering lists in React?",
        options: [
          "It provides CSS styling hooks for list elements",
          "It helps React identify which items have changed, been added, or been removed for efficient reconciliation",
          "It encrypts sensitive list data in the DOM",
          "It assigns unique tabindex values for keyboard accessibility"
        ],
        correctIndex: 1,
        explanation: "React's Virtual DOM reconciliation diffing algorithm uses the key prop to uniquely match items across renders."
      }
    ]
  },
  "Python": {
    skill: "Python",
    title: "Python Data Structures & Computational Foundations",
    timeLimit: 10,
    questions: [
      {
        id: "py-q1",
        question: "What is the time complexity of looking up a key in a standard Python dictionary on average?",
        options: [
          "O(n)",
          "O(log n)",
          "O(1)",
          "O(n^2)"
        ],
        correctIndex: 2,
        explanation: "Python dictionaries are implemented as hash tables, providing average O(1) time complexity for lookup, insertion, and deletion."
      },
      {
        id: "py-q2",
        question: "What keyword is used to create a generator function in Python that produces a lazy sequence?",
        options: [
          "generate",
          "return lazy",
          "yield",
          "stream"
        ],
        correctIndex: 2,
        explanation: "The 'yield' statement pauses the function and emits a value to the caller, resuming state on subsequent next() calls."
      }
    ]
  }
};

export function generateLocalCollaboration(payload: any) {
  const { skills = [], careerId = "full-stack-developer", roadmapProgress = {}, assessmentScores = {}, weeklyHours = 12 } = payload;
  const career = DEFAULT_CAREERS.find(c => c.id === careerId) || DEFAULT_CAREERS[0];
  const userSkillNames = new Set(skills.map((s: any) => (typeof s === 'string' ? s : s.name).toLowerCase()));

  const matchedSkills: any[] = [];
  const missingSkills: any[] = [];

  career.requiredSkills.forEach(req => {
    const isMatched = Array.from(userSkillNames).some((us: any) => 
      us.includes(req.name.toLowerCase()) || req.name.toLowerCase().includes(us)
    );
    if (isMatched) matchedSkills.push(req);
    else missingSkills.push(req);
  });

  const matchPercentage = Math.round((matchedSkills.length / career.requiredSkills.length) * 100);
  const gapPercentage = 100 - matchPercentage;

  const roadmap = career.defaultRoadmap.map((step, idx) => {
    const isCompleted = roadmapProgress[step.id]?.status === 'COMPLETED';
    const isInProgress = roadmapProgress[step.id]?.status === 'IN_PROGRESS';
    let status = step.status;
    if (isCompleted) status = 'COMPLETED';
    else if (isInProgress) status = 'IN_PROGRESS';
    else if (idx === 0 || !career.defaultRoadmap.slice(0, idx).some(p => !roadmapProgress[p.id])) {
      status = 'NEXT_UP';
    }
    return {
      ...step,
      status,
      recommendedAction: `Focus on mastering ${step.skill} through hands-on project creation.`
    };
  });

  const completedSteps = roadmap.filter(s => s.status === 'COMPLETED').length;
  const completionRate = Math.round((completedSteps / roadmap.length) * 100);

  const agentLogs = [
    {
      step: 1,
      agent: "Skill Analysis Agent",
      role: "Skill Parser & Auditor",
      timestamp: "T+0.05s",
      action: "Audited declared proficiencies",
      message: `Parsed ${skills.length} user skills. Verified strengths: ${skills.map((s: any) => s.name || s).join(', ')}. Passing profile to Career Guidance Agent.`,
      status: "success" as const
    },
    {
      step: 2,
      agent: "Career Guidance Agent",
      role: "Market Alignment & Gap Engine",
      timestamp: "T+0.21s",
      action: "Matched against industry benchmark requirements",
      message: `Evaluated requirements for ${career.title}. Detected match score of ${matchPercentage}%. Identified ${missingSkills.length} missing skill competencies.`,
      status: "success" as const
    },
    {
      step: 3,
      agent: "Learning Recommendation Agent",
      role: "Curriculum Architect",
      timestamp: "T+0.42s",
      action: "Synthesized personalized milestone path",
      message: `Generated customized 7-stage learning roadmap targeting missing skills (${missingSkills.map(m => m.name).slice(0, 3).join(', ')}).`,
      status: "success" as const
    },
    {
      step: 4,
      agent: "Progress Evaluation Agent",
      role: "Adaptive Calibration Monitor",
      timestamp: "T+0.60s",
      action: "Calibrated velocity and milestone difficulty",
      message: `Current completion rate: ${completionRate}%. Weekly commitment: ${weeklyHours} hrs. Adaptive velocity confirmed at 'On Track'.`,
      status: "success" as const
    }
  ];

  return {
    success: true,
    timestamp: new Date().toISOString(),
    agentLogs,
    skillAnalysis: {
      agent: "Skill Analysis Agent",
      strengths: skills.map((s: any) => ({ name: s.name || s, level: s.level || 'Intermediate' })),
      proficiencies: {},
      summary: `Found ${skills.length} verified competencies and mapped learning needs.`
    },
    careerMatch: {
      agent: "Career Guidance Agent",
      careerId: career.id,
      careerTitle: career.title,
      matchPercentage,
      gapPercentage,
      alignmentVerdict: matchPercentage >= 70 ? "Strong Alignment" : "High Growth Opportunity",
      matchedSkills,
      missingSkills,
      salaryRange: career.avgSalary,
      marketDemand: career.growthRate,
      guidanceNote: `Focus on mastering ${missingSkills.slice(0, 3).map(m => m.name).join(', ')} to boost match rate above 85%.`
    },
    learningRoadmap: roadmap,
    recommendedCourses: career.defaultRoadmap.flatMap(s => s.courses || []).slice(0, 6),
    suggestedProjects: career.defaultRoadmap.map(s => s.project).filter(Boolean).slice(0, 4),
    progressEvaluation: {
      agent: "Progress Evaluation Agent",
      completionRate,
      completedStepsCount: completedSteps,
      totalStepsCount: roadmap.length,
      velocityStatus: "On Track",
      weeklyHours,
      avgAssessmentScore: 82,
      earnedBadges: [
        { id: 'first-step', name: 'First Milestone', icon: 'Rocket', unlocked: completedSteps >= 1 },
        { id: 'top-scorer', name: 'Skill Mastery', icon: 'Award', unlocked: true },
        { id: 'consistency', name: 'Consistency Champion', icon: 'Flame', unlocked: weeklyHours >= 10 }
      ]
    }
  };
}

export function generateLocalChatReply(message: string, userContext: any) {
  const { name = "Learner", careerGoal = "Full Stack Developer", missingSkills = [], completionRate = 25 } = userContext;
  const lower = message.toLowerCase();

  let reply = "";
  let suggestedActions: string[] = [];

  if (lower.includes("gap") || lower.includes("missing")) {
    const topMissing = missingSkills.length > 0 
      ? missingSkills.map((s: any) => typeof s === 'string' ? s : s.name).slice(0, 3).join(', ')
      : "React.js, Node.js, and Database Architecture";
    reply = `Hello ${name}! For your target role as a **${careerGoal}**, your highest priority skill gaps are: **${topMissing}**.\n\nOur Learning Recommendation Agent suggests focusing on component architecture in React first, followed by building REST APIs with Express. Would you like to practice with a quiz or review recommended courses?`;
    suggestedActions = ["Take a Skill Quiz", "View Recommended Courses", "Explore Projects"];
  } else if (lower.includes("switch") || lower.includes("career") || lower.includes("goal")) {
    reply = `You're currently targeted for **${careerGoal}**. Switching is seamless! \n\nFor example, if you switch to **AI Engineer**, your analytical and coding foundation will transfer, while we add Python, PyTorch, and RAG pipelines to your roadmap.\n\nWould you like to explore other career tracks?`;
    suggestedActions = ["Switch to AI Engineer", "Switch to Data Scientist", "Keep Current Goal"];
  } else if (lower.includes("quiz") || lower.includes("test") || lower.includes("assessment")) {
    reply = `Skill assessments directly calibrate your learning path! We currently have interactive quizzes for **JavaScript**, **React.js**, and **Python**. Scoring 70%+ verifies proficiency and automatically unlocks new milestones!`;
    suggestedActions = ["Take JavaScript Quiz", "Take React.js Quiz", "Take Python Quiz"];
  } else if (lower.includes("project") || lower.includes("portfolio")) {
    reply = `Building real-world projects is the fastest way to bridge skill gaps! For your current stage in **${careerGoal}**, our Learning Recommendation Agent suggests:\n\n1. **Collaborative Task Workspace** (React + State)\n2. **Financial Analytics Dashboard** (Async JS + Charts)\n3. **Secure E-Commerce API** (Express + PostgreSQL)\n\nWhich one would you like to add to your sprint?`;
    suggestedActions = ["Start Collaborative Workspace", "Start E-Commerce API", "View Project Specs"];
  } else {
    reply = `Hi ${name}! As your dedicated Learnexa AI Mentor, I'm here to accelerate your journey to becoming a certified **${careerGoal}**.\n\nWith your completion rate at **${completionRate}%**, you're making steady headway. How can I help you today?`;
    suggestedActions = ["Review my skill gaps", "What should I learn today?", "Take an assessment"];
  }

  return {
    success: true,
    sender: "Learnexa AI Mentor",
    reply,
    suggestedActions,
    timestamp: new Date().toISOString()
  };
}

export function gradeLocalAssessment(skill: string, answers: Record<string, number>) {
  const assessment = LOCAL_ASSESSMENTS[skill];
  if (!assessment) return { success: false, message: "Assessment not found" };

  let score = 0;
  const total = assessment.questions.length;
  const breakdown = assessment.questions.map(q => {
    const userAnswer = answers[q.id];
    const isCorrect = userAnswer === q.correctIndex;
    if (isCorrect) score += 1;
    return {
      questionId: q.id,
      question: q.question,
      userAnswer,
      correctIndex: q.correctIndex,
      isCorrect,
      explanation: q.explanation
    };
  });

  const percentage = Math.round((score / total) * 100);
  const passed = percentage >= 70;

  return {
    success: true,
    skill,
    score,
    total,
    percentage,
    passed,
    proficiency: percentage >= 90 ? "Advanced / Master" : percentage >= 70 ? "Intermediate" : "Developing",
    breakdown,
    feedback: passed 
      ? `Outstanding! You achieved ${percentage}% and validated proficiency in ${skill}.`
      : `You scored ${percentage}%. Review the questions below and retake the quiz to level up!`
  };
}
