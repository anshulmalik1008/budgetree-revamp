/*!
 * Tara - Budgetree AI chat + voice assistant widget v2
 * Embed:  <script src="https://YOUR-ASSISTANT-DOMAIN/budgetree-assistant.js" defer></script>
 * Optional: data-api="https://.../api/assistant" data-theme="auto|dark|light" data-position="right|left" data-lang="en-IN|hi-IN"
 * JS API:  BudgetreeAssistant.open() .close() .voice() .ask("question") .contact()
 */
(function () {
  "use strict";
  if (window.BudgetreeAssistant) return;

  /* ================================================================== */
  /* Setup                                                               */
  /* ================================================================== */
  var script = document.currentScript || document.querySelector('script[src*="budgetree-assistant"]');
  var attr = function (k, d) { return (script && script.getAttribute("data-" + k)) || d; };
  var scriptOrigin = "";
  try { scriptOrigin = new URL(script.src, location.href).origin; } catch (e) {}
  var CFG = {
    api: attr("api", (scriptOrigin || "") + "/api/assistant").replace(/\/$/, ""),
    theme: attr("theme", "auto"),
    lang: attr("lang", "en-IN"),
    position: attr("position", "right"),
  };
  var R = { name: attr("name", "Tara"), tts: true, stt: false, sttMode: "auto", bargeIn: true, phone: "", email: "sales@budgetree.in", whatsapp: "", privacyUrl: "", demoUrl: "/demo" };

  function sget(store, k, d) { try { var v = store.getItem("bt_ai_" + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } }
  function sset(store, k, v) { try { store.setItem("bt_ai_" + k, JSON.stringify(v)); } catch (e) {} }
  var SS = (function () { try { return window.sessionStorage; } catch (e) { return null; } })();
  var LS = (function () { try { return window.localStorage; } catch (e) { return null; } })();
  var ses = { get: function (k, d) { return SS ? sget(SS, k, d) : d; }, set: function (k, v) { if (SS) sset(SS, k, v); } };
  var pref = { get: function (k, d) { return LS ? sget(LS, k, d) : d; }, set: function (k, v) { if (LS) sset(LS, k, v); } };

  function uid() {
    try { if (crypto.randomUUID) return crypto.randomUUID().replace(/-/g, ""); } catch (e) {}
    var s = ""; for (var i = 0; i < 32; i++) s += Math.floor(Math.random() * 16).toString(16); return s;
  }
  var sid = ses.get("sid", null);
  if (!sid) { sid = uid(); ses.set("sid", sid); }

  var UA = navigator.userAgent || "";
  var IS_MOBILE = /Android|iPhone|iPad|iPod|Mobile/i.test(UA) || (navigator.maxTouchPoints > 1 && /Macintosh/.test(UA));
  var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  var HAS_GUM = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) && !!(window.AudioContext || window.webkitAudioContext);

  /* ================================================================== */
  /* Styles                                                              */
  /* ================================================================== */
  var CSS = `
:host{all:initial;font-family:inherit}
*{box-sizing:border-box;margin:0;padding:0}
.root{
  --base:#070C0A;--raise:#0C1512;--sunken:#14231B;--fern:#1E3527;--fg:#F4F0E6;
  --acc:#CDFB47;--jade:#8CF0B3;--grape:#C9B8FF;--honey:#FFC24B;--azure:#9FD8FF;
  --glass:rgba(12,21,18,.66);--glass-2:rgba(20,35,27,.6);--line:rgba(205,251,71,.16);--line-2:rgba(244,240,230,.1);
  --muted:rgba(244,240,230,.62);--user-bg:var(--acc);--user-fg:var(--base);--btn-bg:var(--acc);--btn-fg:var(--base);--link:var(--acc);
  --field:rgba(7,12,10,.45);--danger:#FFC24B;
  --shadow:0 24px 70px rgba(0,0,0,.55),0 2px 0 rgba(255,255,255,.04) inset;
  --voice-bg:radial-gradient(120% 80% at 50% 0%,#17291F,#070C0A 70%);
  font-family:inherit;font-size:15px;line-height:1.5;color:var(--fg);-webkit-font-smoothing:antialiased;
}
.root.light{
  --glass:rgba(244,240,230,.78);--glass-2:rgba(255,255,255,.62);--line:rgba(30,53,39,.16);--line-2:rgba(7,12,10,.08);
  --fg:#111D17;--muted:rgba(17,29,23,.79);--user-bg:#1E3527;--user-fg:#FFFFFF;--btn-bg:#1E3527;--btn-fg:#FFFFFF;--link:#24592A;
  --field:rgba(255,255,255,.8);--danger:#9a5b00;
  --shadow:0 24px 60px rgba(30,53,39,.22),0 1px 0 rgba(255,255,255,.7) inset;
  --voice-bg:radial-gradient(120% 80% at 50% 0%,#FFFFFF,#F4F0E6 70%);
}
button,input,textarea{font:inherit;color:inherit}
button{background:none;border:0;cursor:pointer}
button:focus-visible,textarea:focus-visible,input:focus-visible,a:focus-visible{outline:2px solid var(--acc);outline-offset:2px}
.root.light button:focus-visible,.root.light input:focus-visible,.root.light textarea:focus-visible{outline-color:var(--fern)}
a{color:var(--link)}

.launcher{position:fixed;bottom:22px;right:22px;z-index:2147483646;display:flex;align-items:center;gap:10px;padding:7px 18px 7px 7px;border-radius:999px;
  background:var(--glass);border:1px solid var(--line);backdrop-filter:blur(22px) saturate(170%);-webkit-backdrop-filter:blur(22px) saturate(170%);
  box-shadow:var(--shadow);transition:transform .25s cubic-bezier(.2,.9,.3,1.3),opacity .2s}
.root.left .launcher{right:auto;left:22px}
.launcher:hover{transform:translateY(-2px) scale(1.02)}
.launcher.hide{opacity:0;pointer-events:none;transform:scale(.8)}
.launcher .ltxt{display:flex;flex-direction:column;align-items:flex-start;line-height:1.15}
.launcher b{font-size:14.5px;font-weight:650;letter-spacing:-.01em}
.launcher small{font-size:11.5px;color:var(--muted)}

.orb{position:relative;width:42px;height:42px;border-radius:50%;flex:none;isolation:isolate}
.orb::before{content:"";position:absolute;inset:0;border-radius:50%;background:conic-gradient(from 0deg,var(--acc),var(--jade),var(--azure),var(--grape),var(--acc));animation:spin 6s linear infinite}
.orb::after{content:"";position:absolute;inset:3px;border-radius:50%;background:radial-gradient(circle at 32% 28%,rgba(255,255,255,.85),rgba(255,255,255,.12) 32%,rgba(7,12,10,.35) 70%),radial-gradient(circle at 70% 80%,rgba(140,240,179,.5),transparent 60%)}
.orb.sm{width:34px;height:34px}
.orb .pulse{position:absolute;inset:-4px;border-radius:50%;border:1.5px solid var(--acc);opacity:0;animation:ring 2.6s ease-out infinite}
.root.light .orb .pulse{border-color:var(--fern)}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes ring{0%{transform:scale(.9);opacity:.7}100%{transform:scale(1.45);opacity:0}}

.panel{position:fixed;bottom:22px;right:22px;z-index:2147483647;width:400px;height:min(680px,calc(100vh - 44px));display:flex;flex-direction:column;border-radius:26px;overflow:hidden;
  background:var(--glass);border:1px solid var(--line);box-shadow:var(--shadow);backdrop-filter:blur(28px) saturate(170%);-webkit-backdrop-filter:blur(28px) saturate(170%);
  transform-origin:bottom right;transition:transform .32s cubic-bezier(.2,.9,.25,1.05),opacity .22s}
.root.left .panel{right:auto;left:22px;transform-origin:bottom left}
.panel.closed{opacity:0;transform:translateY(16px) scale(.94);pointer-events:none;visibility:hidden}
.blobs{position:absolute;inset:0;pointer-events:none;z-index:0;overflow:hidden}
.blobs i{position:absolute;border-radius:50%;filter:blur(60px)}
.blobs i:nth-child(1){width:260px;height:260px;background:var(--acc);top:-120px;right:-80px;opacity:.18}
.blobs i:nth-child(2){width:220px;height:220px;background:var(--grape);bottom:40px;left:-120px;opacity:.16}
.blobs i:nth-child(3){width:180px;height:180px;background:var(--jade);bottom:-90px;right:-40px;opacity:.14}
.panel>*:not(.blobs):not(.voice){position:relative;z-index:1}

.head{display:flex;align-items:center;gap:8px;padding:14px 10px 12px 16px;border-bottom:1px solid var(--line-2)}
.who{flex:1;min-width:0;margin-left:3px}
.who b{display:block;font-size:15.5px;font-weight:650;letter-spacing:-.01em}
.who span{display:flex;align-items:center;gap:6px;font-size:12px;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.dot{width:7px;height:7px;border-radius:50%;background:var(--jade);box-shadow:0 0 0 3px rgba(140,240,179,.18);flex:none}
.ib{width:36px;height:36px;border-radius:12px;display:grid;place-items:center;color:var(--muted);transition:background .15s,color .15s;flex:none}
.ib:hover{background:var(--glass-2);color:var(--fg)}
.ib.on{color:var(--acc);background:rgba(205,251,71,.1)}
.root.light .ib.on{color:var(--fern);background:rgba(30,53,39,.1)}
.ib svg{width:19px;height:19px}

.msgs{flex:1;min-height:0;overflow-y:auto;padding:18px 14px 8px;display:flex;flex-direction:column;gap:12px;overscroll-behavior:contain}
.msgs::-webkit-scrollbar{width:6px}.msgs::-webkit-scrollbar-thumb{background:var(--line);border-radius:6px}
.row{display:flex;gap:8px;align-items:flex-end;animation:rise .28s ease both}
.row.user{justify-content:flex-end}
@keyframes rise{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
.bubble{max-width:86%;padding:10px 14px;border-radius:18px;font-size:14.5px;overflow-wrap:anywhere}
.bot .bubble{background:var(--glass-2);border:1px solid var(--line-2);border-bottom-left-radius:6px}
.user .bubble{background:var(--user-bg);color:var(--user-fg);border-bottom-right-radius:6px;font-weight:500}
.bubble p+p,.bubble p+ul,.bubble ul+p,.bubble p+ol,.bubble ol+p{margin-top:7px}
.bubble ul,.bubble ol{padding-left:18px}.bubble li+li{margin-top:3px}
.bubble a{text-decoration:underline;text-underline-offset:2px}
.root.light .bubble a{font-weight:600}
.root.light .panel{background:rgba(255,255,255,.97)}
.root.light .launcher{background:rgba(255,255,255,.97);color:var(--fg)}
.root.light .head,.root.light .who,.root.light .msgs,.root.light .welcome,.root.light .card,.root.light .compose,.root.light .voice,.root.light .vcap,.root.light .vstate{color:var(--fg)}
.root.light .bot .bubble{background:#F1F4ED;color:#14241B;border-color:#CBD7CA}
.root.light .user .bubble{background:#1E3527;color:#FFFFFF}
.root.light .chip,.root.light .opt,.root.light .vcta{background:#F6F8F2;color:#17281C}
.root.light .lang button.on,.root.light .btn:not(.ghost),.root.light .send{background:#1E3527;color:#FFFFFF}
.root.light textarea.in,.root.light .card input,.root.light .card textarea{color:#14241B}
.root.light .foot,.root.light .notice,.root.light .vhint{color:#4C5C51}
.bubble strong{font-weight:650}
.bubble.err{border-color:rgba(255,194,75,.45)}
.typing{display:inline-flex;gap:4px;padding:4px 0}
.typing i{width:6px;height:6px;border-radius:50%;background:var(--muted);animation:blink 1.2s infinite}
.typing i:nth-child(2){animation-delay:.15s}.typing i:nth-child(3){animation-delay:.3s}
@keyframes blink{0%,80%,100%{opacity:.25;transform:translateY(0)}40%{opacity:1;transform:translateY(-3px)}}

.welcome{padding:8px 4px 2px}
.welcome h3{font-size:21px;font-weight:650;letter-spacing:-.02em;line-height:1.25}
.welcome h3 em{font-style:normal;color:var(--acc)}
.root.light .welcome h3 em{color:var(--fern)}
.welcome p{color:var(--muted);font-size:13.5px;margin-top:6px}
.chips{display:flex;flex-wrap:wrap;gap:7px;margin-top:14px}
.chip{padding:7px 12px;border-radius:999px;font-size:13px;border:1px solid var(--line);background:var(--glass-2);transition:border-color .15s,transform .15s}
.chip:hover{border-color:var(--acc);transform:translateY(-1px)}
.root.light .chip:hover{border-color:var(--fern)}
.vcta{margin-top:14px;width:100%;display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:18px;text-align:left;
  background:linear-gradient(120deg,rgba(205,251,71,.14),rgba(140,240,179,.08) 50%,rgba(201,184,255,.12));border:1px solid var(--line)}
.vcta b{display:block;font-size:14px}.vcta small{color:var(--muted);font-size:12px}
.notice{margin-top:12px;font-size:11.5px;color:var(--muted);line-height:1.45}

/* cards (lead form / handoff) */
.card{width:100%;max-width:100%;padding:14px;border-radius:18px;background:var(--glass-2);border:1px solid var(--line);animation:rise .3s ease both}
.card h4{font-size:14.5px;font-weight:650;margin-bottom:3px}
.card .sub{font-size:12.5px;color:var(--muted);margin-bottom:10px}
.card input:not([type=checkbox]),.card textarea{width:100%;padding:9px 12px;border-radius:12px;border:1px solid var(--line-2);background:var(--field);color:var(--fg);font-size:14px;outline:0;margin-top:7px}
.card textarea{resize:none;height:62px}
.card input::placeholder,.card textarea::placeholder{color:var(--muted)}
.card input.bad,.card textarea.bad{border-color:var(--danger)}
.card .two{display:grid;grid-template-columns:1fr 1fr;gap:7px}
.card .two input{margin-top:7px}
.card .consent{display:flex;gap:8px;align-items:flex-start;font-size:12px;color:var(--muted);margin-top:10px;line-height:1.4;cursor:pointer}
.card .consent input{margin-top:2px;accent-color:#CDFB47;width:15px;height:15px;flex:none}
.root.light .card .consent input{accent-color:#1E3527}
.card .consent.bad{color:var(--danger)}
.card .ferr{font-size:12px;color:var(--danger);margin-top:8px;min-height:0}
.card .acts{display:flex;gap:8px;margin-top:12px;flex-wrap:wrap}
.btn{padding:9px 16px;border-radius:12px;font-size:13.5px;font-weight:600;background:var(--btn-bg);color:var(--btn-fg);display:inline-flex;align-items:center;gap:7px;text-decoration:none}
.btn:disabled{opacity:.5;cursor:default}
.btn.ghost{background:transparent;color:var(--fg);border:1px solid var(--line)}
.btn svg{width:16px;height:16px}
.hp{position:absolute!important;left:-9999px!important;width:1px!important;height:1px!important;opacity:0!important}
.opts{display:grid;gap:8px}
.opt{display:flex;align-items:center;gap:10px;padding:11px 12px;border-radius:14px;border:1px solid var(--line-2);background:var(--field);text-align:left;font-size:14px;text-decoration:none;color:var(--fg)}
.opt:hover{border-color:var(--line)}
.opt svg{width:18px;height:18px;flex:none;color:var(--acc)}
.root.light .opt svg{color:var(--fern)}
.opt small{display:block;color:var(--muted);font-size:12px}

.compose{padding:10px 12px 8px;border-top:1px solid var(--line-2)}
.box{display:flex;align-items:flex-end;gap:6px;padding:6px 6px 6px 14px;border-radius:20px;background:var(--glass-2);border:1px solid var(--line-2);transition:border-color .15s}
.box:focus-within{border-color:var(--line)}
textarea.in{flex:1;resize:none;border:0;outline:0;background:transparent;color:var(--fg);font-size:14.5px;line-height:1.45;max-height:110px;padding:7px 0}
textarea.in::placeholder{color:var(--muted)}
.send{width:38px;height:38px;border-radius:14px;display:grid;place-items:center;background:var(--btn-bg);color:var(--btn-fg);flex:none;transition:transform .15s,opacity .15s}
.send:disabled{opacity:.35;cursor:default}
.send:not(:disabled):hover{transform:scale(1.06)}
.send svg,.mic svg{width:18px;height:18px}
.mic{width:38px;height:38px;border-radius:14px;display:grid;place-items:center;color:var(--muted);flex:none}
.mic:hover{color:var(--fg);background:var(--glass)}
.mic.rec{color:#070C0A;background:var(--honey);animation:recp 1.2s infinite}
@keyframes recp{50%{box-shadow:0 0 0 6px rgba(255,194,75,.18)}}
.foot{font-size:10.5px;color:var(--muted);text-align:center;padding:6px 0 2px;opacity:.85}
.foot a{color:inherit}

.voice{position:absolute;inset:0;z-index:5;display:flex;flex-direction:column;align-items:center;justify-content:space-between;padding:18px 18px 22px;background:var(--voice-bg);transition:opacity .25s,transform .3s}
.voice.closed{opacity:0;pointer-events:none;transform:scale(1.03);visibility:hidden}
.vtop{width:100%;display:flex;justify-content:space-between;align-items:center}
.lang{display:flex;padding:3px;border-radius:999px;background:var(--glass-2);border:1px solid var(--line-2)}
.lang button{padding:5px 12px;border-radius:999px;font-size:12.5px;color:var(--muted)}
.lang button.on{background:var(--btn-bg);color:var(--btn-fg);font-weight:600}
.stage{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:24px;width:100%}
.big{position:relative;width:184px;height:184px;border-radius:50%;--lvl:0;transform:scale(calc(1 + var(--lvl)*.16));transition:transform .08s linear}
.big .glow{position:absolute;inset:-28px;border-radius:50%;background:radial-gradient(circle,rgba(205,251,71,.35),transparent 65%);filter:blur(10px);opacity:.7;transition:background .4s}
.big .core{position:absolute;inset:0;border-radius:50%;overflow:hidden;background:conic-gradient(from 0deg,var(--acc),var(--jade),var(--azure),var(--grape),var(--honey),var(--acc));animation:spin 9s linear infinite}
.big .core::after{content:"";position:absolute;inset:0;border-radius:50%;filter:blur(18px);background:radial-gradient(circle at 30% 30%,rgba(255,255,255,.7),transparent 40%),radial-gradient(circle at 70% 75%,rgba(7,12,10,.55),transparent 55%)}
.big .shine{position:absolute;inset:10px;border-radius:50%;background:radial-gradient(circle at 34% 26%,rgba(255,255,255,.55),rgba(255,255,255,.06) 34%,transparent 60%);border:1px solid rgba(255,255,255,.25)}
.big .ring{position:absolute;inset:-10px;border-radius:50%;border:2px solid var(--acc);opacity:0}
.st-listening .big .ring{animation:ring 1.8s ease-out infinite}
.st-listening .big .glow{background:radial-gradient(circle,rgba(205,251,71,.45),transparent 65%)}
.st-thinking .big .core{animation-duration:2.2s}
.st-thinking .big .glow{background:radial-gradient(circle,rgba(201,184,255,.5),transparent 65%);animation:breathe 1.4s ease-in-out infinite}
.st-speaking .big .glow{background:radial-gradient(circle,rgba(140,240,179,.5),transparent 65%)}
.st-idle .big .core{animation-duration:16s;filter:saturate(.7)}
@keyframes breathe{50%{opacity:.35}}
.vstate{font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);font-weight:600}
.vcap{min-height:66px;max-width:320px;text-align:center;font-size:16px;line-height:1.45;max-height:140px;overflow:hidden}
.vcap .you{color:var(--muted)}
.vbar{display:flex;gap:14px;align-items:center;justify-content:center}
.vbtn{width:54px;height:54px;border-radius:50%;display:grid;place-items:center;background:var(--glass-2);border:1px solid var(--line-2)}
.vbtn svg{width:22px;height:22px}
.vbtn.end{width:64px;height:64px;background:var(--honey);color:#070C0A;border:0}
.vbtn.end svg{width:26px;height:26px}
.vhint{font-size:12px;color:var(--muted);margin-top:10px;text-align:center}

@media (max-width:520px){
  .panel{right:0!important;left:0!important;bottom:0;width:100%;height:min(92vh,100%);height:min(92dvh,100%);border-radius:24px 24px 0 0;border-bottom:0}
  .launcher{bottom:16px;right:16px;padding:6px}
  .root.left .launcher{left:16px}
  .launcher .ltxt{display:none}
  .launcher .orb{width:48px;height:48px}
  .ib{width:34px}
  .card .two{grid-template-columns:1fr}
}
@media (prefers-reduced-motion:reduce){*{animation-duration:0s!important;animation-iteration-count:1!important;transition:none!important}}
`;

  /* ================================================================== */
  /* Icons                                                               */
  /* ================================================================== */
  var sv = function (d, extra) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"' + (extra || "") + ">" + d + "</svg>"; };
  var I = {
    close: sv('<path d="M6 6l12 12M18 6L6 18"/>'),
    send: sv('<path d="M12 19V5M5 12l7-7 7 7"/>', ' stroke-width="2.2"'),
    mic: sv('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>'),
    wave: sv('<path d="M4 10v4M8 7v10M12 4v16M16 7v10M20 10v4"/>'),
    reset: sv('<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/>'),
    spk: sv('<path d="M11 5L6 9H3v6h3l5 4V5z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13"/>'),
    spkoff: sv('<path d="M11 5L6 9H3v6h3l5 4V5z"/><path d="M22 9l-6 6M16 9l6 6"/>'),
    back: sv('<path d="M15 6l-6 6 6 6"/>'),
    list: sv('<path d="M4 6h16M4 12h10M4 18h7"/>'),
    team: sv('<path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1v-6h3zM3 19a2 2 0 0 0 2 2h1v-6H3z"/>'),
    phone: sv('<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>'),
    chat: sv('<path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.6 8.6 0 0 1-3.9-.9L3 21l2-4.6a8.4 8.4 0 1 1 16-4.9z"/>'),
    mail: sv('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>'),
    form: sv('<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>'),
    end: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 9c-2.3 0-4.5.4-6.6 1.2-.8.3-1.3 1-1.3 1.9v2.2c0 .7.6 1.2 1.3 1.1l3.1-.5c.6-.1 1-.6 1-1.2v-1.8c1.6-.4 3.4-.4 5 0v1.8c0 .6.4 1.1 1 1.2l3.1.5c.7.1 1.3-.4 1.3-1.1v-2.2c0-.9-.5-1.6-1.3-1.9C16.5 9.4 14.3 9 12 9z"/></svg>',
  };

  /* ================================================================== */
  /* Helpers                                                             */
  /* ================================================================== */
  function esc(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;"); }
  function isExternal(u) { try { return new URL(u, location.href).host !== location.host; } catch (e) { return false; } }
  function inline(s) {
    s = esc(s);
    var links = [];
    var keep = function (html) { links.push(html); return "\u0000" + (links.length - 1) + "\u0000"; };
    s = s.replace(/\[([^\]]+)\]\(((?:https?:\/\/|\/)[^\s)]*)\)/g, function (_, t, u) {
      return keep('<a href="' + u + '"' + (isExternal(u) ? ' target="_blank" rel="noopener"' : "") + ">" + t + "</a>");
    });
    s = s.replace(/(^|[\s(])(https?:\/\/[^\s<)]+[^\s<).,!?])/g, function (_, p, u) { return p + keep('<a href="' + u + '" target="_blank" rel="noopener">' + u + "</a>"); });
    s = s.replace(/(^|[\s(])([\w.+-]+@[\w-]+(?:\.[\w-]+)+)/g, function (_, p, m) { return p + keep('<a href="mailto:' + m + '">' + m + "</a>"); });
    s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    return s.replace(/\u0000(\d+)\u0000/g, function (_, i) { return links[+i]; });
  }
  function md(text) {
    var lines = String(text).replace(/\r/g, "").split("\n"), html = "", list = null, para = [];
    function fp() { if (para.length) { html += "<p>" + inline(para.join(" ")) + "</p>"; para = []; } }
    function fl() { if (list) { html += "</" + list + ">"; list = null; } }
    lines.forEach(function (raw) {
      var l = raw.trim(), ul = l.match(/^[-*•]\s+(.*)/), ol = l.match(/^\d+[.)]\s+(.*)/);
      if (!l) { fp(); fl(); return; }
      if (ul || ol) { fp(); var t = ul ? "ul" : "ol"; if (list !== t) { fl(); html += "<" + t + ">"; list = t; } html += "<li>" + inline((ul || ol)[1]) + "</li>"; return; }
      fl(); para.push(l.replace(/^#+\s*/, ""));
    });
    fp(); fl();
    return html;
  }
  function speakable(t) {
    return String(t)
      .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
      .replace(/https?:\/\/\S+/g, "")
      .replace(/[*_#`>|]/g, "")
      .replace(/^\s*[-•]\s+/gm, "")
      .replace(/\/mo\b/g, " per month")
      .replace(/\p{Extended_Pictographic}/gu, "")
      .replace(/\s+/g, " ")
      .trim();
  }
  function silentWav() {
    var n = 800, b = new Uint8Array(44 + n), v = new DataView(b.buffer);
    var w = function (o, s) { for (var i = 0; i < s.length; i++) b[o + i] = s.charCodeAt(i); };
    w(0, "RIFF"); v.setUint32(4, 36 + n, true); w(8, "WAVE"); w(12, "fmt ");
    v.setUint32(16, 16, true); v.setUint16(20, 1, true); v.setUint16(22, 1, true);
    v.setUint32(24, 8000, true); v.setUint32(28, 8000, true); v.setUint16(32, 1, true); v.setUint16(34, 8, true);
    w(36, "data"); v.setUint32(40, n, true); for (var i = 0; i < n; i++) b[44 + i] = 128;
    var s = ""; for (var j = 0; j < b.length; j++) s += String.fromCharCode(b[j]);
    return "data:audio/wav;base64," + btoa(s);
  }
  function dbOf(buf) { var s = 0; for (var i = 0; i < buf.length; i++) s += buf[i] * buf[i]; return 20 * Math.log10(Math.sqrt(s / buf.length) + 1e-9); }
  function encodeWav(chunks, rate) {
    var len = 0; chunks.forEach(function (c) { len += c.length; });
    var ratio = rate / 16000, outLen = Math.floor(len / ratio), pcm = new Int16Array(outLen);
    var flat = new Float32Array(len), off = 0; chunks.forEach(function (c) { flat.set(c, off); off += c.length; });
    for (var i = 0; i < outLen; i++) {
      var a = Math.floor(i * ratio), b = Math.min(len, Math.floor((i + 1) * ratio)), sum = 0, n = 0;
      for (var j = a; j < b; j++) { sum += flat[j]; n++; }
      var x = n ? sum / n : flat[a] || 0; x = Math.max(-1, Math.min(1, x));
      pcm[i] = x < 0 ? x * 0x8000 : x * 0x7fff;
    }
    var buf = new ArrayBuffer(44 + pcm.length * 2), v = new DataView(buf);
    var w = function (o, s) { for (var k = 0; k < s.length; k++) v.setUint8(o + k, s.charCodeAt(k)); };
    w(0, "RIFF"); v.setUint32(4, 36 + pcm.length * 2, true); w(8, "WAVE"); w(12, "fmt ");
    v.setUint32(16, 16, true); v.setUint16(20, 1, true); v.setUint16(22, 1, true);
    v.setUint32(24, 16000, true); v.setUint32(28, 32000, true); v.setUint16(32, 2, true); v.setUint16(34, 16, true);
    w(36, "data"); v.setUint32(40, pcm.length * 2, true);
    new Int16Array(buf, 44).set(pcm);
    return new Blob([buf], { type: "audio/wav" });
  }

  /* ================================================================== */
  /* Speaker: streams sentences to TTS, prefetches, plays in order       */
  /* ================================================================== */
  function Speaker(onState) {
    this.onState = onState;
    this.audio = new Audio();
    this.audio.preload = "auto";
    this.audio.setAttribute("playsinline", "");
    this.queue = []; this.buf = ""; this.playing = false; this.chunks = 0; this.ended = true;
    this.useBrowser = ses.get("tts_browser", false) === true;
    this.ctrl = null; this.gen = 0;
  }
  Speaker.prototype.unlock = function () {
    if (this.unlocked) return; this.unlocked = true;
    try { this.audio.src = silentWav(); var p = this.audio.play(); if (p && p.catch) p.catch(function () {}); } catch (e) {}
    try { if (window.speechSynthesis) window.speechSynthesis.getVoices(); } catch (e) {}
  };
  Speaker.prototype.level = function () {
    if (!this.playing) return 0;
    var t = Date.now();
    return Math.max(0, 0.45 + 0.35 * Math.sin(t / 95) * Math.sin(t / 41) + 0.15 * Math.sin(t / 230));
  };
  Speaker.prototype.begin = function () {
    this.stop(); this.gen++;
    this.ctrl = window.AbortController ? new AbortController() : null;
    this.buf = ""; this.chunks = 0; this.ended = false;
    if (!R.tts) this.useBrowser = true;
  };
  Speaker.prototype.push = function (delta) {
    if (this.ended) return;
    this.buf += delta;
    var first = /^([\s\S]{12,}?[.!?।]|[\s\S]{28,}?[,;:])(\s+|$)/, rest = /^([\s\S]{8,}?[.!?।])(\s+|$)/;
    var re = this.chunks === 0 ? first : rest, m;
    while ((m = this.buf.match(re)) && (m[2] || this.buf.length > m[1].length)) {
      this._enqueue(m[1]); this.buf = this.buf.slice(m[0].length); re = rest;
    }
    if (this.buf.length > 180) {
      var cut = Math.max(this.buf.lastIndexOf(", ", 170), this.buf.lastIndexOf(" ", 170));
      if (cut > 40) { this._enqueue(this.buf.slice(0, cut + 1)); this.buf = this.buf.slice(cut + 1); }
    }
  };
  Speaker.prototype.end = function () {
    if (this.ended) return;
    if (this.buf.trim()) this._enqueue(this.buf);
    this.buf = ""; this.ended = true;
    if (!this.playing && !this.queue.length) this.onState("idle");
  };
  Speaker.prototype._enqueue = function (text) {
    var t = speakable(text);
    if (!t || !/[\p{L}\p{N}]/u.test(t)) return;
    this.chunks++;
    var item = { text: t, gen: this.gen };
    if (!this.useBrowser) item.blob = this._fetch(t);
    this.queue.push(item);
    if (!this.playing) this._next();
  };
  Speaker.prototype._fetch = function (text) {
    var self = this;
    return fetch(CFG.api + "/tts", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text: text }), signal: this.ctrl ? this.ctrl.signal : undefined })
      .then(function (r) {
        if (r.status === 501 || r.status === 404) { self.useBrowser = true; ses.set("tts_browser", true); return null; }
        return r.ok ? r.blob() : null;
      })
      .catch(function () { return null; });
  };
  Speaker.prototype._next = function () {
    var self = this, item = this.queue.shift();
    if (!item) { this.playing = false; if (this.ended) this.onState("idle"); return; }
    if (item.gen !== this.gen) return this._next();
    this.playing = true;
    (item.blob || Promise.resolve(null)).then(function (blob) {
      if (item.gen !== self.gen) return;
      if (blob && blob.size > 200) {
        var url = URL.createObjectURL(blob), done = false;
        var fin = function () { if (done) return; done = true; URL.revokeObjectURL(url); if (item.gen === self.gen) self._next(); };
        self.browserSpeaking = false;
        self.audio.onended = fin; self.audio.onerror = function () { if (!done) { done = true; URL.revokeObjectURL(url); self._browserSay(item); } };
        self.audio.src = url;
        self.onState("speaking");
        var p = self.audio.play();
        if (p && p.catch) p.catch(function () { if (!done) { done = true; URL.revokeObjectURL(url); self._browserSay(item); } });
      } else self._browserSay(item);
    });
  };
  Speaker.prototype._pickVoice = function (text) {
    var ss = window.speechSynthesis; if (!ss) return null;
    var vs = ss.getVoices() || [], hindi = /[ऀ-ॿ]/.test(text);
    var fem = /female|woman|swara|neerja|heera|kalpana|lekha|veena|aditi|raveena|priya|ananya|google हिन्दी|samantha|zira|aria|jenny|sonia|libby|karen|moira|tessa|fiona/i;
    var male = /\bmale\b|prabhat|hemant|madhur|ravi|david|mark|guy|daniel|rishi|alex|fred/i;
    var pool = vs.filter(function (v) { return hindi ? /^hi/i.test(v.lang) : /^en-IN/i.test(v.lang); });
    if (!pool.length) pool = vs.filter(function (v) { return hindi ? /^hi/i.test(v.lang) : /^en/i.test(v.lang); });
    return pool.filter(function (v) { return fem.test(v.name) && !male.test(v.name); })[0] || null;
  };
  Speaker.prototype._browserSay = function (item) {
    var self = this, ss = window.speechSynthesis;
    if (!ss || item.gen !== this.gen) return this._next();
    var u = new SpeechSynthesisUtterance(item.text), v = this._pickVoice(item.text);
    if (!v) { this.browserSpeaking = false; return this._next(); } u.voice = v; u.lang = v.lang;
    u.rate = 1.04; u.pitch = 1.08;
    var done = false, fin = function () { if (done) return; done = true; clearTimeout(guard); self.browserSpeaking = false; if (item.gen === self.gen) self._next(); };
    var guard = setTimeout(fin, 1500 + item.text.length * 110); // some browsers never fire onend
    u.onend = fin; u.onerror = fin;
    this.browserSpeaking = true; this.onState("speaking");
    try { ss.speak(u); } catch (e) { fin(); }
  };
  Speaker.prototype.stop = function () {
    this.gen++;
    if (this.ctrl) { try { this.ctrl.abort(); } catch (e) {} }
    this.queue = []; this.buf = ""; this.playing = false; this.ended = true; this.browserSpeaking = false;
    try { this.audio.pause(); this.audio.onended = null; this.audio.onerror = null; } catch (e) {}
    try { if (window.speechSynthesis) window.speechSynthesis.cancel(); } catch (e) {}
  };

  /* ================================================================== */
  /* Mic: one shared input stream for server STT + barge-in              */
  /* ================================================================== */
  function Mic() { this.stream = null; this.ctx = null; this.subs = []; this.rate = 48000; this.opening = null; }
  Mic.prototype.open = function () {
    var self = this;
    if (this.stream) return Promise.resolve();
    if (this.opening) return this.opening;
    this.opening = navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true, channelCount: 1 } }).then(function (stream) {
      var AC = window.AudioContext || window.webkitAudioContext;
      var ctx = new AC();
      if (ctx.state === "suspended" && ctx.resume) ctx.resume();
      var src = ctx.createMediaStreamSource(stream);
      var proc = ctx.createScriptProcessor(2048, 1, 1);
      var mute = ctx.createGain(); mute.gain.value = 0;
      proc.onaudioprocess = function (e) {
        var d = new Float32Array(e.inputBuffer.getChannelData(0));
        for (var i = 0; i < self.subs.length; i++) { try { self.subs[i](d); } catch (er) {} }
      };
      src.connect(proc); proc.connect(mute); mute.connect(ctx.destination);
      self.stream = stream; self.ctx = ctx; self.rate = ctx.sampleRate; self.opening = null;
    }, function (err) { self.opening = null; throw err; });
    return this.opening;
  };
  Mic.prototype.sub = function (fn) { this.subs.push(fn); var s = this; return function () { s.subs = s.subs.filter(function (f) { return f !== fn; }); }; };
  Mic.prototype.close = function () {
    this.subs = [];
    if (this.stream) { this.stream.getTracks().forEach(function (t) { t.stop(); }); this.stream = null; }
    if (this.ctx) { try { this.ctx.close(); } catch (e) {} this.ctx = null; }
  };
  var mic = new Mic();

  /* Listener A: browser Web Speech API (fastest, Chrome/Edge/Safari) */
  function BrowserListener() { this.rec = null; this.h = null; }
  BrowserListener.prototype.start = function (lang, h) {
    var self = this;
    this.abort();
    var r = new SR();
    r.lang = lang; r.continuous = false; r.interimResults = true; r.maxAlternatives = 1;
    var finalText = "", gotErr = null;
    this.h = h; this.rec = r;
    r.onresult = function (e) {
      if (self.rec !== r) return;
      var interim = "";
      for (var i = e.resultIndex; i < e.results.length; i++) {
        if (e.results[i].isFinal) finalText += e.results[i][0].transcript; else interim += e.results[i][0].transcript;
      }
      h.interim((finalText + " " + interim).trim());
    };
    r.onerror = function (e) { gotErr = e.error; };
    r.onend = function () {
      if (self.rec !== r) return;
      self.rec = null;
      if (gotErr && gotErr !== "no-speech" && gotErr !== "aborted") h.error(gotErr);
      else h.final(finalText.trim());
    };
    try { r.start(); } catch (e) { this.rec = null; h.error("start-failed"); }
  };
  BrowserListener.prototype.stop = function () { if (this.rec) { try { this.rec.stop(); } catch (e) {} } };
  BrowserListener.prototype.abort = function () { var r = this.rec; this.rec = null; if (r) { try { r.abort(); } catch (e) {} } };
  BrowserListener.prototype.active = function () { return !!this.rec; };

  /* Listener B: own recorder + VAD -> /stt (Firefox, in-app browsers, or forced) */
  function ServerListener() { this.unsub = null; this.ctrl = null; this.run = 0; this.finishFn = null; }
  ServerListener.prototype.start = function (lang, h) {
    var self = this;
    this.abort();
    var run = ++this.run;
    mic.open().then(function () {
      if (run !== self.run) return;
      var frameMs = 2048 / mic.rate * 1000, pre = [], rec = [], started = false, speechFrames = 0, silence = 0, recMs = 0;
      var noise = -58, thr = -46, t0 = Date.now(), done = false;
      var finish = function (hasSpeech) {
        if (done) return; done = true;
        if (self.unsub) { self.unsub(); self.unsub = null; }
        self.finishFn = null;
        if (!hasSpeech || !rec.length) { h.final(""); return; }
        h.interim("…");
        h.thinking && h.thinking();
        self.ctrl = window.AbortController ? new AbortController() : null;
        fetch(CFG.api + "/stt?lang=" + encodeURIComponent(lang), { method: "POST", headers: { "Content-Type": "audio/wav" }, body: encodeWav(rec, mic.rate), signal: self.ctrl ? self.ctrl.signal : undefined })
          .then(function (r) { return r.ok ? r.json() : Promise.reject(new Error("stt " + r.status)); })
          .then(function (j) { if (run === self.run) h.final((j && j.text) || ""); })
          .catch(function (e) { if (run === self.run && (!e || e.name !== "AbortError")) h.error("stt-failed"); });
      };
      self.finishFn = function () { finish(started); };
      self.unsub = mic.sub(function (buf) {
        if (done) return;
        var db = dbOf(buf);
        h.level && h.level(Math.max(0, Math.min(1, (db + 60) / 45)));
        if (!started) {
          pre.push(buf); if (pre.length > Math.ceil(350 / frameMs)) pre.shift();
          if (db < noise + 8) noise = noise * 0.92 + db * 0.08;
          thr = Math.max(-50, noise + 11);
          if (db > thr) { if (++speechFrames >= 3) { started = true; rec = pre.slice(); h.interim("🎙️ …"); } }
          else speechFrames = 0;
          if (Date.now() - t0 > 8000) finish(false);
        } else {
          rec.push(buf); recMs += frameMs;
          if (db < thr - 3) silence += frameMs; else silence = 0;
          if (silence >= 850 || recMs >= 15000) finish(true);
        }
      });
    }, function (err) {
      if (run !== self.run) return;
      h.error(err && (err.name === "NotAllowedError" || err.name === "SecurityError") ? "not-allowed" : "audio-capture");
    });
  };
  ServerListener.prototype.stop = function () { if (this.finishFn) this.finishFn(); };
  ServerListener.prototype.abort = function () {
    this.run++;
    if (this.unsub) { this.unsub(); this.unsub = null; }
    this.finishFn = null;
    if (this.ctrl) { try { this.ctrl.abort(); } catch (e) {} this.ctrl = null; }
  };
  ServerListener.prototype.active = function () { return !!this.unsub || !!this.ctrl; };

  /* Barge-in: interrupt Tara by speaking (desktop; uses echo-cancelled mic) */
  function BargeIn(onTrigger) { this.onTrigger = onTrigger; this.unsub = null; this.run = 0; this.ownsMic = false; }
  BargeIn.prototype.start = function (keepMic) {
    var self = this;
    if (this.unsub || this.starting) return;
    var run = ++this.run;
    this.ownsMic = !keepMic;
    this.starting = true;
    mic.open().then(function () {
      self.starting = false;
      if (run !== self.run) { if (self.ownsMic) { mic.close(); self.ownsMic = false; } return; }
      var frameMs = 2048 / mic.rate * 1000, t0 = Date.now(), cal = [], thr = null, hot = 0;
      self.unsub = mic.sub(function (buf) {
        var db = dbOf(buf);
        if (Date.now() - t0 < 700) { cal.push(db); return; }
        if (thr === null) { cal.sort(function (a, b) { return a - b; }); var med = cal.length ? cal[Math.floor(cal.length / 2)] : -60; thr = Math.max(-38, med + 13); }
        if (db > thr) { hot += frameMs; if (hot >= 280) { self.stop(); self.onTrigger(); } } else hot = Math.max(0, hot - frameMs / 2);
      });
    }, function () { self.starting = false; });
  };
  BargeIn.prototype.stop = function () {
    this.run++;
    if (this.unsub) { this.unsub(); this.unsub = null; }
    if (this.ownsMic) { mic.close(); this.ownsMic = false; }
  };

  /* ================================================================== */
  /* UI                                                                  */
  /* ================================================================== */
  var host = document.createElement("div");
  host.id = "budgetree-assistant";
  var shadow = host.attachShadow({ mode: "open" });

  function build() {
    var name = esc(R.name);
    shadow.innerHTML =
      "<style>" + CSS + "</style>" +
      '<div class="root' + (CFG.position === "left" ? " left" : "") + '">' +
      '<button class="launcher" aria-label="Open ' + name + ', Budgetree AI assistant"><span class="orb"><span class="pulse"></span></span>' +
      '<span class="ltxt"><b class="l-name">Ask ' + name + '</b><small>Chat or talk to Budgetree AI</small></span></button>' +
      '<section class="panel closed" role="dialog" aria-label="' + name + ' - Budgetree AI assistant">' +
      '<div class="blobs"><i></i><i></i><i></i></div>' +
      '<header class="head"><span class="orb sm"></span><div class="who"><b class="h-name">' + name + '</b><span><i class="dot"></i>Online</span></div>' +
      '<button class="ib b-voice" title="Talk to ' + name + '" aria-label="Start voice conversation">' + I.wave + "</button>" +
      '<button class="ib b-team" title="Talk to our team" aria-label="Talk to our team">' + I.team + "</button>" +
      '<button class="ib b-spk" aria-label="Read replies aloud">' + I.spkoff + "</button>" +
      '<button class="ib b-reset" title="New chat" aria-label="New chat">' + I.reset + "</button>" +
      '<button class="ib b-close" title="Close" aria-label="Close">' + I.close + "</button></header>" +
      '<div class="msgs" aria-live="polite"></div>' +
      '<div class="compose"><div class="box">' +
      '<textarea class="in" rows="1" placeholder="Ask anything about Budgetree…" aria-label="Message" maxlength="1500"></textarea>' +
      '<button class="mic" title="Speak" aria-label="Speak your question">' + I.mic + "</button>" +
      '<button class="send" disabled aria-label="Send">' + I.send + "</button></div>" +
      '<div class="foot">AI answers can be imperfect - our team confirms every commercial detail.</div></div>' +
      '<div class="voice closed st-idle" aria-label="Voice conversation">' +
      '<div class="vtop"><button class="ib v-back" aria-label="Back to chat">' + I.back + "</button>" +
      '<div class="lang" role="group" aria-label="Speaking language"><button data-l="en-IN">English</button><button data-l="hi-IN">Hindi</button></div>' +
      '<span style="width:36px"></span></div>' +
      '<div class="stage"><button class="big" aria-label="Tap to talk or interrupt"><span class="glow"></span><span class="core"></span><span class="shine"></span><span class="ring"></span></button>' +
      '<div class="vstate" aria-live="polite">Tap to talk</div><div class="vcap"></div></div>' +
      '<div><div class="vbar"><button class="vbtn v-mute" aria-label="Mute voice">' + I.spk + "</button>" +
      '<button class="vbtn end v-end" aria-label="End voice conversation">' + I.end + "</button>" +
      '<button class="vbtn v-chat" aria-label="Show chat">' + I.list + "</button></div>" +
      '<div class="vhint"></div></div></div>' +
      "</section></div>";
  }
  build();

  var $ = function (s) { return shadow.querySelector(s); };
  var root = $(".root"), panel = $(".panel"), launcher = $(".launcher"), msgsEl = $(".msgs"), ta = $("textarea.in"),
      sendBtn = $(".send"), micBtn = $(".mic"), voiceEl = $(".voice"), bigOrb = $(".big"), vstate = $(".vstate"), vcap = $(".vcap"), vhint = $(".vhint");

  /* theme */
  function applyTheme() {
    var light;
    if (CFG.theme === "light") light = true;
    else if (CFG.theme === "dark") light = false;
    else {
      var h = document.documentElement, b = document.body;
      light = h.classList.contains("light") || h.getAttribute("data-theme") === "light" || !!(b && b.classList.contains("light"));
    }
    root.classList.toggle("light", !!light);
  }
  applyTheme();
  try {
    var mo = new MutationObserver(applyTheme);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "data-theme"] });
    if (document.body) mo.observe(document.body, { attributes: true, attributeFilter: ["class"] });
  } catch (e) {}

  /* state */
  var history = ses.get("history", []);
  if (!Array.isArray(history)) history = [];
  var leadDone = ses.get("lead_done", false) === true;
  var busy = false, chatCtrl = null, inVoice = false, muted = false, pendingLead = false;
  var readAloud = pref.get("read_aloud", false) === true;
  var lang = pref.get("lang", CFG.lang) === "hi-IN" ? "hi-IN" : "en-IN";
  var engine = null; // "browser" | "server"
  var listener = null;

  var speaker = new Speaker(function (s) {
    if (s === "speaking") {
      if (inVoice) { setVState("speaking"); maybeBargeIn(); }
    } else if (s === "idle") {
      bargeIn.stop();
      if (inVoice && !busy) afterReplyInVoice();
    }
  });
  var bargeIn = new BargeIn(function () {
    if (!inVoice) return;
    if (chatCtrl) { try { chatCtrl.abort(); } catch (e) {} chatCtrl = null; setBusy(false); }
    speaker.stop();
    listen();
  });
  function maybeBargeIn() {
    if (!R.bargeIn || IS_MOBILE || !HAS_GUM || muted) return;
    bargeIn.start(engine === "server");
  }

  function scrollDown() { msgsEl.scrollTop = msgsEl.scrollHeight; }
  function addRow(role, html, cls) {
    var r = document.createElement("div");
    r.className = "row " + (role === "user" ? "user" : "bot");
    r.innerHTML = '<div class="bubble ' + (cls || "") + '">' + html + "</div>";
    msgsEl.appendChild(r); scrollDown();
    return r.firstChild;
  }
  function addCard(html) {
    var r = document.createElement("div");
    r.className = "row bot";
    r.innerHTML = '<div class="card">' + html + "</div>";
    msgsEl.appendChild(r);
    setTimeout(scrollDown, 30);
    return r.firstChild;
  }
  function voiceSupported() { return !!pickEngine(); }
  function renderWelcome() {
    var w = document.createElement("div");
    w.className = "welcome";
    var chips = ["What are UPI Cash Tokens?", "Explain pricing plans", "Dealer loyalty program", "Diwali corporate gifting", "Book a demo"];
    var priv = R.privacyUrl ? ' <a href="' + esc(R.privacyUrl) + '" target="_blank" rel="noopener">Privacy Policy</a>' : "";
    w.innerHTML = "<h3>Hi, I'm " + esc(R.name) + " 👋<br>Your <em>Budgetree</em> guide.</h3>" +
      "<p>Ask me about rewards, loyalty, UPI payouts, gifting - or anything else. Choose English or Hindi for voice conversations.</p>" +
      '<div class="chips">' + chips.map(function (c) { return '<button class="chip">' + esc(c) + "</button>"; }).join("") + "</div>" +
      (voiceSupported() ? '<button class="vcta"><span class="orb sm"></span><span><b>Talk to ' + esc(R.name) + '</b><small>Hands-free voice conversation</small></span></button>' : "") +
      '<div class="notice">Chats are saved to improve our service and processed by our AI provider. Please don\'t share passwords, OTPs or bank details.' + priv + "</div>";
    msgsEl.appendChild(w);
    w.querySelectorAll(".chip").forEach(function (c) { c.onclick = function () { send(c.textContent); }; });
    var v = w.querySelector(".vcta"); if (v) v.onclick = startVoice;
  }
  function renderAll() {
    msgsEl.innerHTML = "";
    renderWelcome();
    history.forEach(function (m) { addRow(m.role, m.role === "user" ? esc(m.content) : md(m.content)); });
  }
  function saveHistory() { ses.set("history", history.slice(-30)); }

  /* ---------------------------- chat ---------------------------- */
  function setBusy(b) { busy = b; sendBtn.disabled = b || !ta.value.trim(); }

  function send(text, opts) {
    opts = opts || {};
    text = String(text || "").trim().slice(0, 1500);
    if (!text) return;
    if (chatCtrl) { try { chatCtrl.abort(); } catch (e) {} chatCtrl = null; }
    speaker.stop(); bargeIn.stop();
    pendingLead = false;
    history.push({ role: "user", content: text });
    saveHistory();
    addRow("user", esc(text));
    ta.value = ""; autosize();
    var bubble = addRow("bot", '<span class="typing"><i></i><i></i><i></i></span>');
    var voiceMode = !!opts.voice;
    var speak = (voiceMode && !muted) || (!voiceMode && readAloud);
    if (speak) speaker.begin();
    setBusy(true);
    if (voiceMode) { setVState("thinking"); vcap.innerHTML = '<span class="you">“' + esc(text) + "”</span>"; }

    var ctrl = chatCtrl = window.AbortController ? new AbortController() : null;
    var full = "", raf = 0, errMsg = "";
    var paint = function () { raf = 0; if (full) bubble.innerHTML = md(full); scrollDown(); if (voiceMode && inVoice && full) vcap.textContent = speakable(full).slice(-220); };
    var handle = function (o) {
      if (!o) return;
      if (o.t === "text" && o.v) { full += o.v; if (speak) speaker.push(o.v); if (!raf) raf = requestAnimationFrame(paint); }
      else if (o.t === "action" && o.v === "lead_form" && !leadDone) pendingLead = true;
      else if (o.t === "error") errMsg = o.v || "error";
    };

    fetch(CFG.api + "/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: history.slice(-12), mode: voiceMode ? "voice" : "chat", page: location.pathname, sid: sid, leadDone: leadDone }),
      signal: ctrl ? ctrl.signal : undefined,
    }).then(function (r) {
      if (!r.ok || !r.body) {
        return r.json().catch(function () { return {}; }).then(function (j) { var e = new Error("http"); e.userMsg = j && j.message; throw e; });
      }
      var reader = r.body.getReader(), dec = new TextDecoder(), buf = "";
      function pump() {
        return reader.read().then(function (res) {
          if (res.done) { buf += dec.decode(); if (buf.trim()) { try { handle(JSON.parse(buf)); } catch (e) {} } return; }
          buf += dec.decode(res.value, { stream: true });
          var idx;
          while ((idx = buf.indexOf("\n")) !== -1) {
            var line = buf.slice(0, idx).trim(); buf = buf.slice(idx + 1);
            if (line) { try { handle(JSON.parse(line)); } catch (e) {} }
          }
          return pump();
        });
      }
      return pump();
    }).then(function () {
      if (ctrl !== chatCtrl) return;
      if (raf) { cancelAnimationFrame(raf); raf = 0; }
      paint();
      chatCtrl = null;
      if (!full.trim()) {
        var e = new Error("empty"); e.userMsg = errMsg && errMsg !== "error" ? errMsg : ""; throw e;
      }
      history.push({ role: "assistant", content: full });
      saveHistory();
      setBusy(false);
      if (speak) speaker.end();
      if (!voiceMode && pendingLead) { pendingLead = false; showLeadForm("chat"); }
      if (voiceMode && !speak && inVoice) afterReplyInVoice();
    }).catch(function (e) {
      if (e && e.name === "AbortError") {
        if (raf) { cancelAnimationFrame(raf); raf = 0; }
        if (full.trim()) { bubble.innerHTML = md(full); history.push({ role: "assistant", content: full }); saveHistory(); }
        else if (bubble.parentNode) bubble.parentNode.remove();
        return;
      }
      if (ctrl !== chatCtrl && chatCtrl !== null) return;
      chatCtrl = null;
      var msg = (e && e.userMsg) || "Sorry, I couldn't connect right now. Please try again shortly or email " + (R.email || "sales@budgetree.in") + " for assistance.";
      if (full.trim()) { history.push({ role: "assistant", content: full }); saveHistory(); }
      else { bubble.innerHTML = md(msg); bubble.classList.add("err"); history.pop(); saveHistory(); }
      setBusy(false);
      speaker.stop();
      if (voiceMode && inVoice) { setVState("idle"); vcap.textContent = speakable(msg); vhint.textContent = "Tap the orb to try again"; }
    });
  }

  function autosize() { ta.style.height = "auto"; ta.style.height = Math.min(ta.scrollHeight, 110) + "px"; sendBtn.disabled = busy || !ta.value.trim(); }
  ta.addEventListener("input", autosize);
  ta.addEventListener("keydown", function (e) { if (e.key === "Enter" && !e.shiftKey && !e.isComposing) { e.preventDefault(); if (!busy) send(ta.value); } });
  sendBtn.onclick = function () { if (!busy) send(ta.value); };

  /* ---------------------------- lead form ---------------------------- */
  function showLeadForm(source) {
    var card = addCard(
      "<h4>Talk to our team</h4><div class=\"sub\">Share your enquiry and our team will contact you after receiving it.</div>" +
      '<form novalidate>' +
      '<input name="name" autocomplete="name" placeholder="Full name *" maxlength="80">' +
      '<div class="two"><input name="phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="Phone / WhatsApp" maxlength="20">' +
      '<input name="email" type="email" autocomplete="email" placeholder="Email" maxlength="120"></div>' +
      '<input name="company" autocomplete="organization" placeholder="Company" maxlength="120">' +
      '<textarea name="need" placeholder="What do you need? (e.g. a loyalty program for 500 dealers)" maxlength="600"></textarea>' +
      '<input class="hp" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">' +
      '<label class="consent"><input type="checkbox" name="consent"><span>I agree that Budgetree may contact me about this enquiry by phone, WhatsApp or email.' +
      (R.privacyUrl ? ' <a href="' + esc(R.privacyUrl) + '" target="_blank" rel="noopener">Privacy Policy</a>' : "") + "</span></label>" +
      '<div class="ferr" role="alert"></div>' +
      '<div class="acts"><button class="btn" type="submit">' + I.form + 'Submit</button><button class="btn ghost later" type="button">Maybe later</button></div></form>'
    );
    var form = card.querySelector("form"), ferr = card.querySelector(".ferr"), btn = form.querySelector("button[type=submit]");
    var F = function (n) { return form.querySelector('[name="' + n + '"]'); };
    var lastUser = ""; for (var i = history.length - 1; i >= 0; i--) if (history[i].role === "user") { lastUser = history[i].content; break; }
    if (lastUser && lastUser.length > 12) F('need').value = lastUser.slice(0, 600);
    setTimeout(function () { try { F('name').focus({ preventScroll: true }); } catch (e) {} scrollDown(); }, 60);
    card.querySelector(".later").onclick = function () { card.parentNode.remove(); };
    form.onsubmit = function (ev) {
      ev.preventDefault();
      [].forEach.call(form.querySelectorAll(".bad"), function (el) { el.classList.remove("bad"); });
      ferr.textContent = "";
      var data = {
        name: F('name').value.trim(), phone: F('phone').value.trim(), email: F('email').value.trim(),
        company: F('company').value.trim(), need: F('need').value.trim(), consent: F('consent').checked, website: F('website').value,
        sid: sid, page: location.pathname, source: source || "chat",
        transcript: history.slice(-10),
      };
      var errs = {};
      if (data.name.length < 2) errs.name = "Please enter your name";
      var digits = data.phone.replace(/\D/g, "");
      if (data.phone && (digits.length < 10 || digits.length > 13)) errs.phone = "Please enter a valid phone number";
      if (data.email && !/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(data.email)) errs.email = "Please enter a valid email address";
      if (!data.phone && !data.email) errs.phone = "Please provide a phone number or an email address";
      if (!data.consent) errs.consent = "Please agree to be contacted";
      if (showErrs(errs)) return;
      btn.disabled = true; btn.lastChild.textContent = "Submitting…";
      fetch(CFG.api + "/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
        .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { return { status: r.status, j: j }; }); })
        .then(function (res) {
          if (res.status === 200 && res.j.ok) {
            leadDone = true; ses.set("lead_done", true);
            card.innerHTML = "<h4>Thank you, " + esc(data.name.split(" ")[0]) + "! 🎉</h4><div class=\"sub\" style=\"margin:4px 0 0\">Your enquiry has been received. Our team will use " + (data.phone ? "your phone or WhatsApp number" : "your email address") + " to contact you.</div>" + contactButtons(true);
            scrollDown();
          } else if (res.status === 422 && res.j.fields) { showErrs(res.j.fields); btn.disabled = false; btn.lastChild.textContent = "Submit"; }
          else { ferr.textContent = (res.j && res.j.message) || "We couldn't submit your request. Please try again or email " + (R.email || "sales@budgetree.in") + " for assistance."; btn.disabled = false; btn.lastChild.textContent = "Submit"; }
        })
        .catch(function () { ferr.textContent = "Network error. Please try again."; btn.disabled = false; btn.lastChild.textContent = "Submit"; });
    };
    function showErrs(errs) {
      var keys = Object.keys(errs);
      if (!keys.length) return false;
      keys.forEach(function (k) {
        if (k === "consent") form.querySelector(".consent").classList.add("bad");
        else if (F(k)) F(k).classList.add("bad");
      });
      ferr.textContent = keys.map(function (k) { return errs[k]; }).join(" · ");
      return true;
    }
    return card;
  }

  function fmtPhone(d) { return /^91\d{10}$/.test(d) ? "+91 " + d.slice(2, 7) + " " + d.slice(7) : "+" + d; }
  function contactButtons(compact) {
    var out = [];
    if (R.whatsapp) out.push('<a class="opt" target="_blank" rel="noopener" href="https://wa.me/' + esc(R.whatsapp) + "?text=" + encodeURIComponent("Hi Budgetree, I'd like to know more about your rewards / loyalty solutions.") + '">' + I.chat + "<span>WhatsApp us<small>" + esc(fmtPhone(R.whatsapp)) + "</small></span></a>");
    if (R.phone) out.push('<a class="opt" href="tel:' + esc(R.phone.replace(/[^\d+]/g, "")) + '">' + I.phone + "<span>Call sales<small>" + esc(R.phone) + "</small></span></a>");
    if (R.email) out.push('<a class="opt" href="mailto:' + esc(R.email) + '">' + I.mail + "<span>Email<small>" + esc(R.email) + "</small></span></a>");
    return out.length ? '<div class="opts" style="margin-top:' + (compact ? "12px" : "0") + '">' + out.join("") + "</div>" : "";
  }

  function showHandoff() {
    var card = addCard("<h4>Speak with our team</h4><div class=\"sub\">Choose the contact option that works best for you.</div>" +
      '<div class="opts"><button class="opt o-form">' + I.form + "<span>" + (leadDone ? "Send another request" : "Callback request") + "<small>Complete the form to request a callback</small></span></button></div>" +
      contactButtons(true));
    card.querySelector(".o-form").onclick = function () { card.parentNode.remove(); showLeadForm("chat"); };
  }

  /* ---------------------------- open / close ---------------------------- */
  var opened = false;
  function open() {
    if (!opened) { opened = true; renderAll(); }
    panel.classList.remove("closed"); launcher.classList.add("hide");
    speaker.unlock();
    setTimeout(function () { if (!inVoice && !IS_MOBILE) { try { ta.focus({ preventScroll: true }); } catch (e) {} } scrollDown(); }, 220);
  }
  function close() {
    stopVoice(); stopDictation();
    speaker.stop();
    panel.classList.add("closed"); launcher.classList.remove("hide");
    try { launcher.focus({ preventScroll: true }); } catch (e) {}
  }
  launcher.onclick = open;
  $(".b-close").onclick = close;
  $(".b-team").onclick = function () { showHandoff(); };
  $(".b-reset").onclick = function () {
    if (chatCtrl) { try { chatCtrl.abort(); } catch (e) {} chatCtrl = null; }
    speaker.stop(); stopDictation();
    history = []; saveHistory(); setBusy(false);
    sid = uid(); ses.set("sid", sid);
    renderAll();
  };
  var spkBtn = $(".b-spk");
  function paintSpk() { spkBtn.innerHTML = readAloud ? I.spk : I.spkoff; spkBtn.classList.toggle("on", readAloud); spkBtn.title = readAloud ? "Voice replies on" : "Read replies aloud"; }
  paintSpk();
  spkBtn.onclick = function () { readAloud = !readAloud; pref.set("read_aloud", readAloud); paintSpk(); speaker.unlock(); if (!readAloud) speaker.stop(); };
  shadow.addEventListener("keydown", function (e) { if (e.key === "Escape") { if (inVoice) stopVoice(); else close(); } });

  /* ---------------------------- speech input ---------------------------- */
  function pickEngine() {
    var serverOk = R.stt && HAS_GUM;
    if (engine === "server" && serverOk) return "server";
    if (R.sttMode === "server" && serverOk) return "server";
    if (SR && R.sttMode !== "server" && ses.get("sr_broken", false) !== true) return "browser";
    if (serverOk) return "server";
    return null;
  }
  function getListener() {
    var want = pickEngine();
    if (!want) return null;
    if (!listener || engine !== want) {
      if (listener) listener.abort();
      engine = want;
      listener = want === "browser" ? new BrowserListener() : new ServerListener();
    }
    return listener;
  }
  var FALLBACK_ERRS = { network: 1, "service-not-allowed": 1, "language-not-supported": 1, "audio-capture": 1, "start-failed": 1 };
  function micErrorText(code) {
    if (code === "not-allowed") return "Please allow microphone access in your browser and try again.";
    if (code === "stt-failed") return "I couldn't understand the audio. Please try speaking again.";
    return "Microphone input is unavailable in this browser. Try Chrome, Edge or Safari, or type your question.";
  }

  /* chat-box dictation */
  var dictating = false;
  function stopDictation() { if (dictating && listener) listener.abort(); dictating = false; micBtn.classList.remove("rec"); }
  micBtn.onclick = function () {
    if (dictating) { if (listener) listener.stop(); return; }
    var L = getListener();
    if (!L) { addRow("bot", md(micErrorText("unsupported")), "err"); return; }
    speaker.unlock(); speaker.stop();
    dictating = true; micBtn.classList.add("rec");
    var startEngine = engine;
    L.start(lang, {
      interim: function (t) { if (t && t !== "…" && t.indexOf("🎙") !== 0) { ta.value = t; autosize(); } },
      final: function (t) {
        dictating = false; micBtn.classList.remove("rec");
        if (engine === "server") mic.close();
        if (t) send(t);
      },
      error: function (code) {
        dictating = false; micBtn.classList.remove("rec");
        if (engine === "server") mic.close();
        if (startEngine === "browser" && FALLBACK_ERRS[code] && R.stt && HAS_GUM) { ses.set("sr_broken", true); engine = null; micBtn.onclick(); return; }
        addRow("bot", md(micErrorText(code)), "err");
      },
    });
  };

  /* ---------------------------- voice mode ---------------------------- */
  var lvlRaf = 0, micLevel = 0, emptyTurns = 0, tapStop = false;
  function animateLevel() {
    var l = speaker.playing ? speaker.level() : micLevel;
    bigOrb.style.setProperty("--lvl", l.toFixed(3));
    micLevel *= 0.85;
    if (inVoice) lvlRaf = requestAnimationFrame(animateLevel);
  }
  var STATE_TXT = { idle: "Tap to talk", listening: "Listening…", thinking: "Thinking…", speaking: "" };
  function setVState(s) {
    voiceEl.className = "voice st-" + s + (inVoice ? "" : " closed");
    vstate.textContent = s === "speaking" ? R.name + " is speaking" : STATE_TXT[s];
    vhint.textContent = s === "speaking" ? (R.bargeIn && !IS_MOBILE && HAS_GUM && !muted ? "Speak or tap the orb to interrupt" : "Tap the orb to interrupt") : s === "listening" ? "Speak now. I will reply when you finish." : "";
  }
  function listen() {
    if (!inVoice) return;
    speaker.stop(); bargeIn.stop();
    var L = getListener();
    if (!L) { setVState("idle"); vcap.textContent = micErrorText("unsupported"); return; }
    var startEngine = engine;
    setVState("listening");
    tapStop = false;
    var go = function () {
      if (!inVoice) return;
      L.start(lang, {
        interim: function (t) { vcap.innerHTML = '<span class="you">' + esc(t || "…") + "</span>"; },
        level: function (l) { micLevel = Math.max(micLevel, l); },
        thinking: function () { setVState("thinking"); },
        final: function (t) {
          if (!inVoice) return;
          var tapped = tapStop; tapStop = false;
          if (t) { emptyTurns = 0; send(t, { voice: true }); }
          else if (tapped) { setVState("idle"); vcap.textContent = ""; }
          else if (++emptyTurns < 3) setTimeout(function () { if (inVoice && !busy && !speaker.playing) listen(); }, 120);
          else { setVState("idle"); vcap.textContent = lang === "hi-IN" ? "I'm here. Tap the orb whenever you want to speak." : "I'm here - tap the orb when you want to talk."; }
        },
        error: function (code) {
          if (!inVoice) return;
          if (startEngine === "browser" && FALLBACK_ERRS[code] && R.stt && HAS_GUM) { ses.set("sr_broken", true); engine = null; listen(); return; }
          setVState("idle"); vcap.textContent = micErrorText(code);
        },
      });
    };
    // browser recognition can't share the mic on some devices - release our stream first
    if (startEngine === "browser" && mic.stream) { mic.close(); setTimeout(go, 80); } else go();
  }
  function afterReplyInVoice() {
    if (!inVoice) return;
    if (pendingLead) {
      pendingLead = false;
      stopVoice();
      showLeadForm("voice");
      return;
    }
    setTimeout(function () { if (inVoice && !busy && !speaker.playing) listen(); }, 220);
  }
  function startVoice() {
    if (!pickEngine()) { open(); addRow("bot", md(micErrorText("unsupported")), "err"); return; }
    open();
    stopDictation();
    inVoice = true; emptyTurns = 0;
    speaker.unlock();
    voiceEl.classList.remove("closed");
    vcap.innerHTML = '<span class="you">' + (lang === "hi-IN" ? "Go ahead, I'm listening…" : "Go ahead, I'm listening…") + "</span>";
    paintLang(); paintMute();
    cancelAnimationFrame(lvlRaf); animateLevel();
    listen();
  }
  function stopVoice() {
    if (!inVoice) return;
    inVoice = false;
    if (listener) listener.abort();
    bargeIn.stop();
    speaker.stop();
    mic.close();
    cancelAnimationFrame(lvlRaf);
    voiceEl.classList.add("closed");
    setVState("idle");
    if (busy && chatCtrl) { /* let the text reply finish in chat */ }
  }
  bigOrb.onclick = function () {
    speaker.unlock();
    if (listener && listener.active() && voiceEl.classList.contains("st-listening")) { tapStop = true; listener.stop(); return; }
    if (chatCtrl) { try { chatCtrl.abort(); } catch (e) {} chatCtrl = null; setBusy(false); }
    emptyTurns = 0;
    listen();
  };
  $(".b-voice").onclick = startVoice;
  $(".v-end").onclick = stopVoice;
  $(".v-back").onclick = stopVoice;
  $(".v-chat").onclick = stopVoice;
  var muteBtn = $(".v-mute");
  function paintMute() { muteBtn.innerHTML = muted ? I.spkoff : I.spk; muteBtn.setAttribute("aria-label", muted ? "Unmute voice" : "Mute voice"); }
  muteBtn.onclick = function () { muted = !muted; paintMute(); if (muted) { speaker.stop(); bargeIn.stop(); if (inVoice && !busy) listen(); } };
  function paintLang() { shadow.querySelectorAll(".lang button").forEach(function (b) { b.classList.toggle("on", b.getAttribute("data-l") === lang); }); }
  shadow.querySelectorAll(".lang button").forEach(function (b) {
    b.onclick = function () {
      lang = b.getAttribute("data-l"); pref.set("lang", lang); paintLang();
      if (listener && listener.active()) { listener.abort(); setTimeout(listen, 150); }
    };
  });
  function refreshVoiceButtons() {
    var ok = voiceSupported();
    $(".b-voice").style.display = ok ? "" : "none";
    micBtn.style.display = ok ? "" : "none";
  }
  refreshVoiceButtons();

  /* ---------------------------- remote config ---------------------------- */
  function applyRemote(j) {
    if (!j || typeof j !== "object") return;
    ["name", "phone", "email", "whatsapp", "privacyUrl", "demoUrl", "sttMode"].forEach(function (k) { if (typeof j[k] === "string") R[k] = j[k]; });
    ["tts", "stt", "bargeIn"].forEach(function (k) { if (typeof j[k] === "boolean") R[k] = j[k]; });
    if (!R.tts) speaker.useBrowser = true;
    shadow.querySelector(".l-name").textContent = "Ask " + R.name;
    shadow.querySelector(".h-name").textContent = R.name;
    if (!R.phone && !R.email && !R.whatsapp) $(".b-team").title = "Request a callback";
    refreshVoiceButtons();
    if (opened && !history.length && !busy) renderAll();
  }
  try {
    var cached = ses.get("remote_cfg", null);
    if (cached) applyRemote(cached);
    fetch(CFG.api + "/config").then(function (r) { return r.ok ? r.json() : null; }).then(function (j) { if (j) { ses.set("remote_cfg", j); applyRemote(j); } }).catch(function () {});
  } catch (e) {}

  function mount() { document.body.appendChild(host); }
  if (document.body) mount(); else document.addEventListener("DOMContentLoaded", mount);

  window.addEventListener("bt-open-search", function () { open(); });
  window.BudgetreeAssistant = {
    open: open,
    close: close,
    voice: startVoice,
    contact: function () { open(); showHandoff(); },
    ask: function (q) { open(); send(q); },
    version: "2.0.0",
    _state: function () { return { busy: busy, inVoice: inVoice, engine: engine, readAloud: readAloud, leadDone: leadDone, useBrowserVoice: speaker.useBrowser, speaking: speaker.playing, queue: speaker.queue.length, cfg: R }; },
  };
})();
