export type ProjectCategory =
  | "bots"
  | "ia"
  | "godot"
  | "web"
  | "scraping"
  | "crypto"
  | "automation";

export type ProjectCard = {
  title: string;
  slug: string;
  category: ProjectCategory;
  description: string;
  stack: string[];
  difficulty: "facile" | "intermediaire" | "avance";
  role: string;
  repo?: string;
  demo?: string;
  private?: boolean;
  featured?: boolean;
};

export type ArticleCard = {
  title: string;
  slug: string;
  tags: string[];
  excerpt: string;
};

export const skillTree = [
  {
    title: "Backend",
    skills: ["Node.js", "FastAPI", "Laravel", "PostgreSQL", "Prisma"],
  },
  {
    title: "Frontend",
    skills: ["Next.js", "Tailwind", "shadcn/ui", "React", "Vite"],
  },
  { title: "Data & IA", skills: ["Python", "Pandas", "LangChain", "LLMs"] },
  {
    title: "Automation",
    skills: ["Playwright", "Puppeteer", "Telegram bots", "Webhooks"],
  },
  {
    title: "Cloud/DevOps",
    skills: ["Docker", "Railway", "Vercel", "S3-compatible"],
  },
];

export const timeline = [
  {
    title: "Développement web",
    period: "2019 - aujourd'hui",
    description: "Apps Next.js, APIs REST/GraphQL, automatisations SaaS.",
  },
  {
    title: "Scraping & bots",
    period: "2020 - aujourd'hui",
    description: "Collecte de données, monitoring, alerting temps réel.",
  },
  {
    title: "IA & outils",
    period: "2022 - aujourd'hui",
    description: "Prototypage d'agents, assistants, pipelines LLM.",
  },
];

export const projects: ProjectCard[] = [
  {
    title: "Bot Telegram multi-flux",
    slug: "bot-telegram-multi-flux",
    category: "bots",
    description: "Automatisation notifications + modération, branchée sur APIs tierces.",
    stack: ["Node.js", "PostgreSQL", "BullMQ"],
    difficulty: "intermediaire",
    role: "Lead dev",
    repo: "https://github.com/",
    featured: true,
  },
  {
    title: "Dashboard IA & RAG",
    slug: "dashboard-ia-rag",
    category: "ia",
    description: "Recherche augmentée, chat contextuel, monitoring usage.",
    stack: ["Next.js", "LangChain", "PostgreSQL"],
    difficulty: "avance",
    role: "Builder",
    demo: "https://demo.example.com",
    private: true,
    featured: true,
  },
  {
    title: "Scraper haute fréquence",
    slug: "scraper-haute-frequence",
    category: "scraping",
    description: "Pipeline robuste, rotation IP, export vers datawarehouse.",
    stack: ["Python", "Playwright", "DuckDB"],
    difficulty: "avance",
    role: "Architecte",
  },
  {
    title: "Mini outils crypto",
    slug: "mini-outils-crypto",
    category: "crypto",
    description: "Alerting on-chain, agrégations, diffusion Telegram.",
    stack: ["Node.js", "Redis", "Ethers.js"],
    difficulty: "intermediaire",
    role: "Builder",
  },
  {
    title: "Jeu Godot expérimental",
    slug: "jeu-godot-experimental",
    category: "godot",
    description: "Prototype gameplay et assets procéduraux.",
    stack: ["Godot", "GDScript"],
    difficulty: "facile",
    role: "Solo dev",
  },
];

export const labItems = [
  {
    title: "Agent IA pour veille tech",
    status: "Prototype",
    stack: ["Python", "LLM"],
    description: "Collecte automatique d'articles, résumé et push Telegram.",
  },
  {
    title: "Auto-extract PDF -> Notion",
    status: "En cours",
    stack: ["Node.js", "LangChain"],
    description: "Extraction ciblée avec prompts structurés et mapping Notion.",
  },
  {
    title: "Godot shader pack",
    status: "Prototype",
    stack: ["Godot", "GLSL"],
    description: "Pack d'effets visuels pour prototypage rapide.",
  },
];

export const tutorials: ArticleCard[] = [
  {
    title: "Démarrer un bot Telegram resilient",
    slug: "bot-telegram-resilient",
    tags: ["Telegram Bot", "Node.js"],
    excerpt: "Stack type, gestion des webhooks, pièges à éviter.",
  },
  {
    title: "Pipeline de scraping robuste",
    slug: "pipeline-scraping-robuste",
    tags: ["Scraping", "Playwright"],
    excerpt: "Rotation IP, retries, parsing propre.",
  },
  {
    title: "IA + Next.js : chat contextuel",
    slug: "ia-next-chat",
    tags: ["IA", "Next.js"],
    excerpt: "Brancher un modèle et gérer l'historique proprement.",
  },
];

export const tools = [
  "Next.js",
  "Tailwind",
  "Prisma",
  "PostgreSQL",
  "LangChain",
  "Playwright",
  "Godot",
  "Docker",
  "S3",
  "GitHub Actions",
];

