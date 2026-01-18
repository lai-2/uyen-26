# 💖 Birthday Love Website – Instruction for Claude Code

You are an expert front-end engineer and UI/UX designer.
Your task is to build a **romantic birthday website** for my girlfriend using **pure HTML, CSS, and JavaScript**.

## 🎯 Overall Requirements
- Single-page website
- No backend
- No framework (no React/Vue)
- Everything should work by just opening `index.html`, seprate css and js file.
- Clean, romantic, soft color palette,
- Responsive (works on desktop & mobile)
- Use semantic HTML
- Add subtle animations (CSS + JS)
- Code should be **well-structured and commented**

---

## 🧱 Page Structure (Sections)

### 1️⃣ Hero Section – Birthday Opening
- Fullscreen hero section
- Text:
  **"Happy Birthday, My Love 🎂"**
- Sub text: a short romantic line (placeholder text)
- Background:
  - Soft gradient or pastel background
  - Optional floating hearts / sparkles animation
- A button:
  **"Scroll down 💕"** (smooth scroll)

---

### 2️⃣ Handwritten Letter Section ✍️
A romantic handwritten-style letter.

**Requirements:**
- Looks like a handwritten love letter
- Font:
  - Use Google Fonts such as:
    - `Dancing Script`
    - `Pacifico`
    - or `Caveat`
- Style:
  - Light paper texture background
  - Slight rotation or shadow like real paper
  - Warm colors (beige, cream, light pink)
- Content:
  - Placeholder text for birthday wishes
  - Line breaks like a real letter
  - Signature at the end (e.g. “Yours, … ❤️”)

---

### 3️⃣ Memory Lane – Photo Carousel 📸
A carousel showing our photos together.

**Requirements:**
- Horizontal image carousel
- Buttons: ⬅️ ➡️
- Optional dots indicator
- Smooth sliding animation
- Works with mouse and touch
- Image paths should be placeholders like:
  ```html
  images/photo1.jpg
  images/photo2.jpg
  ````

* Add a romantic title:
  **"Our Memories Together 💞"**

---

### 4️⃣ Timeline / Love Story Section 💌

A romantic timeline of our relationship.

**Ideas:**

* First time we met
* First date
* First trip together
* Today – Her birthday

**Requirements:**

* Vertical timeline
* Each milestone has:

  * Date
  * Short description
  * Small heart or icon
* Subtle fade-in animation on scroll

---

### 5️⃣ Reasons I Love You Section ❤️

Cute and emotional section.

**Requirements:**

* Grid or card layout
* Each card contains:

  * A short reason
  * Emoji or heart icon
* Hover animation (slight scale / glow)
* Title:
  **"Reasons I Love You 💖"**

---

### 6️⃣ Fun Interaction – Love Question 😘

This is the playful part.

**Text:**

> "Do you love me? 🥺👉👈"

**Buttons:**

* ✅ YES
* ❌ NO

**Important Behavior:**

* YES button:

  * Clickable
  * On click:

    * Show a sweet message
    * Optional confetti / hearts animation
* NO button:

  * Impossible to click
  * When user moves mouse close to it:

    * Button jumps to another random position
  * Should stay inside viewport
  * Smooth movement animation
  * Works on both desktop & mobile

---

### 7️⃣ Final Romantic Section 🌙

Closing section with emotional impact.

**Ideas:**

* A final message:

  > "No matter how old you get, I’ll always love you."
* Soft background (night sky / stars / moon)
* Slow floating animation
* Optional background music (autoplay disabled, user must click play)

---

## 🎨 Design Guidelines

* Color palette:

  * Pink, rose, lavender, beige, white
* Avoid harsh colors
* Use lots of spacing (romantic & elegant)
* Rounded corners
* Soft shadows
* Smooth transitions everywhere

---

## 🧠 JavaScript Requirements

* Smooth scrolling
* Carousel logic
* Button “NO” avoidance logic
* Scroll-based animations (IntersectionObserver preferred)
* Code must be readable and commented

---

## 📁 Project Structure

```text
/
├── index.html
├── style.css
├── script.js
└── images/
```

---

## ✅ Output Expectations

* Provide full code for:

  * `index.html`
  * `style.css`
  * `script.js`
* Do NOT explain concepts
* Do NOT include unnecessary libraries
* Make it romantic, playful, and memorable ❤️

This website is a birthday gift, so prioritize **emotion and user experience** over technical complexity.

### 💯 Extra Interactive Section – Love Meter

Create a playful and cute interactive section called **"Love Meter"**.

**Concept:**
This section pretends to measure how much the girlfriend loves the user, but no matter what, the result is always 100%.

**UI Requirements:**
- Title text:
  > "Mức độ bé Uyên yêu anh hôm nay là bao nhiêu? 💕"
- A horizontal progress bar (0% → 100%)
- A slider (range input) below the progress bar
- Percentage text displayed above or inside the bar

**Behavior:**
- When the user drags the slider:
  - The progress bar visually follows the slider value
- When the user releases the slider (on mouseup / touchend):
  - Animate the progress bar smoothly to **100%**
  - Update the text to:
    > "Ơ… hình như lúc nào cũng là 100% thì phải 😳"
- Animation should feel soft and cute (ease-in-out)

**Design Style:**
- Rounded progress bar
- Soft pink / pastel color
- Heart icon or subtle sparkle effect when reaching 100%

**Notes:**
- This section should feel playful, not competitive
- Focus on emotional impact and humor

### ✅ Extra Fun Section – Good Boyfriend Checklist

Create a fun and humorous checklist section titled:

> "Checklist người yêu tốt ✅"

**UI Requirements:**
- A list of checkboxes with text labels
- Use a handwritten or casual font if possible
- Each item should have a small animation when checked

**Checklist Items:**
- [x] Nhớ sinh nhật bé Uyên
- [x] Thương bé Uyên
- [ ] Luôn đúng trong mọi cuộc cãi nhau

**Behavior Rules:**
- The first two checkboxes:
  - Can be checked normally
  - Show a small heart animation or color change when checked
- The last checkbox:
  - Must be **impossible to check**
  - When the user tries to click it:
    - Immediately uncheck (or prevent checking)
    - Show a small text below the list:
      > "Cái này thì anh xin thua 😭"
    - Optional: shake animation on the checkbox or text

**Design Style:**
- Light, playful, romantic
- Soft shadows and rounded corners
- Avoid aggressive or loud animations

**Notes:**
- This section should feel self-aware and funny
- The joke should land gently, not sarcastic
