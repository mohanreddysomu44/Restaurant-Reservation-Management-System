// import { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";

// const css = `
//   @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,700;0,9..144,900;1,9..144,300;1,9..144,700;1,9..144,900&family=Sora:wght@300;400;500;600&display=swap');

//   *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

//   :root {
//     --w:     #ffffff;
//     --off:   #fafaf9;
//     --pearl: #f4f2ee;
//     --ink:   #111111;
//     --ink2:  #2d2d2d;
//     --muted: #6f6f6f;
//     --blue:  #1a56db;
//     --bluelt:#eff4ff;
//     --teal:  #0d9488;
//     --rose:  #e11d48;
//     --amber: #d97706;
//     --bdr:   #e5e5e1;
//     --sh:    0 1px 3px rgba(0,0,0,.06),0 4px 14px rgba(0,0,0,.05);
//     --shl:   0 8px 32px rgba(0,0,0,.09),0 2px 8px rgba(0,0,0,.05);
//   }

//   html { scroll-behavior: smooth; }
//   body {
//     font-family: 'Sora', sans-serif;
//     background: var(--w); color: var(--ink);
//     overflow-x: hidden; cursor: default;
//     -webkit-font-smoothing: antialiased;
//   }
//   ::-webkit-scrollbar { width: 5px; }
//   ::-webkit-scrollbar-track { background: var(--off); }
//   ::-webkit-scrollbar-thumb { background: var(--bdr); border-radius: 3px; }

//   .lp-nav {
//     position: fixed; top: 0; left: 0; right: 0; z-index: 300;
//     background: rgba(255,255,255,.92); backdrop-filter: blur(18px);
//     border-bottom: 1px solid var(--bdr);
//     display: flex; align-items: center; justify-content: space-between;
//     padding: 0 64px; height: 70px; transition: box-shadow .3s;
//   }
//   .lp-nav.stuck { box-shadow: 0 2px 18px rgba(0,0,0,.07); }
//   .lp-logo {
//     font-family: 'Fraunces', serif; font-size: 1.6rem; font-weight: 900;
//     color: var(--ink); display: flex; align-items: center; gap: 10px;
//     text-decoration: none; letter-spacing: -.5px;
//   }
//   .lp-logo-icon { width: 36px; height: 36px; border-radius: 11px; background: var(--blue); display: flex; align-items: center; justify-content: center; font-size: 1rem; box-shadow: 0 2px 10px rgba(26,86,219,.3); flex-shrink: 0; }
//   .lp-logo-accent { color: var(--blue); }
//   .lp-links { display: flex; align-items: center; gap: 34px; }
//   .lp-links a { font-size: .82rem; font-weight: 500; color: var(--muted); text-decoration: none; transition: color .17s; }
//   .lp-links a:hover { color: var(--ink); }
//   .lp-actions { display: flex; gap: 10px; }

//   .lb { font-family: 'Sora', sans-serif; font-size: .83rem; font-weight: 600; padding: 10px 22px; border-radius: 9px; border: none; cursor: pointer; transition: all .2s; display: inline-flex; align-items: center; gap: 7px; text-decoration: none; white-space: nowrap; }
//   .lb-out { background: transparent; color: var(--ink2); border: 1.5px solid var(--bdr); }
//   .lb-out:hover { border-color: #c2c2bc; background: var(--pearl); }
//   .lb-fill { background: var(--blue); color: #fff; box-shadow: 0 2px 14px rgba(26,86,219,.28); }
//   .lb-fill:hover { background: #1446c5; box-shadow: 0 4px 22px rgba(26,86,219,.4); transform: translateY(-1px); }
//   .lb-lg { padding: 15px 34px; font-size: .95rem; border-radius: 12px; }
//   .lb-white { background: #fff; color: var(--ink); font-weight: 700; border-radius: 12px; padding: 15px 34px; font-size: .95rem; font-family: 'Sora', sans-serif; cursor: pointer; transition: all .2s; border: none; }
//   .lb-white:hover { background: #f3f3f0; transform: translateY(-1px); }
//   .lb-wout { background: transparent; color: rgba(255,255,255,.8); border: 1.5px solid rgba(255,255,255,.22); border-radius: 12px; padding: 15px 34px; font-size: .95rem; font-family: 'Sora', sans-serif; font-weight: 600; cursor: pointer; transition: all .2s; }
//   .lb-wout:hover { border-color: rgba(255,255,255,.55); color: #fff; }

//   .lp-hero { max-width: 1240px; margin: 0 auto; padding: 138px 64px 96px; display: grid; grid-template-columns: 1.15fr 1fr; gap: 72px; align-items: center; }
//   .hero-pill { display: inline-flex; align-items: center; gap: 8px; background: var(--bluelt); border: 1px solid #c7d7f9; color: var(--blue); border-radius: 999px; font-size: .71rem; font-weight: 700; letter-spacing: .8px; text-transform: uppercase; padding: 6px 16px; margin-bottom: 30px; animation: fu .7s both; }
//   .hero-pill-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--blue); animation: blink 2s infinite; }
//   @keyframes blink { 0%,100%{opacity:1} 50%{opacity:.25} }
//   .hero-h { font-family: 'Fraunces', serif; font-size: clamp(2.9rem, 4.4vw, 4.1rem); font-weight: 900; line-height: 1.07; letter-spacing: -2.5px; color: var(--ink); animation: fu .8s .07s both; }
//   .hero-h em { font-style: italic; color: var(--blue); }
//   .hero-h .ul { color: var(--teal); position: relative; display: inline-block; }
//   .hero-h .ul::after { content: ''; position: absolute; left: 0; right: 0; bottom: -3px; height: 3px; background: var(--teal); border-radius: 2px; opacity: .4; }
//   .hero-p { font-size: 1rem; color: var(--muted); line-height: 1.82; max-width: 490px; margin: 28px 0 38px; animation: fu .9s .13s both; }
//   .hero-cta { display: flex; gap: 12px; flex-wrap: wrap; animation: fu .9s .19s both; }
//   .hero-social { display: flex; align-items: center; gap: 16px; margin-top: 44px; padding-top: 36px; border-top: 1px solid var(--bdr); animation: fu .9s .26s both; }
//   .hs-avatars { display: flex; }
//   .hs-av { width: 34px; height: 34px; border-radius: 50%; border: 2.5px solid #fff; background: var(--pearl); display: flex; align-items: center; justify-content: center; font-size: .88rem; margin-left: -9px; }
//   .hs-av:first-child { margin-left: 0; }
//   .hs-text { font-size: .79rem; color: var(--muted); line-height: 1.55; }
//   .hs-text strong { color: var(--ink); font-weight: 600; }

//   .hero-vis { position: relative; animation: fu 1s .14s both; }
//   .hero-vis-main { background: var(--w); border: 1.5px solid var(--bdr); border-radius: 22px; padding: 28px; box-shadow: var(--shl); animation: floatY 6s ease-in-out infinite; }
//   @keyframes floatY { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-13px)} }
//   .vis-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
//   .vis-title { font-family: 'Fraunces', serif; font-size: .98rem; font-weight: 800; color: var(--ink); }
//   .live-tag { display: flex; align-items: center; gap: 5px; background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 999px; font-size: .63rem; font-weight: 700; color: #059669; padding: 4px 10px; text-transform: uppercase; letter-spacing: .5px; }
//   .live-dot { width: 5px; height: 5px; border-radius: 50%; background: #059669; animation: blink 1.5s infinite; }
//   .vis-doc { display: flex; align-items: center; gap: 12px; padding: 11px 13px; border: 1.5px solid var(--bdr); border-radius: 13px; margin-bottom: 8px; background: var(--off); transition: all .2s; }
//   .vis-doc:hover { border-color: #c7d7f9; background: var(--bluelt); }
//   .vis-doc-ico { width: 40px; height: 40px; border-radius: 11px; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; flex-shrink: 0; }
//   .vis-doc-nm { font-size: .84rem; font-weight: 700; color: var(--ink); }
//   .vis-doc-sp { font-size: .71rem; color: var(--muted); margin-top: 1px; }
//   .vis-pill { margin-left: auto; font-size: .63rem; font-weight: 700; padding: 4px 10px; border-radius: 999px; flex-shrink: 0; }
//   .vp-g { background: #ecfdf5; color: #059669; border: 1px solid #a7f3d0; }
//   .vp-a { background: #fffbeb; color: var(--amber); border: 1px solid #fcd34d; }
//   .fc { position: absolute; background: var(--w); border: 1.5px solid var(--bdr); border-radius: 14px; padding: 12px 16px; box-shadow: var(--shl); display: flex; align-items: center; gap: 11px; }
//   .fc-1 { top: -24px; right: -14px; animation: floatY 5s ease-in-out infinite .5s; }
//   .fc-2 { bottom: -18px; left: -14px; animation: floatY 7s ease-in-out infinite .9s; }
//   .fc-ico { width: 38px; height: 38px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; flex-shrink: 0; }
//   .fc-t { font-size: .79rem; font-weight: 700; color: var(--ink); }
//   .fc-s { font-size: .68rem; color: var(--muted); }

//   .lp-stats { background: var(--ink); padding: 56px 64px; }
//   .stats-grid { max-width: 1240px; margin: 0 auto; display: grid; grid-template-columns: repeat(4,1fr); gap: 16px; }
//   .stt { text-align: center; }
//   .stt-n { font-family: 'Fraunces', serif; font-size: 2.7rem; font-weight: 900; color: #fff; line-height: 1; letter-spacing: -1.5px; }
//   .stt-n span { color: #60a5fa; }
//   .stt-l { font-size: .72rem; color: rgba(255,255,255,.42); text-transform: uppercase; letter-spacing: 1.3px; font-weight: 500; margin-top: 8px; }

//   .lps { padding: 104px 64px; max-width: 1240px; margin: 0 auto; }
//   .lps-bg { background: var(--off); }
//   .sk { font-size: .67rem; text-transform: uppercase; letter-spacing: 2px; font-weight: 700; color: var(--blue); margin-bottom: 14px; display: flex; align-items: center; gap: 8px; }
//   .sk::before { content:''; width:22px; height:2px; background:var(--blue); border-radius:1px; }
//   .st { font-family: 'Fraunces', serif; font-size: clamp(1.9rem, 2.8vw, 2.55rem); font-weight: 900; color: var(--ink); line-height: 1.14; letter-spacing: -1px; }
//   .st em { font-style: italic; color: var(--blue); }
//   .sb { font-size: .93rem; color: var(--muted); line-height: 1.78; margin-top: 13px; max-width: 490px; }

//   .mq-wrap { border-top: 1px solid var(--bdr); border-bottom: 1px solid var(--bdr); overflow: hidden; padding: 26px 0; background: var(--w); }
//   .mq-track { display: flex; gap: 12px; width: max-content; animation: mq 28s linear infinite; }
//   .mq-track:hover { animation-play-state: paused; }
//   @keyframes mq { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
//   .mq-chip { display: flex; align-items: center; gap: 8px; background: var(--w); border: 1.5px solid var(--bdr); border-radius: 999px; padding: 9px 20px; font-size: .8rem; font-weight: 500; color: var(--ink2); white-space: nowrap; transition: all .2s; }
//   .mq-chip:hover { border-color: #c7d7f9; background: var(--bluelt); color: var(--blue); }

