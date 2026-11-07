# ZAEEMNASIR — Immersive 3D Personal Website (AI Edition)

A premium responsive 3D portfolio website for Mohammad Zaeem Nasir, upgraded with his original photograph, direct WhatsApp contact, a guided AI-style concierge, compatible-browser voice interaction, and optional real live AI + Twilio inbound call functions.

## Start here

1. Open `index.html` in your browser to preview the site, or run `python -m http.server 8000` and visit `http://localhost:8000`.
2. Photos, 3D planet, services, navigation, WhatsApp links, normal phone call link and guided chat all work without configuring any API.
3. **For live model-powered chat and model-powered browser voice replies**, deploy the complete folder (including `/api`) on Vercel and configure `OPENAI_API_KEY` server-side.
4. **For actual inbound AI phone calls**, set up a separate Twilio voice-capable number and connect its webhook. The existing `+92 327 2746626` is a direct personal phone/WhatsApp link; the project does **not** automatically connect an AI agent to that number.
5. See **`AI_SETUP_GUIDE.md`** for complete setup and security instructions.

## Website features
- Premium cinematic hero with native WebGL planet and responsive CSS fallback
- Original user-supplied portrait visible in the hero, About section, and concierge widget
- All 12 service areas with filters and detail modals
- WhatsApp chat CTA: `https://wa.me/923272746626`
- Direct dial CTA: `tel:+923272746626`
- Guided service concierge usable on any static website
- Optional real AI chat via serverless `/api/chat` (OpenAI API key required)
- Browser microphone/speech output option where supported and permitted
- Optional inbound Twilio webhook sample for an AI voice answering agent
- Email composer contact form that opens a draft in the visitor's own email app
- Downloadable CV, favicon, SEO metadata, keyboard accessible navigation

## Files

- `index.html`, `styles.css`, `app.js` — main website
- `assistant.js` — concierge, service knowledge fallback, browser voice integration
- `api/` — serverless AI/chat and optional Twilio phone-call functions
- `.env.example` — **template only**, never put real secrets in it
- `AI_SETUP_GUIDE.md` — detailed deployment instructions
- `assets/zaeem-nasir.webp` — user-supplied photo optimized for the web
- `assets/Zaeem-Nasir-Premium-CV.pdf` — professional CV

The website source is editable. No npm dependencies are required for static mode. Live API calls may incur external service charges. Do not advertise a live AI phone line before it is deployed and tested.
