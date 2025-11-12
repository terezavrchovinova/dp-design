# Daniela Plamínková - Portfolio Website

A modern, performant portfolio website showcasing the creative work of Daniela Plamínková, a graphic designer and video editor. Built with React, TypeScript, and optimized for speed and user experience.

## ✨ Features

- **Bilingual Support** - English and Czech (i18n)
- **Performance Optimized** - Code splitting, lazy loading, and critical CSS extraction
- **Smooth Animations** - Lottie animations and Motion library for engaging interactions
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Analytics** - Vercel Analytics and Speed Insights integration
- **Modern Stack** - React 19, TypeScript, Vite 7

## 🚀 Tech Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 4
- **Animations**: 
  - Lottie React
  - Motion (Framer Motion)
- **Internationalization**: i18next & react-i18next
- **Analytics**: Vercel Analytics & Speed Insights
- **Code Quality**: ESLint, Prettier, TypeScript

## 📦 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd danca-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
src/
├── assets/              # Images, fonts, icons, and Lottie animations
│   ├── fonts/
│   ├── icons/
│   └── project_thumbnails/
├── components/          # React components
│   ├── sections/       # Page sections (Home, Projects, About, etc.)
│   └── ...             # Shared components (Navbar, Footer, etc.)
├── locales/            # Translation files (en, cs)
├── utils/              # Utility functions
├── App.tsx             # Main app component
├── i18n.ts             # i18n configuration
└── main.tsx            # Entry point
```

## ⚡ Performance Optimizations

- **Code Splitting**: Manual chunk configuration for optimal caching
- **Lazy Loading**: Non-critical sections loaded on demand
- **Critical CSS**: Inline critical CSS for faster initial render
- **Asset Optimization**: WebP images, optimized builds with Terser
- **Vendor Chunks**: Separate chunks for React, Lottie, Motion, and i18n
- **Console Removal**: Production builds strip console statements

## 🌐 Internationalization

The portfolio supports multiple languages:
- English (`en`)
- Czech (`cs`)

Translation files are located in `src/locales/`. To add a new language, create a new directory with a `translation.json` file and update the i18n configuration.

## 📝 Sections

- **Home** - Hero section with introduction
- **Projects** - Portfolio showcase
- **Services** - What I Do section
- **Experience** - Work experience and education
- **Contact** - Contact information

## 🚢 Deployment

The project is optimized for deployment on Vercel (or similar platforms). The build process generates optimized static assets ready for production.

Build command:
```bash
npm run build
```

The `dist/` folder contains the production-ready files.

## 📄 License

This project is private and proprietary.

## 👤 Contact

**Daniela Plamínková**  
Email: daniela@plaminkova.com

---

Built with ❤️ using React, TypeScript, and Vite
Tereza Vrchovinová