//   .feat-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 52px; align-items: start; margin-top: 58px; }
//   .feat-list { display: flex; flex-direction: column; gap: 5px; }
//   .feat-row { display: flex; gap: 18px; padding: 20px 22px; border-radius: 15px; cursor: pointer; border: 1.5px solid transparent; transition: all .2s; }
//   .feat-row:hover { background: var(--w); border-color: var(--bdr); box-shadow: var(--sh); }
//   .feat-row.on { background: var(--bluelt); border-color: #c7d7f9; }
//   .feat-ico { width: 46px; height: 46px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.25rem; flex-shrink: 0; }
//   .feat-nm { font-size: .9rem; font-weight: 700; color: var(--ink); margin-bottom: 4px; }
//   .feat-ds { font-size: .8rem; color: var(--muted); line-height: 1.62; }
//   .feat-preview { background: var(--w); border: 1.5px solid var(--bdr); border-radius: 22px; padding: 36px; box-shadow: var(--shl); position: sticky; top: 88px; min-height: 360px; display: flex; flex-direction: column; justify-content: center; overflow: hidden; }
//   .feat-preview::before { content:''; position:absolute; top:-50px; right:-50px; width:180px; height:180px; border-radius:50%; background:radial-gradient(circle,rgba(26,86,219,.07),transparent 70%); pointer-events:none; }
//   .fp-emo { font-size: 2.8rem; margin-bottom: 18px; }
//   .fp-title { font-family: 'Fraunces', serif; font-size: 1.3rem; font-weight: 900; color: var(--ink); margin-bottom: 11px; }
//   .fp-text { font-size: .88rem; color: var(--muted); line-height: 1.72; margin-bottom: 22px; }
//   .fp-tags { display: flex; gap: 8px; flex-wrap: wrap; }
//   .fp-tag { background: var(--bluelt); color: var(--blue); border: 1px solid #c7d7f9; border-radius: 999px; padding: 5px 14px; font-size: .71rem; font-weight: 600; }

//   .steps-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 22px; margin-top: 54px; }
//   .step-c { background: var(--w); border: 1.5px solid var(--bdr); border-radius: 18px; padding: 28px 22px; position: relative; transition: transform .22s, box-shadow .22s, border-color .22s; }
//   .step-c:hover { transform: translateY(-5px); box-shadow: var(--shl); border-color: #c7d7f9; }
//   .step-badge { width: 40px; height: 40px; border-radius: 12px; background: var(--blue); color: #fff; font-family: 'Fraunces', serif; font-size: 1rem; font-weight: 900; display: flex; align-items: center; justify-content: center; margin-bottom: 18px; }
//   .step-ttl { font-size: .9rem; font-weight: 700; color: var(--ink); margin-bottom: 8px; }
//   .step-dsc { font-size: .8rem; color: var(--muted); line-height: 1.65; }
//   .step-arr { position:absolute; top:36px; right:-15px; width:30px; height:2px; background:linear-gradient(90deg,var(--bdr),transparent); display:flex; align-items:center; justify-content:flex-end; z-index:1; }
//   .step-arr::after { content:'›'; color:var(--muted); font-size:.9rem; }

//   .docs-g { display: grid; grid-template-columns: repeat(4,1fr); gap: 20px; margin-top: 50px; }
//   .doc-c { background: var(--w); border: 1.5px solid var(--bdr); border-radius: 18px; padding: 28px 20px; text-align: center; transition: transform .22s, box-shadow .22s, border-color .22s; }
//   .doc-c:hover { transform: translateY(-5px); box-shadow: var(--shl); border-color: #c7d7f9; }
//   .doc-c-av { font-size: 2.4rem; display: block; margin-bottom: 12px; }
//   .doc-c-nm { font-size: .89rem; font-weight: 700; color: var(--ink); }
//   .doc-c-sp { font-size: .74rem; color: var(--muted); margin: 4px 0 12px; }
//   .doc-c-chip { display: inline-block; font-size: .71rem; font-weight: 600; padding: 5px 13px; border-radius: 999px; }
//   .chip-g { background: #ecfdf5; color: #059669; border: 1px solid #a7f3d0; }
//   .chip-a { background: #fffbeb; color: var(--amber); border: 1px solid #fcd34d; }
//   .doc-c-r { font-size: .76rem; color: var(--muted); margin-top: 14px; padding-top: 12px; border-top: 1px solid var(--bdr); }

//   .testi-g { display: grid; grid-template-columns: repeat(3,1fr); gap: 22px; margin-top: 54px; }
//   .testi-c { background: var(--w); border: 1.5px solid var(--bdr); border-radius: 18px; padding: 30px; transition: transform .2s, box-shadow .2s; }
//   .testi-c:hover { transform: translateY(-4px); box-shadow: var(--shl); }
//   .testi-stars { margin-bottom: 16px; font-size: .85rem; letter-spacing: 1px; }
//   .testi-q { font-size: .87rem; color: var(--ink2); line-height: 1.7; font-style: italic; margin-bottom: 22px; }
//   .testi-au { display: flex; align-items: center; gap: 12px; padding-top: 18px; border-top: 1px solid var(--bdr); }
//   .testi-ava { width: 40px; height: 40px; border-radius: 50%; background: var(--pearl); display: flex; align-items: center; justify-content: center; font-size: 1.1rem; }
//   .testi-nm { font-size: .85rem; font-weight: 700; color: var(--ink); }
//   .testi-rl { font-size: .71rem; color: var(--muted); margin-top: 2px; }
//   .testi-bdg { margin-left: auto; background: var(--bluelt); color: var(--blue); border: 1px solid #c7d7f9; border-radius: 999px; padding: 3px 10px; font-size: .64rem; font-weight: 700; }

//   .cta-band { background: var(--ink); border-radius: 28px; padding: 70px 80px; display: grid; grid-template-columns: 1fr auto; gap: 48px; align-items: center; position: relative; overflow: hidden; }
//   .cta-band::before { content:''; position:absolute; top:-80px; right:60px; width:340px; height:340px; border-radius:50%; background:radial-gradient(circle,rgba(59,130,246,.16),transparent 70%); pointer-events:none; }
//   .cta-band::after { content:''; position:absolute; bottom:-60px; left:50px; width:240px; height:240px; border-radius:50%; background:radial-gradient(circle,rgba(13,148,136,.1),transparent 70%); pointer-events:none; }
//   .cta-h { font-family:'Fraunces',serif; font-size:2.15rem; font-weight:900; color:#fff; line-height:1.15; letter-spacing:-.8px; margin-bottom:13px; }
//   .cta-h em { font-style:italic; color:#60a5fa; }
//   .cta-p { font-size:.91rem; color:rgba(255,255,255,.48); line-height:1.72; max-width:450px; }
//   .cta-btns { display:flex; flex-direction:column; gap:12px; flex-shrink:0; position:relative; z-index:1; }

//   .lp-footer { background: var(--off); border-top: 1px solid var(--bdr); padding: 72px 64px 36px; }
//   .footer-g { max-width: 1240px; margin: 0 auto; }
//   .footer-top { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 50px; margin-bottom: 52px; }
//   .f-logo { font-family:'Fraunces',serif; font-size:1.35rem; font-weight:900; color:var(--ink); margin-bottom:12px; }
//   .f-logo span { color:var(--blue); }
//   .f-tag { font-size:.82rem; color:var(--muted); line-height:1.7; max-width:255px; }
//   .f-col h4 { font-size:.67rem; text-transform:uppercase; letter-spacing:1.5px; font-weight:700; color:var(--ink); margin-bottom:18px; }
//   .f-col a { display:block; font-size:.82rem; color:var(--muted); text-decoration:none; margin-bottom:10px; transition:color .17s; }
//   .f-col a:hover { color:var(--ink); }
//   .f-btm { display:flex; justify-content:space-between; align-items:center; padding-top:26px; border-top:1px solid var(--bdr); font-size:.75rem; color:var(--muted); }

//   /* ── CHATBOT ───────────────────────────────────────────────────────────── */
//   .cfab {
//     position:fixed; bottom:28px; right:28px; z-index:700;
//     width:62px; height:62px; border-radius:50%;
//     background:var(--blue); border:none; cursor:pointer;
//     display:flex; align-items:center; justify-content:center;
//     box-shadow:0 4px 24px rgba(26,86,219,.4);
//     transition:transform .2s, box-shadow .2s;
//     animation:popIn .5s 1.2s both;
//   }
//   .cfab:hover { transform:scale(1.09); box-shadow:0 8px 36px rgba(26,86,219,.55); }
//   @keyframes popIn { from{transform:scale(0);opacity:0} to{transform:scale(1);opacity:1} }
//   .cfab-bdg {
//     position:absolute; top:-3px; right:-3px; width:20px; height:20px;
//     background:var(--rose); border-radius:50%; border:2.5px solid #fff;
//     display:flex; align-items:center; justify-content:center;
//     font-size:.58rem; font-weight:700; color:#fff;
//     animation:pulse-badge 2s ease-in-out infinite;
//   }
//   @keyframes pulse-badge { 0%,100%{box-shadow:0 0 0 0 rgba(225,29,72,.4)} 50%{box-shadow:0 0 0 6px rgba(225,29,72,0)} }

//   .cwin {
//     position:fixed; bottom:104px; right:28px; z-index:699;
//     width:400px; max-height:600px; display:flex; flex-direction:column;
//     border-radius:24px; background:#fff; border:1.5px solid var(--bdr);
//     box-shadow:0 24px 70px rgba(0,0,0,.14),0 6px 20px rgba(0,0,0,.07);
//     overflow:hidden; animation:winUp .3s cubic-bezier(.22,1,.36,1);
//   }
//   @keyframes winUp { from{transform:translateY(18px) scale(.97);opacity:0} to{transform:translateY(0) scale(1);opacity:1} }

//   .c-head { padding:16px 20px; background:var(--blue); display:flex; align-items:center; gap:12px; flex-shrink:0; }
//   .c-head-av { width:42px; height:42px; border-radius:50%; background:rgba(255,255,255,.15); border:2px solid rgba(255,255,255,.25); display:flex; align-items:center; justify-content:center; font-size:1.2rem; flex-shrink:0; }
//   .c-head-info { flex:1; min-width:0; }
//   .c-head-nm { font-size:.93rem; font-weight:700; color:#fff; }
//   .c-head-st { font-size:.68rem; color:rgba(255,255,255,.65); display:flex; align-items:center; gap:5px; margin-top:2px; }
//   .c-head-st::before { content:''; width:6px; height:6px; border-radius:50%; background:#4ade80; flex-shrink:0; }
//   .c-head-close { background:rgba(255,255,255,.14); border:none; color:#fff; width:30px; height:30px; border-radius:9px; cursor:pointer; display:flex; align-items:center; justify-content:center; font-size:.9rem; transition:background .15s; flex-shrink:0; }
//   .c-head-close:hover { background:rgba(255,255,255,.28); }

//   .c-disclaimer { background:#fffbeb; border-bottom:1px solid #fde68a; padding:8px 16px; font-size:.69rem; color:#92400e; display:flex; align-items:flex-start; gap:6px; flex-shrink:0; line-height:1.5; }

//   .c-msgs { flex:1; overflow-y:auto; padding:16px; display:flex; flex-direction:column; gap:12px; background:var(--off); min-height:200px; }
//   .c-msgs::-webkit-scrollbar { width:3px; }
//   .c-msgs::-webkit-scrollbar-thumb { background:var(--bdr); }

