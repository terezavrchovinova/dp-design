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
- **Code Quality**: Biome (lint + format), TypeScript

## 📦 Getting Started

### Prerequisites

- Node.js v18+

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

Run with `npm run <script>`:

- `dev` - Start development server
- `build` - Build for production
- `preview` - Preview production build locally
- `lint` - Run Biome (lint + format check)
- `lint:fix` - Fix lint issues and format with Biome
- `format` - Format code with Biome
- `test` - Run unit and integration tests
- `test:watch` - Run tests in watch mode
- `test:ui` - Run tests with Vitest UI
- `test:coverage` - Run tests with coverage report
- `test:e2e` - Run end-to-end tests
- `test:e2e:ui` - Run e2e tests with Playwright UI
- `test:all` - Run all tests (unit + e2e)
- `test:ci` - Run tests for CI (unit tests only)
- `test:ci:full` - Run all tests for CI (unit + e2e)

## 📁 Project Structure

```
src/
├── assets/              # Images, fonts, icons, and Lottie animations
│   ├── fonts/
│   ├── icons/
│   └── project_thumbnails/
├── components/          # React components
│   ├── layout/         # Navbar, MobileMenu, Footer
│   ├── ui/             # Reusable UI (Button, AnimatedHeading, ToolIcon, etc.)
│   └── sections/       # Page sections (Home, Projects, About, etc.)
├── constants/          # Static config (motion, navigation, contact, i18n)
├── data/               # Content arrays (projects, services, tools)
├── hooks/              # Custom hooks
├── locales/            # Translation files (en, cs)
├── tests/              # Vitest unit/integration tests (mirrors components/)
│   ├── components/     # Component tests (ui/, layout/, sections/)
│   ├── setup.ts        # Test setup file
│   └── utils.tsx       # Test utilities
├── utils/              # Pure, unit-tested helpers
├── App.tsx             # Main app component
├── i18n.ts             # i18n configuration
└── main.tsx            # Entry point

e2e/                    # Playwright e2e tests
├── home.spec.ts
├── navigation.spec.ts
├── projects.spec.ts
└── i18n.spec.ts
```

## ⚡ Performance Optimizations

- **Code Splitting**: Manual chunk configuration for optimal caching
- **Lazy Loading**: Non-critical sections loaded on demand
- **Critical CSS**: Inline critical CSS for faster initial render
- **Asset Optimization**: WebP images, optimized builds with esbuild
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

## 🧪 Testing

The project includes comprehensive testing setup:

### Unit and Integration Tests

- **Framework**: Vitest with React Testing Library
- **Location**: `src/tests/**/*.test.tsx`
- **Run tests**: `npm run test`
- **Watch mode**: `npm run test:watch`
- **Coverage**: `npm run test:coverage`

### End-to-End Tests

- **Framework**: Playwright
- **Location**: `e2e/*.spec.ts`
- **Run tests**: `npm run test:e2e`
- **UI mode**: `npm run test:e2e:ui`
- **Tests include**: Navigation, home page, projects, language switching

### Test Configuration

- Tests run automatically before deployment to Vercel
- GitHub Actions workflow runs all tests on push/PR
- Unit tests run in Vercel build command
- E2E tests run in GitHub Actions for faster builds

## 🚢 Deployment

The project is optimized for deployment on Vercel (or similar platforms). The build process generates optimized static assets ready for production.

**Tests run automatically before deployment:**

- Unit and integration tests run in Vercel build command
- E2E tests run in GitHub Actions workflow
- Deployment fails if any tests fail

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
