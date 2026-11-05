"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Bot, Command, CornerDownLeft, ExternalLink, MessageCircle, Search, Send, Sparkles, X } from "lucide-react";
import { products as suiteProducts } from "@/data/suiteProducts";
import { SERVICES } from "@/data/services";
import { POSTS } from "@/data/blog";
import { LEGAL } from "@/data/legal";

type Entry = {
  title: string;
  href: string;
  category: string;
  description: string;
  body?: string;
  keywords?: string;
};

const mainPages: Entry[] = [
  { title: "Home", href: "/", category: "Page", description: "Budgetree — rewards, loyalty, payouts and business management.", keywords: "home overview budgetree" },
  { title: "RewardX", href: "/products/rewardx", category: "Product", description: "Employee and customer rewards, digital gifting, milestone recognition and automated reward delivery.", keywords: "reward recognition gift cards employee customer" },
  { title: "LoyaltyX", href: "/products/loyaltyx", category: "Product", description: "Customer loyalty programs, reward points, tiers, redemption and white-label engagement.", keywords: "loyalty points redemption retention" },
  { title: "UPI Rewards", href: "/products/upi-rewards", category: "Product", description: "UPI cashback and cash-token rewards for customers and campaigns.", keywords: "upi cash token cashback qr" },
  { title: "Payouts", href: "/products/payouts", category: "Product", description: "Single and bulk payout solutions for businesses.", keywords: "disbursement transfer payments bulk" },
  { title: "Bill Payments", href: "/products/bill-payments", category: "Product", description: "Bill payment and utility services for businesses and customers.", keywords: "bill utility recharge bbps" },
  { title: "Why Budgetree", href: "/#why", category: "Section", description: "How Budgetree helps businesses run rewards, loyalty and engagement." },
  { title: "Management Suite", href: "/#management-suite", category: "Section", description: "Nine modules for warehouse, sales, orders, inventory, products, targets, promotions, pricing and incentives." },
  { title: "SiriPay", href: "https://siripay.co/", category: "Marketplace", description: "Gift cards, shopping, food, travel and experiences at SiriPay.", keywords: "gift card brands discount siripay" },
  { title: "About Us", href: "/about", category: "Company", description: "Learn about Budgetree and its rewards and engagement platforms." },
  { title: "Solutions", href: "/solutions", category: "Company", description: "Business solutions for rewards, channel partners, customers and employees." },
  { title: "Pricing", href: "/pricing", category: "Company", description: "Explore pricing and contact Budgetree for a plan." },
  { title: "Book a Demo", href: "/demo", category: "Action", description: "Schedule a product walkthrough with the Budgetree team.", keywords: "sales meeting trial book call" },
  { title: "Contact", href: "/contact", category: "Action", description: "Contact the Budgetree team for support, integrations and business enquiries.", keywords: "support phone email help" },
  { title: "News", href: "/news-page", category: "Company", description: "Budgetree announcements and company news." },
  { title: "Blog", href: "/blog", category: "Insights", description: "Articles on rewards, loyalty, payouts, fintech and digital gifting." },
  { title: "Neo Plus — Current Account", href: "/neo-plus/current-account", category: "Neo Plus", description: "Explore business current account enquiries and onboarding.", keywords: "banking gst pan account" },
  { title: "Neo Plus — Payouts", href: "/neo-plus/payouts", category: "Neo Plus", description: "Explore business payouts and payment management." },
  { title: "Neo Plus — Payout Links", href: "/neo-plus/payout-links", category: "Neo Plus", description: "Payout links for business payment workflows." },
  { title: "Developer Docs", href: "/developers/docs", category: "Developers", description: "Integration and developer documentation." },
  { title: "Integration Guide", href: "/developers/integration", category: "Developers", description: "Developer integration steps and technical guidance." },
  { title: "API Reference", href: "/developers/api-reference", category: "Developers", description: "Developer API reference and endpoints." },
];