//   .cm { display:flex; gap:8px; align-items:flex-end; }
//   .cm.u { flex-direction:row-reverse; }
//   .cm-av { width:28px; height:28px; border-radius:50%; background:var(--bluelt); border:1px solid #c7d7f9; display:flex; align-items:center; justify-content:center; font-size:.78rem; flex-shrink:0; }
//   .cm-bub { max-width:80%; padding:11px 15px; border-radius:18px; font-size:.83rem; line-height:1.6; }
//   .cm.b .cm-bub { background:#fff; border:1px solid var(--bdr); border-bottom-left-radius:5px; color:var(--ink2); box-shadow:0 1px 4px rgba(0,0,0,.04); }
//   .cm.u .cm-bub { background:var(--blue); color:#fff; border-bottom-right-radius:5px; }
//   .cm-t { font-size:.6rem; color:var(--muted); margin:3px 4px 0; }
//   .cm.err .cm-bub { background:#fff1f2; border-color:#fda4af; color:#be123c; }

//   .tdots { display:flex; gap:4px; padding:13px 16px; background:#fff; border:1px solid var(--bdr); border-radius:18px; border-bottom-left-radius:5px; width:fit-content; box-shadow:0 1px 4px rgba(0,0,0,.04); }
//   .tdots span { width:7px; height:7px; border-radius:50%; background:#c5c5c5; animation:td 1.3s ease-in-out infinite; }
//   .tdots span:nth-child(2){animation-delay:.18s} .tdots span:nth-child(3){animation-delay:.36s}
//   @keyframes td { 0%,60%,100%{transform:translateY(0);opacity:.5} 30%{transform:translateY(-5px);opacity:1} }

//   .c-quick { padding:10px 14px 4px; display:flex; gap:7px; flex-wrap:wrap; background:var(--off); flex-shrink:0; border-top:1px solid var(--bdr); }
//   .c-qb { background:#fff; border:1.5px solid var(--bdr); border-radius:999px; padding:6px 13px; font-size:.71rem; font-weight:500; color:var(--ink2); cursor:pointer; font-family:'Sora',sans-serif; transition:all .15s; white-space:nowrap; }
//   .c-qb:hover:not(:disabled) { border-color:#c7d7f9; background:var(--bluelt); color:var(--blue); }
//   .c-qb:disabled { opacity:.5; cursor:not-allowed; }

//   .c-bar { padding:12px 14px; background:#fff; border-top:1px solid var(--bdr); display:flex; gap:9px; align-items:flex-end; flex-shrink:0; }
//   .c-ta { flex:1; background:var(--off); border:1.5px solid var(--bdr); border-radius:13px; padding:10px 14px; font-family:'Sora',sans-serif; font-size:.82rem; color:var(--ink); resize:none; min-height:40px; max-height:100px; outline:none; transition:border-color .2s; line-height:1.5; }
//   .c-ta:focus { border-color:#93c5fd; background:#fff; }
//   .c-ta::placeholder { color:#b8b8b8; }
//   .c-ta:disabled { opacity:.6; }
//   .c-send { width:40px; height:40px; border-radius:11px; background:var(--blue); border:none; cursor:pointer; display:flex; align-items:center; justify-content:center; flex-shrink:0; transition:background .17s, transform .15s; }
//   .c-send:hover:not(:disabled) { background:#1446c5; transform:scale(1.06); }
//   .c-send:disabled { background:#93c5fd; cursor:not-allowed; }

//   @keyframes fu { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
//   .sr { opacity:0; transform:translateY(22px); transition:opacity .65s, transform .65s; }
//   .sr.in { opacity:1; transform:translateY(0); }

//   @media(max-width:1024px){
//     .lp-hero { grid-template-columns:1fr; padding:115px 32px 72px; }
//     .hero-vis { display:none; }
//     .docs-g { grid-template-columns:repeat(2,1fr); }
//     .steps-grid { grid-template-columns:repeat(2,1fr); }
//     .step-arr { display:none; }
//     .cta-band { grid-template-columns:1fr; padding:48px 36px; }
//     .cta-btns { flex-direction:row; }
//     .footer-top { grid-template-columns:1fr 1fr; gap:32px; }
//   }
//   @media(max-width:768px){
//     .lp-nav { padding:0 20px; }
//     .lp-links { display:none; }
//     .lps { padding:66px 20px; }
//     .lp-stats { padding:42px 20px; }
//     .stats-grid { grid-template-columns:repeat(2,1fr); }
//     .testi-g { grid-template-columns:1fr; }
//     .docs-g { grid-template-columns:1fr 1fr; }
//     .feat-layout { grid-template-columns:1fr; }
//     .lp-footer { padding:48px 20px 28px; }
//     .footer-top { grid-template-columns:1fr; }
//     .cwin { width:calc(100vw - 24px); right:12px; bottom:88px; }
//   }
// `;

// if (!document.getElementById("lpv5")) {
//   const s = document.createElement("style");
//   s.id = "lpv5"; s.textContent = css;
//   document.head.appendChild(s);
// }

// // ── AI via backend proxy (/api/chat → Spring Boot → Anthropic) ────────────────
// const SYSTEM_PROMPT = `You are Medi, a warm and knowledgeable AI medical assistant for MedVault — an online doctor appointment booking platform in India.

// Your capabilities:
// - Help users understand symptoms, health conditions, and when to see a doctor
// - Suggest which specialist to consult based on symptoms described
// - Explain medical test results, lab values, and procedures in simple terms
// - Provide general information about medications, side effects, and interactions
// - Give first-aid and home-care guidance for minor conditions
// - Answer mental health questions with empathy and care
// - Explain medical terminology clearly
// - Guide users on using MedVault (booking, fees, prescriptions, health tracking)
// - Offer wellness, nutrition, and preventive health tips

// Platform details (always accurate):
// - 500+ verified doctors, 30+ specializations
// - Consultation fees: ₹300–₹1,500
// - Booking takes under 60 seconds
// - Digital prescriptions after consultation
// - Cancel/reschedule up to 2 hours before appointment
// - Emergency: call 108 (India)
// - Support: support@medvault.in

// Rules (strictly follow):
// 1. For any emergency (chest pain, stroke, difficulty breathing, heavy bleeding, poisoning) → immediately say CALL 108 NOW and nothing else medical
// 2. Always add a brief reminder that your response is for general guidance, not diagnosis
// 3. Never give a definitive diagnosis — say "this may suggest" or "commonly associated with"
// 4. Never recommend specific prescription dosages — say "follow your doctor's prescription"  
// 5. Be warm, empathetic, and concise — under 120 words unless the user clearly needs more detail
// 6. Use simple, plain language — avoid heavy medical jargon unless the user is clearly a professional
// 7. If asked about specific drug interactions, give general guidance and urge consulting a pharmacist`;

// const ts = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

// // Calls YOUR Spring Boot backend at /api/chat — no CORS issue
// async function callMedi(history) {
//   const res = await fetch("http://localhost:8080/api/chat", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       model: "claude-sonnet-4-20250514",
//       max_tokens: 400,
//       system: SYSTEM_PROMPT,
//       messages: history,
//     }),
//   });
//   if (!res.ok) throw new Error(`Server error ${res.status}`);
//   const data = await res.json();
//   // Parse Claude's response from the proxied JSON
//   const content = data.content;
//   if (Array.isArray(content)) {
//     const textBlock = content.find(b => b.type === "text");
//     if (textBlock) return textBlock.text;
//   }
//   throw new Error("Unexpected response format");
// }

// const QUICK = [
//   "What specialist for headaches?",
//   "Symptoms of diabetes",
//   "Normal blood pressure?",
//   "How to book an appointment?",
//   "When to go to emergency?",
//   "What is BMI?",
// ];

// function Chatbot() {
//   const [open,    setOpen]    = useState(false);
//   const [msgs,    setMsgs]    = useState([
//     { id: 0, role: "bot", text: "Hi! 👋 I'm Medi, your AI medical assistant. Ask me about symptoms, health conditions, medications, or how to book an appointment on MedVault.", time: ts() },
//   ]);
//   const [history, setHistory] = useState([]);
//   const [val,     setVal]     = useState("");
//   const [busy,    setBusy]    = useState(false);
//   const [badge,   setBadge]   = useState(1);
//   const endRef = useRef(null);

//   useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, busy]);
//   useEffect(() => { if (open) setBadge(0); }, [open]);

//   const send = async (txt) => {
//     const text = txt || val.trim();
//     if (!text || busy) return;
//     setVal("");

//     // Add user message to UI
//     setMsgs(p => [...p, { id: Date.now(), role: "user", text, time: ts() }]);

//     // Build new history for API
//     const newHistory = [...history, { role: "user", content: text }];
//     setHistory(newHistory);
//     setBusy(true);

//     try {
//       const reply = await callMedi(newHistory);
//       setMsgs(p => [...p, { id: Date.now() + 1, role: "bot", text: reply, time: ts() }]);
//       setHistory(h => [...h, { role: "assistant", content: reply }]);
//     } catch (e) {
//       setMsgs(p => [...p, {
//         id: Date.now() + 1, role: "err",
//         text: "Connection error. Please make sure the MedVault server is running and try again.",
//         time: ts(),
//       }]);
//     } finally {
//       setBusy(false);
//     }
//   };

//   return (
//     <>
//       <button className="cfab" onClick={() => setOpen(o => !o)} aria-label="Chat with Medi">
//         {open
//           ? <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
//           : <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
//         }
//         {!open && badge > 0 && <div className="cfab-bdg">{badge}</div>}
//       </button>

//       {open && (
//         <div className="cwin">
//           <div className="c-head">
//             <div className="c-head-av">🩺</div>
//             <div className="c-head-info">
//               <div className="c-head-nm">Medi — AI Medical Assistant</div>
//               <div className="c-head-st">Powered by Claude · Online</div>
//             </div>
//             <button className="c-head-close" onClick={() => setOpen(false)}>✕</button>
//           </div>

//           <div className="c-disclaimer">
//             ⚠️ <span>General guidance only — not a substitute for professional medical advice. Consult a doctor for diagnosis or treatment.</span>
//           </div>

//           <div className="c-msgs">
//             {msgs.map(m => (
//               <div key={m.id} className={`cm ${m.role === "user" ? "u" : ""} ${m.role === "err" ? "err" : ""}`}>
//                 {m.role !== "user" && <div className="cm-av">🩺</div>}
//                 <div>
//                   <div className="cm-bub">{m.text}</div>
//                   <div className="cm-t">{m.time}</div>
//                 </div>
//               </div>
//             ))}
//             {busy && (
//               <div className="cm b">
//                 <div className="cm-av">🩺</div>
//                 <div className="tdots"><span/><span/><span/></div>
//               </div>
//             )}
//             <div ref={endRef}/>
//           </div>

//           <div className="c-quick">
//             {QUICK.map(q => (
//               <button key={q} className="c-qb" onClick={() => send(q)} disabled={busy}>{q}</button>
//             ))}
//           </div>

//           <div className="c-bar">
//             <textarea
//               className="c-ta"
//               placeholder="Ask about symptoms, medications, conditions…"
//               rows={1}
//               value={val}
//               onChange={e => setVal(e.target.value)}
//               onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
//               disabled={busy}
//             />
//             <button className="c-send" onClick={() => send()} disabled={busy || !val.trim()}>
//               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
//                 <line x1="22" y1="2" x2="11" y2="13"/>
//                 <polygon points="22 2 15 22 11 13 2 9 22 2" fill="#fff" stroke="none"/>
//               </svg>
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// // ── Page ──────────────────────────────────────────────────────────────────────
// export default function LandingPage() {
//   const navigate = useNavigate();
//   const [stuck, setStuck]     = useState(false);
//   const [activeFeat, setFeat] = useState(0);

//   useEffect(() => {
//     const fn = () => setStuck(window.scrollY > 30);
//     window.addEventListener("scroll", fn);
//     return () => window.removeEventListener("scroll", fn);
//   }, []);

