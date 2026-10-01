# Forever & Always - Romantic Motion Graphics Website

A premium, Awwwards-level romantic single-page website with advanced motion graphics, built with React, GSAP, and modern web technologies. Designed to create an emotional impact for your loved one.

## Features

- **Cinematic Hero Section** - Animated heart particles, gradient text, and smooth entrance animations
- **Love Counter** - Real-time countdown showing days, hours, minutes, and seconds together
- **Interactive Timeline** - Scroll-triggered animations showcasing your love story
- **Photo Gallery** - Masonry grid with lightbox and hover effects
- **Love Letter** - Typewriter effect for personalized messages
- **Flip Cards** - Interactive 3D cards revealing reasons you love them
- **Music Player** - Floating player with visualizer (customize with your own songs)
- **Interactive Heart** - Clickable heart with particle burst effects
- **Final Section** - Aurora gradient background with anniversary countdown
- **Custom Cursor** - Heart trail following mouse (desktop only)
- **Smooth Scroll** - Lenis-powered smooth scrolling
- **Responsive Design** - Mobile-first approach with optimized performance

## Tech Stack

- **Framework**: React 18 + Vite
- **Styling**: TailwindCSS 3
- **Animation**: GSAP 3 + ScrollTrigger, Framer Motion
- **Particles**: tsparticles/react
- **Smooth Scroll**: Lenis
- **Confetti**: canvas-confetti
- **Icons**: Lucide React
- **Fonts**: Google Fonts (Great Vibes, Dancing Script, Playfair Display, Cormorant Garamond)

## Installation

1. Clone the repository or navigate to the project directory
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

## Customization

All content is centralized in `src/config/content.js`. Edit this file to personalize the website:

### Couple Information

```javascript
couple: {
  name1: "Nama Kamu",        // Your name
  name2: "Nama Pasangan",   // Partner's name
  startDate: "2023-02-13", // Relationship start date (YYYY-MM-DD)
  photo: "/images/couple.jpg", // Couple photo path
},
```

### Hero Section

```javascript
hero: {
  title: "Untuk Kamu, {name2}", // {name2} will be replaced with partner's name
  subtitle: "Setiap detik bersamamu adalah keajaiban...",
  subtitle2: "13 Februari 2023 — Sekarang & Selamanya",
  cta: "Mulai Perjalanan Kita",
},
```

### Love Letter

```javascript
letter: {
  greeting: "Sayangku, {name2}",
  body: `Kalau semesta bertanya apa hal terbaik yang pernah terjadi padaku...`,
  signature: "{name1}",
},
```

### Timeline

Add or edit timeline milestones:

```javascript
timeline: [
  {
    date: "2023-02-13",
    title: "Pertama Bertemu",
    desc: "Hari dimana duniamu dan duniaku bertabrakan...",
    image: "https://picsum.photos/seed/meet/600/400",
    icon: "💕"
  },
  // Add more milestones...
],
```

### Gallery

Replace placeholder images with your own photos:

```javascript
gallery: [
  "https://your-image-url-1.jpg",
  "https://your-image-url-2.jpg",
  // Add more photos...
],
```

### Reasons

Add reasons why you love them:

```javascript
reasons: [
  "Caramu tertawa saat aku bercanda jelek",
  "Kamu selalu tahu kapan aku butuh pelukan",
  // Add more reasons...
],
```

### Music Playlist

Add your own romantic songs:

```javascript
playlist: [
  { title: "Perfect", artist: "Ed Sheeran", src: "/music/perfect.mp3" },
  { title: "All of Me", artist: "John Legend", src: "/music/all-of-me.mp3" },
  // Add more songs...
],
```

**Note**: For music to work, place your audio files in the `public/music/` directory and update the `src` paths accordingly.

## Adding Photos

1. Create directories for your images:
   - `public/images/couple.jpg` - Main couple photo
   - `public/images/gallery/` - Gallery photos
   - `public/images/timeline/` - Timeline milestone photos

2. Update the paths in `src/config/content.js`

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repository
3. Vercel will automatically detect Vite and configure the build
4. Click Deploy

### Netlify

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com) and import your repository
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Click Deploy

### Manual Build

```bash
npm run build
```

The built files will be in the `dist/` directory. Upload these to any static hosting service.

## Performance Optimization

The website includes several performance optimizations:

- Lazy loading for images and sections
- Reduced particle count on mobile devices
- GPU-accelerated animations (transform and opacity only)
- `prefers-reduced-motion` support for accessibility
- Optimized particle systems

## Accessibility

- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- Screen reader friendly
- Reduced motion support

## Troubleshooting

### Music not playing

- Ensure audio files are in the `public/music/` directory
- Check file paths in `src/config/content.js`
- Browser autoplay policies may require user interaction first

### Images not loading

- Verify image paths are correct
- Ensure images are in the `public/` directory
- Check file permissions

### Animations not smooth

- Check browser console for errors
- Ensure all dependencies are installed
- Try reducing particle count in Hero section

## File Structure

```
romance_web/
├── public/
│   ├── images/          # Place your photos here
│   ├── music/           # Place your audio files here
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── sections/   # Section components
│   │   ├── Preloader.jsx
│   │   ├── Cursor.jsx
│   │   ├── ProgressBar.jsx
│   │   └── MusicPlayer.jsx
│   ├── config/
│   │   └── content.js   # ⭐ ALL CONTENT EDITABLE HERE
│   ├── styles/
│   │   └── globals.css
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## Customization Tips

1. **Colors**: Modify color variables in `src/styles/globals.css` and `tailwind.config.js`
2. **Fonts**: Add or change Google Fonts in `src/styles/globals.css`
3. **Animations**: Adjust GSAP timings in individual section components
4. **Layout**: Modify Tailwind classes in component files

## License

MIT License — Copyright (c) 2026 Andy Pratama. See [LICENSE](./LICENSE) for details.

## Support

For issues or questions, please check the troubleshooting section above or review the code comments in each component.

---

Made with ❤️ for your special someone
