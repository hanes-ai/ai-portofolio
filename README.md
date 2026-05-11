# NeuraFolio

Portofolio interaktif untuk AI Engineer, dibangun dengan **Next.js 15**, **React 19**, **Tailwind CSS**, dan **Genkit** untuk fitur AI generatif. Menonjolkan estetika futuristik (dark mode, neon accents, glassmorphism) dengan animasi mulus dan visual 3D.

## Fitur Utama

- **Hero Section** — nama, role dengan animasi typing dinamis, dan avatar/hologram bergaya AI.
- **Dynamic Skill Visualization** — kartu interaktif untuk domain AI/ML, Backend, Cloud, Data Engineering, dan Frontend dengan ikon serta progress bar beranimasi.
- **Interactive Project Showcase** — kartu proyek dengan hover effect, badge tech stack, link ke repo & live demo, serta filter berdasarkan kategori AI.
- **AI Playground** — area interaktif di mana pengunjung dapat mencoba model AI generatif sederhana lewat input teks (didukung Genkit + Google GenAI).
- **Responsive & Modern UI** — komponen modern (cards, spotlight hover, animated gradients, glowing borders, glassmorphism) yang teroptimasi untuk desktop dan mobile.
- **Advanced Motion** — smooth scrolling, loading animations, scroll-triggered reveal, dan subtle cursor glow menggunakan Framer Motion.
- **Dynamic 3D Background** — particle network interaktif dengan Three.js, AI pattern grid, dan floating gradient orb.

## Tech Stack

- **Framework:** Next.js 15 (App Router, Turbopack)
- **UI:** React 19, Tailwind CSS, Radix UI, shadcn-style components
- **Animation:** Framer Motion
- **3D / Visual:** Three.js
- **AI:** Genkit + `@genkit-ai/google-genai`
- **Forms & Validation:** React Hook Form, Zod
- **Language:** TypeScript

## Style Guide

- **Color scheme:** Dark mode default
- **Primary:** Electric blue `#3388FF`
- **Background:** `#111215` (deep bluish-black)
- **Accent:** Neon purple `#D255F9`
- **Headline font:** Space Grotesk
- **Body font:** Inter

## Getting Started

### Prasyarat

- Node.js 20+
- npm (atau pnpm/yarn)

### Instalasi

```bash
npm install
```

### Environment Variables

Buat file `.env` di root project dan isi key yang dibutuhkan untuk Genkit / Google GenAI:

```env
GEMINI_API_KEY=your_api_key_here
```

### Menjalankan Development Server

```bash
npm run dev
```

Aplikasi akan berjalan di [http://localhost:9002](http://localhost:9002).

### Menjalankan Genkit (AI Flows)

```bash
# Sekali jalan
npm run genkit:dev

# Mode watch (auto-reload)
npm run genkit:watch
```

### Build untuk Production

```bash
npm run build
npm run start
```

### Quality Checks

```bash
npm run lint       # ESLint
npm run typecheck  # TypeScript type checking
```

## Struktur Project

```
ai-portofolio/
├── docs/
│   └── blueprint.md          # Design blueprint & style guidelines
├── src/
│   ├── ai/                   # Genkit flows & konfigurasi AI
│   │   ├── flows/
│   │   └── genkit.ts
│   ├── app/                  # Next.js App Router (pages, layouts)
│   ├── components/           # Reusable UI components
│   ├── hooks/                # Custom React hooks
│   └── lib/                  # Utilities & helpers
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

## Scripts

| Script              | Deskripsi                                  |
| ------------------- | ------------------------------------------ |
| `dev`               | Jalankan dev server di port 9002 (Turbopack) |
| `build`             | Build production                           |
| `start`             | Jalankan production server                 |
| `lint`              | Jalankan ESLint                            |
| `typecheck`         | TypeScript type checking                   |
| `genkit:dev`        | Jalankan Genkit AI flows                   |
| `genkit:watch`      | Genkit AI flows dengan watch mode          |

## License

Private project.
