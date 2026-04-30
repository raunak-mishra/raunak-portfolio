export type NavItem = {
  id: string;
  label: string;
};

export type ExternalLink = {
  label: string;
  href: string;
  shorthand: string;
};

export type SystemCard = {
  company: string;
  role: string;
  duration: string;
  title: string;
  problem: string;
  solution: string[];
  impact: string[];
  technologies: string[];
};

export type TechCategory = {
  title: string;
  command: string;
  tools: string[];
};

export type Metric = {
  label: string;
  value: number;
  suffix: string;
  decimals?: number;
  note: string;
};

export type Project = {
  name: string;
  description: string;
  stack: string[];
  highlights: string[];
  sourceCodeLink: string;
};

export type Achievement = {
  title: string;
  detail: string;
};

export type Recommendation = {
  name: string;
  designation: string;
  relationship: string;
  date: string;
  quote: string[];
};

export const profile = {
  name: "Raunak Mishra",
  role: "Backend Software Engineer",
  email: "mishraraunak326@gmail.com",
  summary:
    "Backend Software Engineer with 3+ years of experience designing scalable microservices and event-driven systems on GCP using Kafka. Strong in system design, reliability, observability, and production ownership.",
  headline: "Building Reliable Backend Systems at Scale",
  heroSubtext:
    "I design event-driven architectures, high-throughput APIs, and production systems that handle millions of events daily.",
  learningLine:
    "Learning and evolving the boundaries of software engineering.",
  links: {
    github: "https://github.com/raunak-mishra",
    linkedin: "https://www.linkedin.com/in/raunakmishra326",
    email: "mailto:mishraraunak326@gmail.com",
    resume: "/Raunak_Mishra_Resume.pdf",
  },
};

export const navItems: NavItem[] = [
  { id: "systems", label: "Systems" },
  { id: "stack", label: "Stack" },
  { id: "projects", label: "Projects" },
  { id: "metrics", label: "Metrics" },
  { id: "recommendations", label: "Endorsements" },
  { id: "contact", label: "Contact" },
];

export const externalLinks: ExternalLink[] = [
  {
    label: "Email",
    href: profile.links.email,
    shorthand: "@",
  },
  {
    label: "GitHub",
    href: profile.links.github,
    shorthand: "GH",
  },
  {
    label: "LinkedIn",
    href: profile.links.linkedin,
    shorthand: "in",
  },
];

export const systemsBuilt: SystemCard[] = [
  {
    company: "Fynd",
    role: "Backend Software Engineer",
    duration: "Production systems",
    title: "Real-time Event Processing & Webhooks Platform",
    problem:
      "Analytics and webhook delivery paths needed lower latency, stronger delivery guarantees, and better visibility at event volume.",
    solution: [
      "Migrated analytics pipeline from ClickHouse ETL to Kafka -> Node.js -> BigQuery streaming.",
      "Built a webhooks platform with partitioned workers, retry handling, and delivery telemetry.",
      "Owned on-call debugging, fault-tolerance improvements, and high-availability production paths.",
    ],
    impact: [
      "Reduced latency from 20 min to 2-5 min",
      "64.7M events/day processed",
      "51.4K req/min peak throughput",
      "P99 latency: 467ms",
    ],
    technologies: ["Kafka", "GCP", "BigQuery", "Node.js", "Python", "FastAPI"],
  },
  {
    company: "The Sleep Company",
    role: "Backend Software Engineer",
    duration: "Commerce systems",
    title: "Commerce Backend & Fulfilment Reliability",
    problem:
      "Order, catalogue, and fulfilment workflows needed predictable APIs across customer traffic spikes and operational handoffs.",
    solution: [
      "Improved service boundaries around catalogue, orders, and delivery state transitions.",
      "Optimized high-traffic REST APIs and tightened database access patterns for repeated workflows.",
      "Added clearer release and monitoring signals so production changes could be traced faster.",
    ],
    impact: [
      "35% API optimization",
      "More reliable fulfilment status flows",
      "Cleaner production debugging surface",
    ],
    technologies: ["Node.js", "Nest JS", "GraphQL", "MongoDB", "DynamoDB", "Redis", "CI/CD"],
  },
  {
    company: "Snapmint",
    role: "Backend Software Engineer",
    duration: "Fintech systems",
    title: "Checkout, Credit Flow & Delivery Signals",
    problem:
      "Fintech checkout paths required resilient service coordination, consistent delivery state, and operational confidence.",
    solution: [
      "Worked on backend services supporting customer checkout and credit-related workflows.",
      "Strengthened async processing paths with clearer failure handling and retry visibility.",
      "Improved observability around delivery and transaction-adjacent service outcomes.",
    ],
    impact: [
      "91% delivery success rate",
      "Reduced ambiguous failure states",
      "Improved service-level traceability",
    ],
    technologies: ["Ruby", "Node JS", "Microservices", "PostgreSQL", "Kafka", "AWS"],
  },
  {
    company: "Dhan",
    role: "Backend Software Engineer",
    duration: "Platform systems",
    title: "Market Data Services & Migration Tooling",
    problem:
      "Data-heavy backend workflows needed safer migration, validation, and platform-level reliability patterns.",
    solution: [
      "Built backend tooling for large record movement with validation checkpoints and controlled execution.",
      "Improved data access paths for services that depend on fast, consistent reads.",
      "Focused on operational guardrails for batch jobs, service ownership, and release confidence.",
    ],
    impact: [
      "3.2B+ records migrated",
      "Safer batch processing",
      "Stronger data validation loops",
    ],
    technologies: ["Java", "PostgreSQL", "Redis", "Docker", "Monitoring"],
  },
];

