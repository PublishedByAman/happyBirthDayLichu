# 💖 Pragyan's Romantic Birthday Website

A custom, interactive birthday website crafted specially for **Pragyan**. It takes her on an emotional, interactive journey through 4 chapters:

1. **Chapter 1: The Grand Welcome (Home Page)**  
   - Couple photo frame with glowing border, gentle floating animations, and starry aura.
   - Text with staggered romantic fade-up animation:
     > *"Your Special Day Is Here… 🎂✨"*  
     > *"A day meant just for you."*  
     > *"So, let me take you on a little journey filled with love, memories, smiles, and surprises. ❤️"*  
     > *"Ready, Birthday Girl? 💕"*
   - Animated **"I'm Ready! Let's Go 💖"** button with pulsing glow that smoothly slides to the next chapter.

2. **Chapter 2: The Magical Birthday Candle & Celebration**  
   - Interactive 3D layered birthday cake with a realistic flickering candle flame and glowing aura.
   - Prompt: *"Make a Wish in Your Heart 🕯️"*
   - Interactive blow button (or tap flame directly) that blows out the candle flame with a rising smoke puff.
   - Celebratory crackers/fireworks bursts, floating colorful balloons that can be clicked and popped, and a pop-out banner:  
     > *"Happy Birthday to you, Pragyan! 🎉🎂💖"*
   - Unlocks the next button: **"Walk Down Memory Lane 📸💕"**.

3. **Chapter 3: 20 Cherished Memories Gallery**  
   - Classy, modern Polaroid-style glass cards featuring 20 memories with hover zoom and romantic rose-gold borders.
   - Interactive Lightbox Modal when tapping any memory:
     - Shows the full picture, memory date tag, and story description.
     - "Loved!" heart reaction button.
     - **← Previous** and **Next →** buttons (plus keyboard arrow support) to easily browse through all 20 memories!
   - Progress bar tracking how many memories she has explored.
   - Floating surprise trigger dock:
     - **💌 (1) Message Envelope Button** with pulsing golden ring and speech bubble hint:  
       > *"You have an unread letter! Check the inbox please... 📬✨"*
     - Clicking this slides to Chapter 4.

4. **Chapter 4: The Sealed Love Letter**  
   - Interactive 3D Love Letter Envelope with a wax seal stamped with **"P ❤️"**.
   - Tapping the seal breaks it open, flips the envelope flap, and unfurls an authentic romantic parchment letter.
   - A ~300-word deeply touching, romantic love letter addressed to Pragyan.
   - **"Shower Love 💖🌸"** button that rains floating hearts and flower petals across the screen.
   - **"Replay From Beginning ↺"** button to experience it all over again.

5. **Romantic Atmosphere Everywhere**  
   - Canvas-driven floating heart particles and sparkling starry sky at 60 FPS.
   - Interactive mouse/finger touch sparkle trail.
   - Romantic ambient music player in the top corner (spinning vinyl record with sound waves, fallback soft synthesizer lullaby + audio file support).

---

## 🚀 How to Open and Preview

1. Open File Explorer to:
   ```
   C:\Users\aman\.gemini\antigravity\scratch\pragyan-birthday-website\
   ```
2. Double-click **`index.html`** in any web browser (Chrome, Edge, Safari, Brave, Firefox).
3. That's it! Everything works immediately with zero extra installation.

---

## 🎨 How to Customize Content (2 Minutes)

All text, photos, 20 memories, and the love letter are kept inside a single, clean file:
👉 **[`memories-data.js`](memories-data.js)**

### 1. Replacing Photos
- **Home Couple Photo**:
  - Put your couple photo inside the `images/` folder as `images/our-photo.jpg`.
  - In `memories-data.js`, update:
    ```javascript
    heroImage: "images/our-photo.jpg",
    ```
- **The 20 Memories Photos**:
  - Put your photos in `images/` (e.g. `images/memory1.jpg`, `images/memory2.jpg`, etc.) or use any web link.
  - In `memories-data.js`, update each memory's `image:` property.

### 2. Customizing Memory Stories
In `memories-data.js`, find any memory item (1 to 20):
```javascript
{
  id: 1,
  title: "The Day We First Met",
  date: "October 14th, 2023",
  image: "images/memory1.jpg",
  description: "Your own sweet personal memory story here..."
}
```

### 3. Customizing the Love Letter
In `memories-data.js`, find the `letter:` section:
```javascript
letter: {
  salutation: "My Dearest Pragyan,",
  paragraphs: [
    "Paragraph 1 ...",
    "Paragraph 2 ...",
    "Paragraph 3 ..."
  ],
  closing: "Forever & Always Yours,",
  signature: "Aman ❤️"
}
```

### 4. Custom Background Music (Optional)
If you have a special romantic song (MP3), place it in the folder as `song.mp3`.
In `index.html` line 232, update:
```html
<source src="song.mp3" type="audio/mpeg">
```

---

## 🌐 How to Send It to Pragyan Online for Free

1. **Option A (Netlify Drop - Easiest & Instant)**:
   - Go to [app.netlify.com/drop](https://app.netlify.com/drop).
   - Drag and drop the `pragyan-birthday-website` folder.
   - You get a live link like `pragyan-birthday.netlify.app` within 10 seconds!

2. **Option B (GitHub Pages)**:
   - Create a free GitHub repository, upload these files, and enable GitHub Pages in Settings.

3. **Option C (Vercel)**:
   - Run `npx vercel` or drag folder into Vercel dashboard.
