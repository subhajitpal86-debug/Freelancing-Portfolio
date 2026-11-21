import React, { useState, useEffect } from 'react';
import {
  Bot,
  FileText,
  Cpu,
  Workflow,
  BookOpen,
  CheckCircle2,
  ArrowRight,
  Sun,
  Moon,
  Menu,
  X,
  Send,
  Sparkles,
  ShieldCheck,
  Clock,
  Code2,
  Play,
  ChevronDown,
  Mail,
  MapPin,
  Terminal,
  ExternalLink,
} from 'lucide-react';

interface ServiceItem {
  title: string;
  forWho: string;
  deliverable: string;
  delivery: string;
  price: string;
  icon: React.ReactNode;
}

interface ProjectItem {
  title: string;
  problem: string;
  solution: string;
  howItWorks: string;
  tools: string[];
  mockupType: 'invoice' | 'chatbot' | 'monitor';
}

interface DemoQA {
  id: string;
  question: string;
  answer: string;
}

const SERVICES: ServiceItem[] = [
  {
    title: 'Custom AI Chatbot',
    forWho: 'Individuals, professionals, and small businesses',
    deliverable:
      'A website or messaging assistant trained on your FAQs, services, and policies that answers customer questions 24/7 and captures qualified leads.',
    delivery: 'Timeline confirmed after scope review',
    price: '$250 / ₹20,500 starting',
    icon: <Bot className="w-5 h-5" />,
  },
  {
    title: 'Document Processing Automation',
    forWho: 'Individuals and teams handling repetitive document work',
    deliverable:
      'Automated extraction from invoices, forms, resumes, or contracts straight into clean Google Sheets rows, Excel, or your CRM.',
    delivery: 'Timeline confirmed after scope review',
    price: '$200 / ₹16,500 starting',
    icon: <FileText className="w-5 h-5" />,
  },
  {
    title: 'AI Agent Development',
    forWho: 'Individuals, founders, and teams exploring task automation',
    deliverable:
      'Autonomous agents that use tools, APIs, and Playwright browser automation to gather data, verify records, and complete workflows end-to-end.',
    delivery: 'Timeline confirmed after scope review',
    price: '$400 / ₹33,000 starting',
    icon: <Cpu className="w-5 h-5" />,
  },
  {
    title: 'Workflow Automation',
    forWho: 'Individuals and small teams handling repetitive digital tasks',
    deliverable:
      'Connect email, Google Sheets, CRM, and Slack with an AI decision layer in the middle to classify, draft, route, and update records automatically.',
    delivery: 'Timeline confirmed after scope review',
    price: '$150 / ₹12,500 starting',
    icon: <Workflow className="w-5 h-5" />,
  },
  {
    title: 'Chat With Your Docs (Knowledge Base)',
    forWho: 'Individuals and organizations managing reference documents',
    deliverable:
      'A private search-and-answer assistant over your SOPs, manuals, and internal docs with source citations so answers stay grounded in your data.',
    delivery: 'Timeline confirmed after scope review',
    price: '$300 / ₹25,000 starting',
    icon: <BookOpen className="w-5 h-5" />,
  },
];

const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Initial Enquiry',
    description:
      'Share the problem or idea. An initial discussion can establish whether the requirement and timing are a suitable fit.',
  },
  {
    step: '02',
    title: 'Scope & Feasibility',
    description:
      'If an engagement can proceed, the scope, deliverables, dependencies, timeline and price are documented before any commitment.',
  },
  {
    step: '03',
    title: 'Develop & Review',
    description:
      'For an accepted engagement, agreed checkpoints are used to review progress and validate the requested functionality.',
  },
  {
    step: '04',
    title: 'Handover',
    description:
      'Handover materials, documentation, deployment responsibilities and ownership terms are defined in the project agreement.',
  },
];