export const techStack: TechCategory[] = [
  {
    title: "Backend",
    command: "services --runtime",
    tools: ["Node.js", "Python", "FastAPI", "TypeScript", "Java", "Ruby", "REST APIs", "Microservices"],
  },
  {
    title: "Data",
    command: "streams --storage",
    tools: ["Kafka", "PostgreSQL", "MongoDB", "ClickHouse", "BigQuery", "Redis"],
  },
  {
    title: "Infra",
    command: "deploy --platform",
    tools: ["GCP", "AWS", "Kubernetes", "Docker", "CI/CD"],
  },
  {
    title: "Observability",
    command: "observe --signals",
    tools: ["Prometheus", "Grafana", "Loki"],
  },
  {
    title: "AI",
    command: "agents --integrations",
    tools: ["LLM integrations", "Agentic AI", "MCP", "RAG", "Langchain", "LangGraph"],
  },
];

export const metrics: Metric[] = [
  {
    label: "Events processed per day",
    value: 64.7,
    suffix: "M",
    decimals: 1,
    note: "Webhook and analytics event volume handled by production pipelines.",
  },
  {
    label: "Peak traffic",
    value: 51.4,
    suffix: "K req/min",
    decimals: 1,
    note: "Throughput handled during high-load webhook delivery windows.",
  },
  {
    label: "Records migrated",
    value: 3.2,
    suffix: "B+",
    decimals: 1,
    note: "Large-scale data movement with validation and operational checkpoints.",
  },
  {
    label: "Latency improvement",
    value: 79,
    suffix: "%",
    note: "Analytics delay reduced from 20 minutes to near real-time delivery.",
  },
  {
    label: "API optimization",
    value: 35,
    suffix: "%",
    note: "Backend response and execution path improvements across key APIs.",
  },
  {
    label: "Delivery success rate",
    value: 91,
    suffix: "%",
    note: "Improved delivery outcomes through clearer retries and observability.",
  },
];

export const projects: Project[] = [
  {
    name: "MovieCafe",
    description:
      "A full-stack catalogue app with clean CRUD flows, category browsing, and a backend shaped for predictable data access.",
    stack: ["React", "Node.js", "MongoDB", "REST APIs"],
    highlights: [
      "Resource-oriented API design",
      "Category browsing with CRUD operations",
      "Simple full-stack deployment shape",
    ],
    sourceCodeLink: "https://github.com/raunak-mishra/MovieCafe",
  },
];

export const achievements: Achievement[] = [
  {
    title: "Infosys Certified Software Programmer",
    detail: "Top among 30K participants",
  },
  {
    title: "Google CodeJam",
    detail: "Rank 2840",
  },
  {
    title: "DSA Practice",
    detail: "450+ problems solved",
  },
  {
    title: "HackerRank",
    detail: "5-star profile",
  },
  {
    title: "Research Publication",
    detail: "Co-authored IJFANS paper on ML-based anemia prediction",
  },
  {
    title: "Applied ML Result",
    detail: "99.38% Random Forest accuracy reported in anemia study",
  },
];

export const recommendations: Recommendation[] = [
  {
    name: "Animesh Jain",
    designation: "Engineering Manager at Snapmint",
    relationship: "Managed Raunak directly",
    date: "December 19, 2024",
    quote: [
      "Raunak is a great asset to the team. He is a quick learner and a great problem solver.",
    ],
  },
  {
    name: "Manish Kumar",
    designation: "AI | Software Engineer 2 | HackerOne",
    relationship: "Worked with Raunak on the same team",
    date: "December 17, 2024",
    quote: [
      "I worked with Raunak at Snapmint and I must say it was a great experience. This is because of the fact that he is one of the best developers I came across. What sets Raunak apart is the superb analytical skills in keeping the projects on time and writing impeccable code.",
      "I have seen him deliver under different circumstances be it working on tough problems, improving the performance of an already built application, or adding more features to the already existing one. To add on, he is great at other aspects as well especially teamwork in which Raunak is pleasant to work with as he is very cooperative, dependable, and cares about other people's work.",
      "To sum it up, Raunak has great qualities and any employer would be more than happy to hire him and I recommend them to anyone who is looking an outstanding software developer.",
    ],
  },
];
