# ZAEEMNASIR — WhatsApp-first 3D portfolio (updated)

## Changes in this version
- **Start a conversation** opens WhatsApp for **+92 327 2746626** with a prewritten project message.
- **Let's talk about this world** opens WhatsApp with the selected service name prewritten (all 12 worlds).
- The top navigation **Let's talk** and **Let's build something custom** now also open WhatsApp.
- Personal photo areas are removed from the website. The About section uses an atmospheric, animated design rather than a portrait.
- The **Ask Zaeem AI** launcher and open AI chat panel no longer have any photo or circular avatar/monogram area.
- The **Call Zaeem** phone card and phone shortcut remain removed.
- WhatsApp, email contact, guided chat assistant, browser voice interaction, and the 3D worlds remain.
- Asset references include `?v=4` for easier cache refresh after upload.

## Publish
Extract this ZIP, then upload **all files and folders** into the folder serving your website (usually `public_html` in Hostinger). Replace the site's old `index.html`, `app.js`, `assistant.js`, and `styles.css`. Do not upload only the ZIP without extracting unless your host's file manager extracts it. Then hard-refresh your browser with Ctrl+F5.

## Notes
The WhatsApp links start a conversation; they do not send messages automatically. The chatbot uses local guided answers until a backend AI provider is configured. Browser voice controls depend on browser permissions/support. Phone-call automation is not active by default.

# ZAEEMNASIR — 3D website (no photo and no Call Zaeem card)

This revision removes the homepage portrait identity card, About portrait panel, assistant photos, the Contact-page “Call Zaeem” card, and the in-chat “Call Zaeem” shortcut. The layout reflows automatically, without photo or avatar placeholders. WhatsApp, email, guided chatbot, voice chat, the interactive worlds and 3D visual remain.

**Deployment:** Upload/extract all files from this ZIP to the website root, replacing previous `index.html`, `styles.css`, and `assistant.js`. If a CDN is enabled, purge cache; then hard refresh (Ctrl+F5). For static hosting, the AI chatbot remains in guided mode until backend setup.

# ZAEEMNASIR — Immersive 3D Personal Website (AI Edition)

A premium responsive 3D portfolio website for Mohammad Zaeem Nasir, with portrait-free branding, direct WhatsApp contact, a guided AI-style concierge, compatible-browser voice interaction, and optional real live AI + Twilio inbound call functions.

## Start here

1. Open `index.html` in your browser to preview the site, or run `python -m http.server 8000` and visit `http://localhost:8000`.
2. The 3D planet, services, navigation, WhatsApp links and guided chat all work without configuring any API.
3. **For live model-powered chat and model-powered browser voice replies**, deploy the complete folder (including `/api`) on Vercel and configure `OPENAI_API_KEY` server-side.
4. **For actual inbound AI phone calls**, set up a separate Twilio voice-capable number and connect its webhook. The existing `+92 327 2746626` is a direct WhatsApp contact; the project does **not** automatically connect an AI agent to that number.
5. See **`AI_SETUP_GUIDE.md`** for complete setup and security instructions.

## Website features
- Premium cinematic hero with native WebGL planet and responsive CSS fallback
- No portrait/photo sections; initials-based assistant avatar and a spacious About section
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
- No personal photo assets are used by the website
- `assets/Zaeem-Nasir-Premium-CV.pdf` — professional CV

The website source is editable. No npm dependencies are required for static mode. Live API calls may incur external service charges. Do not advertise a live AI phone line before it is deployed and tested.
