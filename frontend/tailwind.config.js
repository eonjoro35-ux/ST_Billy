/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
   colors: {
  // 1. Core Brand Colors
  primary: '#97191c',     // St. Bill Crimson/Maroon (The core brand identity)
  secondary: '#1a2530',   // Deep Slate Blue/Navy (High contrast anchor for admin headers/footers)
  accent: '#e6a100',      // Accessible Gold/Amber (Perfect for the "Donate" button & alerts)

  // 2. Functional/Status Colors
  success: '#1b7a3a',     // Darker Emerald Green (Accessible contrast on white backgrounds)
  danger: '#c82333',      // Balanced Crimson Crimson (Used for destructive admin actions)
  warning: '#d48800',     // Deep Amber/Ochre (High visibility warning text that passes contrast)
  info: '#0055b3',        // Darker Royal Blue (For announcements and general updates)

  // 3. Neutrals (Backgrounds & Typography)
  background: '#ffffff',  // Pure white background from their legacy site
  surface: '#f8f9fa',     // Light grey for cards, tables, and section backgrounds
  text: {
    primary: '#111827',   // Off-black/Rich Charcoal for standard readable text
    muted: '#4b5563',     // Muted grey for descriptions and subtitles
  }
},
      fontFamily: {
        sans: ['Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
