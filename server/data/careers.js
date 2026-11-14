export const CAREERS_DATA = [
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
      { name: "Docker & Containerization", category: "DevOps", importance: "Nice to have", minLevel: "Basic" },
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
          description: "Build a pixel-perfect, accessible, mobile-first product landing page with dark mode support."
        }
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
          description: "Build an interactive client-side dashboard with state management, chart visualization, and localStorage persistence."
        }
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
          description: "Develop a real-time Kanban board with drag-and-drop, optimistic updates, and keyboard shortcuts."
        }
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
          description: "Create a CLI tool that parses, converts, and indexes large CSV/JSON streams with low memory footprint."
        }
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
          description: "Build a complete REST API with role-based auth, product search, cart logic, and Stripe webhook handling."
        }
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
          description: "Design relational models for user profiles, follows, posts, comments, tags, and audit logging with indexes."
        }
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
          description: "Deploy an end-to-end full stack web application with containerization, automated testing, and custom domain SSL."
        }
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
      { name: "FastAPI / Model Serving", category: "Backend", importance: "Important", minLevel: "Intermediate" },
      { name: "Docker & GPU Cloud Infrastructure", category: "DevOps", importance: "Nice to have", minLevel: "Basic" }
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
          { name: "Python for Everybody", provider: "University of Michigan / Coursera", url: "#", duration: "20 hrs" },
          { name: "Applied Data Science with Python", provider: "DataCamp", url: "#", duration: "18 hrs" }
        ],
        tutorials: ["Vectorized NumPy Performance", "High-performance Python with AsyncIO"],
        project: {
          title: "Data Preprocessing & EDA Pipeline",
          description: "Build an automated cleaning and feature engineering pipeline on real-world tabular data."
        }
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
          description: "Train, validate, and compare Random Forest and XGBoost classifiers with ROC-AUC analysis."
        }
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
          description: "Implement multi-head self-attention layer in PyTorch and train sentiment classifier."
        }
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
          description: "Create an enterprise document Q&A engine with vector search and citations."
        }
      },
      {
        id: "ai-5",
        stepNumber: 5,
        title: "Multi-Agent Architectures & LLM Orchestration",
        skill: "LangChain / LlamaIndex / Agent Frameworks",
        duration: "3 Weeks",
        description: "Design autonomous agent systems, tool calling, memory management, and feedback evaluation loops.",
        courses: [
          { name: "AI Agents in Practice", provider: "Learnexa AI Labs", url: "#", duration: "16 hrs" }
        ],
        tutorials: ["ReAct Agent Prompting Framework", "Multi-Agent Supervisor Patterns"],
        project: {
          title: "Autonomous Research & Report Agent Swarm",
          description: "Build a swarm of agents that gather web data, synthesize summaries, and generate formatted PDF reports."
        }
      },
      {
        id: "ai-6",
        stepNumber: 6,
        title: "Model Serving & High-Performance FastAPI Deployment",
        skill: "FastAPI / Model Serving",
        duration: "3 Weeks",
        description: "Package LLMs and ML models into production microservices with streaming responses, batching, and Docker.",
        courses: [
          { name: "Deploying Machine Learning Models", provider: "Full Stack Deep Learning", url: "#", duration: "18 hrs" }
        ],
        tutorials: ["Server-Sent Events (SSE) for LLM Streaming", "vLLM High-throughput Inference"],
        project: {
          title: "Production AI Microservice API",
          description: "Deploy a low-latency LLM inference API with rate limiting, token usage metering, and streaming output."
        }
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
      { name: "Machine Learning Modeling", category: "AI/ML", importance: "Essential", minLevel: "Intermediate" },
      { name: "A/B Testing & Experimentation", category: "Analytics", importance: "Important", minLevel: "Intermediate" }
    ],
    defaultRoadmap: [
      {
        id: "ds-1",
        stepNumber: 1,
        title: "Advanced SQL & Relational Data Extraction",
        skill: "SQL & Advanced Querying",
        duration: "3 Weeks",
        description: "Window functions, CTEs, recursive queries, query execution plans, and data transformations.",
        courses: [
          { name: "Advanced SQL for Data Scientists", provider: "Mode Analytics", url: "#", duration: "15 hrs" }
        ],
        tutorials: ["Window Functions Demystified", "Optimizing Slow Analytical SQL Queries"],
        project: {
          title: "User Retention Cohort Analysis in SQL",
          description: "Write production analytical SQL scripts to calculate monthly retention cohorts and customer LTV."
        }
      },
      {
        id: "ds-2",
        stepNumber: 2,
        title: "Applied Probability, Statistics & Hypothesis Testing",
        skill: "Statistics & Probability",
        duration: "3 Weeks",
        description: "Probability distributions, central limit theorem, p-values, hypothesis tests, ANOVA, and regression analysis.",
        courses: [
          { name: "Statistics for Data Science", provider: "Stanford Online", url: "#", duration: "20 hrs" }
        ],
        tutorials: ["Frequentist vs Bayesian Thinking", "Interpreting Statistical Power & Type I/II Errors"],
        project: {
          title: "Statistical Drug Efficacy Study",
          description: "Conduct hypothesis testing on simulated clinical trial data with rigorous confidence interval reporting."
        }
      },
      {
        id: "ds-3",
        stepNumber: 3,
        title: "Data Wrangling & Storytelling Visualizations",
        skill: "Data Visualization (Tableau/Seaborn)",
        duration: "2 Weeks",
        description: "Design intuitive charts with Matplotlib, Seaborn, and Plotly that convey critical business metrics effortlessly.",
        courses: [
          { name: "Data Storytelling and Visualization", provider: "HarvardX", url: "#", duration: "14 hrs" }
        ],
        tutorials: ["Choosing the Right Chart for Every Metric", "Interactive Web Visualizations with Plotly"],
        project: {
          title: "Executive Business Performance Dashboard",
          description: "Build an interactive multi-faceted dashboard displaying sales funnels, regional trends, and projections."
        }
      },
      {
        id: "ds-4",
        stepNumber: 4,
        title: "Predictive Modeling & Feature Engineering",
        skill: "Machine Learning Modeling",
        duration: "4 Weeks",
        description: "Feature scaling, encoding, cross-validation strategies, regression, classification, and SHAP interpretability.",
        courses: [
          { name: "Applied Machine Learning in Python", provider: "University of Michigan", url: "#", duration: "25 hrs" }
        ],
        tutorials: ["Handling Imbalanced Datasets (SMOTE vs Cost-sensitive)", "Explaining Models with SHAP Values"],
        project: {
          title: "Loan Default Risk Prediction System",
          description: "Train a gradient boosting model to predict financial default with explainable AI feature importances."
        }
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
      { name: "Usability Testing & Accessibility (WCAG)", category: "UX", importance: "Important", minLevel: "Intermediate" },
      { name: "Basic HTML & CSS", category: "Frontend", importance: "Nice to have", minLevel: "Basic" }
    ],
    defaultRoadmap: [
      {
        id: "ux-1",
        stepNumber: 1,
        title: "Figma Mastery & High-Fidelity UI Design",
        skill: "Figma & Wireframing",
        duration: "3 Weeks",
        description: "Auto Layout 5.0, variables, responsive constraints, token systems, and visual hierarchy mastery.",
        courses: [
          { name: "Figma UI Masterclass", provider: "DesignCode", url: "#", duration: "18 hrs" }
        ],
        tutorials: ["Auto Layout Secrets for Complex Tables", "Typography Systems & 8pt Grid Scaling"],
        project: {
          title: "Mobile Banking App UI Concept",
          description: "Design 15+ pixel-perfect screens for a fintech app following iOS Human Interface Guidelines."
        }
      },
      {
        id: "ux-2",
        stepNumber: 2,
        title: "User Research & Journey Mapping",
        skill: "User Research & Personas",
        duration: "2 Weeks",
        description: "Conduct user interviews, synthesize empathy maps, construct journey maps, and formulate problem statements.",
        courses: [
          { name: "Google UX Design Professional Certificate", provider: "Coursera", url: "#", duration: "30 hrs" }
        ],
        tutorials: ["Constructing Actionable User Personas", "Card Sorting for Information Architecture"],
        project: {
          title: "E-Commerce Checkout Friction Research Case Study",
          description: "Produce a comprehensive UX research case study identifying checkout drop-off causes and proposed wireframe fixes."
        }
      },
      {
        id: "ux-3",
        stepNumber: 3,
        title: "Scalable Multi-Theme Design Systems",
        skill: "Design Systems & Component Libraries",
        duration: "3 Weeks",
        description: "Build production design tokens, accessible color palettes, nested interactive component states, and documentation.",
        courses: [
          { name: "Design Systems with Figma", provider: "Smashing Magazine", url: "#", duration: "14 hrs" }
        ],
        tutorials: ["Setting up Design Tokens in Figma", "Atomic Design in Modern Product Teams"],
        project: {
          title: "Nova Design System for Enterprise SaaS",
          description: "Build an accessible design system comprising 30+ components with dark and light theme tokens."
        }
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
      { name: "OWASP Top 10 & Web Security", category: "AppSec", importance: "Essential", minLevel: "Advanced" },
      { name: "Cryptography & PKI", category: "Security", importance: "Important", minLevel: "Intermediate" }
    ],
    defaultRoadmap: [
      {
        id: "sec-1",
        stepNumber: 1,
        title: "Network Protocols & Packet Inspection with Wireshark",
        skill: "Networking Fundamentals (TCP/IP, DNS)",
        duration: "3 Weeks",
        description: "Deep dive into OSI layers, TCP three-way handshake, routing, firewalls, and deep packet inspection.",
        courses: [
          { name: "CompTIA Network+ Training", provider: "Professor Messer", url: "#", duration: "22 hrs" }
        ],
        tutorials: ["Analyzing Malicious Traffic in Wireshark", "DNS Poisoning & Mitigations"],
        project: {
          title: "Network Intrusion Traffic Analysis Report",
          description: "Analyze a real pcap capture of a simulated brute-force and port scan attack and document incident timeline."
        }
      },
      {
        id: "sec-2",
        stepNumber: 2,
        title: "Linux Hardening & Security Administration",
        skill: "Linux & Bash Scripting",
        duration: "3 Weeks",
        description: "File permissions, SSH hardening, iptables/ufw configuration, auditd, and automated log parsing scripts.",
        courses: [
          { name: "Linux Security Fundamentals", provider: "Linux Foundation", url: "#", duration: "16 hrs" }
        ],
        tutorials: ["Hardening an Ubuntu Server from Scratch", "Writing Threat Detection Bash Scripts"],
        project: {
          title: "Automated Host Hardening Script",
          description: "Write a modular Bash automation script that audits SSH configs, closes unused ports, and sets fail2ban."
        }
      },
      {
        id: "sec-3",
        stepNumber: 3,
        title: "Application Security & OWASP Top 10 Mitigation",
        skill: "OWASP Top 10 & Web Security",
        duration: "4 Weeks",
        description: "Understand SQL injection, XSS, CSRF, SSRF, Broken Access Control, and implement robust web defenses.",
        courses: [
          { name: "Web Application Penetration Testing", provider: "PortSwigger Web Security Academy", url: "#", duration: "30 hrs" }
        ],
        tutorials: ["Defending Modern SPAs against XSS & CSRF", "Securing API Tokens & Auth Flows"],
        project: {
          title: "Vulnerability Assessment & Remediation Report",
          description: "Perform simulated penetration testing on an intentionally vulnerable web application and formulate remediations."
        }
      }
    ]
  }
];
