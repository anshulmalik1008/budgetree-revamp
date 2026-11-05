"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Bot, Command, CornerDownLeft, ExternalLink, Search, Send, Sparkles, X, Mic, MicOff, Volume2, VolumeX, Trash2 } from "lucide-react";
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

// Map common Hindi and Hinglish product terms to searchable website vocabulary.
const SEARCH_SYNONYMS: Array<[string, string]> = [
  ["रिवार्ड एक्स", "rewardx"], ["रिवॉर्ड एक्स", "rewardx"], ["रिवॉर्ड्स", "rewards"],
  ["रिवॉर्ड", "reward"], ["इनाम", "rewards"], ["गिफ्ट कार्ड", "gift card"],
  ["लॉयल्टी एक्स", "loyaltyx"], ["लॉयल्टी", "loyalty"],
  ["यूपीआई", "upi"], ["कैशबैक", "cashback"], ["पेआउट", "payout"],
  ["पेमेंट", "payment"], ["बिल पेमेंट", "bill payments"], ["रिचार्ज", "recharge"],
  ["वेयरहाउस", "warehouse"], ["इन्वेंटरी", "inventory"],
  ["ऑर्डर", "order"], ["स्कीम", "scheme"], ["ऑफर", "offers"],
  ["प्राइसिंग", "pricing"], ["इंसेंटिव", "incentive"],
  ["सेल्स फोर्स", "sales force"], ["टारगेट", "target"],
  ["करंट अकाउंट", "current account"], ["बैंक अकाउंट", "current account"],
  ["डॉक्यूमेंटेशन", "docs"], ["एपीआई", "api"], ["इंटीग्रेशन", "integration"],
  ["सिरीपे", "siripay"], ["सिरी पे", "siripay"],
  ["डेमो", "demo"], ["संपर्क", "contact"],
  ["रिवार्ड", "reward"], ["पैसे", "payout"], ["प्रोडक्ट", "product"],
  ["reward x", "rewardx"], ["loyalty x", "loyaltyx"],
  ["siripay", "siripay"],
];
const normalize = (text: string) => {
  let value = text.toLowerCase().normalize("NFKD");
  for (const [term, replacement] of SEARCH_SYNONYMS) value = value.split(term).join(" " + replacement + " ");
  return value.replace(/[^a-z0-9]+/g, " ").replace(/\s+/g, " ").trim();
};
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

