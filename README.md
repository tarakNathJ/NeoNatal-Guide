# 🍼 NeoNatal Guide — Your Gentle Baby Health Companion

<div align="center">

![NeoNatal Guide Banner](https://img.shields.io/badge/NeoNatal-Guide-FF6B9D?style=for-the-badge&logo=react&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-16.2.0-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19.2.4-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

**An AI-powered neonatal health companion that helps new parents navigate their baby's first year with confidence.**

[🌐 Live Demo](https://neo-natal-guide.vercel.app) · [🐛 Report Bug](https://github.com/tarakNathJ/NeoNatal-Guide/issues) · [✨ Request Feature](https://github.com/tarakNathJ/NeoNatal-Guide/issues)

</div>

---

## 📖 Table of Contents

- [About the Project](#-about-the-project)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Development Server](#running-the-development-server)
- [AI Integration](#-ai-integration)
- [Multilingual Support](#-multilingual-support)
- [Baby Topics Covered](#-baby-topics-covered)
- [Age-Based Guidance](#-age-based-guidance)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [Disclaimer](#-disclaimer)
- [License](#-license)

---

## 🌟 About the Project

**NeoNatal Guide** is a compassionate, AI-powered web application designed specifically for new and expecting parents. It provides an intelligent conversational companion that answers questions about newborn and infant care — covering feeding, sleep, fever, growth, vaccines, and more.

The application is built with the understanding that parenthood is overwhelming, especially in the first year. New parents often have urgent questions at 3am, are uncertain about what's normal, and need trustworthy guidance quickly. NeoNatal Guide bridges that gap by combining the power of modern AI (Google Gemini + Groq) with a warm, approachable UI.

The app adapts its responses to the baby's exact age — what a parent needs to know about feeding a 1-week-old is very different from a 6-month-old. The guidance is always age-appropriate, contextually aware, and delivered in the user's preferred language.

> ⚠️ **Medical Disclaimer:** NeoNatal Guide is an informational tool and is not a substitute for professional medical advice. Always consult your pediatrician for any medical concerns or emergencies.

---

## ✨ Features

### 🤖 AI-Powered Conversational Chat
- Real-time question-answering powered by **Google Gemini** and **Groq** AI models
- Context-aware responses that factor in the baby's exact age in weeks
- Pre-built quick-start prompts to help parents get started instantly
- Chat history preserved per session for continuity

### 👶 Age-Aware Guidance System
- Parents enter the baby's age in weeks (0–52 weeks)
- The AI automatically tailors every response to that specific developmental stage
- Visual week-to-year progress indicator

### 📚 Curated Topic Navigation
- **🍼 Feeding** — Breastfeeding, bottle feeding, latching, milk supply, weaning
- **😴 Sleep** — Sleep schedules, safe sleep, sleep regressions
- **🌡️ Fever** — Temperature reading, when to call the doctor, managing fever
- **📏 Growth** — Weight gain, height milestones, growth charts
- **💉 Vaccines** — Immunization schedule, side effects, what to expect
- **😢 Crying** — Understanding cues, colic, soothing techniques

### 🌍 Multilingual Support
- Supports **5 languages**: English (EN), Hindi (HI), Bengali (BN), French (FR), Chinese (ZH)
- Language switching is seamless and instant

### 💡 Daily Tips
- Contextual parenting tips displayed on the home screen
- Refreshes to provide relevant, actionable advice

### 🌙 Time-Aware Greeting
- Greets parents with time-sensitive messages (Good morning, Good evening, etc.) making the experience feel personal and warm

---

## 🛠️ Tech Stack

| Category | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router) | 16.2.0 |
| UI Library | React | 19.2.4 |
| Language | TypeScript | ^5 |
| Styling | Tailwind CSS | ^4.2.2 |
| AI — Secondary | Groq SDK | ^1.1.1 |
| Icons | Lucide React | ^0.577.0 |
| Linting | ESLint + eslint-config-next | ^9 / 16.2.0 |
| Deployment | Vercel | — |

---

## 📁 Project Structure

```
NeoNatal-Guide/
│
├── app/                        # Next.js App Router — pages & API routes
│   ├── page.tsx                # Main entry point / home page
│   ├── layout.tsx              # Root layout (fonts, metadata, global wrappers)
│   └── globals.css             # Global CSS styles
│
├── components/                 # Reusable React UI components
│   │                           # (Chat UI, topic buttons, age selector, language switcher, etc.)
│
├── types/                      # TypeScript type definitions & interfaces
│   │                           # (Message types, topic types, language types, baby profile, etc.)
│
├── utils/                      # Utility/helper functions
│   │                           # (AI prompt builders, age calculators, language maps, etc.)
│
├── public/                     # Static assets (images, icons, SVGs)
│
├── AGENTS.md                   # AI agent instructions for code generation
├── CLAUDE.md                   # Claude AI assistant config (references AGENTS.md)
├── next.config.ts              # Next.js configuration
├── tsconfig.json               # TypeScript compiler configuration
├── eslint.config.mjs           # ESLint flat config
├── postcss.config.mjs          # PostCSS configuration for Tailwind
├── package.json                # Project metadata and dependencies
└── package-lock.json           # Exact dependency tree lock file
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- **Node.js** — version 18.x or later (recommended: 20.x LTS)
- **npm** — version 9.x or later (comes with Node.js)
- A **Groq API key** (free tier at [console.groq.com](https://console.groq.com/))

### Installation

**Step 1: Clone the repository**

```bash
git clone https://github.com/tarakNathJ/NeoNatal-Guide.git
```

**Step 2: Navigate into the project directory**

```bash
cd NeoNatal-Guide
```

**Step 3: Install all dependencies**

```bash
npm install
```

This will install all packages listed in `package.json`, including Next.js, React, Google Generative AI SDK, Groq SDK, Tailwind CSS, and TypeScript.

### Environment Variables

Create a `.env.local` file in the root of the project and add your API keys:

```env
# Groq AI API Key
GROQ_API_KEY=your_groq_api_key_here
```

> 🔒 **Security Note:** Never commit your `.env.local` file to version control. It is already listed in `.gitignore`.

**How to get your API keys:**

- **Groq:** Visit [https://console.groq.com/keys](https://console.groq.com/keys), create a free account, and generate an API key.

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app running.

The page hot-reloads automatically whenever you make changes to the source files.

**Other available scripts:**

```bash
npm run build      # Creates an optimized production build
npm run start      # Starts the production server (requires build first)
npm run lint       # Runs ESLint to check for code issues
```

---

## 🤖 AI Integration

NeoNatal Guide uses ** AI providers** to power its conversational features:
### Groq SDK
A secondary AI integration (Groq) that provides ultra-fast inference. Groq is known for its exceptional speed when running large language models, making it ideal for scenarios where near-instant responses are needed.

```bash
groq-sdk: "^1.1.1"
```

### How the AI Prompting Works

The `utils/` folder contains helper functions that build structured prompts for the AI. Before sending a user's question, the application automatically injects:

1. **Baby's age in weeks** — so the AI knows exactly which developmental stage to address
2. **Selected topic** — (Feeding, Sleep, Fever, etc.) to keep responses focused
3. **User's language preference** — so responses come back in the correct language
4. **Safety disclaimer** — the AI is instructed to always recommend consulting a pediatrician for medical emergencies

---

## 🌍 Multilingual Support

The application currently supports the following languages:

| Code | Language | Script |
|---|---|---|
| EN | English | Latin |
| HI | Hindi | Devanagari |
| BN | Bengali | Bengali |
| FR | French | Latin |
| ZH | Chinese | Simplified Han |

Language preference is stored client-side and applied to both the UI and all AI-generated responses.

---

## 👶 Baby Topics Covered

NeoNatal Guide provides AI-assisted guidance across 6 critical areas of infant care:

**🍼 Feeding**
Covers breastfeeding techniques, bottle feeding, formula preparation, how to know if the baby is getting enough milk, latching issues, feeding frequency by age, introducing solids, and weaning.

**😴 Sleep**
Covers newborn sleep patterns, safe sleep guidelines (back-to-sleep, sleep surface), sleep schedules by age, sleep regressions, sleep training methods, and how to establish healthy sleep habits.

**🌡️ Fever**
Covers how to accurately take a baby's temperature, what temperature counts as a fever at different ages, when to call the doctor immediately, how to safely manage fever at home, and medication dosing guidance.

**📏 Growth**
Covers normal weight gain patterns, growth spurts, when to be concerned about slow growth, reading growth charts, head circumference tracking, and developmental milestones.

**💉 Vaccines**
Covers the standard immunization schedule, what each vaccine protects against, common side effects, how to soothe a baby after vaccination, and addressing vaccine hesitancy concerns.

**😢 Crying**
Covers understanding different types of cries, colic and what to do, soothing techniques, the Purple Crying period, and when excessive crying might indicate an underlying issue.

---

## 📅 Age-Based Guidance

The app divides the first year into four key developmental phases:

| Phase | Age Range | Key Focus Areas |
|---|---|---|
| Newborn | 0–4 weeks | Feeding, sleep safety, jaundice, umbilical cord care |
| Early Infant | 1–3 months | Feeding patterns, tummy time, first smiles, colic |
| Mid Infant | 3–6 months | Solid food introduction, rolling, teething begins |
| Older Infant | 6–12 months | Crawling, standing, language, weaning |

---

## 🚢 Deployment

This application is deployed on **Vercel** — the platform built by the creators of Next.js, offering zero-configuration deployment.

**To deploy your own instance:**

**Step 1:** Push your code to a GitHub repository.

**Step 2:** Visit [https://vercel.com/new](https://vercel.com/new) and import your repository.

**Step 3:** In the Vercel dashboard, go to **Settings → Environment Variables** and add:
- `GEMINI_API_KEY`
- `GROQ_API_KEY`

**Step 4:** Click **Deploy**. Vercel will automatically build and deploy the application.

Every push to the `main` branch will trigger an automatic redeployment.

**Live URL:** [https://neo-natal-guide.vercel.app](https://neo-natal-guide.vercel.app)

---

## 🤝 Contributing

Contributions are warmly welcomed! Whether it's fixing a bug, adding a new language, improving the AI prompts, or enhancing the UI — every contribution makes this tool more helpful to parents.

**Steps to contribute:**

1. Fork the repository
2. Create a new feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit them: `git commit -m "feat: add your feature description"`
4. Push to your fork: `git push origin feature/your-feature-name`
5. Open a Pull Request against the `main` branch

Please ensure your code passes linting before submitting:
```bash
npm run lint
```

---

## ⚠️ Disclaimer

NeoNatal Guide is an **informational resource only**. The content generated by the AI is based on general parenting and pediatric guidelines and is **not a substitute for professional medical advice, diagnosis, or treatment**.

Always seek the advice of your pediatrician or a qualified healthcare provider with any questions you have regarding your child's health. In case of a medical emergency, call your local emergency services immediately.

---

## 📄 License

This project is private and proprietary. All rights reserved by [@tarakNathJ](https://github.com/tarakNathJ).

---

<div align="center">

Made with ❤️ for new parents everywhere

⭐ If this project helped you, please consider giving it a star!

</div>
