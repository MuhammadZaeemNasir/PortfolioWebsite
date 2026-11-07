'use strict';
/* ZAEEMNASIR concierge. Guided local knowledge mode works without a backend.
 * With OPENAI_API_KEY on Vercel, /api/chat enables model-powered replies.
 * Browser voice uses speech recognition and speech synthesis when available.
 */
(() => {
  const panel = document.getElementById('assistant-panel');
  const trigger = document.getElementById('assistant-launcher');
  const close = document.getElementById('assistant-close');
  const form = document.getElementById('assistant-form');
  const input = document.getElementById('assistant-input');
  const messages = document.getElementById('assistant-messages');
  const voice = document.getElementById('assistant-voice');
  const voiceLabel = document.getElementById('assistant-voice-label');
  const status = document.getElementById('agent-mode-label');
  const privacy = document.getElementById('assistant-privacy');
  const sendButton = form.querySelector('button[type="submit"]');
  const Recognizer = window.SpeechRecognition || window.webkitSpeechRecognition;
  let liveAI = false;
  let busy = false;
  let speaking = false;
  let recognizing = false;
  let recognition = null;
  let voicePrompt = false;
  const history = [];
  const whatsapp = 'https://wa.me/923272746626?text=';

  function appendMessage(text, who='bot', hint='') {
    const wrap = document.createElement('div');
    wrap.className = `assistant-message ${who}`;
    const bubble = document.createElement('span');
    bubble.className = 'assistant-bubble';
    bubble.textContent = text;
    wrap.appendChild(bubble);
    if (hint) {
      const small = document.createElement('small');
      small.textContent = hint;
      wrap.appendChild(small);
    }
    messages.appendChild(wrap);
    messages.scrollTop = messages.scrollHeight;
    return wrap;
  }

  const categories = [
    { match: /graphic|design|logo|brand|illustrat|canva|banner|poster|thumbnail/, name: 'Graphics & Design', help: 'Logos, identity systems, thumbnails, advertisements, banners, illustrations and brand assets.' },
    { match: /website|wordpress|shopify|web |landing|code|program|develop|tech|html|java|python/, name: 'Programming & Tech', help: 'Responsive websites, WordPress, Elementor, landing pages and AI-assisted development.' },
    { match: /automat|bot|artificial|prompt|ai | ai|workflow|agent/, name: 'AI Services', help: 'AI assistants, content creation, prompt engineering, research and workflow automation.' },
    { match: /seo|marketing|social media|advertis|keyword|campaign|growth/, name: 'Digital Marketing', help: 'Keyword research, SEO, content calendars, campaign creatives and online visibility.' },
    { match: /video|reel|short|animat|youtube|tiktok|caption|subtitle/, name: 'Video & Animation', help: 'Reels, Shorts, AI videos, explainers, subtitles and promotional editing.' },
    { match: /writ|content|article|blog|translat|copywrit|description|script/, name: 'Writing & Translation', help: 'Blogs, website copy, scripts, product descriptions, proofreading and translation review.' },
    { match: /music|audio|voice|podcast|sound/, name: 'Music & Audio', help: 'Voice cleanup, audio enhancement, transcription and podcast editing.' },
    { match: /business|virtual assist|document|pdf|presentation|admin|research/, name: 'Business Services', help: 'Virtual assistance, research, document creation and operational workflows.' },
    { match: /financ|budget|invoice|account|expense|revenue/, name: 'Finance Support', help: 'Budget spreadsheets, invoices, expense tracking and financial document preparation; not regulated financial advice.' },
    { match: /career|cv|resume|study|habit|learning|personal growth/, name: 'Personal Growth', help: 'CVs, cover letters, study materials, productivity tools and portfolios.' },
    { match: /consult|strategy|advice|planning/, name: 'Consulting Support', help: 'AI tool research, workflow mapping, website feedback and planning support.' },
    { match: /data|excel|sheet|photo|retouch|background removal/, name: 'Data & Photography', help: 'Spreadsheets, dashboards, data cleanup and image editing.' }
  ];

  function guidedReply(question) {
    const q = question.toLowerCase().trim();
    if (/^(hi|hello|hey|salam|assalam)/.test(q)) return 'Welcome! I can guide you through Zaeem’s 12 service worlds, help shape your project brief, or connect you directly on WhatsApp. What are you looking to create?';
    if (/price|cost|quote|budget|rate|fee|charge|how much|package/.test(q)) return 'Every project is scoped individually. Please share the service you need, a short brief, your deadline, and any budget range. Zaeem can discuss an accurate quote on WhatsApp: +92 327 2746626.';
    if (/whatsapp|contact|phone|number|call|talk to (him|zaeem)|email/.test(q)) return 'Contact Zaeem on WhatsApp at +92 327 2746626, call the same number, or email mohammadzaeemnasir@gmail.com. For an instant message, use the green WhatsApp button.';
    if (/all services|what services|offer|everything|categories|portfolio|capabilit/.test(q)) return 'The 12 service worlds are: Graphics & Design, Programming & Tech, AI Services, Digital Marketing, Video & Animation, Writing & Translation, Music & Audio, Business, Finance Support, Personal Growth, Consulting Support, and Data & Photography. Which would you like to explore?';
    const match = categories.find(c => c.match.test(q));
    if (match) return `${match.name}: ${match.help} What outcome do you need, and when would you like the project delivered? I can help you prepare a clear message for Zaeem.`;
    if (/time|deadline|urgent|deliver|available/.test(q)) return 'Delivery time depends on the scope. Tell me what you need and your preferred deadline, and Zaeem can confirm availability directly on WhatsApp.';
    return 'That sounds interesting. Tell me your project goal, the type of deliverable you want, and your preferred deadline. I can guide you through the suitable service area or help you contact Zaeem on WhatsApp.';
  }

  async function updateMode() {
    if (window.location.protocol === 'file:') {
      status.textContent = 'Guided assistant · Browser demo';
      privacy.textContent = 'Guided answers run locally. Voice uses your browser.';
      return;
    }
    try {
      const response = await fetch('/api/status', { method: 'GET', cache: 'no-store', signal: AbortSignal.timeout(5000) });
      if (!response.ok) throw Error('unavailable');
      const info = await response.json();
      liveAI = Boolean(info.liveAI);
    } catch { liveAI = false; }
    status.textContent = liveAI ? 'Live AI concierge · Ready to chat' : 'Guided service assistant · Instant answers';
    privacy.textContent = liveAI ? 'AI messages are processed by a provider. Avoid sensitive data.' : 'Guided replies run locally. Live AI requires setup.';
  }

  function setOpen(open) {
    panel.hidden = !open;
    trigger.setAttribute('aria-expanded', String(open));
    if (open) { input.focus({ preventScroll: true }); messages.scrollTop = messages.scrollHeight; }
    else { stopVoice(); trigger.focus({ preventScroll: true }); }
  }
  trigger.addEventListener('click', () => setOpen(panel.hidden));
  close.addEventListener('click', () => setOpen(false));
  document.querySelectorAll('[data-open-agent]').forEach(el => el.addEventListener('click', () => setOpen(true)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !panel.hidden) setOpen(false); });
  document.querySelectorAll('[data-ask]').forEach(button => button.addEventListener('click', () => sendMessage(button.dataset.ask)));

  async function sendMessage(raw, readAloud=false) {
    const question = String(raw || '').trim().slice(0,500);
    if (!question || busy) return;
    input.value = '';
    appendMessage(question, 'user', 'You');
    const nextHistory = [...history.slice(-8), { role: 'user', content: question }];
    busy = true;
    sendButton.disabled = true;
    let reply = '';
    let source = 'Guided assistant';
    try {
      if (liveAI) {
        const res = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: nextHistory }), signal: AbortSignal.timeout(22000) });
        if (!res.ok) throw new Error('Live AI unavailable');
        const data = await res.json();
        if (!data.reply || typeof data.reply !== 'string') throw Error('Invalid reply');
        reply = data.reply.slice(0,1200);
        source = 'AI concierge';
      } else {
        reply = guidedReply(question);
      }
    } catch {
      reply = guidedReply(question);
      source = 'Guided fallback · AI currently unavailable';
    } finally {
      busy = false;
      sendButton.disabled = false;
    }
    history.push({ role: 'user', content: question }, { role: 'assistant', content: reply });
    while (history.length > 10) history.shift();
    appendMessage(reply, 'bot', source);
    if (readAloud) speak(reply);
  }

  form.addEventListener('submit', e => { e.preventDefault(); sendMessage(input.value); });

  function speak(text) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US'; utterance.rate = 1.01; utterance.pitch = 1.02;
    utterance.onstart = () => { speaking = true; };
    utterance.onend = () => { speaking = false; };
    utterance.onerror = () => { speaking = false; };
    window.speechSynthesis.speak(utterance);
  }

  function stopVoice() {
    if (recognition) { try { recognition.abort(); } catch {} }
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    voicePrompt = false; recognizing = false; speaking = false;
    voice.classList.remove('listening');
    voice.setAttribute('aria-pressed', 'false');
    voiceLabel.textContent = 'Talk to voice agent';
  }
  voice.addEventListener('click', () => {
    if (recognizing) { stopVoice(); return; }
    if (!Recognizer) {
      appendMessage('Microphone speech recognition is not available in this browser. You can still type your question here, or call Zaeem using the phone link.', 'bot', 'Browser voice compatibility');
      return;
    }
    if (busy) return;
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    recognition = new Recognizer();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.continuous = false;
    recognizing = true;
    voicePrompt = true;
    voice.classList.add('listening');
    voice.setAttribute('aria-pressed','true');
    voiceLabel.textContent = 'Listening · Tap to stop';
    recognition.onresult = event => {
      const heard = event.results?.[0]?.[0]?.transcript || '';
      if (heard) { voicePrompt = false; sendMessage(heard, true); }
    };
    recognition.onerror = event => {
      if (event.error !== 'aborted') appendMessage('I could not hear your question. Allow microphone permission and try again, or use text chat.', 'bot', 'Voice agent');
    };
    recognition.onend = () => {
      recognizing = false;
      voice.classList.remove('listening');
      voice.setAttribute('aria-pressed', 'false');
      voiceLabel.textContent = 'Talk to voice agent';
      voicePrompt = false;
    };
    try { recognition.start(); }
    catch { stopVoice(); appendMessage('Your browser could not start the microphone. Try another browser or use text chat.', 'bot'); }
  });
  updateMode();
})();
