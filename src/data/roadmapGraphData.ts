export interface RoadmapTopicNode {
  id: string;
  type: 'topic' | 'checkpoint';
  title: string;
  track: 'frontend' | 'backend' | 'devops' | 'core' | 'ai' | 'security' | 'design' | 'data';
  description: string;
  duration?: string;
  importance?: 'Essential' | 'Recommended' | 'Alternative';
  courses?: { name: string; provider: string; url: string; duration: string }[];
  tutorials?: string[];
  projectBrief?: string;
  deliverable?: string[];
  status?: 'COMPLETED' | 'IN_PROGRESS' | 'NEXT_UP' | 'LOCKED';
}

export interface RoadmapSection {
  id: string;
  title: string;
  description: string;
  nodes: RoadmapTopicNode[];
  checkpoint: RoadmapTopicNode;
}

export interface RoleRoadmapGraph {
  roleId: string;
  roleTitle: string;
  category: string;
  description: string;
  targetAudience: string;
  tracks: string[];
  sections: RoadmapSection[];
}

export const ROLE_ROADMAPS: Record<string, RoleRoadmapGraph> = {
  "full-stack-developer": {
    roleId: "full-stack-developer",
    roleTitle: "Full Stack Developer",
    category: "Software Engineering",
    description: "Full-stack developers design, code, and deploy complete web applications from interactive user interfaces to scalable databases and cloud servers.",
    targetAudience: "Target audience for this roadmap is absolute beginners to intermediate developers wanting to get into full-stack development.",
    tracks: ["All Tracks", "Frontend", "Backend", "DevOps"],
    sections: [
      {
        id: "fs-sec-1",
        title: "1. Web Foundations & Structure",
        description: "Master modern semantic markup and responsive styling for the open web.",
        nodes: [
          {
            id: "node-html",
            type: "topic",
            title: "HTML5 & Semantic Markup",
            track: "frontend",
            description: "Structure web content semantically, modern HTML5 elements, accessibility (WCAG), and SEO best practices.",
            importance: "Essential",
            duration: "1 Week",
            courses: [{ name: "Responsive Web Design Certification", provider: "freeCodeCamp", url: "https://www.freecodecamp.org", duration: "12 hrs" }],
            tutorials: ["Semantic HTML Guidelines", "Web Accessibility (a11y) Fundamentals"]
          },
          {
            id: "node-css",
            type: "topic",
            title: "CSS3 & Modern Layouts",
            track: "frontend",
            description: "Flexbox, CSS Grid, media queries, positioning, custom properties (CSS variables), and animations.",
            importance: "Essential",
            duration: "2 Weeks",
            courses: [{ name: "Modern CSS from Beginning to Pro", provider: "Learnexa Academy", url: "#", duration: "15 hrs" }],
            tutorials: ["CSS Grid Deep Dive", "Fluid Responsive Layouts"]
          }
        ],
        checkpoint: {
          id: "chk-static-webpages",
          type: "checkpoint",
          title: "Checkpoint - Static Webpages",
          track: "frontend",
          description: "Build a pixel-perfect, responsive SaaS product landing page with accessible navigation and dark mode toggle.",
          projectBrief: "Build an accessible, mobile-first SaaS landing page without frameworks to solidify layout mastery.",
          deliverable: ["Semantic HTML5 page structure", "Flexbox and CSS Grid layout", "100% Mobile Responsive design", "Valid Lighthouse score > 90"]
        }
      },
      {
        id: "fs-sec-2",
        title: "2. Client-Side Interactivity & Version Control",
        description: "Programming fundamentals, asynchronous behavior, and collaborative git workflows.",
        nodes: [
          {
            id: "node-js",
            type: "topic",
            title: "Modern JavaScript (ES6+)",
            track: "frontend",
            description: "Closures, prototypal inheritance, promises, async/await, DOM manipulation, fetch API, and event loop.",
            importance: "Essential",
            duration: "3 Weeks",
            courses: [{ name: "JavaScript: The Hard Parts", provider: "Frontend Masters", url: "#", duration: "16 hrs" }],
            tutorials: ["Event Loop and Microtasks in V8", "Modern ES6+ Modules & Destructuring"]
          },
          {
            id: "node-git",
            type: "topic",
            title: "Git & GitHub Workflow",
            track: "devops",
            description: "Branching strategies, pull requests, resolving merge conflicts, git rebase, and tagging releases.",
            importance: "Essential",
            duration: "1 Week",
            courses: [{ name: "Version Control with Git", provider: "Atlassian / Coursera", url: "#", duration: "8 hrs" }],
            tutorials: ["Git Branching Strategies (GitFlow vs Trunk-Based)", "Interactive Rebase Secrets"]
          },
          {
            id: "node-npm",
            type: "topic",
            title: "npm & Package Ecosystem",
            track: "frontend",
            description: "Package.json management, semantic versioning, lockfiles, scripts, and third-party dependency auditing.",
            importance: "Essential",
            duration: "3 Days",
            courses: [{ name: "Node Package Manager Guide", provider: "Egghead.io", url: "#", duration: "4 hrs" }]
          }
        ],
        checkpoint: {
          id: "chk-interactivity",
          type: "checkpoint",
          title: "Checkpoint - Interactive App & Collaborative Work",
          track: "frontend",
          description: "Build an interactive client-side analytics dashboard with live search, filtering, and localStorage state persistence pushed to a GitHub repository with branches.",
          projectBrief: "Interactive client dashboard utilizing fetch API, ES6 modules, and published to GitHub with CI/CD action.",
          deliverable: ["Dynamic DOM updates", "Async API fetching & error states", "GitHub repository with feature branches", "Pull request with code review"]
        }
      },
      {
        id: "fs-sec-3",
        title: "3. Component Frontend Frameworks",
        description: "Declarative UI architecture, hooks, state management, and utility CSS.",
        nodes: [
          {
            id: "node-react",
            type: "topic",
            title: "React.js & Component Architecture",
            track: "frontend",
            description: "JSX, props, state, custom hooks, useEffect lifecycle, context API, memoization, and component composition.",
            importance: "Essential",
            duration: "4 Weeks",
            courses: [{ name: "Epic React with Kent C. Dodds", provider: "EpicReact.dev", url: "#", duration: "24 hrs" }],
            tutorials: ["Custom Hooks Design Patterns", "Avoiding Unnecessary Rerenders with useMemo/useCallback"]
          },
          {
            id: "node-tailwind",
            type: "topic",
            title: "Tailwind CSS & Design Systems",
            track: "frontend",
            description: "Utility-first styling, responsive prefixes, custom themes, dark mode variants, and headless component styling.",
            importance: "Recommended",
            duration: "1 Week",
            courses: [{ name: "Tailwind CSS Masterclass", provider: "Tailwind Labs", url: "#", duration: "10 hrs" }]
          }
        ],
        checkpoint: {
          id: "chk-frontend-apps",
          type: "checkpoint",
          title: "Checkpoint - Production React Application",
          track: "frontend",
          description: "Develop a real-time collaborative Kanban board or Task workspace with drag-and-drop, optimistic updates, and clean modular architecture.",
          projectBrief: "Build an end-to-end single-page application using React, TypeScript, and Tailwind CSS.",
          deliverable: ["Reusable component library", "State management with React Context / Zustand", "Keyboard navigation & accessible modals", "Vite build & Netlify/Vercel deployment"]
        }
      },
      {
        id: "fs-sec-4",
        title: "4. Backend Engineering & REST APIs",
        description: "Server architecture, middleware, authentication, and HTTP request lifecycles.",
        nodes: [
          {
            id: "node-nodejs",
            type: "topic",
            title: "Node.js Asynchronous Runtime",
            track: "backend",
            description: "Event-driven architecture, non-blocking I/O, streams, buffers, file systems, and worker threads.",
            importance: "Essential",
            duration: "3 Weeks",
            courses: [{ name: "Node.js Application Design", provider: "NodeSource / edX", url: "#", duration: "18 hrs" }],
            tutorials: ["Understanding the Libuv Event Loop", "Streaming Large Files with Node Streams"]
          },
          {
            id: "node-express",
            type: "topic",
            title: "Express.js RESTful APIs",
            track: "backend",
            description: "Routing, request middleware, JWT authentication, rate limiting, error handlers, and input validation schemas.",
            importance: "Essential",
            duration: "2 Weeks",
            courses: [{ name: "Production Ready Node Express APIs", provider: "Learnexa Pro", url: "#", duration: "14 hrs" }]
          }
        ],
        checkpoint: {
          id: "chk-rest-apis",
          type: "checkpoint",
          title: "Checkpoint - Secure REST API Service",
          track: "backend",
          description: "Build a production-grade REST API with role-based JWT auth, password hashing with bcrypt, input validation with Zod, and API documentation with Swagger.",
          projectBrief: "Architect a robust backend API service powering user management, posts, and transactions.",
          deliverable: ["JWT authentication with refresh tokens", "Rate limiting and CORS protection", "Comprehensive error response envelope", "Automated unit tests with Jest / Supertest"]
        }
      },
      {
        id: "fs-sec-5",
        title: "5. Databases & Production Full Stack Capstone",
        description: "Relational vs NoSQL modeling, ACID transactions, containerization, and cloud deployment.",
        nodes: [
          {
            id: "node-db",
            type: "topic",
            title: "PostgreSQL & MongoDB (SQL + NoSQL)",
            track: "backend",
            description: "Relational schema design, indexes, joins, ACID transactions, Prisma ORM, Mongoose schemas, and aggregations.",
            importance: "Essential",
            duration: "3 Weeks",
            courses: [{ name: "PostgreSQL for Professionals", provider: "Datacamp", url: "#", duration: "16 hrs" }],
            tutorials: ["B-Tree Indexes and EXPLAIN ANALYZE", "Database Normalization Tradeoffs"]
          },
          {
            id: "node-docker",
            type: "topic",
            title: "Docker & Containerization",
            track: "devops",
            description: "Dockerfiles, multi-stage builds, docker-compose, volume mounting, and network bridges for web stacks.",
            importance: "Recommended",
            duration: "2 Weeks",
            courses: [{ name: "Docker for Web Developers", provider: "Docker Captains", url: "#", duration: "10 hrs" }]
          }
        ],
        checkpoint: {
          id: "chk-fullstack-capstone",
          type: "checkpoint",
          title: "Checkpoint - Full Stack Capstone & Cloud Deploy",
          track: "devops",
          description: "Integrate the complete stack: React frontend + Express backend + PostgreSQL database + Docker containers deployed to cloud infrastructure with automated CI/CD.",
          projectBrief: "Ship a full stack web platform (e.g. Learnexa Platform) with database persistence, auth, and automated deployment.",
          deliverable: ["Connected frontend and backend repositories", "Dockerized microservices architecture", "Automated GitHub Actions CI/CD pipeline", "Production live URL with custom domain SSL"]
        }
      }
    ]
  },
  "ai-engineer": {
    roleId: "ai-engineer",
    roleTitle: "AI Engineer",
    category: "Artificial Intelligence & LLMs",
    description: "AI Engineers integrate large language models, build multi-agent swarms, design RAG retrieval pipelines, and deploy neural inference microservices.",
    targetAudience: "For software engineers and STEM students transitioning into practical Artificial Intelligence & generative model engineering.",
    tracks: ["All Tracks", "Core AI", "LLMs & RAG", "Deployment"],
    sections: [
      {
        id: "ai-sec-1",
        title: "1. Python for AI & Data Computing",
        description: "High-performance Python, vectorization with NumPy, and tabular feature engineering.",
        nodes: [
          {
            id: "node-python",
            type: "topic",
            title: "Python 3.12+ Scientific Computing",
            track: "core",
            description: "List comprehensions, generators, async programming, typing, and object-oriented architectures.",
            importance: "Essential",
            duration: "2 Weeks",
            courses: [{ name: "Python for Everybody Specialization", provider: "Univ of Michigan", url: "#", duration: "18 hrs" }]
          },
          {
            id: "node-numpy-pandas",
            type: "topic",
            title: "NumPy & Pandas Vectorization",
            track: "core",
            description: "Matrix math, broadcasting, indexing, dataframe aggregations, and vectorized performance profiling.",
            importance: "Essential",
            duration: "2 Weeks",
            courses: [{ name: "Applied Data Science with Python", provider: "DataCamp", url: "#", duration: "15 hrs" }]
          }
        ],
        checkpoint: {
          id: "chk-ai-eda",
          type: "checkpoint",
          title: "Checkpoint - Automated Data Pipeline & EDA",
          track: "core",
          description: "Build an automated data cleaning, normalization, and feature correlation pipeline on real-world multi-modal datasets.",
          projectBrief: "Build an end-to-end Python pipeline that ingests raw telemetry data and outputs feature-ready tensors.",
          deliverable: ["Vectorized data preprocessing", "Missing value imputation strategies", "Correlation matrix visualizations", "Unit tested pipeline functions"]
        }
      },
      {
        id: "ai-sec-2",
        title: "2. Classical Machine Learning & Neural Networks",
        description: "Supervised classifiers, gradient descent, PyTorch tensors, and backpropagation.",
        nodes: [
          {
            id: "node-scikit",
            type: "topic",
            title: "Scikit-Learn & Classical ML",
            track: "ai",
            description: "Linear/logistic regression, random forests, XGBoost, cross-validation, and ROC-AUC evaluation.",
            importance: "Essential",
            duration: "3 Weeks",
            courses: [{ name: "Machine Learning Specialization", provider: "DeepLearning.AI / Andrew Ng", url: "#", duration: "28 hrs" }]
          },
          {
            id: "node-pytorch",
            type: "topic",
            title: "PyTorch & Deep Learning Foundations",
            track: "ai",
            description: "Tensors, autograd, custom nn.Module classes, loss functions, optimizers (AdamW), and training loops.",
            importance: "Essential",
            duration: "4 Weeks",
            courses: [{ name: "Deep Learning with PyTorch", provider: "DeepLearning.AI", url: "#", duration: "30 hrs" }]
          }
        ],
        checkpoint: {
          id: "chk-ai-classifier",
          type: "checkpoint",
          title: "Checkpoint - Predictive Classifier & Neural Net",
          track: "ai",
          description: "Train, evaluate, and benchmark a custom multi-layer perceptron neural network in PyTorch against gradient boosted trees.",
          projectBrief: "Build an end-to-end classifier comparing XGBoost and PyTorch with validation curves.",
          deliverable: ["Training and validation loss tracking", "Hyperparameter tuning with Optuna", "Confusion matrix & F1-score evaluation", "Saved model checkpoints"]
        }
      },
      {
        id: "ai-sec-3",
        title: "3. Large Language Models, Vector DBs & RAG",
        description: "Embeddings, vector indexing, semantic retrieval, and contextual document question answering.",
        nodes: [
          {
            id: "node-embeddings",
            type: "topic",
            title: "Vector Databases (Chroma / Pinecone)",
            track: "ai",
            description: "Dense embeddings, HNSW indexing, cosine similarity, hybrid keyword/vector search, and chunking algorithms.",
            importance: "Essential",
            duration: "2 Weeks",
            courses: [{ name: "Vector Databases: From Embeddings to Applications", provider: "DeepLearning.AI", url: "#", duration: "8 hrs" }]
          },
          {
            id: "node-rag",
            type: "topic",
            title: "RAG Systems (Retrieval-Augmented Generation)",
            track: "ai",
            description: "Context windows, document loaders, chunking strategies, reranking, and citation generation.",
            importance: "Essential",
            duration: "3 Weeks",
            courses: [{ name: "Building Production-grade RAG", provider: "DeepLearning.AI", url: "#", duration: "12 hrs" }]
          }
        ],
        checkpoint: {
          id: "chk-ai-rag-assistant",
          type: "checkpoint",
          title: "Checkpoint - Enterprise PDF Document Knowledge Engine",
          track: "ai",
          description: "Create an intelligent document Q&A assistant using LangChain/LlamaIndex, ChromaDB, and Gemini/OpenAI with source citations and hallucination guardrails.",
          projectBrief: "Build a production RAG application that answers complex multi-page document queries.",
          deliverable: ["PDF ingestion and chunking pipeline", "Vector store persistence with Chroma", "Source page citation output", "Grounded evaluation metrics"]
        }
      },
      {
        id: "ai-sec-4",
        title: "4. Multi-Agent Systems & FastAPI Model Serving",
        description: "Autonomous reasoning loops, tool calling, streaming responses, and production containerization.",
        nodes: [
          {
            id: "node-agents",
            type: "topic",
            title: "Multi-Agent Systems & Tool Calling",
            track: "ai",
            description: "ReAct prompting patterns, autonomous agent swarms, memory architectures, and function calling.",
            importance: "Essential",
            duration: "3 Weeks",
            courses: [{ name: "Multi-Agent Systems with AutoGen & CrewAI", provider: "DeepLearning.AI", url: "#", duration: "12 hrs" }]
          },
          {
            id: "node-fastapi",
            type: "topic",
            title: "FastAPI & Low-Latency Model Serving",
            track: "devops",
            description: "Asynchronous endpoints, Server-Sent Events (SSE) streaming, Pydantic schemas, and Docker GPU deployments.",
            importance: "Essential",
            duration: "2 Weeks",
            courses: [{ name: "Deploying Machine Learning Models", provider: "Full Stack Deep Learning", url: "#", duration: "16 hrs" }]
          }
        ],
        checkpoint: {
          id: "chk-ai-agent-microservice",
          type: "checkpoint",
          title: "Checkpoint - Autonomous AI Agent Microservice",
          track: "devops",
          description: "Deploy a containerized FastAPI microservice running an autonomous multi-agent swarm with streaming token responses, rate limiting, and Docker containerization.",
          projectBrief: "Ship a production-ready AI inference service with tool execution and streaming SSE.",
          deliverable: ["Autonomous agent thought logging", "SSE streaming chat endpoint", "Docker container with low memory footprint", "Deployed live API on Render or AWS"]
        }
      }
    ]
  },
  "data-scientist": {
    roleId: "data-scientist",
    roleTitle: "Data Scientist",
    category: "Analytics & Statistical Modeling",
    description: "Data Scientists discover strategic trends, design statistical experiments, construct predictive algorithms, and translate numbers into high-value product decisions.",
    targetAudience: "For analytical thinkers, mathematicians, and developers aiming to master data science, statistical modeling, and business intelligence.",
    tracks: ["All Tracks", "SQL & Math", "Visualization", "Machine Learning"],
    sections: [
      {
        id: "ds-sec-1",
        title: "1. Advanced SQL & Relational Analytics",
        description: "Window functions, common table expressions (CTEs), cohort analysis, and query optimization.",
        nodes: [
          {
            id: "node-sql-adv",
            type: "topic",
            title: "Advanced SQL & Analytical Queries",
            track: "core",
            description: "Window functions (ROW_NUMBER, RANK, DENSE_RANK), recursive CTEs, self-joins, and query execution plans.",
            importance: "Essential",
            duration: "3 Weeks",
            courses: [{ name: "Advanced SQL for Data Scientists", provider: "Mode Analytics", url: "#", duration: "15 hrs" }]
          },
          {
            id: "node-stats",
            type: "topic",
            title: "Probability, Statistics & Hypothesis Testing",
            track: "core",
            description: "Distributions, Central Limit Theorem, p-values, t-tests, ANOVA, and confidence intervals.",
            importance: "Essential",
            duration: "3 Weeks",
            courses: [{ name: "Statistics for Data Science", provider: "Stanford Online", url: "#", duration: "20 hrs" }]
          }
        ],
        checkpoint: {
          id: "chk-ds-cohort",
          type: "checkpoint",
          title: "Checkpoint - SQL Cohort Retention Analysis",
          track: "core",
          description: "Write complex analytical SQL queries on simulated million-row transactional datasets to compute monthly user retention, churn cohorts, and customer lifetime value (LTV).",
          projectBrief: "Build production SQL reporting scripts analyzing monthly cohort retention rates.",
          deliverable: ["Recursive CTE queries", "Cohort retention matrix output", "Query execution plan optimization", "Executive insight summary"]
        }
      },
      {
        id: "ds-sec-2",
        title: "2. Data Storytelling & Executive Visualizations",
        description: "Creating insightful charts with Seaborn, Plotly, and Tableau that communicate business metrics.",
        nodes: [
          {
            id: "node-viz",
            type: "topic",
            title: "Data Visualization with Matplotlib & Seaborn",
            track: "data",
            description: "Visual hierarchy, choosing chart archetypes, distribution plots, heatmaps, and theme styling.",
            importance: "Essential",
            duration: "2 Weeks",
            courses: [{ name: "Data Storytelling and Visualization", provider: "HarvardX", url: "#", duration: "14 hrs" }]
          },
          {
            id: "node-eda",
            type: "topic",
            title: "Exploratory Data Analysis (EDA)",
            track: "data",
            description: "Outlier detection, missing data imputation, skewness correction, and multi-collinearity checks.",
            importance: "Essential",
            duration: "2 Weeks",
            courses: [{ name: "Exploratory Data Analysis in Python", provider: "Coursera", url: "#", duration: "12 hrs" }]
          }
        ],
        checkpoint: {
          id: "chk-ds-dashboard",
          type: "checkpoint",
          title: "Checkpoint - Executive Business Analytics Dashboard",
          track: "data",
          description: "Build an interactive multi-dimensional dashboard in Plotly/Streamlit detailing sales conversion funnels, churn drivers, and revenue forecasts.",
          projectBrief: "Deliver an interactive visual analytics dashboard with drill-down filters.",
          deliverable: ["Streamlit or Plotly web application", "Conversion funnel charts", "Dynamic date range filters", "Business recommendation deck"]
        }
      },
      {
        id: "ds-sec-3",
        title: "3. Predictive Modeling & Model Explainability",
        description: "Supervised classification, regression, cross-validation, and SHAP interpretability.",
        nodes: [
          {
            id: "node-ds-ml",
            type: "topic",
            title: "Predictive Machine Learning (XGBoost/LightGBM)",
            track: "data",
            description: "Gradient boosting, hyperparameter cross-validation, precision-recall tradeoffs, and imbalanced data handling.",
            importance: "Essential",
            duration: "4 Weeks",
            courses: [{ name: "Applied Machine Learning in Python", provider: "Univ of Michigan", url: "#", duration: "24 hrs" }]
          },
          {
            id: "node-shap",
            type: "topic",
            title: "Model Explainability (SHAP & LIME)",
            track: "data",
            description: "Explaining black-box algorithms, feature importance, partial dependence plots, and regulatory compliance.",
            importance: "Essential",
            duration: "2 Weeks",
            courses: [{ name: "Explainable AI in Practice", provider: "DeepLearning.AI", url: "#", duration: "10 hrs" }]
          }
        ],
        checkpoint: {
          id: "chk-ds-predictive-engine",
          type: "checkpoint",
          title: "Checkpoint - Financial Risk Prediction System",
          track: "data",
          description: "Train a gradient boosting model on credit or loan default data, perform cost-sensitive evaluation, and produce explainable SHAP force plots for individual predictions.",
          projectBrief: "Build an interpretable credit default risk engine with SHAP value breakdown.",
          deliverable: ["Trained XGBoost / LightGBM model", "ROC-AUC and Precision-Recall curves", "SHAP summary & waterfall plots", "Comprehensive risk assessment report"]
        }
      }
    ]
  },
  "ui-ux-designer": {
    roleId: "ui-ux-designer",
    roleTitle: "UI/UX Designer",
    category: "Product & Interface Design",
    description: "UI/UX Designers conduct user research, craft intuitive wireframes, establish multi-theme design systems, and build high-fidelity interactive prototypes in Figma.",
    targetAudience: "For creative thinkers and frontend builders passionate about crafting delightful, accessible digital product experiences.",
    tracks: ["All Tracks", "UX Research", "UI & Figma", "Design Systems"],
    sections: [
      {
        id: "ux-sec-1",
        title: "1. User Research & Information Architecture",
        description: "User interviews, empathy maps, user journey mapping, and card sorting.",
        nodes: [
          {
            id: "node-ux-research",
            type: "topic",
            title: "User Research & Journey Mapping",
            track: "design",
            description: "Qualitative interviews, surveys, persona creation, problem framing, and user journey flows.",
            importance: "Essential",
            duration: "2 Weeks",
            courses: [{ name: "Google UX Design Certificate", provider: "Coursera", url: "#", duration: "30 hrs" }]
          },
          {
            id: "node-wireframing",
            type: "topic",
            title: "Information Architecture & Low-Fi Wireframing",
            track: "design",
            description: "Site maps, card sorting, user navigation paths, and grayscale wireframing in Figma.",
            importance: "Essential",
            duration: "2 Weeks",
            courses: [{ name: "Information Architecture for Designers", provider: "Interaction Design Org", url: "#", duration: "12 hrs" }]
          }
        ],
        checkpoint: {
          id: "chk-ux-case-study",
          type: "checkpoint",
          title: "Checkpoint - UX Problem Discovery & Wireframes",
          track: "design",
          description: "Publish a comprehensive UX case study examining checkout friction in an e-commerce platform, complete with 3 user personas, journey maps, and clickable wireframes.",
          projectBrief: "Document a complete UX research discovery phase with wireframes.",
          deliverable: ["User research synthesis deck", "Persona cards and empathy maps", "Low-fidelity wireframes in Figma", "Problem statement & hypothesis"]
        }
      },
      {
        id: "ux-sec-2",
        title: "2. Figma Mastery & Multi-Theme Design Systems",
        description: "Auto Layout 5.0, design tokens, nested components, and interactive variants.",
        nodes: [
          {
            id: "node-figma",
            type: "topic",
            title: "Figma Advanced & Auto Layout 5.0",
            track: "design",
            description: "Responsive constraints, Auto Layout nesting, Figma variables, component properties, and layout grids.",
            importance: "Essential",
            duration: "3 Weeks",
            courses: [{ name: "Figma UI Masterclass", provider: "DesignCode", url: "#", duration: "18 hrs" }]
          },
          {
            id: "node-design-tokens",
            type: "topic",
            title: "Design Systems & Token Architecture",
            track: "design",
            description: "Color tokens, typography scales (8pt grid), spacing tokens, component variants, and accessibility compliance (WCAG 2.2).",
            importance: "Essential",
            duration: "3 Weeks",
            courses: [{ name: "Building Design Systems with Figma", provider: "Smashing Magazine", url: "#", duration: "16 hrs" }]
          }
        ],
        checkpoint: {
          id: "chk-design-system",
          type: "checkpoint",
          title: "Checkpoint - Nova Multi-Theme Design System",
          track: "design",
          description: "Build an accessible enterprise design system in Figma comprising 35+ components (buttons, inputs, modals, cards) with full Dark & Light mode variable tokens.",
          projectBrief: "Architect a production-ready Figma component library with dark/light mode tokens.",
          deliverable: ["Design token architecture (color, type, space)", "35+ master components with variant states", "Accessible color contrast verification", "Component documentation page"]
        }
      },
      {
        id: "ux-sec-3",
        title: "3. High-Fidelity Prototyping & Developer Handoff",
        description: "Micro-interactions, smart animations, usability testing, and CSS handoff.",
        nodes: [
          {
            id: "node-proto",
            type: "topic",
            title: "Interactive Prototyping & Micro-interactions",
            track: "design",
            description: "Smart animate, interactive component states, page transitions, and mobile gesture modeling.",
            importance: "Essential",
            duration: "2 Weeks",
            courses: [{ name: "Advanced Prototyping in Figma", provider: "Udemy", url: "#", duration: "12 hrs" }]
          },
          {
            id: "node-handoff",
            type: "topic",
            title: "Developer Handoff & Frontend Alignment",
            track: "design",
            description: "Figma Dev Mode, inspecting CSS, exporting SVG assets, and design QA with engineering teams.",
            importance: "Recommended",
            duration: "1 Week",
            courses: [{ name: "Design to Code Handoff", provider: "Frontend Masters", url: "#", duration: "8 hrs" }]
          }
        ],
        checkpoint: {
          id: "chk-ux-hifi-app",
          type: "checkpoint",
          title: "Checkpoint - Fintech Mobile App High-Fidelity Prototype",
          track: "design",
          description: "Design 20+ pixel-perfect high-fidelity screens for a modern personal banking app following iOS Human Interface Guidelines with clickable micro-interactions and usability test recordings.",
          projectBrief: "Deliver a polished, interactive mobile app prototype with user testing results.",
          deliverable: ["20+ high-fidelity mobile screens in Figma", "Clickable prototype with animated transactions", "Usability test recording & feedback matrix", "Developer handoff specs with CSS tokens"]
        }
      }
    ]
  },
  "cybersecurity-analyst": {
    roleId: "cybersecurity-analyst",
    roleTitle: "Cybersecurity Analyst",
    category: "Information Security & SOC Defense",
    description: "Cybersecurity Analysts protect networks, analyze malicious packet traffic, audit web application vulnerabilities, and remediate security threats in real time.",
    targetAudience: "For IT administrators, computer science students, and enthusiasts looking to become certified security analysts and ethical defenders.",
    tracks: ["All Tracks", "Networks", "AppSec", "SIEM & SOC"],
    sections: [
      {
        id: "sec-sec-1",
        title: "1. Networking Fundamentals & Packet Analysis",
        description: "TCP/IP three-way handshake, routing, firewalls, and deep packet inspection with Wireshark.",
        nodes: [
          {
            id: "node-networking",
            type: "topic",
            title: "TCP/IP, DNS & Network Architecture",
            track: "security",
            description: "OSI 7 layers, IPv4/IPv6, subnets, ARP, DHCP, DNS resolution, and routing protocols.",
            importance: "Essential",
            duration: "3 Weeks",
            courses: [{ name: "CompTIA Network+ Training", provider: "Professor Messer", url: "#", duration: "24 hrs" }]
          },
          {
            id: "node-wireshark",
            type: "topic",
            title: "Packet Inspection with Wireshark",
            track: "security",
            description: "Capturing packets, display filters, protocol analysis, dissecting TLS handshakes, and spotting brute-force traffic.",
            importance: "Essential",
            duration: "2 Weeks",
            courses: [{ name: "Wireshark Packet Analysis Masterclass", provider: "Udemy", url: "#", duration: "14 hrs" }]
          }
        ],
        checkpoint: {
          id: "chk-sec-pcap",
          type: "checkpoint",
          title: "Checkpoint - Network Intrusion Packet Analysis",
          track: "security",
          description: "Analyze a real pcap capture file of a simulated port scan and brute-force attack in Wireshark. Identify malicious IP addresses, infected hosts, and reconstruct the incident timeline.",
          projectBrief: "Investigate raw pcap network traffic to document an intrusion attempt.",
          deliverable: ["Wireshark filter syntax breakdown", "Identified attacker IP and targeted ports", "Compromised credential extraction", "Incident investigation report"]
        }
      },
      {
        id: "sec-sec-2",
        title: "2. Linux Administration & Host Hardening",
        description: "Permissions, SSH keys, firewall rules (iptables/ufw), and automated bash security audits.",
        nodes: [
          {
            id: "node-linux-sec",
            type: "topic",
            title: "Linux CLI & System Administration",
            track: "security",
            description: "User groups, chmod/chown permissions, cron jobs, log directories (/var/log), and process management.",
            importance: "Essential",
            duration: "2 Weeks",
            courses: [{ name: "Linux Security Fundamentals", provider: "Linux Foundation", url: "#", duration: "16 hrs" }]
          },
          {
            id: "node-bash-audit",
            type: "topic",
            title: "Bash Scripting for Security Auditing",
            track: "security",
            description: "Automating log parsing, regex pattern matching for failed logins, file integrity monitoring, and alert triggers.",
            importance: "Essential",
            duration: "2 Weeks",
            courses: [{ name: "Bash for Cybersecurity", provider: "Coursera", url: "#", duration: "12 hrs" }]
          }
        ],
        checkpoint: {
          id: "chk-sec-hardening",
          type: "checkpoint",
          title: "Checkpoint - Automated Host Hardening Script",
          track: "security",
          description: "Write a modular Bash automation script that audits Ubuntu server configurations, disables root SSH login, closes unused open ports, and configures fail2ban rules.",
          projectBrief: "Create a reproducible server hardening script for Linux hosts.",
          deliverable: ["Modular Bash hardening script", "Automated SSH config audit", "UFW firewall configuration", "Verification report using Lynis"]
        }
      },
      {
        id: "sec-sec-3",
        title: "3. Web Application Security & OWASP Top 10",
        description: "SQL injection, XSS, CSRF, broken access control, and vulnerability remediation.",
        nodes: [
          {
            id: "node-owasp",
            type: "topic",
            title: "OWASP Top 10 Web Vulnerabilities",
            track: "security",
            description: "SQLi, Cross-Site Scripting (XSS), CSRF, Server-Side Request Forgery (SSRF), and IDOR vulnerabilities.",
            importance: "Essential",
            duration: "3 Weeks",
            courses: [{ name: "Web Application Penetration Testing", provider: "PortSwigger Academy", url: "#", duration: "30 hrs" }]
          },
          {
            id: "node-siem",
            type: "topic",
            title: "SIEM & SOC Threat Monitoring (Splunk)",
            track: "security",
            description: "Ingesting syslog, writing SPL queries, detecting anomalous login volumes, and incident triage playbooks.",
            importance: "Essential",
            duration: "3 Weeks",
            courses: [{ name: "Splunk Fundamentals for SOC Analysts", provider: "Splunk Education", url: "#", duration: "18 hrs" }]
          }
        ],
        checkpoint: {
          id: "chk-sec-soc-capstone",
          type: "checkpoint",
          title: "Checkpoint - Vulnerability Assessment & SOC Report",
          track: "security",
          description: "Perform a simulated vulnerability assessment on an intentionally vulnerable web app (DVWA/Juice Shop), document exploitable OWASP flaws, and produce remediation recommendations.",
          projectBrief: "Complete a simulated web app security audit and triage log alerts in Splunk.",
          deliverable: ["Documented OWASP Top 10 vulnerability findings", "Proof-of-concept exploit demonstrations", "Splunk alert correlation dashboard", "Executive remediation roadmap"]
        }
      }
    ]
  }
};