//   useEffect(() => {
//     const els = document.querySelectorAll(".sr");
//     const io = new IntersectionObserver(entries => {
//       entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
//     }, { threshold: .1 });
//     els.forEach(el => io.observe(el));
//     return () => io.disconnect();
//   }, []);

//   const feats = [
//     { ico:"🩺", bg:"#eff4ff", nm:"Verified Doctors", ds:"Every doctor is background-checked, licensed, and rated by real patients. Zero compromise on trust.", tags:["BG Verified","Licensed","Patient Rated"] },
//     { ico:"📅", bg:"#f0fdfa", nm:"Instant Booking", ds:"Real-time slot availability. Confirm appointments in under 60 seconds — no phone calls needed.", tags:["Real-time","One Click","No Calls"] },
//     { ico:"💊", bg:"#fffbeb", nm:"Digital Prescriptions", ds:"Receive, store, and share prescriptions digitally. Access your full medication history anytime.", tags:["Digital","Shareable","Encrypted"] },
//     { ico:"📊", bg:"#f5f3ff", nm:"Health Analytics", ds:"Track blood sugar, heart rate, BMI, blood pressure, and more with beautiful interactive trend charts.", tags:["Vitals","Trend Charts","Insights"] },
//     { ico:"🔒", bg:"#ecfdf5", nm:"Bank-Grade Security", ds:"End-to-end encryption, HIPAA compliance, and zero third-party data sharing — your health data is yours.", tags:["E2E Encrypted","HIPAA","Private"] },
//     { ico:"🤖", bg:"#fff1f2", nm:"AI Medical Assistant", ds:"Medi, powered by Claude AI, answers health questions, explains symptoms, and guides you 24/7.", tags:["Claude AI","Always On","Medical Knowledge"] },
//   ];

//   const steps = [
//     { n:"01", t:"Create Account", d:"Sign up free as a patient in under 60 seconds — no credit card needed." },
//     { n:"02", t:"Find a Specialist", d:"Search by specialty, doctor name, location, or real-time availability." },
//     { n:"03", t:"Book Instantly", d:"Select your slot and confirm your appointment with a single click." },
//     { n:"04", t:"Track Your Health", d:"Access prescriptions, vitals, and your complete health history." },
//   ];

//   const docs = [
//     { av:"👨‍⚕️", nm:"Dr. Arjun Rao", sp:"Cardiologist", exp:"14 yrs", avail:true, r:"4.9" },
//     { av:"👩‍⚕️", nm:"Dr. Priya Sharma", sp:"Neurologist", exp:"11 yrs", avail:true, r:"4.8" },
//     { av:"🧑‍⚕️", nm:"Dr. Ravi Kumar", sp:"Orthopedist", exp:"9 yrs", avail:false, r:"4.7" },
//     { av:"👩‍⚕️", nm:"Dr. Ananya Iyer", sp:"Dermatologist", exp:"7 yrs", avail:true, r:"4.9" },
//   ];

//   const testis = [
//     { q:"\"Booking a cardiologist used to take days. MedVault made it happen in 90 seconds. The AI assistant even helped me understand my symptoms!\"", nm:"Priya Menon", rl:"Patient · Chennai", av:"👩" },
//     { q:"\"MedVault saves me 3+ hours every week. The doctor dashboard is the best I've seen and Medi is genuinely helpful.\"", nm:"Dr. Arjun Rao", rl:"Cardiologist · Hyderabad", av:"👨‍⚕️" },
//     { q:"\"The AI assistant explained my blood test results before I even saw the doctor. Such a thoughtful feature!\"", nm:"Siddharth K.", rl:"Patient · Bangalore", av:"👨" },
//   ];

//   const specs = ["❤️ Cardiology","🧠 Neurology","🦴 Orthopedics","👁 Ophthalmology","🌿 Dermatology","👶 Pediatrics","🫁 Pulmonology","🧬 Oncology","🦷 Dentistry","🧘 Psychiatry","🩻 Radiology","🔬 Pathology","🩸 Hematology","🏃 Sports Medicine"];

//   return (
//     <>
//       <nav className={`lp-nav ${stuck?"stuck":""}`}>
//         <a href="/" className="lp-logo">
//           <div className="lp-logo-icon">🏥</div>
//           Med<span className="lp-logo-accent">Vault</span>
//         </a>
//         <div className="lp-links">
//           <a href="#features">Features</a>
//           <a href="#how">How it Works</a>
//           <a href="#doctors">Doctors</a>
//           <a href="#reviews">Reviews</a>
//         </div>
//         <div className="lp-actions">
//           <button className="lb lb-out" onClick={() => navigate("/login")}>Sign In</button>
//           <button className="lb lb-fill" onClick={() => navigate("/register")}>Get Started →</button>
//         </div>
//       </nav>

//       <div className="lp-hero">
//         <div>
//           <div className="hero-pill"><span className="hero-pill-dot"/>Trusted by 50,000+ patients across India</div>
//           <h1 className="hero-h">
//             See the Right Doctor,<br/>
//             <em>Exactly</em> When<br/>
//             You Need <span className="ul">Care.</span>
//           </h1>
//           <p className="hero-p">Book verified specialists instantly, manage prescriptions digitally, track your health with analytics, and get 24/7 AI medical guidance — all in one secure platform.</p>
//           <div className="hero-cta">
//             <button className="lb lb-fill lb-lg" onClick={() => navigate("/register")}>Start for Free →</button>
//             <button className="lb lb-out lb-lg" onClick={() => navigate("/login")}>Sign In</button>
//           </div>
//           <div className="hero-social">
//             <div className="hs-avatars">
//               {["👩","👨","👵","👦","👩‍⚕️"].map((e,i) => <div key={i} className="hs-av">{e}</div>)}
//             </div>
//             <div className="hs-text"><strong>50,000+ patients</strong> booked last month<br/>⭐ 4.9 average rating from verified reviews</div>
//           </div>
//         </div>
//         <div className="hero-vis">
//           <div className="fc fc-1">
//             <div className="fc-ico" style={{background:"#ecfdf5"}}>✅</div>
//             <div><div className="fc-t">Appointment Confirmed</div><div className="fc-s">Dr. Priya · Today 3:00 PM</div></div>
//           </div>
//           <div className="hero-vis-main">
//             <div className="vis-head">
//               <span className="vis-title">Available Today</span>
//               <div className="live-tag"><div className="live-dot"/>Live</div>
//             </div>
//             {docs.map((d,i) => (
//               <div className="vis-doc" key={i}>
//                 <div className="vis-doc-ico" style={{background:["#eff4ff","#f0fdfa","#fffbeb","#fff1f2"][i]}}>{d.av}</div>
//                 <div><div className="vis-doc-nm">{d.nm}</div><div className="vis-doc-sp">{d.sp} · {d.exp}</div></div>
//                 <div className={`vis-pill ${d.avail?"vp-g":"vp-a"}`}>{d.avail?"Available":"3 slots"}</div>
//               </div>
//             ))}
//           </div>
//           <div className="fc fc-2">
//             <div className="fc-ico" style={{background:"#f5f3ff"}}>🤖</div>
//             <div><div className="fc-t">AI Assistant Active</div><div className="fc-s">Medi · Powered by Claude</div></div>
//           </div>
//         </div>
//       </div>

//       <div className="lp-stats">
//         <div className="stats-grid">
//           {[{n:"500",s:"+",l:"Verified Doctors"},{n:"50K",s:"+",l:"Happy Patients"},{n:"30",s:"+",l:"Specializations"},{n:"4.9",s:"★",l:"Average Rating"}].map((x,i) => (
//             <div key={i} className="stt sr" style={{transitionDelay:`${i*.08}s`}}>
//               <div className="stt-n">{x.n}<span>{x.s}</span></div>
//               <div className="stt-l">{x.l}</div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="mq-wrap">
//         <div className="mq-track">
//           {[...specs,...specs].map((s,i) => <div key={i} className="mq-chip">{s}</div>)}
//         </div>
//       </div>

//       <section id="features">
//         <div className="lps">
//           <div className="sr">
//             <div className="sk">Why MedVault</div>
//             <h2 className="st">Every tool you need for<br/><em>smarter healthcare</em></h2>
//             <p className="sb">A complete ecosystem built around your health — intuitive, secure, and built for real people.</p>
//           </div>
//           <div className="feat-layout">
//             <div className="feat-list">
//               {feats.map((f,i) => (
//                 <div key={i} className={`feat-row sr ${activeFeat===i?"on":""}`} style={{transitionDelay:`${i*.055}s`}} onMouseEnter={() => setFeat(i)}>
//                   <div className="feat-ico" style={{background:f.bg}}>{f.ico}</div>
//                   <div><div className="feat-nm">{f.nm}</div><div className="feat-ds">{f.ds}</div></div>
//                 </div>
//               ))}
//             </div>
//             <div className="feat-preview sr">
//               <div className="fp-emo">{feats[activeFeat].ico}</div>
//               <div className="fp-title">{feats[activeFeat].nm}</div>
//               <div className="fp-text">{feats[activeFeat].ds}</div>
//               <div className="fp-tags">{feats[activeFeat].tags.map(t => <span key={t} className="fp-tag">{t}</span>)}</div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section id="how" className="lps-bg">
//         <div className="lps">
//           <div className="sr" style={{textAlign:"center"}}>
//             <div className="sk" style={{justifyContent:"center"}}>Process</div>
//             <h2 className="st" style={{textAlign:"center"}}>Four steps to <em>better care</em></h2>
//           </div>
//           <div className="steps-grid">
//             {steps.map((s,i) => (
//               <div key={i} className="step-c sr" style={{transitionDelay:`${i*.08}s`}}>
//                 {i < steps.length-1 && <div className="step-arr"/>}
//                 <div className="step-badge">{s.n}</div>
//                 <div className="step-ttl">{s.t}</div>
//                 <div className="step-dsc">{s.d}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <section id="doctors">
//         <div className="lps">
//           <div className="sr">
//             <div className="sk">Our Specialists</div>
//             <h2 className="st">Meet some of our<br/><em>top doctors</em></h2>
//             <p className="sb">Every doctor is verified, licensed, and reviewed by real patients.</p>
//           </div>
//           <div className="docs-g">
//             {docs.map((d,i) => (
//               <div key={i} className="doc-c sr" style={{transitionDelay:`${i*.07}s`}}>
//                 <span className="doc-c-av">{d.av}</span>
//                 <div className="doc-c-nm">{d.nm}</div>
//                 <div className="doc-c-sp">{d.sp}</div>
//                 <div className={`doc-c-chip ${d.avail?"chip-g":"chip-a"}`}>{d.avail?"✓ Available Today":"Limited Slots"}</div>
//                 <div className="doc-c-r">⭐ {d.r} · {d.exp} experience</div>
//               </div>
//             ))}
//           </div>
//           <div style={{textAlign:"center",marginTop:36}}>
//             <button className="lb lb-fill lb-lg" onClick={() => navigate("/register")}>View All 500+ Doctors →</button>
//           </div>
//         </div>
//       </section>