const INDEX: Entry[] = [
  ...mainPages,
  ...suiteProducts.map((p) => ({
    title: p.name,
    href: "/products/suite/" + p.slug,
    category: "Management Suite",
    description: p.description || p.tagline,
    body: [
      p.tagline,
      ...p.features.map((f) => f.title + ": " + f.text),
      ...p.faqs.map((f) => f.q + " " + f.a),
      ...p.benefits,
    ].join(" "),
    keywords: p.short + " " + p.category,
  })),
  ...SERVICES.map((s) => ({
    title: s.name,
    href: "/services/" + s.slug,
    category: "Service",
    description: s.desc,
    body: [s.tagline, ...s.features.map((f) => f.title + ": " + f.desc)].join(" "),
  })),
  ...POSTS.map((p) => ({
    title: p.title,
    href: "/blog/" + p.slug,
    category: "Blog",
    description: p.excerpt,
    body: p.content.map((s) => (s.h || "") + " " + s.p).join(" "),
    keywords: p.category,
  })),
  ...LEGAL.map((p) => ({
    title: p.title,
    href: "/legal/" + p.slug,
    category: "Legal",
    description: p.intro,
    body: p.sections.map((s) => s.h + " " + s.body.join(" ")).join(" "),
  })),
];

const normalize = (text: string) => text.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, " ").trim();
const stop = new Set(["the", "a", "an", "i", "is", "are", "me", "my", "in", "on", "how", "what", "where", "do", "does", "can", "you", "for", "to", "of", "and", "about", "batao", "ka", "ki", "hai", "kya", "mujhe", "ke", "mein", "bhi"]);
const words = (q: string) => normalize(q).split(" ").filter((s) => s.length > 1 && !stop.has(s));

function relevance(item: Entry, query: string) {
  const q = normalize(query);
  if (!q) return 0;
  const title = normalize(item.title);
  const desc = normalize(item.description);
  const keys = normalize(item.keywords || "");
  const body = normalize(item.body || "");
  const tokens = words(query);
  if (!tokens.length) return 0;
  let score = title === q ? 80 : title.includes(q) ? 45 : 0;
  if (keys.includes(q)) score += 16;
  if (desc.includes(q)) score += 13;
  for (const t of tokens) {
    if (title.includes(t)) score += 12;
    if (keys.includes(t)) score += 7;
    if (desc.includes(t)) score += 4;
    if (body.includes(t)) score += 1;
  }
  return score;
}

