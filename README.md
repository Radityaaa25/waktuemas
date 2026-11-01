# 4 Menit Emas

Web scrollytelling satu halaman tentang henti jantung dan CPR dewasa, dibuat untuk **INVOFEST 2026 Web Design Competition** (subtema Health & Well-being for All, SDG 3).

> Media edukasi umum. Bukan alat diagnosis dan bukan pengganti pelatihan BHD resmi.

## Menjalankan proyek

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run lint
npm run typecheck
```

## Stack

- Next.js 16 (App Router, Turbopack) + React 19 + TypeScript strict
- Tailwind CSS v4 (CSS-first) + CSS variables
- GSAP 3 + ScrollTrigger + `@gsap/react` (animasi per ketukan cerita)
- Lenis (sinkron dengan `gsap.ticker` dan ScrollTrigger)
- Motion graphic SVG prosedural, tanpa aset gambar pihak ketiga
- zustand, lucide-react
- Font: Bricolage Grotesque, Plus Jakarta Sans, JetBrains Mono via `next/font/google`

Versi paket dan alasan kompromi dicatat di [`DECISIONS.md`](./DECISIONS.md).

## Struktur

```
src/
  app/            layout, page, globals.css, ikon
  components/
    story/        StoryStage, SceneVisuals, StoryDetails
    sections/     References
    ui/           MotionToggle, Disclaimer
    providers/    SmoothScrollProvider (Lenis + ScrollTrigger)
  lib/            gsap, scrollStore, lenis, format
  data/           story.ts (alur cerita), content.ts, references.ts
  hooks/          useReducedMotion
public/           og image, aset statis
```

## Konten dan sumber

- Panduan medis mengikuti **AHA 2025 Guidelines for CPR and ECC** untuk dewasa.
- Angka statistik hanya memakai daftar di PRD §12 dan ditampilkan dengan sumber di UI.
- Angka yang masih perlu verifikasi sumber primer ditandai `TODO-VERIFY` di kode dan diberi label "perkiraan" di UI.
- “4 Menit Emas” adalah perangkat naratif, bukan batas pasti kerusakan otak.

## Kredit dan lisensi

- Visual adegan dibuat prosedural dengan SVG — tanpa aset gambar pihak ketiga.
- Font: Bricolage Grotesque, Plus Jakarta Sans, JetBrains Mono (SIL Open Font License).
- Ikon: [Lucide](https://lucide.dev) (ISC License).
- Animasi: GSAP/ScrollTrigger dan Lenis sesuai lisensi masing-masing.
- Karya: Tim 4 Menit Emas, INVOFEST 2026.

## Status pengembangan

Arah saat ini: **scrollytelling sinematik berbasis ketukan** — 7 scene, 13 ketukan, teks minimal, motion graphic SVG. Setiap scroll memicu satu ketukan; elemen masuk dari arah berbeda dan adegan berganti. Berikutnya: polish suara visual, QA lintas perangkat, dan deploy.
