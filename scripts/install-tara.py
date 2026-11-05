#!/usr/bin/env python3
"""Merge uploaded Tara ZIP without overwriting Budgetree pages."""
from pathlib import Path
import re
import zipfile

ROOT = Path.cwd()
ARCHIVE = ROOT / 'tara-assistant.zip'
if not ARCHIVE.is_file():
    raise SystemExit('Upload tara-assistant.zip to the repository root')
FILES = {'tara/public/budgetree-assistant.js':'public/budgetree-assistant.js','tara/middleware.js':'src/middleware.js'}
PREFIXES = {'tara/lib/':'src/lib/','tara/app/api/assistant/':'src/app/api/assistant/','tara/app/api/admin/':'src/app/api/admin/','tara/app/api/cron/':'src/app/api/cron/','tara/app/admin/':'src/app/admin/'}
with zipfile.ZipFile(ARCHIVE) as z:
    for entry in z.infolist():
        if entry.is_dir(): continue
        source=entry.filename
        target=FILES.get(source)
        if not target:
            for prefix,base in PREFIXES.items():
                if source.startswith(prefix) and source.endswith(('.js','.css')):
                    target=base+source[len(prefix):]
                    break
        if not target or source=='tara/app/api/assistant/route.js': continue
        if Path(target).is_absolute() or '..' in Path(target).parts:
            raise SystemExit('Unsafe path in archive')
        dest=ROOT/target
        dest.parent.mkdir(parents=True,exist_ok=True)
        dest.write_bytes(z.read(entry))
chat=ROOT/'src/app/api/assistant/chat/route.js'
s=chat.read_text()
s=s.replace('import { after } from "next/server";\n','')
s=s.replace('  after(async () => {\n    const res = await finished;', '  finished.then(async (res) => {')
s=s.replace('  });\n\n  const enc = new TextEncoder();', '  }).catch(() => {});\n\n  const enc = new TextEncoder();')
if 'after(' in s: raise SystemExit('Unexpected Next.js 15 after() dependency')
s='import { POST as budgetreeKnowledge } from "../route";\n'+s
anchor='  if (!c.anthropicKey) return json(req, 500, { error: "not_configured", message: "ANTHROPIC_API_KEY is not set" });'
fallback='''  if (!c.anthropicKey) {
    let input;
    try { input = await req.json(); } catch { return json(req, 400, { error: "bad_json" }); }
    const messages = cleanMessages(input.messages);
    const last = messages[messages.length - 1];
    if (!last || last.role !== "user") return json(req, 400, { error: "no_message" });
    const language = /[\\u0900-\\u097f]/.test(last.content) ? "hi" : "hinglish";
    try {
      const baseRequest = new Request(req.url, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: last.content, language,
          history: messages.slice(-8).map((m) => ({ role: m.role, text: m.content })) })
      });
      const result = await budgetreeKnowledge(baseRequest);
      const data = await result.json();
      const answer = data.answer || "I couldn't find enough information about that. Please contact Budgetree.";
      const lines = JSON.stringify({ t: "text", v: answer }) + "\\n" + JSON.stringify({ t: "done" }) + "\\n";
      return new Response(lines, { status: 200, headers: {
        "Content-Type": "application/x-ndjson; charset=utf-8", "Cache-Control": "no-store", ...corsHeaders(req)
      } });
    } catch { return json(req, 503, { error: "fallback_unavailable", message: "Website assistant is temporarily unavailable." }); }
  }'''
if anchor not in s: raise SystemExit('Unexpected chat route structure')
s=s.replace(anchor,fallback)
chat.write_text(s)
widget_path=ROOT/'public/budgetree-assistant.js'
w=widget_path.read_text()
w=w.replace('return pool.filter(function (v) { return fem.test(v.name); })[0] || pool.filter(function (v) { return !male.test(v.name); })[0] || pool[0] || null;', 'return pool.filter(function (v) { return fem.test(v.name) && !male.test(v.name); })[0] || null;')
w=w.replace('if (v) { u.voice = v; u.lang = v.lang; } else u.lang = /[ऀ-ॿ]/.test(item.text) ? "hi-IN" : "en-IN";', 'if (!v) { this.browserSpeaking = false; return this._next(); } u.voice = v; u.lang = v.lang;')
w=w.replace('window.BudgetreeAssistant = {', 'window.addEventListener("bt-open-search", function () { if (window.BudgetreeAssistant) window.BudgetreeAssistant.open(); });\n  window.BudgetreeAssistant = {')
widget_path.write_text(w)
layout_path=ROOT/'src/app/layout.tsx'
layout=layout_path.read_text()
layout=re.sub(r'^import SiteSearchAssistant from .*?;\s*$', '', layout, flags=re.M)
if 'import Script from "next/script";' not in layout: layout='import Script from "next/script";\n'+layout
layout=layout.replace('        <SiteSearchAssistant />','')
if '<Script src="/budgetree-assistant.js"' not in layout:
    if '      </body>' not in layout: raise SystemExit('Unexpected layout structure')
    layout=layout.replace('      </body>', '        <Script src="/budgetree-assistant.js" strategy="afterInteractive" />\n      </body>')
layout_path.write_text(layout)
old=ROOT/'src/components/SiteSearchAssistant.tsx'
if old.exists(): old.unlink()
assert (ROOT/'src/middleware.js').exists()
print('Tara widget and APIs installed; old chat removed; Budgetree pages preserved.')
