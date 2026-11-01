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
- GSAP 3 + ScrollTrigger + `@gsap/react`
- Lenis (sinkron dengan `gsap.ticker` dan ScrollTrigger)
- three.js + `@react-three/fiber` + `@react-three/drei` (3D prosedural)
- zustand, lucide-react
- Font: Bricolage Grotesque, Plus Jakarta Sans, JetBrains Mono via `next/font/google`

Versi paket dan alasan kompromi dicatat di [`DECISIONS.md`](./DECISIONS.md).

## Struktur

```
src/
  app/            layout, page, globals.css, ikon
  components/
    sections/     Hero, Problem, UseCase, CprStory, Closing, References
    three/        Scene, Character, CameraRig, Environment
    ui/           Timer, EcgLine, StatCard, StepPanel, MotionToggle, Disclaimer
    providers/    SmoothScrollProvider (Lenis + ScrollTrigger)
  lib/            gsap, scrollStore, cameraPath
  data/           content.ts (semua teks), references.ts
  hooks/          useReducedMotion, useDeviceTier
public/           og image, aset statis
```

## Konten dan sumber

- Panduan medis mengikuti **AHA 2025 Guidelines for CPR and ECC** untuk dewasa.
- Angka statistik hanya memakai daftar di PRD §12 dan ditampilkan dengan sumber di UI.
- Angka yang masih perlu verifikasi sumber primer ditandai `TODO-VERIFY` di kode dan diberi label "perkiraan" di UI.
- “4 Menit Emas” adalah perangkat naratif, bukan batas pasti kerusakan otak.

## Kredit dan lisensi

- Karakter 3D dibuat prosedural dari primitif three.js — tanpa aset model pihak ketiga.
- Font: Bricolage Grotesque, Plus Jakarta Sans, JetBrains Mono (SIL Open Font License).
- Ikon: [Lucide](https://lucide.dev) (ISC License).
- Animasi: GSAP/ScrollTrigger dan Lenis sesuai lisensi masing-masing.
- Karya: Tim 4 Menit Emas, INVOFEST 2026.

## Status pengembangan

Dikerjakan per fase: setup → kerangka 2D → animasi scroll → scene 3D → polish/aksesibilitas → deploy. Lihat riwayat commit untuk progres.