const PROJECTS: ProjectItem[] = [
  {
    title: 'Invoice Data Extractor',
    problem:
      'Manually typing vendor names, invoice numbers, dates, line items, and tax totals from PDF invoices into spreadsheets takes hours and introduces typos.',
    solution:
      'An illustrative concept showing how invoice information could be extracted and organized into structured records.',
    howItWorks:
      'Proposed workflow: upload a sample invoice, extract selected fields, review the output, and export validated data. This is a concept illustration, not a claim of a completed production system.',
    tools: ['Python', 'Free-tier LLM API', 'Google Sheets'],
    mockupType: 'invoice',
  },
  {
    title: 'Small-Business Support Assistant',
    problem:
      'Customers repeatedly call or message asking about hours, pricing, booking policies, and service areas, pulling staff away from billable work.',
    solution:
      'An illustrative concept for a small-business support assistant that could answer common questions from approved business information.',
    howItWorks:
      'Proposed workflow: prepare an approved FAQ source, retrieve relevant information for a visitor question, and present a suggested response. This is a concept illustration, not a claim of a deployed client chatbot.',
    tools: ['Retrieval Pipeline (RAG)', 'Chroma Vector DB', 'Free-tier LLM'],
    mockupType: 'chatbot',
  },
  {
    title: 'Competitor Price Monitor Agent',
    problem:
      'Checking competitor product pages every week by hand to track price changes and stock updates is tedious and easy to forget.',
    solution:
      'An illustrative concept for tracking publicly visible product prices and highlighting changes over time.',
    howItWorks:
      'Proposed workflow: collect sample product-page data, normalize price fields, compare snapshots, and prepare a change summary. This is a concept illustration, not a claim of a live monitoring service.',
    tools: ['Python', 'Playwright', 'Free-tier LLM', 'n8n'],
    mockupType: 'monitor',
  },
];

const DEMO_CONVERSATIONS: DemoQA[] = [
  {
    id: 'hours',
    question: 'What are your clinic hours and do you take walk-ins?',
    answer:
      'We are open Monday–Saturday from 9:00 AM to 7:00 PM (closed Sundays). Same-day walk-ins are welcome before 5:30 PM, or I can reserve a priority slot for you right now—would you like to leave your name and phone number?',
  },
  {
    id: 'pricing',
    question: 'How much does a standard consultation cost?',
    answer:
      'An initial 30-minute consultation is $60, which is credited toward any treatment plan booked within 14 days. Follow-up visits are $35. Let me know if you would like our team to text you the full fee schedule.',
  },
  {
    id: 'reschedule',
    question: 'Can I reschedule my appointment for tomorrow?',
    answer:
      'Yes—appointments can be rescheduled at no charge up to 12 hours before your visit. Please share your booking email or phone number, and our front desk will confirm your new time slot within 15 minutes.',
  },
  {
    id: 'human',
    question: 'Can I speak directly with someone on your team?',
    answer:
      'Of course. I have flagged this chat for our coordinator. Leave your email or phone number below and someone from our team will reach out shortly.',
  },
];

const TOOLS = [
  { name: 'Python', category: 'Core Language' },
  { name: 'Playwright', category: 'Browser Automation' },
  { name: 'LangChain', category: 'AI Orchestration' },
  { name: 'n8n', category: 'Workflow Engine' },
  { name: 'Google Gemini API', category: 'LLM Provider' },
  { name: 'Groq', category: 'Fast Inference' },
  { name: 'Hugging Face', category: 'Open Models' },
  { name: 'Ollama', category: 'Local Open-Source LLMs' },
  { name: 'Chroma', category: 'Vector Database' },
  { name: 'Supabase', category: 'Database & Auth' },
  { name: 'Google Sheets', category: 'Data & Reporting' },
  { name: 'Vercel', category: 'Cloud Hosting' },
];

const WHY_ME = [
  { title: 'Engineering-Led Thinking', description: 'The approach is informed by more than 16 years of broader software experience. AI development is a newer area of focus and is presented separately from that experience.' },
  { title: 'Clear Scope Before Commitment', description: 'Requirements, assumptions, dependencies, deliverables and costs should be agreed in writing before any project commitment.' },
  { title: 'Honest Project Representation', description: 'Portfolio examples are labelled as concept demonstrations. They are not presented as client engagements, endorsements or production deployments.' },
  { title: 'Transparent Availability', description: 'Enquiries are reviewed subject to applicable professional commitments, permissions and actual availability. An enquiry is not a confirmation that work can be accepted.' },
];

