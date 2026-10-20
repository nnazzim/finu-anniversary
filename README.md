# FINU ❤️ — OUR STORY, OUR FOREVER
### Happy 7th Love Anniversary | 21 October 2019 — 21 October 2026
**For Hafna Sherin (Finu) from Mohammed Nasim (her Kaakooka)**

---

A cinematic, deeply emotional, and interactive love anniversary experience celebrating the true story of how a little boy proposed in 2nd standard, a girl said "YES" in 8th standard on October 21, 2019, and seven years of choosing each other every single day.

---

## 🌟 Highlights of the Experience

- **Opening Surprise Gate**: Full-screen starry burgundy sky with sequential emotional messages and an interactive glowing envelope seal.
- **Cinematic Hero**: Grand typography celebrating 7 years, emotional quotes, live milestone counters, and pulsing heart animation.
- **Our Unbelievable Beginning (2nd Standard)**: Nostalgic lined notebook paper design with scrapbook tape, school pencil doodles, and childhood proposal memories.
- **The Day Finu Said Yes (21 October 2019)**: Glowing date animation, 8th standard milestone card, and celebratory sparkles.
- **Seven Chapters of Our Love**: Vertical glowing timeline tracing their journey from childhood innocence to forever.
- **Finu's Memory Gallery**: 12 Polaroid-style photo cards with scrapbook tape, full-screen lightbox modal with keyboard navigation (`←`, `→`, `Esc`), and graceful fallback cards (no broken image icons ever).
- **A Letter From Your Kaakooka**: Interactive 3D wax-sealed envelope that unfolds with a typewriter effect and instant-read options.
- **Why I Love My Finu (7 Reasons)**: Glowing cards with romantic icons, reasons, and an interactive "Send Love" counter.
- **Cute Love Quiz**: 3 questions about their story with playful, affectionate answers and a grand celebratory fireworks confetti finale.
- **Secret Whisper Heart**: Discreet floating heart button that reveals an intimate secret love note.
- **Final Cinematic Surprise**: Step-by-step romantic scene, golden typography climax, secret promise reveal, and a smooth replay control.
- **Ambient Romantic Music**: Optional play/pause audio player supporting custom MP3 (`public/audio/our-song.mp3`) with an automatic built-in romantic music box synthesizer fallback.

---

## 🚀 1. How to Run the Project

The project is located at:
```bash
/Users/mohammednazim/.gemini/antigravity/scratch/finu-anniversary
```

### Quick Start:
From your terminal:
```bash
cd /Users/mohammednazim/.gemini/antigravity/scratch/finu-anniversary
npm run dev
```

Open your browser at:
👉 **[http://localhost:5173](http://localhost:5173)**

The local development server is already running live for you in the background!

To create a production build:
```bash
npm run build
```

---

## ✏️ 2. How to Edit Names and Anniversary Content

All texts, dates, quotes, milestones, and questions are centralized in one single file:

📁 **`src/data/anniversaryContent.ts`**

Open this file in your editor to customize:
- `couples`: Names ("Mohammed Nasim", "Hafna Sherin"), nicknames ("Kaakooka", "Finu"), dates ("21 October 2019", "21 October 2026").
- `hero`: Taglines, subtitle, milestone statistics.
- `beginning`: 2nd standard story text and childhood quote.
- `theYesDay`: 8th standard story text and milestone card.
- `chapters`: The 7 vertical timeline chapters, titles, descriptions, and dates.
- `gallery`: Captions and dates for each of the 12 memory photo slots.
- `letter`: The full letter paragraphs, salutation, and signature.
- `whyILoveFinu`: The 7 reasons why you love Finu.
- `quiz`: Questions, options, and affectionate responses.
- `secretMessage`: The whispered note in the floating heart.
- `finalSurprise`: Grand finale text and your secret promise.

---

## 📸 3. How to Add Photographs to `public/images/`

The gallery already includes 12 graceful, warm placeholder cards so the site works immediately without any missing or broken images.

To display your real photos with Finu:
1. Place your pictures into:
   ```
   public/images/
   ```
2. Name them:
   - `memory-01.jpg`
   - `memory-02.jpg`
   - `memory-03.jpg`
   - `memory-04.jpg`
   - `memory-05.jpg`
   - `memory-06.jpg`
   - `memory-07.jpg`
   - `memory-08.jpg`
   - `memory-09.jpg`
   - `memory-10.jpg`
   - `memory-11.jpg`
   - `memory-12.jpg`

3. The website will immediately display them in Polaroid frames! You can also adjust captions in `src/data/anniversaryContent.ts`.

---

## 💌 4. How to Customize the Letter & Secret Message

- **Love Letter**: In `src/data/anniversaryContent.ts`, look for `letter: { ... }`. You can edit each paragraph, change the salutation, or add more personal lines.
- **Secret Whisper**: Look for `secretMessage: { ... }` in the same file to customize what Finu sees when clicking the floating heart button.
- **One Last Secret Promise**: Look for `finalSurprise.secretPromiseText` to write your personal vow for the 7th anniversary.

---

## 🎵 5. How to Add Background Music

The website features an optional, non-intrusive music player in the bottom-left corner.
- Finu can tap **"Play Our Music"** whenever she is ready.
- **Built-in Fallback**: By default, it plays an ambient romantic music-box lullaby chime using the Web Audio API without needing external files!
- **Your Own Song**: To play your special couple song:
  1. Save your MP3 file as:
     ```
     public/audio/our-song.mp3
     ```
  2. The player will automatically detect and stream your MP3 file instead!

---

## 🌐 6. How to Deploy (Vercel / Netlify / GitHub Pages)

Deploying this website online makes it accessible from Finu's phone, iPad, or laptop anywhere!

### Option A: Deploy to Vercel (Recommended — Free & 2 Minutes)
1. Push this folder to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Happy 7th Anniversary Finu ❤️"
   # Create a repo on github.com, then:
   git remote add origin https://github.com/YOUR_USERNAME/finu-anniversary.git
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Click **Deploy**. Vercel will detect Vite automatically and generate a live link (e.g. `https://finu-forever.vercel.app`)!

### Option B: Deploy to Netlify (Drag & Drop)
1. Run `npm run build` in the project directory. This creates a `dist/` folder.
2. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
3. Drag and drop the `dist/` folder into the Netlify window.
4. Your site will instantly go live with a custom URL!

---

## 🎁 7. How to Share the Link with Finu

1. Once deployed, test the live link on your phone to make sure it loads smoothly.
2. Send her the link with a sweet message on October 21st:
   > *"Hey Finu... ❤️ I made a little world for you to celebrate our 7th anniversary. Open this when you have a quiet moment: [YOUR_LINK]"*
3. Remind her to turn on sound and click **"Open Your Surprise, Finu 💌"** for the full experience.

---

### Made with eternal love by Mohammed Nasim (Kaakooka) for Hafna Sherin (Finu) ❤️
