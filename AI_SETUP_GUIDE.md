# ZAEEMNASIR · Chat + Voice + WhatsApp setup

## What works immediately
- **Profile images:** All personal photo areas have been removed. The assistant uses a text-only header and launcher, without an avatar.
- **WhatsApp:** All WhatsApp buttons lead to `+92 327 2746626` (`https://wa.me/923272746626`) with a prefilled project message where appropriate. Clicking opens WhatsApp; it does not silently send anything.
- **Phone buttons:** The direct “Call Zaeem” website buttons have been removed as requested. WhatsApp remains available.
- **Guided site chatbot:** Works on a static website, even before API setup. It answers common service/contact queries from a built-in knowledge base. This is a *rule-based guided assistant*, **not** a live language-model chatbot.
- **Browser voice assistant:** On compatible browsers (typically Chrome/Edge) with microphone permission, users can speak a question and hear a spoken reply. In static mode it uses guided answers; with the API configured, it can speak AI-powered responses. Speech recognition may be provided by the browser/vendor, and is not guaranteed to work offline. The site requires HTTPS or localhost for microphone access.

## Enable real AI chat on Vercel
1. Upload the complete project folder to a GitHub repo (do not commit actual API keys). Import it into Vercel as a static/Other project; the root folder must contain `index.html` and `api/`.
2. In Vercel Project → Settings → Environment Variables, add `OPENAI_API_KEY` using your own key. You can optionally set `OPENAI_MODEL`, e.g. `gpt-4o-mini` (or a model accessible to your account).
3. Deploy/redeploy. Verify `https://your-domain.com/api/status` responds with `"liveAI":true`. The frontend then switches automatically to live AI replies. Your secret key remains server-side; never insert it into `index.html` or `assistant.js`.
4. Add bot protection, distributed rate limiting, logs and spending limits before running advertising traffic. A basic in-instance limit is included but is insufficient on its own for large public deployments.

**If hosted as plain HTML in Hostinger `public_html`**: WhatsApp, guided chatbot and compatible browser voice work. `/api/chat` and the Twilio functions **will not run** without a Node/Vercel-compatible backend. Deploy those endpoints elsewhere and configure routing if you want live AI.

## Enable an actual phone-call AI agent (optional, not active yet)
The website includes example Twilio inbound voice webhooks: `/api/twilio/voice` and `/api/twilio/respond`. They use Twilio speech recognition + speech synthesis with AI responses and a short follow-up loop. For real telephone calls:
1. Obtain and configure a **Twilio Voice-capable number** in a supported region. Twilio availability, verification and costs depend on your account/country. A Twilio number is **not** the same as your WhatsApp/mobile number. Connecting an existing number requires eligible porting or call forwarding through the carrier; neither is done by this project.
2. Set `TWILIO_AUTH_TOKEN` and `TWILIO_WEBHOOK_BASE_URL=https://your-domain.com` as server environment variables (along with `OPENAI_API_KEY` for genuine AI replies). Keep them private.
3. In your Twilio number settings, set **A call comes in** → **Webhook** → `https://your-domain.com/api/twilio/voice` with **HTTP POST**. Twilio sends speech results to `/api/twilio/respond`.
4. Place a test call to your assigned Twilio number. If successful, you can optionally publish that distinct agent number on the site. Do not advertise an AI phone line until configured and tested.
5. Review local laws and provider policies on recording, disclosures, consent, personal data and AI calling. The agent discloses it is an AI. This starter does **not** record calls or create outbound campaigns.

**Important:** The included phone webhook implements a simple spoken question-and-answer loop, not a real-time low-latency duplex speech experience or appointment-booking integration. For advanced live agents, integrate a dedicated real-time voice provider, phone number and secure backend.

## Security & privacy notes
- Don't commit `.env`, API keys, or your Twilio auth token. The `.env.example` is a template only.
- Chat history exists in the visitor's current browser session and is sent to the AI provider only if live mode is enabled; no database, account login or CRM is set up.
- Visitors should avoid sensitive information. Browser voice input may be processed by its recognition provider. Inbound phone-audio processing depends on Twilio and the model provider.
- Test all buttons after deployment. The contact form still opens an email draft rather than sending/submitting directly.