//       <section id="reviews" className="lps-bg">
//         <div className="lps">
//           <div className="sr">
//             <div className="sk">Reviews</div>
//             <h2 className="st">Loved by patients<br/>& <em>doctors alike</em></h2>
//           </div>
//           <div className="testi-g">
//             {testis.map((t,i) => (
//               <div key={i} className="testi-c sr" style={{transitionDelay:`${i*.08}s`}}>
//                 <div className="testi-stars">⭐⭐⭐⭐⭐</div>
//                 <div className="testi-q">{t.q}</div>
//                 <div className="testi-au">
//                   <div className="testi-ava">{t.av}</div>
//                   <div><div className="testi-nm">{t.nm}</div><div className="testi-rl">{t.rl}</div></div>
//                   <div className="testi-bdg">Verified</div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <section>
//         <div className="lps">
//           <div className="cta-band sr">
//             <div>
//               <p style={{fontSize:".68rem",textTransform:"uppercase",letterSpacing:"2px",color:"rgba(255,255,255,.38)",fontWeight:700,marginBottom:13}}>Start Today — It's Free</p>
//               <h2 className="cta-h">Ready to take control<br/>of <em>your health?</em></h2>
//               <p className="cta-p">Join 50,000+ patients who trust MedVault for smarter, faster, safer healthcare.</p>
//             </div>
//             <div className="cta-btns">
//               <button className="lb-white" onClick={() => navigate("/register")}>Create Free Account →</button>
//               <button className="lb-wout" onClick={() => navigate("/login")}>Sign In to Dashboard</button>
//             </div>
//           </div>
//         </div>
//       </section>

//       <footer className="lp-footer">
//         <div className="footer-g">
//           <div className="footer-top">
//             <div>
//               <div className="f-logo">Med<span>Vault</span></div>
//               <div className="f-tag">India's most trusted doctor appointment platform. Secure, beautiful, and built for your health.</div>
//             </div>
//             <div className="f-col"><h4>Platform</h4><a href="#features">Features</a><a href="#how">How it Works</a><a href="#doctors">Doctors</a><a href="#reviews">Reviews</a></div>
//             <div className="f-col"><h4>Account</h4><a href="/login">Patient Login</a><a href="/register">Register Free</a><a href="/doctor">Doctor Portal</a><a href="/admin">Admin</a></div>
//             <div className="f-col"><h4>Support</h4><a href="#">Help Center</a><a href="#">Privacy Policy</a><a href="#">Terms of Use</a><a href="#">Contact Us</a></div>
//           </div>
//           <div className="f-btm">
//             <span>© 2026 MedVault. All rights reserved.</span>
//             <span>Made with ❤️ for better healthcare in India</span>
//           </div>
//         </div>
//       </footer>

//       <Chatbot/>
//     </>
//   );
// }