type Language = "en" | "hi" | "hinglish";
const CHAT_KEY = "bt-assistant-chat-v1";
const LANGUAGE_KEY = "bt-assistant-language-v1";
const VOICE_KEY = "bt-assistant-voice-v1";
const WELCOME: Message = { role: "assistant", text: "Namaste! Ask about Budgetree products and services. You can speak in Hindi, English or Hinglish." };
type SpeechResultEvent = { resultIndex: number; results: ArrayLike<{ isFinal: boolean; 0: { transcript: string } }> };
type BrowserRecognition = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  onresult: ((event: SpeechResultEvent) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
};
type SpeechWindow = Window & {
  SpeechRecognition?: new () => BrowserRecognition;
  webkitSpeechRecognition?: new () => BrowserRecognition;
};
const LANGUAGES: { code: Language; label: string }[] = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी" },
  { code: "hinglish", label: "Hinglish" },
];
const languageToRecognition = (language: Language) => language === "hi" ? "hi-IN" : "en-IN";
const languageToSpeech = (language: Language) => language === "hi" ? "hi-IN" : "en-IN";
const VOICE_NAME_KEY = "bt-assistant-female-voice-v1";
// Browser APIs do not report gender. Use known Indian female voice names only.
// Do not let the browser silently substitute its default (often male) voice.
const FEMALE_HINDI_NAMES = ["swara", "lekha", "kalpana", "heera", "aditi", "kajal", "priya", "sangeeta", "neerja"];
const FEMALE_INDIAN_ENGLISH_NAMES = ["neerja", "raveena", "veena", "heera", "aditi", "kajal", "priya", "sangeeta", "lekha"];
const FEMALE_BLOCKLIST = ["prabhat", "hemant", "ravi", "rahul", "madhur", "amit", "male", "arjun"];
function availableFemaleVoices(voices: SpeechSynthesisVoice[], language: Language) {
  const hints = language === "hi" ? FEMALE_HINDI_NAMES : FEMALE_INDIAN_ENGLISH_NAMES;
  const preferredLocale = languageToSpeech(language).toLowerCase();
  return voices
    .filter((voice) => {
      const name = voice.name.toLowerCase();
      const locale = voice.lang.toLowerCase();
      return locale.startsWith(preferredLocale.slice(0, 2)) &&
        !FEMALE_BLOCKLIST.some((blocked) => name.includes(blocked)) &&
        hints.some((hint) => name.includes(hint));
    })
    .sort((a, b) => {
      const rank = (voice: SpeechSynthesisVoice) => {
        const locale = voice.lang.toLowerCase();
        const position = hints.findIndex((hint) => voice.name.toLowerCase().includes(hint));
        return (locale === preferredLocale ? 0 : 100) + (position < 0 ? 90 : position);
      };
      return rank(a) - rank(b);
    });
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
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [language, setLanguage] = useState<Language>("hinglish");
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [speechError, setSpeechError] = useState("");
  const [answering, setAnswering] = useState(false);
  const [answerMode, setAnswerMode] = useState<"ai" | "knowledge">("knowledge");
  const [speechAvailable, setSpeechAvailable] = useState(false);
  const [installedVoices, setInstalledVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [chosenVoice, setChosenVoice] = useState("");
  const recognitionRef = useRef<BrowserRecognition | null>(null);
  const voiceEnabledRef = useRef(false);
  const languageRef = useRef<Language>("hinglish");
  const [hydrated, setHydrated] = useState(false);
  const searchInput = useRef<HTMLInputElement>(null);
  const chatEnd = useRef<HTMLDivElement>(null);
  const results = useMemo(() => findPages(query, 10), [query]);

  // Keep chat history on this device. No chat transcript is uploaded for memory.
  useEffect(() => {
    try {
      const savedLanguage = window.localStorage.getItem(LANGUAGE_KEY);
      if (savedLanguage === "en" || savedLanguage === "hi" || savedLanguage === "hinglish") {
        setLanguage(savedLanguage);
        languageRef.current = savedLanguage;
      }
      const savedVoice = window.localStorage.getItem(VOICE_KEY) === "true";
      setVoiceEnabled(savedVoice);
      voiceEnabledRef.current = savedVoice;
      const history = window.localStorage.getItem(CHAT_KEY);
      if (history) {
        const parsed: unknown = JSON.parse(history);
        if (Array.isArray(parsed)) {
          const valid = parsed.filter((item): item is Message =>
            !!item && typeof item === "object" &&
            (item.role === "user" || item.role === "assistant") &&
            typeof item.text === "string"
          ).slice(-30).map(({ role, text }) => ({ role, text: text.slice(0, 1200) }));
          if (valid.length) setMessages(valid);
        }
      }
    } catch {
      // Storage may be blocked by the browser.
    } finally {
      setHydrated(true);
    }
    const w = window as SpeechWindow;
    setSpeechAvailable(Boolean(w.SpeechRecognition || w.webkitSpeechRecognition));
    try { setChosenVoice(window.localStorage.getItem(VOICE_NAME_KEY) || ""); } catch {}
    const speech = window.speechSynthesis;
    const refresh = () => setInstalledVoices(speech ? speech.getVoices() : []);
    refresh();
    speech?.addEventListener?.("voiceschanged", refresh);
    return () => {
      speech?.removeEventListener?.("voiceschanged", refresh);
      recognitionRef.current?.abort();
      speech?.cancel();
    };
  }, []);

  useEffect(() => {
    languageRef.current = language;
    if (hydrated) {
      try { window.localStorage.setItem(LANGUAGE_KEY, language); } catch {}
    }
  }, [language, hydrated]);

  useEffect(() => {
    voiceEnabledRef.current = voiceEnabled;
    if (hydrated) {
      try { window.localStorage.setItem(VOICE_KEY, String(voiceEnabled)); } catch {}
    }
    if (!voiceEnabled) {
      window.speechSynthesis?.cancel();
      setSpeaking(false);
    }
  }, [voiceEnabled, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(CHAT_KEY, JSON.stringify(messages.slice(-30).map(({role, text}) => ({role, text}))));
    } catch {}
  }, [messages, hydrated]);

  function speak(text: string, code: Language = languageRef.current) {
    if (!("speechSynthesis" in window)) {
      setSpeechError("Voice playback is unavailable in this browser.");
      return;
    }
    const speech = window.speechSynthesis;
    speech.cancel();
    // Voices may load after page hydration. Query them again at speak time.
    const femaleVoices = availableFemaleVoices(speech.getVoices(), code);
    const selected = femaleVoices.find((v) => v.name === chosenVoice) || femaleVoices[0];
    if (!selected) {
      setSpeechError(code === "hi"
        ? "Indian female Hindi voice is not installed in this browser. Install a Hindi female system voice or switch browser. Showing the answer as text instead."
        : "Indian female voice is not available in this browser. Install an Indian English female system voice (Neerja, Raveena or Veena). Showing the answer as text instead.");
      setSpeaking(false);
      return;
    }
    setSpeechError("");
    const utterance = new SpeechSynthesisUtterance(text.slice(0, 1250));
    utterance.voice = selected;
    utterance.lang = selected.lang;
    utterance.rate = code === "hi" ? 0.94 : 0.98;
    utterance.pitch = 1.06;
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    speech.speak(utterance);
  }

  function stopSpeech() {
    window.speechSynthesis?.cancel();
    setSpeaking(false);
  }

  function toggleMicrophone() {
    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }
    const w = window as SpeechWindow;
    const Recognition = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!Recognition) {
      setSpeechError("Microphone speech recognition is not supported here. Try Chrome or Edge and allow microphone access.");
      return;
    }
    stopSpeech();
    setSpeechError("");
    try {
      const recog = new Recognition();
      recognitionRef.current = recog;
      recog.lang = languageToRecognition(languageRef.current);
      recog.continuous = false;
      recog.interimResults = false;
      recog.onresult = (event) => {
        const transcript = Array.from(event.results).map((result) => result[0]?.transcript || "").join(" ").trim();
        if (transcript) {
          setQuestion(transcript);
          ask(transcript, true);
        }
      };
      recog.onerror = (event) => {
        setListening(false);
        if (event.error !== "aborted" && event.error !== "no-speech") {
          setSpeechError(event.error === "not-allowed" ? "Microphone permission denied. Allow microphone access in your browser." : "Could not recognize speech. Please try again.");
        }
      };
      recog.onend = () => setListening(false);
      recog.start();
      setListening(true);
      // Mic interaction enables spoken responses. The setting persists on this device.
      setVoiceEnabled(true);
      voiceEnabledRef.current = true;
    } catch {
      setListening(false);
      setSpeechError("Unable to start microphone. Check your browser permission.");
    }
  }

  function clearMemory() {
    stopSpeech();
    recognitionRef.current?.abort();
    setListening(false);
    setMessages([WELCOME]);
    setQuestion("");
    try { window.localStorage.removeItem(CHAT_KEY); } catch {}
  }

  function answerFor(item: Entry, lang: Language, others: number): string {
    if (lang === "hi") {
      return `${item.title} — ${item.description} ${others > 0 ? "इससे जुड़े अन्य पेज भी नीचे दिए हैं।" : "अधिक जानकारी के लिए नीचे दिए लिंक पर जाएँ।"}`;
    }
    if (lang === "hinglish") {
      return `${item.title} — ${item.description} ${others > 0 ? "Related pages bhi neeche mil jayenge." : "Aur details ke liye neeche wala page open karo."}`;
    }
    return `${item.title}: ${item.description}${others > 0 ? " You can also explore related pages below." : " Open the page below for more information."}`;
  }

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

  async function ask(text: string, fromVoice = false) {
    const q = text.trim().slice(0, 600);
    if (!q || answering) return;
    const lang = languageRef.current;
    const context = messages.slice(-8).map(({ role, text }) => ({ role, text }));
    setAnswering(true);
    setSpeechError("");
    setQuestion("");
    setMessages((previous) => [...previous, { role: "user" as const, text: q }].slice(-30));

    let answer = "";
    let related: Entry[] = [];
    let mode: "ai" | "knowledge" = "knowledge";
    try {
      const controller = new AbortController();
      const timeout = window.setTimeout(() => controller.abort(), 19000);
      let response: Response;
      try {
        response = await fetch("/api/assistant", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: q, language: lang, history: context }),
          signal: controller.signal,
        });
      } finally { window.clearTimeout(timeout); }
      const result = await response.json() as {
        answer?: string; error?: string;
        links?: Array<{ title: string; href: string; category?: string }>;
        mode?: "ai" | "knowledge";
      };
      if (!response.ok || !result.answer) throw new Error(result.error || "Assistant is temporarily unavailable.");
      answer = result.answer;
      mode = result.mode === "ai" ? "ai" : "knowledge";
      related = (result.links || []).filter((link) => typeof link.href === "string" &&
        (link.href.startsWith("/") || link.href === "https://siripay.co/"))
        .map((link) => ({
          title: link.title, href: link.href,
          category: link.category || "Website", description: "Open this page for details",
        }));
    } catch {
      const matches = findPages(q, 3);
      related = matches;
      answer = matches.length
        ? matches.map((item) => item.title + ": " + item.description).join("\n\n") +
          (lang === "hi" ? "\n\nअधिक जानकारी के लिए संबंधित पेज खोलें।" :
            lang === "hinglish" ? "\n\nAur details ke liye related page open karein." :
            "\n\nOpen a related page to read more.")
        : lang === "hi"
          ? "अभी जवाब नहीं मिल रहा है। कृपया थोड़ी देर में कोशिश करें या Budgetree टीम से संपर्क करें।"
          : lang === "hinglish"
            ? "Abhi complete answer available nahi hai. Thodi der baad try karein ya Budgetree team se contact karein."
            : "I couldn't access the full answer just now. Try again or contact the Budgetree team.";
    } finally {
      setAnswering(false);
    }
    setAnswerMode(mode);
    setMessages((previous) => [
      ...previous,
      { role: "assistant" as const, text: answer, links: related },
    ].slice(-30));
    if (voiceEnabledRef.current || fromVoice) speak(answer, lang);
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
                  <div><div className="text-sm font-extrabold">Budgetree Assistant</div><div className="text-[11px] font-medium text-coal/70">Detailed product guidance · Hindi / English / Hinglish</div></div>
                </div>
                <button aria-label="Close assistant" onClick={() => setChatOpen(false)} className="rounded-full p-2 hover:bg-coal/10"><X className="h-5 w-5" /></button>
              </header>
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line/10 bg-raise px-3 py-2">
                <label className="flex items-center gap-1 text-[11px] font-semibold text-fg/70">
                  Language
                  <select
                    value={language}
                    onChange={(e) => { setLanguage(e.target.value as Language); stopSpeech(); }}
                    aria-label="Assistant language"
                    className="rounded-lg border border-line/20 bg-base px-2 py-1.5 text-xs font-semibold text-fg outline-none focus:border-acc"
                  >
                    {LANGUAGES.map((option) => <option key={option.code} value={option.code}>{option.label}</option>)}
                  </select>
                </label>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setVoiceEnabled((enabled) => !enabled)}
                    aria-label={voiceEnabled ? "Turn voice responses off" : "Turn voice responses on"}
                    title={voiceEnabled ? "Voice replies on" : "Voice replies off"}
                    className="rounded-lg border border-line/20 p-2 text-fg hover:bg-line/10"
                  >
                    {voiceEnabled ? <Volume2 className="h-4 w-4 text-acc" /> : <VolumeX className="h-4 w-4" />}
                  </button>
                  {speaking && <button onClick={stopSpeech} type="button" className="rounded-lg px-2 py-1 text-[11px] font-bold text-acc">Stop</button>}
                  <button
                    type="button"
                    onClick={clearMemory}
                    title="Clear saved conversation on this device"
                    aria-label="Clear chat memory"
                    className="rounded-lg border border-line/20 p-2 text-fg/60 hover:bg-line/10 hover:text-fg"
                  ><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>
              {voiceEnabled && (
                <div className="border-b border-line/10 bg-raise px-3 py-2">
                  <label className="flex items-center gap-2 text-xs font-semibold text-fg/75">
                    Indian female voice
                    <select
                      aria-label="Select Indian female voice"
                      value={availableFemaleVoices(installedVoices, language).some((v) => v.name === chosenVoice) ? chosenVoice : ""}
                      onChange={(event) => {
                        const name = event.target.value;
                        setChosenVoice(name);
                        stopSpeech();
                        try { window.localStorage.setItem(VOICE_NAME_KEY, name); } catch {}
                      }}
                      className="min-w-0 flex-1 rounded-lg border border-line/20 bg-base px-2 py-2 text-xs text-fg"
                    >
                      <option value="">Automatic female</option>
                      {availableFemaleVoices(installedVoices, language).map((voice) => (
                        <option key={voice.voiceURI} value={voice.name}>{voice.name}</option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => speak(language === "hi" ? "नमस्ते, मैं बजट्री की आपकी वॉयस असिस्टेंट हूँ।" : "Namaste! I'm your Budgetree voice assistant.", language)}
                      className="shrink-0 rounded-lg border border-acc/40 px-2.5 py-2 text-[11px] font-bold text-acc hover:bg-acc/10"
                    >
                      Test
                    </button>
                  </label>
                  {availableFemaleVoices(installedVoices, language).length === 0 && (
                    <p className="mt-2 text-[11px] text-amber-500">No verified Indian female voice detected on this device. Text answers will continue; male fallback is disabled.</p>
                  )}
                </div>
              )}
              <div className="flex-1 space-y-3 overflow-y-auto px-4 py-5">
                {messages.map((m, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    className={m.role === "user" ? "ml-8 rounded-2xl rounded-br-md bg-volt p-3 text-sm text-coal" : "mr-5 rounded-2xl rounded-bl-md border border-line/10 bg-base p-3 text-sm leading-relaxed text-fg"}>
                    <p className="whitespace-pre-line">{m.text}</p>
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
                {answering && <div role="status" className="mr-10 animate-pulse rounded-2xl border border-acc/20 bg-base p-3 text-sm text-fg/70">Checking Budgetree website information…</div>}
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
                  <button
                    type="button"
                    onClick={toggleMicrophone}
                    aria-label={listening ? "Stop listening" : "Speak your question"}
                    aria-pressed={listening}
                    title={!speechAvailable ? "Voice recognition may be unsupported in this browser" : listening ? "Listening — tap to stop" : "Speak in your selected language"}
                    className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line/20 transition ${listening ? "animate-pulse border-red-400 bg-red-500/15 text-red-500" : "bg-base text-fg hover:border-acc"}`}
                  >
                    {listening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                  </button>
                  <button type="submit" disabled={!question.trim() || answering} aria-label="Send question"
                    className="grid h-11 w-11 place-items-center rounded-xl bg-volt text-coal disabled:opacity-40"><Send className="h-4 w-4" /></button>
                </form>
                {speechError && <p role="alert" className="mt-2 text-xs text-red-400">{speechError}</p>}
                {listening && <p role="status" className="mt-2 text-center text-xs font-bold text-acc">Listening... speak now</p>}
                <p className="mt-2 text-center text-[10px] text-fg/45">Chat history saved in this browser · Clear with trash icon</p>
                <p className="mt-1 text-center text-[10px] text-fg/45">Voice uses installed Indian female voices only · {answerMode === "ai" ? "AI-powered answers" : "Grounded website answers"}</p>
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
