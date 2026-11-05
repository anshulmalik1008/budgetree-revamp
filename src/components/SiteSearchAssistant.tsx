"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight, AudioLines, Bot, Check, ChevronLeft, ExternalLink, Gift,
  Headphones, Mail, Mic, MicOff, Phone, Search, Send, ShieldCheck,
  Sparkles, Trash2, Volume2, VolumeX, X
} from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { products as SUITE } from "@/data/suiteProducts";
import { SERVICES } from "@/data/services";
import { POSTS } from "@/data/blog";
import { LEGAL } from "@/data/legal";

type Language = "en" | "hi" | "hinglish";
type ChatMessage = { role: "user" | "assistant"; text: string; links?: PageLink[] };
type PageLink = { title: string; href: string; category?: string };
type Mode = "chat" | "voice" | "contact";
type SpeechEvent = { results: ArrayLike<{ 0: { transcript: string } }> };
type SpeechEngine = {
  lang: string; continuous: boolean; interimResults: boolean;
  onresult: ((event: SpeechEvent) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
  start(): void; stop(): void; abort(): void;
};
type SpeechBrowser = Window & {
  SpeechRecognition?: new () => SpeechEngine;
  webkitSpeechRecognition?: new () => SpeechEngine;
};

const CHATS_KEY = "budgetree-tara-conversation-v1";
const PREF_KEY = "budgetree-tara-language-v1";
const VOICE_KEY = "budgetree-tara-voice-v1";
const FEMALE_VOICES = [
  "lekha", "kalpana", "swara", "heera", "neerja", "raveena", "veena",
  "aditi", "samantha", "ava", "victoria", "karen", "moira", "fiona", "zira", "jenny"
];
const WELCOME: ChatMessage = {
  role: "assistant",
  text: "Namaste! Main Tara, Budgetree ki virtual assistant. Aap Hindi, English ya Hinglish mein rewards, loyalty, payouts, business solutions aur integrations ke baare mein pooch sakte hain."
};
const SUGGEST = ["Budgetree kya karti hai?", "RewardX kya hai?", "LoyaltyX vs RewardX", "All Management Suite products"];
const PAGES: PageLink[] = [
  { title: "Budgetree", href: "/", category: "Company" },
  { title: "About Budgetree", href: "/about", category: "Company" },
  { title: "Book a Demo", href: "/demo", category: "Contact" },
  { title: "Contact us", href: "/contact", category: "Contact" },
  { title: "Our Solutions", href: "/solutions", category: "Solutions" },
  { title: "Pricing", href: "/pricing", category: "Pricing" },
  { title: "SiriPay gift cards", href: "https://siripay.co/", category: "Marketplace" },
  { title: "Neo Plus Current Account", href: "/neo-plus/current-account", category: "Banking" },
  { title: "Neo Plus Payouts", href: "/neo-plus/payouts", category: "Banking" },
  { title: "Neo Plus Payout Links", href: "/neo-plus/payout-links", category: "Banking" },
  { title: "Developer Docs", href: "/developers/docs", category: "Developer" },
  { title: "Integration", href: "/developers/integration", category: "Developer" },
  { title: "API Reference", href: "/developers/api-reference", category: "Developer" },
  ...PRODUCTS.map((p) => ({ title: p.name, href: "/products/" + p.slug, category: "Products" })),
  ...SUITE.map((p) => ({ title: p.name, href: "/products/suite/" + p.slug, category: "Management Suite" })),
  ...SERVICES.map((p) => ({ title: p.name, href: "/services/" + p.slug, category: "Services" })),
  ...POSTS.map((p) => ({ title: p.title, href: "/blog/" + p.slug, category: "Blog" })),
  ...LEGAL.map((p) => ({ title: p.title, href: "/legal/" + p.slug, category: "Legal" })),
];
const normalize = (s: string) => s.toLowerCase()
  .replace(/रिवार्ड|रिवॉर्ड/g, "reward").replace(/लॉयल्टी/g, "loyalty")
  .replace(/यूपीआई/g, "upi").replace(/सिरीपे/g, "siripay")
  .replace(/गिफ्ट कार्ड/g, "gift card").replace(/बैंक/g, "bank")
  .replace(/[^a-z0-9]+/g, " ").trim();
function findPages(q: string): PageLink[] {
  const tokens = normalize(q).split(" ").filter((t) => t.length > 1);
  if (!tokens.length) return PAGES.slice(0, 5);
  return PAGES.map((page) => {
    const title = normalize(page.title), category = normalize(page.category || "");
    const score = title.includes(normalize(q)) ? 20 : tokens.reduce((n, t) => n + (title.includes(t) ? 5 : 0) + (category.includes(t) ? 2 : 0), 0);
    return { page, score };
  }).filter((entry) => entry.score > 0).sort((a, b) => b.score - a.score).slice(0, 9).map((entry) => entry.page);
}
function selectVoice(voices: SpeechSynthesisVoice[], lang: Language) {
  return voices.filter((voice) => {
    const name = voice.name.toLowerCase();
    return FEMALE_VOICES.some((v) => name === v || name.startsWith(v + " ") || name.endsWith(" " + v) || name.includes(" " + v + " "));
  }).sort((a, b) => {
    const rank = (v: SpeechSynthesisVoice) => {
      const name = v.name.toLowerCase();
      const indian = FEMALE_VOICES.slice(0, 8).some((x) => name.includes(x));
      const locale = v.lang.toLowerCase();
      return (indian ? 0 : 100) +
        (locale.startsWith(lang === "hi" ? "hi" : "en") ? 0 : 30) +
        (locale.includes("-in") ? 0 : 10);
    };
    return rank(a) - rank(b);
  });
}

export default function SiteSearchAssistant() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("chat");
  const [search, setSearch] = useState("");
  const [question, setQuestion] = useState("");
  const [lang, setLang] = useState<Language>("hinglish");
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [talk, setTalk] = useState(true);
  const [busy, setBusy] = useState(false);
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voiceName, setVoiceName] = useState("");
  const [warning, setWarning] = useState("");
  const [ready, setReady] = useState(false);
  const [lead, setLead] = useState({ name: "", phone: "", email: "", requirement: "", consent: false });
  const recognition = useRef<SpeechEngine | null>(null);
  const msgBottom = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLTextAreaElement>(null);
  const searchInput = useRef<HTMLInputElement>(null);
  const activeRequest = useRef<AbortController | null>(null);
  const remoteAudio = useRef<HTMLAudioElement | null>(null);
  const remoteAudioUrl = useRef<string | null>(null);
  const voiceGeneration = useRef(0);
  const voiceRef = useRef({ lang: "hinglish" as Language, talk: true, voiceName: "" });
  const results = useMemo(() => findPages(search), [search]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(CHATS_KEY);
      if (saved) {
        const parsed: unknown = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const filtered = parsed.filter((m): m is ChatMessage =>
            m && (m.role === "assistant" || m.role === "user") && typeof m.text === "string"
          ).slice(-30).map((m) => ({ role: m.role, text: m.text.slice(0, 3500) }));
          if (filtered.length) setMessages(filtered);
        }
      }
      const previous = localStorage.getItem(PREF_KEY);
      if (previous === "hi" || previous === "en" || previous === "hinglish") setLang(previous);
      const previousVoice = localStorage.getItem(VOICE_KEY);
      if (previousVoice) setVoiceName(previousVoice);
    } catch { /* browsing in private mode */ }
    const update = () => setVoices(window.speechSynthesis?.getVoices() || []);
    update();
    window.speechSynthesis?.addEventListener?.("voiceschanged", update);
    setReady(true);
    return () => {
      recognition.current?.abort();
      window.speechSynthesis?.cancel();
      window.speechSynthesis?.removeEventListener?.("voiceschanged", update);
    };
  }, []);
  useEffect(() => { voiceRef.current = { lang, talk, voiceName }; }, [lang, talk, voiceName]);
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(CHATS_KEY, JSON.stringify(messages.slice(-30).map((m) => ({ role: m.role, text: m.text }))));
      localStorage.setItem(PREF_KEY, lang);
      localStorage.setItem(VOICE_KEY, voiceName);
    } catch { /* storage unavailable */ }
  }, [messages, lang, voiceName, ready]);
  useEffect(() => { if (open && mode === "chat") msgBottom.current?.scrollIntoView({ block: "nearest", behavior: "smooth" }); }, [messages, open, mode, busy]);
  useEffect(() => {
    const onSearch = () => { setSearchOpen(true); setOpen(false); };
    const key = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); onSearch(); }
      if (e.key === "Escape") { setOpen(false); setSearchOpen(false); stopAudio(); }
    };
    window.addEventListener("bt-open-search", onSearch);
    window.addEventListener("keydown", key);
    return () => { window.removeEventListener("bt-open-search", onSearch); window.removeEventListener("keydown", key); };
  }, []);
  useEffect(() => { if (searchOpen) searchInput.current?.focus(); }, [searchOpen]);

  function stopAudio() {
    voiceGeneration.current++;
    window.speechSynthesis?.cancel();
    const audio = remoteAudio.current;
    if (audio) {
      audio.pause();
      audio.src = "";
      remoteAudio.current = null;
    }
    if (remoteAudioUrl.current) {
      URL.revokeObjectURL(remoteAudioUrl.current);
      remoteAudioUrl.current = null;
    }
    setSpeaking(false);
  }

  function speakWithBrowser(text: string) {
    const engine = window.speechSynthesis;
    if (!engine) {
      setWarning("Speech playback is unavailable here. Text answers are working.");
      return;
    }
    const female = selectVoice(engine.getVoices(), voiceRef.current.lang);
    const selected = female.find((v) => v.name === voiceRef.current.voiceName) || female[0];
    if (!selected) {
      setWarning("Server female voice is not configured and no female system voice was found. Text replies still work. Azure Speech F0 supports Swara and Neerja voices.");
      return;
    }
    setWarning("");
    const utterance = new SpeechSynthesisUtterance(text.slice(0, 1100));
    utterance.voice = selected;
    utterance.lang = selected.lang;
    utterance.rate = 0.97;
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = (event) => {
      setSpeaking(false);
      if (event.error !== "canceled" && event.error !== "interrupted") {
        setWarning("Selected female voice did not play. Try another voice or enable server speech.");
      }
    };
    engine.speak(utterance);
    if (engine.paused) engine.resume();
  }

  async function speak(text: string) {
    if (!voiceRef.current.talk || !text.trim()) return;
    stopAudio();
    const generation = voiceGeneration.current;
    try {
      // Azure F0, if configured by the site owner, produces the same Indian female
      // neural voice on every device. No client-side service key is needed.
      const controller = new AbortController();
      const timer = window.setTimeout(() => controller.abort(), 15000);
      let response: Response;
      try {
        response = await fetch("/api/assistant/tts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: text.slice(0, 1200), language: voiceRef.current.lang }),
          signal: controller.signal
        });
      } finally { window.clearTimeout(timer); }
      if (generation !== voiceGeneration.current) return;
      if (response.ok && response.headers.get("content-type")?.includes("audio/")) {
        const audioBlob = await response.blob();
        if (generation !== voiceGeneration.current) return;
        const url = URL.createObjectURL(audioBlob);
        remoteAudioUrl.current = url;
        const audio = new Audio(url);
        remoteAudio.current = audio;
        audio.onended = () => {
          setSpeaking(false);
          if (remoteAudioUrl.current === url) {
            URL.revokeObjectURL(url);
            remoteAudioUrl.current = null;
            remoteAudio.current = null;
          }
        };
        audio.onerror = () => {
          if (generation !== voiceGeneration.current) return;
          stopAudio();
          speakWithBrowser(text);
        };
        setWarning("");
        await audio.play();
        setSpeaking(true);
        return;
      }
    } catch {
      // Free browser female voices remain available when Azure isn't set up.
    }
    if (generation === voiceGeneration.current) speakWithBrowser(text);
  }

  async function ask(raw: string) {
    const text = raw.trim().slice(0, 500);
    if (!text || busy) return;
    stopAudio(); setWarning(""); setQuestion(""); setMode((prev) => prev === "voice" ? prev : "chat"); setOpen(true); setBusy(true);
    const history = messages.slice(-8).map((m) => ({ role: m.role, text: m.text }));
    setMessages((prev) => [...prev, { role: "user" as const, text }].slice(-30));
    const controller = new AbortController();
    activeRequest.current = controller;
    let answer = "", links: PageLink[] = [];
    try {
      const timer = setTimeout(() => controller.abort(), 21000);
      let response: Response;
      try {
        response = await fetch("/api/assistant", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: text, language: voiceRef.current.lang, history }),
          signal: controller.signal,
        });
      } finally { clearTimeout(timer); }
      const json = await response.json() as { answer?: string; links?: PageLink[]; error?: string };
      if (!response.ok || !json.answer) throw new Error(json.error || "Unavailable");
      answer = json.answer;
      links = (json.links || []).filter((p) => p.href?.startsWith("/") || p.href === "https://siripay.co/").slice(0, 4);
    } catch {
      links = findPages(text).slice(0, 3);
      answer = links.length ? links.map((p) => p.title + " — " + p.href).join("\n") +
        "\n\nYeh relevant website pages hain. Inhe open karke full details dekhein." :
        "Abhi is sawaal ka verified answer nahi mil paaya. Aap Budgetree team ko contact kar sakte hain.";
    }
    if (activeRequest.current === controller) activeRequest.current = null;
    setMessages((prev) => [...prev, { role: "assistant" as const, text: answer, links }].slice(-30));
    setBusy(false);
    speak(answer);
  }

  function toggleMic() {
    if (listening) { recognition.current?.stop(); setListening(false); return; }
    const w = window as SpeechBrowser;
    const Engine = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!Engine) { setWarning("Speech recognition is not supported. Open Chrome/Edge and allow microphone permission."); return; }
    stopAudio(); setWarning("");
    try {
      const rec = new Engine(); recognition.current = rec;
      rec.lang = lang === "hi" ? "hi-IN" : "en-IN";
      rec.continuous = false; rec.interimResults = false;
      rec.onresult = (event) => {
        const speech = Array.from(event.results).map((r) => r[0]?.transcript || "").join(" ").trim();
        if (speech) { setListening(false); void ask(speech); }
      };
      rec.onerror = (event) => {
        setListening(false);
        if (event.error !== "aborted" && event.error !== "no-speech") setWarning("Microphone error: " + event.error + ". Check browser permissions.");
      };
      rec.onend = () => setListening(false);
      rec.start(); setListening(true);
    } catch { setWarning("Couldn't start microphone. Check browser permissions."); setListening(false); }
  }

  function resetChat() {
    stopAudio(); activeRequest.current?.abort(); recognition.current?.abort();
    setBusy(false); setListening(false); setMessages([WELCOME]);
    try { localStorage.removeItem(CHATS_KEY); } catch {}
  }
  async function submitLead(event: FormEvent) {
    event.preventDefault();
    if (!lead.consent) return;
    if (!lead.name.trim() || !lead.phone.trim() || !lead.requirement.trim()) {
      setWarning("Please enter your name, phone number and requirement.");
      return;
    }
    // Avoid pretending data was saved: without a connected notification or
    // storage provider a serverless contact form cannot guarantee lead delivery.
    // A pre-addressed email uses the visitor's own mail client instead.
    const subject = "Tara callback request — " + lead.name.trim();
    const body = [
      "New Budgetree enquiry from Tara",
      "Name: " + lead.name.trim(),
      "Phone: " + lead.phone.trim(),
      "Email: " + (lead.email.trim() || "Not provided"),
      "Requirement: " + lead.requirement.trim(),
      "Page: " + window.location.href,
      "Visitor consent: Yes",
    ].join("\n");
    const url = "mailto:sales@budgetree.in?subject=" +
      encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    window.location.href = url;
    setWarning("Your email application should open with the enquiry. Please press Send there to contact the Budgetree team. Nothing has been submitted automatically.");
  }

  const feminine = useMemo(() => selectVoice(voices, lang), [voices, lang]);
  const panelStyles = "fixed bottom-[92px] right-3 z-[90] flex h-[min(680px,calc(100dvh-110px))] w-[min(415px,calc(100vw-24px))] flex-col overflow-hidden rounded-[26px] border border-[#CFFB47]/25 bg-[#0C1712]/95 text-[#F5F6EF] shadow-[0_24px_85px_rgba(0,0,0,.4)] backdrop-blur-2xl sm:right-6";

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.section
            key="tara-panel" initial={{ opacity: 0, scale: 0.92, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className={panelStyles} role="dialog" aria-label="Tara Budgetree Assistant"
          >
            <div className="pointer-events-none absolute -right-16 -top-24 h-60 w-60 rounded-full bg-[#CDFB47]/10 blur-[60px]" />
            <header className="relative z-10 flex items-center gap-3 border-b border-white/10 p-4">
              <div className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-[#CDFB47] via-[#83F0B5] to-[#C9B8FF] text-[#08140D] shadow-[0_0_25px_rgba(205,251,71,.22)]">
                <Sparkles className="h-6 w-6" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[17px] font-bold tracking-tight">Tara <span className="text-[#CDFB47]">AI</span></div>
                <div className="flex items-center gap-2 text-[11px] text-white/60">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#8CF0B3]" /> Budgetree's digital assistant
                </div>
              </div>
              <button type="button" onClick={() => setMode("contact")} aria-label="Talk to team"
                className="rounded-xl p-2 text-white/70 hover:bg-white/10"><Headphones className="h-5 w-5" /></button>
              <button type="button" onClick={resetChat} aria-label="Reset conversation"
                className="rounded-xl p-2 text-white/70 hover:bg-white/10"><Trash2 className="h-4 w-4" /></button>
              <button type="button" onClick={() => { setOpen(false); recognition.current?.abort(); stopAudio(); }} aria-label="Close Tara"
                className="rounded-xl p-2 text-white/70 hover:bg-white/10"><X className="h-5 w-5" /></button>
            </header>

            {mode === "chat" && (
              <>
                <div className="relative flex items-center justify-between gap-2 border-b border-white/10 px-4 py-2.5">
                  <div className="flex flex-wrap gap-1">
                    {([{ k: "hinglish", t: "Hinglish" }, { k: "hi", t: "हिन्दी" }, { k: "en", t: "English" }] as const).map((option) => (
                      <button key={option.k} type="button" onClick={() => { setLang(option.k); stopAudio(); }}
                        className={"rounded-full px-2.5 py-1 text-[11px] font-semibold transition " +
                          (lang === option.k ? "bg-[#CDFB47] text-[#10170B]" : "bg-white/10 text-white/65 hover:bg-white/20")}>
                        {option.t}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-1">
                    <button type="button" title={talk ? "Mute replies" : "Enable voice replies"} aria-label="Toggle voice"
                      onClick={() => { setTalk(!talk); stopAudio(); }} className="rounded-lg p-2 text-[#CDFB47] hover:bg-white/10">
                      {talk ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                    </button>
                    <button type="button" title="Voice conversation" onClick={() => setMode("voice")}
                      className="rounded-lg p-2 text-[#CDFB47] hover:bg-white/10"><AudioLines className="h-4 w-4" /></button>
                  </div>
                </div>
                <div className="flex-1 space-y-3 overflow-y-auto p-4">
                  {messages.map((m, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                      className={m.role === "user" ? "ml-9 rounded-2xl rounded-br-sm bg-[#CDFB47] px-4 py-3 text-[13px] leading-relaxed text-[#11190A]" :
                        "mr-6 rounded-2xl rounded-bl-sm border border-white/10 bg-white/[.06] px-4 py-3 text-[13px] leading-relaxed text-white/90"}>
                      <p className="whitespace-pre-wrap">{m.text}</p>
                      {m.links && m.links.length > 0 && (
                        <div className="mt-3 space-y-1 border-t border-white/10 pt-2">
                          {m.links.map((p) => <a key={p.href} href={p.href} target={p.href.startsWith("http") ? "_blank" : undefined}
                            rel={p.href.startsWith("http") ? "noopener noreferrer" : undefined}
                            className="flex items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-[11px] font-semibold text-[#CDFB47] hover:bg-white/10">
                            {p.title} <ExternalLink className="h-3.5 w-3.5" />
                          </a>)}
                        </div>
                      )}
                    </motion.div>
                  ))}
                  {messages.length === 1 && <div className="flex flex-wrap gap-2 py-2">
                    {SUGGEST.map((q) => <button key={q} type="button" onClick={() => void ask(q)}
                      className="rounded-full border border-[#CDFB47]/30 bg-[#CDFB47]/5 px-3 py-2 text-[11px] text-white/85 hover:bg-[#CDFB47]/15">{q}</button>)}
                  </div>}
                  {busy && <p className="animate-pulse rounded-xl bg-white/5 p-3 text-xs text-[#CDFB47]">Tara is finding your answer…</p>}
                  <div ref={msgBottom} />
                </div>
                <div className="border-t border-white/10 bg-[#101D16] px-3 py-3">
                  <form onSubmit={(event) => { event.preventDefault(); void ask(question); }} className="flex items-end gap-2">
                    <textarea ref={input} value={question} onChange={(event) => setQuestion(event.target.value)}
                      rows={1} maxLength={500} aria-label="Ask Tara" placeholder="Ask Tara anything about Budgetree…"
                      onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); void ask(question); } }}
                      className="max-h-24 min-h-11 min-w-0 flex-1 resize-none rounded-2xl border border-white/10 bg-white/[.07] px-3 py-3 text-[13px] text-white outline-none placeholder:text-white/45 focus:border-[#CDFB47]/60" />
                    <button type="button" onClick={toggleMic} aria-label={listening ? "Stop recording" : "Speak your question"}
                      className={"grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/20 " + (listening ? "animate-pulse bg-red-500/25 text-red-300" : "text-[#CDFB47]")}>
                      {listening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                    </button>
                    <button type="submit" disabled={busy || !question.trim()} aria-label="Send message"
                      className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#CDFB47] text-[#0A170E] disabled:opacity-40">
                      <Send className="h-5 w-5" />
                    </button>
                  </form>
                  {warning && <p role="alert" className="mt-2 text-[11px] leading-relaxed text-[#FFC24B]">{warning}</p>}
                  {listening && <p role="status" className="mt-2 animate-pulse text-xs text-[#8CF0B3]">Listening…</p>}
                  <div className="mt-2 flex items-center justify-between text-[10px] text-white/40">
                    <span>Budgetree website knowledge</span><span>Voice · Hindi · English · Hinglish</span>
                  </div>
                </div>
              </>
            )}

            {mode === "voice" && (
              <div className="flex flex-1 flex-col items-center justify-center gap-5 bg-[radial-gradient(ellipse_at_top,#203D2A,#0C1511_70%)] p-6 text-center">
                <button type="button" onClick={() => { setMode("chat"); recognition.current?.abort(); setListening(false); stopAudio(); }}
                  className="absolute left-4 top-[83px] flex items-center gap-1 text-xs text-white/60"><ChevronLeft className="h-4 w-4" />Back</button>
                <motion.button type="button" onClick={toggleMic} aria-label={listening ? "Stop listening" : "Talk to Tara"}
                  animate={{ scale: listening ? [1, 1.08, 1] : 1, rotate: speaking ? 360 : 0 }}
                  transition={{ repeat: listening || speaking ? Infinity : 0, duration: speaking ? 9 : 1.8 }}
                  className="relative grid h-36 w-36 place-items-center rounded-full bg-[conic-gradient(#CDFB47,#8CF0B3,#9FD8FF,#C9B8FF,#CDFB47)] shadow-[0_0_70px_rgba(205,251,71,.3)]">
                  <span className="absolute inset-2 rounded-full bg-[#10231B]" />
                  {listening ? <Mic className="relative h-12 w-12 text-[#CDFB47]" /> :
                    <AudioLines className="relative h-12 w-12 text-[#CDFB47]" />}
                </motion.button>
                <h3 className="text-2xl font-bold">{listening ? "I'm listening…" : speaking ? "Tara is speaking…" : "Talk with Tara"}</h3>
                <p className="max-w-xs text-sm leading-relaxed text-white/60">Ask your Budgetree questions in Hindi, English or Hinglish. Tap the orb to speak.</p>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {(["hinglish", "hi", "en"] as Language[]).map((value) =>
                    <button type="button" key={value} onClick={() => setLang(value)}
                      className={"rounded-full px-3 py-1.5 text-xs " + (lang === value ? "bg-[#CDFB47] text-[#10170A]" : "bg-white/10 text-white")}>
                      {value === "hi" ? "हिन्दी" : value === "en" ? "English" : "Hinglish"}
                    </button>)}
                </div>
                <label className="w-full max-w-[290px] text-left text-xs text-white/65">
                  Female voice
                  <select value={feminine.some((v) => v.name === voiceName) ? voiceName : ""}
                    onChange={(event) => { setVoiceName(event.target.value); stopAudio(); }}
                    className="mt-2 w-full rounded-xl border border-white/15 bg-[#17251D] px-3 py-2.5 text-xs text-white">
                    <option value="">Auto (Indian female first)</option>
                    {feminine.map((v) => <option key={v.voiceURI} value={v.name}>{v.name} · {v.lang}</option>)}
                  </select>
                </label>
                <button type="button" onClick={() => speak(lang === "hi" ? "नमस्ते, मैं तारा हूँ, आपकी बजट्री असिस्टेंट।" : "Namaste, I'm Tara, your Budgetree assistant.")}
                  className="rounded-full border border-[#CDFB47]/50 px-5 py-2 text-xs font-bold text-[#CDFB47]">Test female voice</button>
                {warning && <p role="alert" className="text-xs leading-relaxed text-[#FFC24B]">{warning}</p>}
              </div>
            )}

            {mode === "contact" && (
              <div className="flex-1 space-y-4 overflow-y-auto p-5">
                <button type="button" onClick={() => setMode("chat")} className="flex items-center gap-1 text-xs text-white/60"><ChevronLeft className="h-4 w-4" />Back to Tara</button>
                <h3 className="text-2xl font-bold">Let's connect you.</h3>
                <p className="text-sm text-white/60">A product demo, integration or business enquiry? Contact our team directly.</p>
                <div className="grid grid-cols-2 gap-2">
                  <a href="mailto:sales@budgetree.in" className="flex items-center gap-2 rounded-xl bg-white/10 p-3 text-xs"><Mail className="h-4 w-4 text-[#CDFB47]" />Email sales</a>
                  <a href="tel:+919193911100" className="flex items-center gap-2 rounded-xl bg-white/10 p-3 text-xs"><Phone className="h-4 w-4 text-[#CDFB47]" />Call team</a>
                </div>
                  <form onSubmit={(event) => { void submitLead(event); }} className="space-y-3">
                    <input required placeholder="Your name" value={lead.name} onChange={(e) => setLead((v) => ({ ...v, name: e.target.value }))}
                      className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm outline-none" />
                    <input required inputMode="tel" placeholder="Phone number" value={lead.phone} onChange={(e) => setLead((v) => ({ ...v, phone: e.target.value }))}
                      className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm outline-none" />
                    <input type="email" placeholder="Work email" value={lead.email} onChange={(e) => setLead((v) => ({ ...v, email: e.target.value }))}
                      className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm outline-none" />
                    <textarea required placeholder="What do you need?" value={lead.requirement} onChange={(e) => setLead((v) => ({ ...v, requirement: e.target.value }))}
                      className="h-20 w-full resize-none rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm outline-none" />
                    <label className="flex gap-2 text-[11px] leading-relaxed text-white/60">
                      <input type="checkbox" checked={lead.consent} onChange={(e) => setLead((v) => ({ ...v, consent: e.target.checked }))} required />
                      I agree to be contacted regarding my enquiry.
                    </label>
                    <button type="submit" disabled={!lead.consent}
                      className="w-full rounded-xl bg-[#CDFB47] px-4 py-3 text-sm font-bold text-[#0C1712] disabled:opacity-50">Open email enquiry</button>
                  </form>
                {warning && <p className="text-xs text-[#FFC24B]">{warning}</p>}
                <p className="flex items-center gap-1 text-[11px] text-white/40"><ShieldCheck className="h-3 w-3" /> Never share OTPs, bank passwords or card details.</p>
              </div>
            )}
          </motion.section>
        )}
      </AnimatePresence>

      <motion.button type="button" onClick={() => { setOpen((v) => !v); setSearchOpen(false); if (open) stopAudio(); }}
        whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.95 }}
        className="fixed bottom-[18px] right-3 z-[90] flex items-center gap-2.5 rounded-full border border-[#CDFB47]/30 bg-[#0E1B14]/95 px-3 py-2.5 text-white shadow-[0_12px_35px_rgba(0,0,0,.35)] backdrop-blur-xl sm:right-6"
        aria-label={open ? "Close Tara assistant" : "Open Tara assistant"}>
        <span className="relative grid h-10 w-10 place-items-center rounded-full bg-[conic-gradient(#CDFB47,#8CF0B3,#9FD8FF,#C9B8FF,#CDFB47)]">
          <span className="absolute inset-[3px] rounded-full bg-[#15251D]" />
          {open ? <X className="relative h-5 w-5 text-[#CDFB47]" /> : <Sparkles className="relative h-5 w-5 text-[#CDFB47]" />}
        </span>
        <span className="pr-2 text-left"><strong className="block text-sm leading-tight">Tara AI</strong><small className="block text-[10px] text-white/60">Ask Budgetree</small></span>
      </motion.button>

      <AnimatePresence>
        {searchOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] flex justify-center bg-black/75 px-3 pt-[12vh] backdrop-blur-sm"
            onMouseDown={(event) => { if (event.target === event.currentTarget) setSearchOpen(false); }}>
            <motion.div role="dialog" aria-modal="true" aria-label="Search Budgetree"
              initial={{ y: -15, scale: 0.97 }} animate={{ y: 0, scale: 1 }} exit={{ y: -10, opacity: 0 }}
              className="h-fit max-h-[72dvh] w-full max-w-xl overflow-hidden rounded-3xl border border-white/15 bg-[#111B15] text-white shadow-2xl">
              <div className="flex items-center gap-3 border-b border-white/10 p-4">
                <Search className="h-5 w-5 text-[#CDFB47]" />
                <input ref={searchInput} placeholder="Search products, services, articles…" value={search} onChange={(event) => setSearch(event.target.value)}
                  onKeyDown={(event) => { if (event.key === "Enter" && results[0]) window.location.href = results[0].href; }}
                  className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-white/40" />
                <button onClick={() => setSearchOpen(false)} aria-label="Close search"><X className="h-5 w-5" /></button>
              </div>
              <div className="max-h-[55dvh] space-y-1 overflow-y-auto p-2">
                {results.length ? results.map((page) => (
                  <a key={page.href} href={page.href} target={page.href.startsWith("http") ? "_blank" : undefined}
                    rel={page.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="flex items-center justify-between gap-2 rounded-2xl px-4 py-3 hover:bg-white/10">
                    <span><span className="block text-sm font-semibold">{page.title}</span><small className="text-xs text-white/50">{page.category}</small></span>
                    <ArrowRight className="h-4 w-4 text-[#CDFB47]" />
                  </a>
                )) : <p className="p-8 text-center text-sm text-white/60">No matching pages. Try another keyword.</p>}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