import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,700;0,9..144,900;1,9..144,300;1,9..144,700;1,9..144,900&family=Sora:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --w:     #ffffff;
    --off:   #fafaf9;
    --pearl: #f4f2ee;
    --ink:   #111111;
    --ink2:  #2d2d2d;
    --muted: #6f6f6f;
    --blue:  #1a56db;
    --bluelt:#eff4ff;
    --teal:  #0d9488;
    --rose:  #e11d48;
    --amber: #d97706;
    --bdr:   #e5e5e1;
    --sh:    0 1px 3px rgba(0,0,0,.06),0 4px 14px rgba(0,0,0,.05);
    --shl:   0 8px 32px rgba(0,0,0,.09),0 2px 8px rgba(0,0,0,.05);
  }

  html { scroll-behavior: smooth; }
  body {
    font-family: 'Sora', sans-serif;
    background: var(--w); color: var(--ink);
    overflow-x: hidden; cursor: default;
    -webkit-font-smoothing: antialiased;
  }
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: var(--off); }
  ::-webkit-scrollbar-thumb { background: var(--bdr); border-radius: 3px; }

  .lp-nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 300;
    background: rgba(255,255,255,.92); backdrop-filter: blur(18px);
    border-bottom: 1px solid var(--bdr);
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 64px; height: 70px; transition: box-shadow .3s;
  }
  .lp-nav.stuck { box-shadow: 0 2px 18px rgba(0,0,0,.07); }
  .lp-logo {
    font-family: 'Fraunces', serif; font-size: 1.6rem; font-weight: 900;
    color: var(--ink); display: flex; align-items: center; gap: 10px;
    text-decoration: none; letter-spacing: -.5px;
  }
  .lp-logo-icon { width: 36px; height: 36px; border-radius: 11px; background: var(--blue); display: flex; align-items: center; justify-content: center; font-size: 1rem; box-shadow: 0 2px 10px rgba(26,86,219,.3); flex-shrink: 0; }
  .lp-logo-accent { color: var(--blue); }
  .lp-links { display: flex; align-items: center; gap: 34px; }
  .lp-links a { font-size: .82rem; font-weight: 500; color: var(--muted); text-decoration: none; transition: color .17s; }
  .lp-links a:hover { color: var(--ink); }
  .lp-actions { display: flex; gap: 10px; }

  .lb { font-family: 'Sora', sans-serif; font-size: .83rem; font-weight: 600; padding: 10px 22px; border-radius: 9px; border: none; cursor: pointer; transition: all .2s; display: inline-flex; align-items: center; gap: 7px; text-decoration: none; white-space: nowrap; }
  .lb-out { background: transparent; color: var(--ink2); border: 1.5px solid var(--bdr); }
  .lb-out:hover { border-color: #c2c2bc; background: var(--pearl); }
  .lb-fill { background: var(--blue); color: #fff; box-shadow: 0 2px 14px rgba(26,86,219,.28); }
  .lb-fill:hover { background: #1446c5; box-shadow: 0 4px 22px rgba(26,86,219,.4); transform: translateY(-1px); }
  .lb-lg { padding: 15px 34px; font-size: .95rem; border-radius: 12px; }
  .lb-white { background: #fff; color: var(--ink); font-weight: 700; border-radius: 12px; padding: 15px 34px; font-size: .95rem; font-family: 'Sora', sans-serif; cursor: pointer; transition: all .2s; border: none; }
  .lb-white:hover { background: #f3f3f0; transform: translateY(-1px); }
  .lb-wout { background: transparent; color: rgba(255,255,255,.8); border: 1.5px solid rgba(255,255,255,.22); border-radius: 12px; padding: 15px 34px; font-size: .95rem; font-family: 'Sora', sans-serif; font-weight: 600; cursor: pointer; transition: all .2s; }
  .lb-wout:hover { border-color: rgba(255,255,255,.55); color: #fff; }

  .lp-hero { max-width: 1240px; margin: 0 auto; padding: 138px 64px 96px; display: grid; grid-template-columns: 1.15fr 1fr; gap: 72px; align-items: center; }
  .hero-pill { display: inline-flex; align-items: center; gap: 8px; background: var(--bluelt); border: 1px solid #c7d7f9; color: var(--blue); border-radius: 999px; font-size: .71rem; font-weight: 700; letter-spacing: .8px; text-transform: uppercase; padding: 6px 16px; margin-bottom: 30px; animation: fu .7s both; }
  .hero-pill-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--blue); animation: blink 2s infinite; }
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:.25} }
  .hero-h { font-family: 'Fraunces', serif; font-size: clamp(2.9rem, 4.4vw, 4.1rem); font-weight: 900; line-height: 1.07; letter-spacing: -2.5px; color: var(--ink); animation: fu .8s .07s both; }
  .hero-h em { font-style: italic; color: var(--blue); }
  .hero-h .ul { color: var(--teal); position: relative; display: inline-block; }
  .hero-h .ul::after { content: ''; position: absolute; left: 0; right: 0; bottom: -3px; height: 3px; background: var(--teal); border-radius: 2px; opacity: .4; }
  .hero-p { font-size: 1rem; color: var(--muted); line-height: 1.82; max-width: 490px; margin: 28px 0 38px; animation: fu .9s .13s both; }
  .hero-cta { display: flex; gap: 12px; flex-wrap: wrap; animation: fu .9s .19s both; }
  .hero-social { display: flex; align-items: center; gap: 16px; margin-top: 44px; padding-top: 36px; border-top: 1px solid var(--bdr); animation: fu .9s .26s both; }
  .hs-avatars { display: flex; }
  .hs-av { width: 34px; height: 34px; border-radius: 50%; border: 2.5px solid #fff; background: var(--pearl); display: flex; align-items: center; justify-content: center; font-size: .88rem; margin-left: -9px; }
  .hs-av:first-child { margin-left: 0; }
  .hs-text { font-size: .79rem; color: var(--muted); line-height: 1.55; }
  .hs-text strong { color: var(--ink); font-weight: 600; }

  .hero-vis { position: relative; animation: fu 1s .14s both; }
  .hero-vis-main { background: var(--w); border: 1.5px solid var(--bdr); border-radius: 22px; padding: 28px; box-shadow: var(--shl); animation: floatY 6s ease-in-out infinite; }
  @keyframes floatY { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-13px)} }
  .vis-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
  .vis-title { font-family: 'Fraunces', serif; font-size: .98rem; font-weight: 800; color: var(--ink); }
  .live-tag { display: flex; align-items: center; gap: 5px; background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 999px; font-size: .63rem; font-weight: 700; color: #059669; padding: 4px 10px; text-transform: uppercase; letter-spacing: .5px; }
  .live-dot { width: 5px; height: 5px; border-radius: 50%; background: #059669; animation: blink 1.5s infinite; }
  .vis-doc { display: flex; align-items: center; gap: 12px; padding: 11px 13px; border: 1.5px solid var(--bdr); border-radius: 13px; margin-bottom: 8px; background: var(--off); transition: all .2s; }
  .vis-doc:hover { border-color: #c7d7f9; background: var(--bluelt); }
  .vis-doc-ico { width: 40px; height: 40px; border-radius: 11px; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; flex-shrink: 0; }
  .vis-doc-nm { font-size: .84rem; font-weight: 700; color: var(--ink); }
  .vis-doc-sp { font-size: .71rem; color: var(--muted); margin-top: 1px; }
  .vis-pill { margin-left: auto; font-size: .63rem; font-weight: 700; padding: 4px 10px; border-radius: 999px; flex-shrink: 0; }
  .vp-g { background: #ecfdf5; color: #059669; border: 1px solid #a7f3d0; }
  .vp-a { background: #fffbeb; color: var(--amber); border: 1px solid #fcd34d; }
  .fc { position: absolute; background: var(--w); border: 1.5px solid var(--bdr); border-radius: 14px; padding: 12px 16px; box-shadow: var(--shl); display: flex; align-items: center; gap: 11px; }
  .fc-1 { top: -24px; right: -14px; animation: floatY 5s ease-in-out infinite .5s; }
  .fc-2 { bottom: -18px; left: -14px; animation: floatY 7s ease-in-out infinite .9s; }
  .fc-ico { width: 38px; height: 38px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; flex-shrink: 0; }
  .fc-t { font-size: .79rem; font-weight: 700; color: var(--ink); }
  .fc-s { font-size: .68rem; color: var(--muted); }

  .lp-stats { background: var(--ink); padding: 56px 64px; }
  .stats-grid { max-width: 1240px; margin: 0 auto; display: grid; grid-template-columns: repeat(4,1fr); gap: 16px; }
  .stt { text-align: center; }
  .stt-n { font-family: 'Fraunces', serif; font-size: 2.7rem; font-weight: 900; color: #fff; line-height: 1; letter-spacing: -1.5px; }
  .stt-n span { color: #60a5fa; }
  .stt-l { font-size: .72rem; color: rgba(255,255,255,.42); text-transform: uppercase; letter-spacing: 1.3px; font-weight: 500; margin-top: 8px; }

  .lps { padding: 104px 64px; max-width: 1240px; margin: 0 auto; }
  .lps-bg { background: var(--off); }
  .sk { font-size: .67rem; text-transform: uppercase; letter-spacing: 2px; font-weight: 700; color: var(--blue); margin-bottom: 14px; display: flex; align-items: center; gap: 8px; }
  .sk::before { content:''; width:22px; height:2px; background:var(--blue); border-radius:1px; }
  .st { font-family: 'Fraunces', serif; font-size: clamp(1.9rem, 2.8vw, 2.55rem); font-weight: 900; color: var(--ink); line-height: 1.14; letter-spacing: -1px; }
  .st em { font-style: italic; color: var(--blue); }
  .sb { font-size: .93rem; color: var(--muted); line-height: 1.78; margin-top: 13px; max-width: 490px; }

  .mq-wrap { border-top: 1px solid var(--bdr); border-bottom: 1px solid var(--bdr); overflow: hidden; padding: 26px 0; background: var(--w); }
  .mq-track { display: flex; gap: 12px; width: max-content; animation: mq 28s linear infinite; }
  .mq-track:hover { animation-play-state: paused; }
  @keyframes mq { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
  .mq-chip { display: flex; align-items: center; gap: 8px; background: var(--w); border: 1.5px solid var(--bdr); border-radius: 999px; padding: 9px 20px; font-size: .8rem; font-weight: 500; color: var(--ink2); white-space: nowrap; transition: all .2s; }
  .mq-chip:hover { border-color: #c7d7f9; background: var(--bluelt); color: var(--blue); }

  .feat-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 52px; align-items: start; margin-top: 58px; }
  .feat-list { display: flex; flex-direction: column; gap: 5px; }
  .feat-row { display: flex; gap: 18px; padding: 20px 22px; border-radius: 15px; cursor: pointer; border: 1.5px solid transparent; transition: all .2s; }
  .feat-row:hover { background: var(--w); border-color: var(--bdr); box-shadow: var(--sh); }
  .feat-row.on { background: var(--bluelt); border-color: #c7d7f9; }
  .feat-ico { width: 46px; height: 46px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.25rem; flex-shrink: 0; }
  .feat-nm { font-size: .9rem; font-weight: 700; color: var(--ink); margin-bottom: 4px; }
  .feat-ds { font-size: .8rem; color: var(--muted); line-height: 1.62; }
  .feat-preview { background: var(--w); border: 1.5px solid var(--bdr); border-radius: 22px; padding: 36px; box-shadow: var(--shl); position: sticky; top: 88px; min-height: 360px; display: flex; flex-direction: column; justify-content: center; overflow: hidden; }
  .feat-preview::before { content:''; position:absolute; top:-50px; right:-50px; width:180px; height:180px; border-radius:50%; background:radial-gradient(circle,rgba(26,86,219,.07),transparent 70%); pointer-events:none; }
  .fp-emo { font-size: 2.8rem; margin-bottom: 18px; }
  .fp-title { font-family: 'Fraunces', serif; font-size: 1.3rem; font-weight: 900; color: var(--ink); margin-bottom: 11px; }
  .fp-text { font-size: .88rem; color: var(--muted); line-height: 1.72; margin-bottom: 22px; }
  .fp-tags { display: flex; gap: 8px; flex-wrap: wrap; }
  .fp-tag { background: var(--bluelt); color: var(--blue); border: 1px solid #c7d7f9; border-radius: 999px; padding: 5px 14px; font-size: .71rem; font-weight: 600; }

  .steps-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 22px; margin-top: 54px; }
  .step-c { background: var(--w); border: 1.5px solid var(--bdr); border-radius: 18px; padding: 28px 22px; position: relative; transition: transform .22s, box-shadow .22s, border-color .22s; }
  .step-c:hover { transform: translateY(-5px); box-shadow: var(--shl); border-color: #c7d7f9; }
  .step-badge { width: 40px; height: 40px; border-radius: 12px; background: var(--blue); color: #fff; font-family: 'Fraunces', serif; font-size: 1rem; font-weight: 900; display: flex; align-items: center; justify-content: center; margin-bottom: 18px; }
  .step-ttl { font-size: .9rem; font-weight: 700; color: var(--ink); margin-bottom: 8px; }
  .step-dsc { font-size: .8rem; color: var(--muted); line-height: 1.65; }
  .step-arr { position:absolute; top:36px; right:-15px; width:30px; height:2px; background:linear-gradient(90deg,var(--bdr),transparent); display:flex; align-items:center; justify-content:flex-end; z-index:1; }
  .step-arr::after { content:'›'; color:var(--muted); font-size:.9rem; }

  .docs-g { display: grid; grid-template-columns: repeat(4,1fr); gap: 20px; margin-top: 50px; }
  .doc-c { background: var(--w); border: 1.5px solid var(--bdr); border-radius: 18px; padding: 28px 20px; text-align: center; transition: transform .22s, box-shadow .22s, border-color .22s; }
  .doc-c:hover { transform: translateY(-5px); box-shadow: var(--shl); border-color: #c7d7f9; }
  .doc-c-av { font-size: 2.4rem; display: block; margin-bottom: 12px; }
  .doc-c-nm { font-size: .89rem; font-weight: 700; color: var(--ink); }
  .doc-c-sp { font-size: .74rem; color: var(--muted); margin: 4px 0 12px; }
  .doc-c-chip { display: inline-block; font-size: .71rem; font-weight: 600; padding: 5px 13px; border-radius: 999px; }
  .chip-g { background: #ecfdf5; color: #059669; border: 1px solid #a7f3d0; }
  .chip-a { background: #fffbeb; color: var(--amber); border: 1px solid #fcd34d; }
  .doc-c-r { font-size: .76rem; color: var(--muted); margin-top: 14px; padding-top: 12px; border-top: 1px solid var(--bdr); }

  .testi-g { display: grid; grid-template-columns: repeat(3,1fr); gap: 22px; margin-top: 54px; }
  .testi-c { background: var(--w); border: 1.5px solid var(--bdr); border-radius: 18px; padding: 30px; transition: transform .2s, box-shadow .2s; }
  .testi-c:hover { transform: translateY(-4px); box-shadow: var(--shl); }
  .testi-stars { margin-bottom: 16px; font-size: .85rem; letter-spacing: 1px; }
  .testi-q { font-size: .87rem; color: var(--ink2); line-height: 1.7; font-style: italic; margin-bottom: 22px; }
  .testi-au { display: flex; align-items: center; gap: 12px; padding-top: 18px; border-top: 1px solid var(--bdr); }
  .testi-ava { width: 40px; height: 40px; border-radius: 50%; background: var(--pearl); display: flex; align-items: center; justify-content: center; font-size: 1.1rem; }
  .testi-nm { font-size: .85rem; font-weight: 700; color: var(--ink); }
  .testi-rl { font-size: .71rem; color: var(--muted); margin-top: 2px; }
  .testi-bdg { margin-left: auto; background: var(--bluelt); color: var(--blue); border: 1px solid #c7d7f9; border-radius: 999px; padding: 3px 10px; font-size: .64rem; font-weight: 700; }

  .cta-band { background: var(--ink); border-radius: 28px; padding: 70px 80px; display: grid; grid-template-columns: 1fr auto; gap: 48px; align-items: center; position: relative; overflow: hidden; }
  .cta-band::before { content:''; position:absolute; top:-80px; right:60px; width:340px; height:340px; border-radius:50%; background:radial-gradient(circle,rgba(59,130,246,.16),transparent 70%); pointer-events:none; }
  .cta-band::after { content:''; position:absolute; bottom:-60px; left:50px; width:240px; height:240px; border-radius:50%; background:radial-gradient(circle,rgba(13,148,136,.1),transparent 70%); pointer-events:none; }
  .cta-h { font-family:'Fraunces',serif; font-size:2.15rem; font-weight:900; color:#fff; line-height:1.15; letter-spacing:-.8px; margin-bottom:13px; }
  .cta-h em { font-style:italic; color:#60a5fa; }
  .cta-p { font-size:.91rem; color:rgba(255,255,255,.48); line-height:1.72; max-width:450px; }
  .cta-btns { display:flex; flex-direction:column; gap:12px; flex-shrink:0; position:relative; z-index:1; }

  .lp-footer { background: var(--off); border-top: 1px solid var(--bdr); padding: 72px 64px 36px; }
  .footer-g { max-width: 1240px; margin: 0 auto; }
  .footer-top { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 50px; margin-bottom: 52px; }
  .f-logo { font-family:'Fraunces',serif; font-size:1.35rem; font-weight:900; color:var(--ink); margin-bottom:12px; }
  .f-logo span { color:var(--blue); }
  .f-tag { font-size:.82rem; color:var(--muted); line-height:1.7; max-width:255px; }
  .f-col h4 { font-size:.67rem; text-transform:uppercase; letter-spacing:1.5px; font-weight:700; color:var(--ink); margin-bottom:18px; }
  .f-col a { display:block; font-size:.82rem; color:var(--muted); text-decoration:none; margin-bottom:10px; transition:color .17s; }
  .f-col a:hover { color:var(--ink); }
  .f-btm { display:flex; justify-content:space-between; align-items:center; padding-top:26px; border-top:1px solid var(--bdr); font-size:.75rem; color:var(--muted); }

  /* ── CHATBOT ───────────────────────────────────────────────────────────── */
  .cfab {
    position:fixed; bottom:28px; right:28px; z-index:700;
    width:62px; height:62px; border-radius:50%;
    background:var(--blue); border:none; cursor:pointer;
    display:flex; align-items:center; justify-content:center;
    box-shadow:0 4px 24px rgba(26,86,219,.4);
    transition:transform .2s, box-shadow .2s;
    animation:popIn .5s 1.2s both;
  }
  .cfab:hover { transform:scale(1.09); box-shadow:0 8px 36px rgba(26,86,219,.55); }
  @keyframes popIn { from{transform:scale(0);opacity:0} to{transform:scale(1);opacity:1} }
  .cfab-bdg {
    position:absolute; top:-3px; right:-3px; width:20px; height:20px;
    background:var(--rose); border-radius:50%; border:2.5px solid #fff;
    display:flex; align-items:center; justify-content:center;
    font-size:.58rem; font-weight:700; color:#fff;
    animation:pulse-badge 2s ease-in-out infinite;
  }
  @keyframes pulse-badge { 0%,100%{box-shadow:0 0 0 0 rgba(225,29,72,.4)} 50%{box-shadow:0 0 0 6px rgba(225,29,72,0)} }

  .cwin {
    position:fixed; bottom:104px; right:28px; z-index:699;
    width:400px; max-height:600px; display:flex; flex-direction:column;
    border-radius:24px; background:#fff; border:1.5px solid var(--bdr);
    box-shadow:0 24px 70px rgba(0,0,0,.14),0 6px 20px rgba(0,0,0,.07);
    overflow:hidden; animation:winUp .3s cubic-bezier(.22,1,.36,1);
  }
  @keyframes winUp { from{transform:translateY(18px) scale(.97);opacity:0} to{transform:translateY(0) scale(1);opacity:1} }

  .c-head { padding:16px 20px; background:var(--blue); display:flex; align-items:center; gap:12px; flex-shrink:0; }
  .c-head-av { width:42px; height:42px; border-radius:50%; background:rgba(255,255,255,.15); border:2px solid rgba(255,255,255,.25); display:flex; align-items:center; justify-content:center; font-size:1.2rem; flex-shrink:0; }
  .c-head-info { flex:1; min-width:0; }
  .c-head-nm { font-size:.93rem; font-weight:700; color:#fff; }
  .c-head-st { font-size:.68rem; color:rgba(255,255,255,.65); display:flex; align-items:center; gap:5px; margin-top:2px; }
  .c-head-st::before { content:''; width:6px; height:6px; border-radius:50%; background:#4ade80; flex-shrink:0; }
  .c-head-close { background:rgba(255,255,255,.14); border:none; color:#fff; width:30px; height:30px; border-radius:9px; cursor:pointer; display:flex; align-items:center; justify-content:center; font-size:.9rem; transition:background .15s; flex-shrink:0; }
  .c-head-close:hover { background:rgba(255,255,255,.28); }

  .c-disclaimer { background:#fffbeb; border-bottom:1px solid #fde68a; padding:8px 16px; font-size:.69rem; color:#92400e; display:flex; align-items:flex-start; gap:6px; flex-shrink:0; line-height:1.5; }

  .c-msgs { flex:1; overflow-y:auto; padding:16px; display:flex; flex-direction:column; gap:12px; background:var(--off); min-height:200px; }
  .c-msgs::-webkit-scrollbar { width:3px; }
  .c-msgs::-webkit-scrollbar-thumb { background:var(--bdr); }

  .cm { display:flex; gap:8px; align-items:flex-end; }
  .cm.u { flex-direction:row-reverse; }
  .cm-av { width:28px; height:28px; border-radius:50%; background:var(--bluelt); border:1px solid #c7d7f9; display:flex; align-items:center; justify-content:center; font-size:.78rem; flex-shrink:0; }
  .cm-bub { max-width:80%; padding:11px 15px; border-radius:18px; font-size:.83rem; line-height:1.6; }
  .cm.b .cm-bub { background:#fff; border:1px solid var(--bdr); border-bottom-left-radius:5px; color:var(--ink2); box-shadow:0 1px 4px rgba(0,0,0,.04); }
  .cm.u .cm-bub { background:var(--blue); color:#fff; border-bottom-right-radius:5px; }
  .cm-t { font-size:.6rem; color:var(--muted); margin:3px 4px 0; }
  .cm.err .cm-bub { background:#fff1f2; border-color:#fda4af; color:#be123c; }

  .tdots { display:flex; gap:4px; padding:13px 16px; background:#fff; border:1px solid var(--bdr); border-radius:18px; border-bottom-left-radius:5px; width:fit-content; box-shadow:0 1px 4px rgba(0,0,0,.04); }
  .tdots span { width:7px; height:7px; border-radius:50%; background:#c5c5c5; animation:td 1.3s ease-in-out infinite; }
  .tdots span:nth-child(2){animation-delay:.18s} .tdots span:nth-child(3){animation-delay:.36s}
  @keyframes td { 0%,60%,100%{transform:translateY(0);opacity:.5} 30%{transform:translateY(-5px);opacity:1} }

  .c-quick { padding:10px 14px 4px; display:flex; gap:7px; flex-wrap:wrap; background:var(--off); flex-shrink:0; border-top:1px solid var(--bdr); }
  .c-qb { background:#fff; border:1.5px solid var(--bdr); border-radius:999px; padding:6px 13px; font-size:.71rem; font-weight:500; color:var(--ink2); cursor:pointer; font-family:'Sora',sans-serif; transition:all .15s; white-space:nowrap; }
  .c-qb:hover:not(:disabled) { border-color:#c7d7f9; background:var(--bluelt); color:var(--blue); }
  .c-qb:disabled { opacity:.5; cursor:not-allowed; }

  .c-bar { padding:12px 14px; background:#fff; border-top:1px solid var(--bdr); display:flex; gap:9px; align-items:flex-end; flex-shrink:0; }
  .c-ta { flex:1; background:var(--off); border:1.5px solid var(--bdr); border-radius:13px; padding:10px 14px; font-family:'Sora',sans-serif; font-size:.82rem; color:var(--ink); resize:none; min-height:40px; max-height:100px; outline:none; transition:border-color .2s; line-height:1.5; }
  .c-ta:focus { border-color:#93c5fd; background:#fff; }
  .c-ta::placeholder { color:#b8b8b8; }
  .c-ta:disabled { opacity:.6; }
  .c-send { width:40px; height:40px; border-radius:11px; background:var(--blue); border:none; cursor:pointer; display:flex; align-items:center; justify-content:center; flex-shrink:0; transition:background .17s, transform .15s; }
  .c-send:hover:not(:disabled) { background:#1446c5; transform:scale(1.06); }
  .c-send:disabled { background:#93c5fd; cursor:not-allowed; }

  @keyframes fu { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
  .sr { opacity:0; transform:translateY(22px); transition:opacity .65s, transform .65s; }
  .sr.in { opacity:1; transform:translateY(0); }

  @media(max-width:1024px){
    .lp-hero { grid-template-columns:1fr; padding:115px 32px 72px; }
    .hero-vis { display:none; }
    .docs-g { grid-template-columns:repeat(2,1fr); }
    .steps-grid { grid-template-columns:repeat(2,1fr); }
    .step-arr { display:none; }
    .cta-band { grid-template-columns:1fr; padding:48px 36px; }
    .cta-btns { flex-direction:row; }
    .footer-top { grid-template-columns:1fr 1fr; gap:32px; }
  }
  @media(max-width:768px){
    .lp-nav { padding:0 20px; }
    .lp-links { display:none; }
    .lps { padding:66px 20px; }
    .lp-stats { padding:42px 20px; }
    .stats-grid { grid-template-columns:repeat(2,1fr); }
    .testi-g { grid-template-columns:1fr; }
    .docs-g { grid-template-columns:1fr 1fr; }
    .feat-layout { grid-template-columns:1fr; }
    .lp-footer { padding:48px 20px 28px; }
    .footer-top { grid-template-columns:1fr; }
    .cwin { width:calc(100vw - 24px); right:12px; bottom:88px; }
  }
`;

if (!document.getElementById("lpv5")) {
  const s = document.createElement("style");
  s.id = "lpv5"; s.textContent = css;
  document.head.appendChild(s);
}

// ── AI via backend proxy (/api/chat → Spring Boot → Anthropic) ────────────────
const ts = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

// Only sends messages — model + system prompt are handled in AiProxyController.java
async function callMedi(history) {
  const res = await fetch("http://localhost:8080/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages: history }),
  });

  const text = await res.text();
  if (!res.ok) {
    let detail = text;
    try { detail = JSON.parse(text)?.error || text; } catch {}
    throw new Error("Server " + res.status + ": " + detail);
  }

  const data = JSON.parse(text);
  if (Array.isArray(data.content)) {
    const block = data.content.find(b => b.type === "text");
    if (block?.text) return block.text;
  }
  throw new Error("Unexpected response format");
}

const QUICK = [
  "What specialist for headaches?",
  "Symptoms of diabetes",
  "Normal blood pressure?",
  "How to book an appointment?",
  "When to go to emergency?",
  "What is BMI?",
];

function Chatbot() {
  const [open,    setOpen]    = useState(false);
  const [msgs,    setMsgs]    = useState([
    { id: 0, role: "bot", text: "Hi! 👋 I'm Medi, your AI medical assistant. Ask me about symptoms, health conditions, medications, or how to book an appointment on MedVault.", time: ts() },
  ]);
  const [history, setHistory] = useState([]);
  const [val,     setVal]     = useState("");
  const [busy,    setBusy]    = useState(false);
  const [badge,   setBadge]   = useState(1);
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, busy]);
  useEffect(() => { if (open) setBadge(0); }, [open]);

  const send = async (txt) => {
    const text = txt || val.trim();
    if (!text || busy) return;
    setVal("");

    // Add user message to UI
    setMsgs(p => [...p, { id: Date.now(), role: "user", text, time: ts() }]);

    // Build new history for API
    const newHistory = [...history, { role: "user", content: text }];
    setHistory(newHistory);
    setBusy(true);

    try {
      const reply = await callMedi(newHistory);
      setMsgs(p => [...p, { id: Date.now() + 1, role: "bot", text: reply, time: ts() }]);
      setHistory(h => [...h, { role: "assistant", content: reply }]);
    } catch (e) {
      setMsgs(p => [...p, {
        id: Date.now() + 1, role: "err",
        text: "Connection error. Please make sure the MedVault server is running and try again.",
        time: ts(),
      }]);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <button className="cfab" onClick={() => setOpen(o => !o)} aria-label="Chat with Medi">
        {open
          ? <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          : <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
        }
        {!open && badge > 0 && <div className="cfab-bdg">{badge}</div>}
      </button>

      {open && (
        <div className="cwin">
          <div className="c-head">
            <div className="c-head-av">🩺</div>
            <div className="c-head-info">
              <div className="c-head-nm">Medi — AI Medical Assistant</div>
              <div className="c-head-st">Powered by Claude · Online</div>
            </div>
            <button className="c-head-close" onClick={() => setOpen(false)}>✕</button>
          </div>

          <div className="c-disclaimer">
            ⚠️ <span>General guidance only — not a substitute for professional medical advice. Consult a doctor for diagnosis or treatment.</span>
          </div>

          <div className="c-msgs">
            {msgs.map(m => (
              <div key={m.id} className={`cm ${m.role === "user" ? "u" : ""} ${m.role === "err" ? "err" : ""}`}>
                {m.role !== "user" && <div className="cm-av">🩺</div>}
                <div>
                  <div className="cm-bub">{m.text}</div>
                  <div className="cm-t">{m.time}</div>
                </div>
              </div>
            ))}
            {busy && (
              <div className="cm b">
                <div className="cm-av">🩺</div>
                <div className="tdots"><span/><span/><span/></div>
              </div>
            )}
            <div ref={endRef}/>
          </div>

          <div className="c-quick">
            {QUICK.map(q => (
              <button key={q} className="c-qb" onClick={() => send(q)} disabled={busy}>{q}</button>
            ))}
          </div>

          <div className="c-bar">
            <textarea
              className="c-ta"
              placeholder="Ask about symptoms, medications, conditions…"
              rows={1}
              value={val}
              onChange={e => setVal(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
              disabled={busy}
            />
            <button className="c-send" onClick={() => send()} disabled={busy || !val.trim()}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2" fill="#fff" stroke="none"/>
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function LandingPage() {
  const navigate = useNavigate();
  const [stuck, setStuck]     = useState(false);
  const [activeFeat, setFeat] = useState(0);

  useEffect(() => {
    const fn = () => setStuck(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll(".sr");
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: .1 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  const feats = [
    { ico:"🩺", bg:"#eff4ff", nm:"Verified Doctors", ds:"Every doctor is background-checked, licensed, and rated by real patients. Zero compromise on trust.", tags:["BG Verified","Licensed","Patient Rated"] },
    { ico:"📅", bg:"#f0fdfa", nm:"Instant Booking", ds:"Real-time slot availability. Confirm appointments in under 60 seconds — no phone calls needed.", tags:["Real-time","One Click","No Calls"] },
    { ico:"💊", bg:"#fffbeb", nm:"Digital Prescriptions", ds:"Receive, store, and share prescriptions digitally. Access your full medication history anytime.", tags:["Digital","Shareable","Encrypted"] },
    { ico:"📊", bg:"#f5f3ff", nm:"Health Analytics", ds:"Track blood sugar, heart rate, BMI, blood pressure, and more with beautiful interactive trend charts.", tags:["Vitals","Trend Charts","Insights"] },
    { ico:"🔒", bg:"#ecfdf5", nm:"Bank-Grade Security", ds:"End-to-end encryption, HIPAA compliance, and zero third-party data sharing — your health data is yours.", tags:["E2E Encrypted","HIPAA","Private"] },
    { ico:"🤖", bg:"#fff1f2", nm:"AI Medical Assistant", ds:"Medi, powered by Claude AI, answers health questions, explains symptoms, and guides you 24/7.", tags:["Claude AI","Always On","Medical Knowledge"] },
  ];

  const steps = [
    { n:"01", t:"Create Account", d:"Sign up free as a patient in under 60 seconds — no credit card needed." },
    { n:"02", t:"Find a Specialist", d:"Search by specialty, doctor name, location, or real-time availability." },
    { n:"03", t:"Book Instantly", d:"Select your slot and confirm your appointment with a single click." },
    { n:"04", t:"Track Your Health", d:"Access prescriptions, vitals, and your complete health history." },
  ];

  const docs = [
    { av:"👨‍⚕️", nm:"Dr. Arjun Rao", sp:"Cardiologist", exp:"14 yrs", avail:true, r:"4.9" },
    { av:"👩‍⚕️", nm:"Dr. Priya Sharma", sp:"Neurologist", exp:"11 yrs", avail:true, r:"4.8" },
    { av:"🧑‍⚕️", nm:"Dr. Ravi Kumar", sp:"Orthopedist", exp:"9 yrs", avail:false, r:"4.7" },
    { av:"👩‍⚕️", nm:"Dr. Ananya Iyer", sp:"Dermatologist", exp:"7 yrs", avail:true, r:"4.9" },
  ];

  const testis = [
    { q:"\"Booking a cardiologist used to take days. MedVault made it happen in 90 seconds. The AI assistant even helped me understand my symptoms!\"", nm:"Priya Menon", rl:"Patient · Chennai", av:"👩" },
    { q:"\"MedVault saves me 3+ hours every week. The doctor dashboard is the best I've seen and Medi is genuinely helpful.\"", nm:"Dr. Arjun Rao", rl:"Cardiologist · Hyderabad", av:"👨‍⚕️" },
    { q:"\"The AI assistant explained my blood test results before I even saw the doctor. Such a thoughtful feature!\"", nm:"Siddharth K.", rl:"Patient · Bangalore", av:"👨" },
  ];

  const specs = ["❤️ Cardiology","🧠 Neurology","🦴 Orthopedics","👁 Ophthalmology","🌿 Dermatology","👶 Pediatrics","🫁 Pulmonology","🧬 Oncology","🦷 Dentistry","🧘 Psychiatry","🩻 Radiology","🔬 Pathology","🩸 Hematology","🏃 Sports Medicine"];

  return (
    <>
      <nav className={`lp-nav ${stuck?"stuck":""}`}>
        <a href="/" className="lp-logo">
          <div className="lp-logo-icon">🏥</div>
          Med<span className="lp-logo-accent">Vault</span>
        </a>
        <div className="lp-links">
          <a href="#features">Features</a>
          <a href="#how">How it Works</a>
          <a href="#doctors">Doctors</a>
          <a href="#reviews">Reviews</a>
        </div>
        <div className="lp-actions">
          <button className="lb lb-out" onClick={() => navigate("/login")}>Sign In</button>
          <button className="lb lb-fill" onClick={() => navigate("/register")}>Get Started →</button>
        </div>
      </nav>

      <div className="lp-hero">
        <div>
          <div className="hero-pill"><span className="hero-pill-dot"/>Trusted by 50,000+ patients across India</div>
          <h1 className="hero-h">
            See the Right Doctor,<br/>
            <em>Exactly</em> When<br/>
            You Need <span className="ul">Care.</span>
          </h1>
          <p className="hero-p">Book verified specialists instantly, manage prescriptions digitally, track your health with analytics, and get 24/7 AI medical guidance — all in one secure platform.</p>
          <div className="hero-cta">
            <button className="lb lb-fill lb-lg" onClick={() => navigate("/register")}>Start for Free →</button>
            <button className="lb lb-out lb-lg" onClick={() => navigate("/login")}>Sign In</button>
          </div>
          <div className="hero-social">
            <div className="hs-avatars">
              {["👩","👨","👵","👦","👩‍⚕️"].map((e,i) => <div key={i} className="hs-av">{e}</div>)}
            </div>
            <div className="hs-text"><strong>50,000+ patients</strong> booked last month<br/>⭐ 4.9 average rating from verified reviews</div>
          </div>
        </div>
        <div className="hero-vis">
          <div className="fc fc-1">
            <div className="fc-ico" style={{background:"#ecfdf5"}}>✅</div>
            <div><div className="fc-t">Appointment Confirmed</div><div className="fc-s">Dr. Priya · Today 3:00 PM</div></div>
          </div>
          <div className="hero-vis-main">
            <div className="vis-head">
              <span className="vis-title">Available Today</span>
              <div className="live-tag"><div className="live-dot"/>Live</div>
            </div>
            {docs.map((d,i) => (
              <div className="vis-doc" key={i}>
                <div className="vis-doc-ico" style={{background:["#eff4ff","#f0fdfa","#fffbeb","#fff1f2"][i]}}>{d.av}</div>
                <div><div className="vis-doc-nm">{d.nm}</div><div className="vis-doc-sp">{d.sp} · {d.exp}</div></div>
                <div className={`vis-pill ${d.avail?"vp-g":"vp-a"}`}>{d.avail?"Available":"3 slots"}</div>
              </div>
            ))}
          </div>
          <div className="fc fc-2">
            <div className="fc-ico" style={{background:"#f5f3ff"}}>🤖</div>
            <div><div className="fc-t">AI Assistant Active</div><div className="fc-s">Medi · Powered by Claude</div></div>
          </div>
        </div>
      </div>

      <div className="lp-stats">
        <div className="stats-grid">
          {[{n:"500",s:"+",l:"Verified Doctors"},{n:"50K",s:"+",l:"Happy Patients"},{n:"30",s:"+",l:"Specializations"},{n:"4.9",s:"★",l:"Average Rating"}].map((x,i) => (
            <div key={i} className="stt sr" style={{transitionDelay:`${i*.08}s`}}>
              <div className="stt-n">{x.n}<span>{x.s}</span></div>
              <div className="stt-l">{x.l}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mq-wrap">
        <div className="mq-track">
          {[...specs,...specs].map((s,i) => <div key={i} className="mq-chip">{s}</div>)}
        </div>
      </div>

      <section id="features">
        <div className="lps">
          <div className="sr">
            <div className="sk">Why MedVault</div>
            <h2 className="st">Every tool you need for<br/><em>smarter healthcare</em></h2>
            <p className="sb">A complete ecosystem built around your health — intuitive, secure, and built for real people.</p>
          </div>
          <div className="feat-layout">
            <div className="feat-list">
              {feats.map((f,i) => (
                <div key={i} className={`feat-row sr ${activeFeat===i?"on":""}`} style={{transitionDelay:`${i*.055}s`}} onMouseEnter={() => setFeat(i)}>
                  <div className="feat-ico" style={{background:f.bg}}>{f.ico}</div>
                  <div><div className="feat-nm">{f.nm}</div><div className="feat-ds">{f.ds}</div></div>
                </div>
              ))}
            </div>
            <div className="feat-preview sr">
              <div className="fp-emo">{feats[activeFeat].ico}</div>
              <div className="fp-title">{feats[activeFeat].nm}</div>
              <div className="fp-text">{feats[activeFeat].ds}</div>
              <div className="fp-tags">{feats[activeFeat].tags.map(t => <span key={t} className="fp-tag">{t}</span>)}</div>
            </div>
          </div>
        </div>
      </section>

      <section id="how" className="lps-bg">
        <div className="lps">
          <div className="sr" style={{textAlign:"center"}}>
            <div className="sk" style={{justifyContent:"center"}}>Process</div>
            <h2 className="st" style={{textAlign:"center"}}>Four steps to <em>better care</em></h2>
          </div>
          <div className="steps-grid">
            {steps.map((s,i) => (
              <div key={i} className="step-c sr" style={{transitionDelay:`${i*.08}s`}}>
                {i < steps.length-1 && <div className="step-arr"/>}
                <div className="step-badge">{s.n}</div>
                <div className="step-ttl">{s.t}</div>
                <div className="step-dsc">{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="doctors">
        <div className="lps">
          <div className="sr">
            <div className="sk">Our Specialists</div>
            <h2 className="st">Meet some of our<br/><em>top doctors</em></h2>
            <p className="sb">Every doctor is verified, licensed, and reviewed by real patients.</p>
          </div>
          <div className="docs-g">
            {docs.map((d,i) => (
              <div key={i} className="doc-c sr" style={{transitionDelay:`${i*.07}s`}}>
                <span className="doc-c-av">{d.av}</span>
                <div className="doc-c-nm">{d.nm}</div>
                <div className="doc-c-sp">{d.sp}</div>
                <div className={`doc-c-chip ${d.avail?"chip-g":"chip-a"}`}>{d.avail?"✓ Available Today":"Limited Slots"}</div>
                <div className="doc-c-r">⭐ {d.r} · {d.exp} experience</div>
              </div>
            ))}
          </div>
          <div style={{textAlign:"center",marginTop:36}}>
            <button className="lb lb-fill lb-lg" onClick={() => navigate("/register")}>View All 500+ Doctors →</button>
          </div>
        </div>
      </section>

      <section id="reviews" className="lps-bg">
        <div className="lps">
          <div className="sr">
            <div className="sk">Reviews</div>
            <h2 className="st">Loved by patients<br/>& <em>doctors alike</em></h2>
          </div>
          <div className="testi-g">
            {testis.map((t,i) => (
              <div key={i} className="testi-c sr" style={{transitionDelay:`${i*.08}s`}}>
                <div className="testi-stars">⭐⭐⭐⭐⭐</div>
                <div className="testi-q">{t.q}</div>
                <div className="testi-au">
                  <div className="testi-ava">{t.av}</div>
                  <div><div className="testi-nm">{t.nm}</div><div className="testi-rl">{t.rl}</div></div>
                  <div className="testi-bdg">Verified</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="lps">
          <div className="cta-band sr">
            <div>
              <p style={{fontSize:".68rem",textTransform:"uppercase",letterSpacing:"2px",color:"rgba(255,255,255,.38)",fontWeight:700,marginBottom:13}}>Start Today — It's Free</p>
              <h2 className="cta-h">Ready to take control<br/>of <em>your health?</em></h2>
              <p className="cta-p">Join 50,000+ patients who trust MedVault for smarter, faster, safer healthcare.</p>
            </div>
            <div className="cta-btns">
              <button className="lb-white" onClick={() => navigate("/register")}>Create Free Account →</button>
              <button className="lb-wout" onClick={() => navigate("/login")}>Sign In to Dashboard</button>
            </div>
          </div>
        </div>
      </section>

      <footer className="lp-footer">
        <div className="footer-g">
          <div className="footer-top">
            <div>
              <div className="f-logo">Med<span>Vault</span></div>
              <div className="f-tag">India's most trusted doctor appointment platform. Secure, beautiful, and built for your health.</div>
            </div>
            <div className="f-col"><h4>Platform</h4><a href="#features">Features</a><a href="#how">How it Works</a><a href="#doctors">Doctors</a><a href="#reviews">Reviews</a></div>
            <div className="f-col"><h4>Account</h4><a href="/login">Patient Login</a><a href="/register">Register Free</a><a href="/doctor">Doctor Portal</a><a href="/admin">Admin</a></div>
            <div className="f-col"><h4>Support</h4><a href="#">Help Center</a><a href="#">Privacy Policy</a><a href="#">Terms of Use</a><a href="#">Contact Us</a></div>
          </div>
          <div className="f-btm">
            <span>© 2026 MedVault. All rights reserved.</span>
            <span>Made with ❤️ for better healthcare in India</span>
          </div>
        </div>
      </footer>

      <Chatbot/>
    </>
  );
}