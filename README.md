# 💖 Valentine's Day Love Letter App

A beautiful, interactive Valentine's Day web experience built with React + Vite. This romantic app features animations, interactive elements, and personal touches to express your love in a memorable way.

## ✨ Features

### Animations & Effects
- 💌 **Animated Envelope Intro** - Opens with a beautiful envelope animation
- ✨ **Sparkle Cursor Trail** - Hearts and sparkles follow the cursor/finger
- 💖 **Custom Heart Cursor** - Replaces default cursor with a heart
- ⭐ **Twinkling Stars** - Animated stars in the background
- 🎈 **Floating Hearts** - Hearts float across the screen
- 🎊 **Confetti Celebration** - Bursts at 50% scroll and when she says yes

### Interactive Sections
- ⏰ **Valentine's Countdown** - Live countdown to February 14th
- 💝 **Love Letter** - Heartfelt message in a beautiful card
- 🌹 **Journey Timeline** - Your story together with animated milestones
- 💕 **Why I Love You** - Grid of reasons with hover effects
- 🎨 **Scratch Card** - Scratch to reveal a hidden message (with sound!)
- 📷 **Photo Carousel** - Swipeable carousel with your photos together
- ✅ **Bucket List** - Interactive checklist with a hidden Easter egg
- 💗 **Love Meter** - Fills as she scrolls, reaching 100% at the question
- 🎵 **Music Toggle** - Background music control

### The Big Question
- 💍 **Will You Be My Valentine?** - With a hilarious dodging "No" button
- 🎉 **Celebration Screen** - Special animation when she says yes

### Multilingual Love
- 🌍 **Rotating "I Love You"** - Displays in 8 different languages

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd love
```

2. Install dependencies
```bash
npm install
```

3. Add your photos
Place your photos in the `public` folder and update the paths in `src/components/PhotoCarousel.jsx`

4. Customize the background image
Replace `/DSC_6140_1_compress13.jpg` in `src/styles.css` with your preferred image

5. Run the development server
```bash
npm run dev
```

6. Open your browser
Navigate to `http://localhost:5173`

## 🎨 Customization

### Update Personal Content
- **Love reasons**: Edit `loveReasons` array in `src/App.jsx`
- **Journey moments**: Edit `journeyMoments` array in `src/App.jsx`
- **Bucket list items**: Edit items in `src/components/BucketList.jsx`
- **Photos**: Update paths in `src/components/PhotoCarousel.jsx`
- **Letter content**: Edit the letter section in `src/App.jsx`

### Styling
- Main styles: `src/styles.css`
- Color scheme: CSS variables in `:root` selector
- Background image opacity: Adjust in `body::before` selector

### Add Background Music
Update `src/components/MusicToggle.jsx` with your music file:
```javascript
audioRef.current = new Audio('/path-to-your-music.mp3');
```

## 📱 Mobile Responsive

Fully optimized for mobile devices with:
- Touch-friendly interactions
- Responsive layouts
- Optimized animations
- Touch gesture support for scratch card and carousel

## 🛠️ Built With

- **React** - UI library
- **Vite** - Build tool and dev server
- **CSS3** - Animations and styling
- **Canvas API** - Scratch card effect
- **Intersection Observer API** - Scroll animations

## 🎯 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📦 Build for Production

```bash
npm run build
```

The optimized files will be in the `dist` folder, ready to deploy.

## 🚀 Deployment

Deploy to any static hosting service:
- Vercel
- Netlify
- GitHub Pages
- AWS S3
- Firebase Hosting

## 💝 Credits

Made with love for someone special ❤️

## 📄 License

This is a personal project. Feel free to use it as inspiration for your own romantic gestures!

---

**Pro tip**: Test the app before sharing to make sure all your personal content is correct! 💕