function findPages(query: string, max = 8) {
  if (!query.trim()) return INDEX.slice(1, 7);
  return INDEX.map((entry) => ({ entry, score: relevance(entry, query) }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, max)
    .map((r) => r.entry);
}

type Message = { role: "user" | "assistant"; text: string; links?: Entry[] };
const suggested = ["What is RewardX?", "Current Account", "Warehouse Management", "Book a demo"];

function SearchResult({ item, onSelect }: { item: Entry; onSelect: () => void }) {
  const external = item.href.startsWith("http");
  return (
    <a
      href={item.href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      onClick={onSelect}
      className="group flex items-center justify-between gap-3 rounded-2xl px-4 py-3 transition hover:bg-line/10"
    >
      <div className="min-w-0">
        <div className="truncate text-sm font-bold text-fg">{item.title}</div>
        <div className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-fg/60">{item.description}</div>
      </div>
      <ArrowRight className="h-4 w-4 shrink-0 text-acc transition group-hover:translate-x-1" />
    </a>
  );
}

export default function SiteSearchAssistant() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", text: "Hi! I can help you find Budgetree products, services, docs, and information from this website. What would you like to know?" },
  ]);
  const searchInput = useRef<HTMLInputElement>(null);
  const chatEnd = useRef<HTMLDivElement>(null);
  const results = useMemo(() => findPages(query, 10), [query]);

  useEffect(() => {
    const openSearch = () => { setChatOpen(false); setSearchOpen(true); };
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        openSearch();
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
        setChatOpen(false);
      }
    };
    window.addEventListener("bt-open-search", openSearch);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("bt-open-search", openSearch);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    if (searchOpen) searchInput.current?.focus();
  }, [searchOpen]);
  useEffect(() => {
    chatEnd.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages, chatOpen]);

  function ask(text: string) {
    const q = text.trim();
    if (!q) return;
    const matches = findPages(q, 3);
    let answer: string;
    if (!matches.length) {
      answer = "I couldn't find an exact answer in the published website content. Try a product name or contact the Budgetree team for help.";
    } else {
      const item = matches[0];
      answer = item.title + ": " + item.description;
      if (matches.length > 1) answer += " You can also explore these related pages below.";
    }
    setMessages((prev) => [...prev, { role: "user", text: q }, { role: "assistant", text: answer, links: matches }]);
    setQuestion("");
  }

  function submitQuestion(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    ask(question);
  }

  return (
    <>
      {/* Floating assistant lives on the left so BackToTop stays accessible on the right. */}
      <div className="fixed bottom-5 left-4 z-[75] sm:bottom-6 sm:left-6">
        <AnimatePresence>
          {chatOpen && (
            <motion.section
              initial={{ opacity: 0, y: 26, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 230, damping: 22 }}
              aria-label="Budgetree website assistant"
              className="mb-3 flex h-[min(620px,75dvh)] w-[min(390px,calc(100vw-32px))] flex-col overflow-hidden rounded-[26px] border border-line/20 bg-raise text-fg shadow-[0_28px_85px_rgba(0,0,0,.35)]"
            >
              <header className="flex items-center justify-between bg-volt px-4 py-4 text-coal">
                <div className="flex items-center gap-2.5">
                  <span className="grid h-10 w-10 place-items-center rounded-2xl bg-coal text-volt"><Bot className="h-5 w-5" /></span>
                  <div><div className="text-sm font-extrabold">Budgetree Assistant</div><div className="text-[11px] font-medium text-coal/70">Website knowledge · Instant answers</div></div>
                </div>
                <button aria-label="Close assistant" onClick={() => setChatOpen(false)} className="rounded-full p-2 hover:bg-coal/10"><X className="h-5 w-5" /></button>
              </header>
              <div className="flex-1 space-y-3 overflow-y-auto px-4 py-5">
                {messages.map((m, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    className={m.role === "user" ? "ml-8 rounded-2xl rounded-br-md bg-volt p-3 text-sm text-coal" : "mr-5 rounded-2xl rounded-bl-md border border-line/10 bg-base p-3 text-sm leading-relaxed text-fg"}>
                    <p>{m.text}</p>
                    {m.links && m.links.length > 0 && (
                      <div className="mt-3 flex flex-col gap-1 border-t border-line/10 pt-2">
                        {m.links.map((item) => (
                          <a key={item.href} href={item.href}
                            target={item.href.startsWith("http") ? "_blank" : undefined}
                            rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                            className="flex items-center justify-between gap-2 rounded-lg px-2 py-2 text-xs font-semibold text-acc hover:bg-line/10">
                            {item.title} <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                          </a>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
                {messages.length === 1 && <div className="flex flex-wrap gap-2">
                  {suggested.map((item) => <button key={item} type="button" onClick={() => ask(item)} className="rounded-full border border-acc/30 px-3 py-2 text-xs font-medium text-fg/80 hover:bg-acc/10">{item}</button>)}
                </div>}
                <div ref={chatEnd} />
              </div>
              <div className="border-t border-line/10 bg-raise p-3">
                <form onSubmit={submitQuestion} className="flex items-center gap-2">
                  <input aria-label="Ask about Budgetree" value={question} onChange={(e) => setQuestion(e.target.value)}
                    maxLength={250} placeholder="Ask about a product or service..."
                    className="min-w-0 flex-1 rounded-xl border border-line/20 bg-base px-3 py-3 text-sm text-fg outline-none placeholder:text-fg/45 focus:border-acc" />
                  <button type="submit" disabled={!question.trim()} aria-label="Send question"
                    className="grid h-11 w-11 place-items-center rounded-xl bg-volt text-coal disabled:opacity-40"><Send className="h-4 w-4" /></button>
                </form>
                <p className="mt-2 text-center text-[10px] text-fg/45">Search-based assistant · Not live human support or generative AI</p>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
        <motion.button
          type="button"
          aria-label={chatOpen ? "Close Budgetree assistant" : "Open Budgetree assistant"}
          aria-expanded={chatOpen}
          onClick={() => { setChatOpen((v) => !v); setSearchOpen(false); }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
          className="group flex items-center gap-2 rounded-full border border-volt/40 bg-coal px-4 py-3 text-sm font-bold text-white shadow-[0_10px_35px_rgba(0,0,0,.27)]"
        >
          <span className="relative grid h-8 w-8 place-items-center rounded-full bg-volt text-coal">
            {chatOpen ? <X className="h-4 w-4" /> : <Bot className="h-5 w-5" />}
            {!chatOpen && <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-coal bg-green-400" />}
          </span>
          <span>{chatOpen ? "Close" : "Ask Budgetree"}</span>
          {!chatOpen && <Sparkles className="h-4 w-4 text-volt" />}
        </motion.button>
      </div>

      {/* Universal website search */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex justify-center bg-black/75 px-3 pt-[10dvh] backdrop-blur-md sm:pt-[14dvh]"
            onMouseDown={(e) => { if (e.target === e.currentTarget) setSearchOpen(false); }}
          >
            <motion.div
              role="dialog" aria-modal="true" aria-label="Search Budgetree website"
              initial={{ y: -18, opacity: 0, scale: 0.97 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -10, opacity: 0, scale: 0.97 }}
              className="h-fit max-h-[75dvh] w-full max-w-2xl overflow-hidden rounded-3xl border border-line/20 bg-raise shadow-2xl"
            >
              <div className="flex items-center gap-3 border-b border-line/10 px-5 py-4">
                <Search className="h-5 w-5 shrink-0 text-acc" />
                <input ref={searchInput} value={query} onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products, services, docs, blog..."
                  aria-label="Search all Budgetree pages"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && results[0]) {
                      window.location.href = results[0].href;
                      setSearchOpen(false);
                    }
                  }}
                  className="min-w-0 flex-1 bg-transparent text-base text-fg outline-none placeholder:text-fg/40"
                />
                <kbd className="hidden items-center gap-1 rounded-md bg-line/10 px-2 py-1 text-xs text-fg/50 sm:inline-flex"><Command className="h-3 w-3" />K</kbd>
                <button type="button" aria-label="Close search" onClick={() => setSearchOpen(false)} className="rounded-lg p-2 text-fg/70 hover:bg-line/10"><X className="h-5 w-5" /></button>
              </div>
              <div className="max-h-[min(60dvh,560px)] overflow-y-auto px-2 py-3">
                <p className="px-4 pb-2 text-[10px] font-bold uppercase tracking-widest text-fg/45">{query.trim() ? results.length + " matching pages" : "Explore Budgetree"}</p>
                {results.length ? results.map((item) => (
                  <SearchResult key={item.href} item={item} onSelect={() => setSearchOpen(false)} />
                )) : (
                  <div className="p-8 text-center">
                    <Search className="mx-auto h-8 w-8 text-fg/30" />
                    <p className="mt-3 font-semibold text-fg">No matching pages</p>
                    <p className="mt-2 text-sm text-fg/60">Try a product, service, or another keyword.</p>
                    <a href="/contact" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-acc">Contact our team <ArrowRight className="h-4 w-4" /></a>
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between border-t border-line/10 px-5 py-3 text-xs text-fg/50">
                <span>Searches published site content</span>
                <span className="hidden items-center gap-1 sm:flex"><CornerDownLeft className="h-3.5 w-3.5" /> Open first result</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