const FAQS = [
  { q: 'Are you currently available to accept projects?', a: 'Availability is considered case by case and is subject to applicable professional commitments, permissions and scheduling. Sending an enquiry does not confirm that a project can be accepted.' },
  { q: 'How does pricing work?', a: 'The prices shown are indicative starting points in USD and INR, not final quotations. Any potential engagement would require an agreed scope, deliverables, dependencies, timeline and payment terms before work begins.' },
  { q: 'Are the projects shown completed client projects?', a: 'No. The three examples on this page are explicitly labelled personal concept demonstrations. They are illustrative use cases, not client engagements, endorsements or claims of production deployment.' },
  { q: 'How is project data handled?', a: 'Data handling, access, retention, third-party services and security requirements must be discussed and agreed before any work begins. Do not send confidential or sensitive information through the initial enquiry form.' },
  { q: 'Which tools and AI models are represented here?', a: 'The technology list describes tools explored for learning and concept work. The actual technology selection for any future project would depend on feasibility, requirements and available access.' },
  { q: 'How do I make an enquiry?', a: 'Use the contact form to prepare an email draft or write directly to subhajitpal86@gmail.com. An enquiry is an invitation to discuss fit, not a confirmation of availability or acceptance.' },
];

export function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Interactive scripted demo state
  const [selectedDemo, setSelectedDemo] = useState<DemoQA>(DEMO_CONVERSATIONS[0]);
  const [displayedAnswer, setDisplayedAnswer] = useState<string>(DEMO_CONVERSATIONS[0].answer);
  const [isTyping, setIsTyping] = useState(false);

  // Contact form state (opens pre-filled mailto link)
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactBudget, setContactBudget] = useState('₹20,500 – ₹41,000 / $250 – $500');
  const [contactDesc, setContactDesc] = useState('');

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  const handleSelectDemoQuestion = (item: DemoQA) => {
    setSelectedDemo(item);
    setIsTyping(true);
    setDisplayedAnswer('');

    let index = 0;
    const interval = setInterval(() => {
      index += 3;
      setDisplayedAnswer(item.answer.slice(0, index));
      if (index >= item.answer.length) {
        setDisplayedAnswer(item.answer);
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 15);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Project enquiry from ${contactName || 'Website Visitor'} (${contactBudget})`
    );
    const body = encodeURIComponent(
      `Name: ${contactName}\nEmail: ${contactEmail}\nIndicative Budget: ${contactBudget}\n\nProject Details:\n${contactDesc}\n\nNote: This is an initial enquiry only; availability and any engagement are subject to applicable commitments and separately agreed terms.`
    );
    window.location.href = `mailto:subhajitpal86@gmail.com?subject=${subject}&body=${body}`;
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-[#0B1220] dark:text-slate-100 transition-colors duration-200 selection:bg-teal-500/30">
      {/* 1. STICKY NAVIGATION BAR */}
      <header className="sticky top-0 z-50 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/90 dark:bg-[#0B1220]/90 backdrop-blur-md">
        <nav
          aria-label="Primary Navigation"
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
        >
          <a
            href="#"
            className="flex items-center gap-2.5 font-semibold text-lg tracking-tight text-slate-900 dark:text-white"
          >
            <span className="w-8 h-8 rounded-lg bg-teal-600 dark:bg-teal-500 text-white dark:text-slate-950 flex items-center justify-center font-bold text-sm">
              S
            </span>
            <span>AI Solutions</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
            <a href="#services" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
              Services
            </a>
            <a href="#work" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
              Work
            </a>
            <a href="#process" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
              Process
            </a>
            <a href="#faq" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
              FAQ
            </a>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setDarkMode(!darkMode)}
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/70 transition-colors"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-400 text-white dark:text-slate-950 transition-colors shadow-sm"
            >
              Contact
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="md:hidden p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Nav Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B1220] px-4 py-4 space-y-3">
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-slate-700 dark:text-slate-200"
            >
              Services
            </a>
            <a
              href="#work"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-slate-700 dark:text-slate-200"
            >
              Work
            </a>
            <a
              href="#process"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-slate-700 dark:text-slate-200"
            >
              Process
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-slate-700 dark:text-slate-200"
            >
              FAQ
            </a>
          </div>
        )}
      </header>

      <main>
        {/* 2. HERO SECTION */}
        <section className="relative pt-16 pb-14 sm:pt-24 sm:pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-teal-700 dark:text-teal-400 bg-teal-500/10 border border-teal-500/20 px-3 py-1 rounded-full mb-6">
              <span>AI Solutions Builder</span>
              <span aria-hidden="true">•</span>
              <span>AI, Automation &amp; Web Concepts</span>
            </p>

            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              Practical AI, Automation &amp; Web Solutions for Real-World Problems
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
              Explore practical solution ideas through clearly labelled concept demonstrations. Any potential engagement is subject to availability and agreed scope.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-base font-semibold bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-400 text-white dark:text-slate-950 transition-colors shadow-sm"
              >
                Send an Enquiry
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#work"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-base font-semibold border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
              >
                See My Work
              </a>
            </div>

            <p className="mt-6 text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">
              Kolkata, India &nbsp;|&nbsp; Remote enquiries &nbsp;|&nbsp; Scope and availability confirmed before commitment
            </p>
          </div>
        </section>

        {/* 3. EARLY-CLIENT OFFER BANNER */}
        <section aria-label="Early client availability" className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto mb-16">
          <div className="rounded-xl border border-teal-500/30 bg-teal-500/10 dark:bg-teal-500/[0.08] px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start sm:items-center gap-3">
              <Sparkles className="w-5 h-5 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5 sm:mt-0" />
              <p className="text-sm sm:text-base font-medium text-slate-800 dark:text-slate-100">
                Independent project enquiries are welcome. Any potential engagement is subject to applicable professional commitments, permissions, availability and a separately agreed scope.
              </p>
            </div>
            <a
              href="#contact"
              className="text-sm font-semibold text-teal-700 dark:text-teal-400 hover:underline shrink-0"
            >
              Read enquiry details →
            </a>
          </div>
        </section>

        {/* ABOUT SNAPSHOT (Positioned cleanly to reinforce trust) */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-slate-200/80 dark:border-slate-800/80">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                Approach
              </h2>
              <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                Built for reliability, not hype.
              </p>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                Kolkata, India (IST) • Working remotely worldwide
              </p>
            </div>
            <div className="lg:col-span-8 space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed">
              <p className="font-medium text-slate-900 dark:text-slate-100">
                This portfolio presents selected areas of interest and illustrative concepts for individuals, professionals and organizations. It does not imply an established freelance practice or unrestricted availability.
              </p>
              <p>
                The approach draws on more than 16 years of overall software experience. AI development is a newer area of focus; the examples shown are personal concept demonstrations, not client delivery claims.
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400 border-l-2 border-teal-500 pl-4">
                “Clear expectations matter: a concept is labelled as a concept, and any future engagement is discussed only when scope, availability and applicable commitments allow.”
              </p>
            </div>
          </div>
        </section>

        {/* 4. SERVICES */}
        <section id="services" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-slate-200/80 dark:border-slate-800/80">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Services
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300">
              The service areas below describe possible project directions. Feasibility, technical approach, timeline, availability and deliverables are assessed individually before any commitment.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service) => (
              <article
                key={service.title}
                className="flex flex-col justify-between rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-6 hover:border-teal-500/50 transition-colors"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center mb-4">
                    {service.icon}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-xs font-medium text-teal-700 dark:text-teal-400">
                    For: {service.forWho}
                  </p>
                  <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {service.deliverable}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-500 dark:text-slate-400">{service.delivery}</span>
                  <span className="font-bold text-sm text-slate-900 dark:text-white">
                    {service.price}
                  </span>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-8 text-sm text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-3">
            Final price depends on scope. Every project starts with a free discovery call and a fixed-price proposal.
          </p>
        </section>

        {/* 5. HOW I WORK */}
        <section id="process" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-slate-200/80 dark:border-slate-800/80">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              How I Work
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300">
              A straightforward four-step process with zero guesswork.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS_STEPS.map((item) => (
              <div
                key={item.step}
                className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-6"
              >
                <span className="text-xs font-mono font-bold text-teal-600 dark:text-teal-400">
                  STEP {item.step}
                </span>
                <h3 className="mt-2 text-lg font-bold text-slate-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 6. SELECTED WORK */}
        <section id="work" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-slate-200/80 dark:border-slate-800/80">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Selected Work
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300">
              Self-directed concept demonstrations created to explore possible solutions. These are not client projects or claims of production-ready implementations.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {PROJECTS.map((project) => (
              <article
                key={project.title}
                className="flex flex-col justify-between rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 overflow-hidden"
              >
                <div>
                  {/* PLACEHOLDER FRAME: Replace the UI diagram below with a real screenshot or demo video */}
                  <div className="h-44 bg-slate-100 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 p-4 flex flex-col justify-between relative">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-teal-500/15 text-teal-700 dark:text-teal-400 border border-teal-500/20">
                        Concept Demonstration
                      </span>
                      <span className="text-[11px] text-slate-400 flex items-center gap-1">
                        <Play className="w-3 h-3" /> Illustrative UI • Synthetic sample data
                      </span>
                    </div>

                    {/* Clean UI Architecture Mockup */}
                    {project.mockupType === 'invoice' && (
                      <div className="my-auto rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 text-xs font-mono">
                        <div className="flex items-center justify-between text-slate-400 pb-1.5 border-b border-slate-100 dark:border-slate-800">
                          <span>invoice_042.pdf</span>
                          <span className="text-teal-500">→ Google Sheets</span>
                        </div>
                        <div className="mt-2 grid grid-cols-3 gap-2 text-[11px]">
                          <div className="bg-slate-50 dark:bg-slate-800/70 p-1.5 rounded">Vendor: Acme</div>
                          <div className="bg-slate-50 dark:bg-slate-800/70 p-1.5 rounded">Date: Nov 18</div>
                          <div className="bg-teal-500/10 text-teal-600 dark:text-teal-300 p-1.5 rounded">Total: $420</div>
                        </div>
                      </div>
                    )}

                    {project.mockupType === 'chatbot' && (
                      <div className="my-auto rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 text-xs space-y-1.5">
                        <div className="bg-slate-100 dark:bg-slate-800 rounded px-2.5 py-1 w-fit text-slate-600 dark:text-slate-300">
                          Do you offer weekend slots?
                        </div>
                        <div className="bg-teal-500/15 text-teal-800 dark:text-teal-200 rounded px-2.5 py-1 ml-auto w-fit">
                          Yes, Saturdays 9 AM – 5 PM.
                        </div>
                      </div>
                    )}

                    {project.mockupType === 'monitor' && (
                      <div className="my-auto rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 text-xs font-mono">
                        <div className="flex items-center justify-between text-[11px] text-slate-400">
                          <span>Playwright Crawl</span>
                          <span className="text-teal-500">Weekly Digest</span>
                        </div>
                        <div className="mt-2 flex items-center justify-between bg-slate-50 dark:bg-slate-800/70 px-2.5 py-1.5 rounded text-[11px]">
                          <span>Plan Tier A</span>
                          <span className="text-amber-500">$49 → $39 (-20%)</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      {project.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      <strong className="text-slate-800 dark:text-slate-100">Problem:</strong> {project.problem}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      <strong className="text-slate-800 dark:text-slate-100">Concept:</strong> {project.solution}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      <strong className="text-slate-700 dark:text-slate-300">Illustrative workflow:</strong> {project.howItWorks}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 flex flex-wrap gap-2">
                  {project.tools.map((tool) => (
                    <span
                      key={tool}
                      className="text-xs font-medium px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 7. LIVE INTERACTIVE DEMO (FRONT-END SCRIPTED) */}
        <section aria-labelledby="demo-heading" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-slate-200/80 dark:border-slate-800/80">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-teal-500/10 text-teal-700 dark:text-teal-400 border border-teal-500/20 mb-3">
                Interactive demo
              </span>
              <h2 id="demo-heading" className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                Try a Sample Business Support Bot
              </h2>
              <p className="mt-2 text-slate-600 dark:text-slate-300">
                Choose a sample question to preview a scripted response. This interface is illustrative only; it is not connected to an AI model, business knowledge base or lead-capture system.
              </p>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Fictional sample business • Scripted preview • No AI API or lead capture
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6">
            {/* Suggested Questions */}
            <div className="lg:col-span-5 space-y-2.5">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                Select a sample visitor question:
              </p>
              {DEMO_CONVERSATIONS.map((item) => {
                const active = selectedDemo.id === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelectDemoQuestion(item)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium border transition-all ${
                      active
                        ? 'border-teal-500 bg-teal-500/10 text-teal-800 dark:text-teal-200'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {item.question}
                  </button>
                );
              })}
            </div>

            {/* Chat Window */}
            <div className="lg:col-span-7 flex flex-col justify-between rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-5 min-h-[260px]">
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-teal-500" />
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                      Client Assistant (Sample Knowledge Base)
                    </span>
                  </div>
                  <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-200/70 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    Interactive demo
                  </span>
                </div>

                <div className="space-y-4">
                  {/* Visitor Message */}
                  <div className="flex justify-end">
                    <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-teal-600 dark:bg-teal-500 text-white dark:text-slate-950 px-4 py-2.5 text-sm font-medium">
                      {selectedDemo.question}
                    </div>
                  </div>

                  {/* Bot Reply */}
                  <div className="flex justify-start">
                    <div className="max-w-[90%] rounded-2xl rounded-tl-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-3 text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                      {displayedAnswer}
                      {isTyping && (
                        <span className="inline-block w-1.5 h-4 ml-1 bg-teal-500 animate-pulse align-middle" />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span>Scripted sample response • No lead data collected</span>
                <a
                  href="#contact"
                  className="font-semibold text-teal-600 dark:text-teal-400 hover:underline"
                >
                  Want this on your site? →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 8. TOOLS I WORK WITH */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-slate-200/80 dark:border-slate-800/80">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Tools &amp; Technologies Explored
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300">
              A selection of technologies explored for learning and concept work. Listing a tool does not imply production experience or a commitment to use it on a project.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {TOOLS.map((tool) => (
              <div
                key={tool.name}
                className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 px-4 py-3.5"
              >
                <p className="font-semibold text-sm text-slate-900 dark:text-white">{tool.name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{tool.category}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 9. WHY WORK WITH ME */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-slate-200/80 dark:border-slate-800/80">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Why Work With Me
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_ME.map((point) => (
              <div
                key={point.title}
                className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-6"
              >
                <CheckCircle2 className="w-5 h-5 text-teal-600 dark:text-teal-400 mb-3" />
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  {point.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {point.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 10. FAQ */}
        <section id="faq" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-slate-200/80 dark:border-slate-800/80">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>

          <div className="mt-8 space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={faq.q}
                  className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 font-semibold text-slate-900 dark:text-white"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-500 shrink-0 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/70 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* 11. FINAL CALL TO ACTION & CONTACT FORM */}
        <section id="contact" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-slate-200/80 dark:border-slate-800/80">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-6 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-6 space-y-5">
              <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white leading-tight">
                Have a repetitive process eating your team’s time? Let’s automate it.
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                For general enquiries, use the form to prepare an email draft or contact me directly. An enquiry does not confirm availability or acceptance of work; any potential engagement is subject to applicable commitments and agreed terms.
              </p>

              <div className="pt-4 space-y-2 text-sm text-slate-500 dark:text-slate-400">
                <p className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  No obligation • Fixed-price written quote after our call
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  Typical turnaround: 1–2 weeks
                </p>
                <p className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  100% code &amp; workflow ownership handed over to you
                </p>
              </div>
            </div>

            {/* Simple Contact Form (opens pre-filled email to subhajitpal86@gmail.com) */}
            <form
              onSubmit={handleContactSubmit}
              className="lg:col-span-6 space-y-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/80 p-6"
            >
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Prepare an Email Enquiry
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">This form opens your email application with a pre-filled draft; it does not submit or store information on this website. Please do not include confidential or sensitive information in an initial enquiry.</p>

              <div>
                <label htmlFor="contact-name" className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                  Your Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="Alex Rivera"
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                  Work Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="alex@company.com"
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label htmlFor="contact-budget" className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                  Budget Range
                </label>
                <select
                  id="contact-budget"
                  value={contactBudget}
                  onChange={(e) => setContactBudget(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-teal-500"
                >
                  <option value="₹12,500 – ₹20,500 / $150 – $250">₹12,500 – ₹20,500 / $150 – $250 (Workflow / Document processing)</option>
                  <option value="₹20,500 – ₹33,000 / $250 – $400">₹20,500 – ₹33,000 / $250 – $400 (Chatbot / AI agent)</option>
                  <option value="₹33,000+ / $400+">₹33,000+ / $400+ (Larger custom solution)</option>
                  <option value="Not sure yet">Not sure yet — discuss the requirement</option>
                </select>
              </div>

              <div>
                <label htmlFor="contact-desc" className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                  What would you like to automate?
                </label>
                <textarea
                  id="contact-desc"
                  rows={3}
                  required
                  value={contactDesc}
                  onChange={(e) => setContactDesc(e.target.value)}
                  placeholder="Briefly describe the repetitive task, documents, or customer support workflow..."
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white transition-colors"
              >
                <Send className="w-4 h-4" />
                Prepare Email Draft
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* 12. FOOTER (No social icons per requirements) */}
      <footer className="border-t border-slate-200/80 dark:border-slate-800/80 py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-sm text-slate-500 dark:text-slate-400">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
            <a
              href="mailto:subhajitpal86@gmail.com"
              className="inline-flex items-center gap-1.5 text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 font-medium"
            >
              <Mail className="w-4 h-4" />
              subhajitpal86@gmail.com
            </a>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              Kolkata, India (IST)
            </span>
          </div>

          <p>© {currentYear} Independent AI &amp; Automation Portfolio. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;