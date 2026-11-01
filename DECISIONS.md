# Keputusan Teknis

Dokumen ini mencatat versi paket, alasan kompromi, dan keputusan desain/teknis yang tidak eksplisit di PRD.

## Versi paket (diverifikasi 1 November 2026)

Diperiksa dengan `npm view <paket> version` sebelum instalasi, bukan dari ingatan.

| Paket | Versi terpasang | Catatan |
|---|---|---|
| next | 16.4.3 | rilis stabil terbaru (jalur 16.x) |
| react | 19.3.1 | sesuai peer Next 16 dan R3F 9 |
| react-dom | 19.3.1 | — |
| typescript | 6.0.3 | TS 7.0.2 ditolak typescript-eslint; TS 6 didukung penuh |
| tailwindcss | 4.3.3 | CSS-first (`@import "tailwindcss"`, `@theme inline`) |
| @tailwindcss/postcss | 4.3.3 | versi disamakan dengan tailwindcss |
| gsap | 3.15.0 | ScrollTrigger + SplitText (gratis sejak 3.13) |
| @gsap/react | 2.1.2 | `useGSAP` |
| lenis | 1.3.27 | `autoRaf: false`, disinkronkan ke `gsap.ticker` |
| three | 0.187.0 | memenuhi peer drei `>=0.159` |
| @react-three/fiber | 9.8.2 | v9 wajib untuk React 19 |
| @react-three/drei | 10.7.9 | kompatibel dengan R3F 9 |
| zustand | 5.0.16 | state scroll/progress/ECG |
| lucide-react | 1.66.0 | ikon |
| eslint | 10.14.0 | flat config |
| eslint-config-next | 16.4.3 | disamakan dengan versi Next |
| @types/react / @types/react-dom | 19.3.0 | — |
| @types/node | 26.6.6 | — |
| @types/three | 0.187.0 | disamakan dengan versi three |

### Kompatibilitas yang diperiksa

- `@react-three/fiber@9.8.2` peer: `react >=19 <19.4`, `react-dom >=19 <19.4`, `three >=0.156`. React 19.3.1 dan three 0.187.0 memenuhi.
- `@react-three/drei@10.7.9` peer: `react ^19`, `react-dom ^19`, `three >=0.159`, `@react-three/fiber ^9.0.0`. Semua memenuhi.
- `next@16.4.3` peer: `react ^19`, `react-dom ^19`. Memenuhi.
- `eslint-config-next@16.4.3` peer: `eslint >=9`, `typescript >=3.3.1`. Memenuhi.

`npm install` mengeluarkan beberapa `npm warn ERESOLVE overriding peer dependency` yang berasal dari peer opsional paket 3D (misalnya `expo`, `react-native`) yang tidak dipakai di proyek web ini. `npm ls --depth=0` bersih; tidak ada paket invalid.

### TypeScript 6.0.3

Versi stabil terbaru adalah TypeScript 7.0.2. Namun `typescript-eslint@8.72.1` (dipakai `eslint-config-next@16.4.3`) menolak TS 7:

```
typescript-eslint does not support TS 7.0.
```

Paket tersebut secara eksplisit masih mendukung jalur TS 6 (pesan errornya menyebut cara menjalankan typescript-eslint dengan API TS 6). Karena itu proyek memakai **TypeScript 6.0.3**, versi stabil terakhir di jalur 6.x. `tsc --noEmit`, `eslint`, dan `next build` bersih dengan versi ini. Naik ke TS 7 setelah typescript-eslint mendukung.

## Keputusan teknis

### Lenis + ScrollTrigger

- Lenis dijalankan dengan `autoRaf: false`; loop `lenis.raf()` ditempel ke `gsap.ticker` agar scroll dan ScrollTrigger memakai frame yang sama (menghindari jitter pada scrub/pin).
- `lenis.on("scroll", ScrollTrigger.update)` untuk sinkronisasi.
- `respectReducedMotion: true` pada Lenis; provider juga menyimpan preferensi di zustand agar animasi GSAP dapat dimatikan.
- Anchor internal memakai opsi `anchors` dengan offset header `-72px`.

### Data statistik

- Angka yang ditandai ⚠ di PRD §12 tidak ditampilkan sebagai fakta final. Di kode diberi komentar `TODO-VERIFY` dan di UI memakai label "perkiraan"/"perlu verifikasi".
- Kartu 1 (41,7%) berasal dari AHA 2025 (data AS 2024) dan ditampilkan dengan label negara.
- Kartu 2 tidak menampilkan angka per menit; hanya arah tren dan label "perkiraan model" sampai angka final dikonfirmasi.
- Kartu 3 menampilkan "±360 ribu" dengan label perkiraan + sumber sekunder; menunggu verifikasi Kemenkes.

### Tema terang

- Palet memakai latar terang (`--bg #f6f8fc`, `--surface #ffffff`) dengan `color-scheme: light` dan `themeColor #F6F8FC`.
- Kontras teks utama dijaga di atas 7:1 pada latar terang; teks sekunder memakai `--muted`.
- Jalur A/B tidak dibedakan lewat warna saja: selalu ada label teks dan ikon (alert/hope).
- Kartu memakai bayangan halus dan border turunan `--text`; tidak ada blok gelap besar kecuali elemen kecil seperti tombol utama.

### Animasi scroll (Fase 2)

- `ScrollAnimations` membungkus `<main>` dan memakai `useGSAP` + `gsap.matchMedia()` dengan dua kondisi (`isMobile`, `isDesktop`). Saat breakpoint berubah, konteks GSAP dibuat ulang dan `SplitText` di-`revert`.
- Semua animasi dekoratif memakai `scrub` (bukan autoplay) kecuali intro hero. Intro hero memakai `toggleActions: "play none none reverse"` dan `play()` eksplisit setelah dibuat agar judul tidak tertinggal dalam keadaan `from` (opacity 0) saat halaman dimuat.
- Count-up memakai `ScrollTrigger.create` + `onUpdate`, dengan teks akhir tetap ada di HTML agar tetap terbaca tanpa JavaScript.
- `prefers-reduced-motion` dan tombol "Kurangi animasi" mematikan seluruh animasi; konten tetap statis dan lengkap.

### Scroll-story S4

- Tidak memakai pin ScrollTrigger. Track setinggi `400svh` (mobile) / `500svh` (desktop) berisi panel `position: sticky`.
- Progress 0–0.4 = Jalur A, 0.4–0.5 = rewind (waktu 4:00 → 0:00), 0.5–1 = Jalur B. Store hanya diperbarui saat detik, langkah, jalur, atau fase berubah untuk menghindari render berlebihan.
- Tabs dan tombol langkah memakai `getLenis()?.scrollTo()` agar berpindah ke progress yang tepat; fallback `window.scrollTo` saat Lenis tidak aktif (reduced motion).
- Di layar pendek (`max-height: 720px` dan `<lg`), elemen sekunder disembunyikan (badge tab, catatan pratinjau, header/ringkasan StepPanel) agar panel sticky muat tanpa memotong konten. Ringkasan semua langkah kedua jalur tetap tersedia statis di bawah track.
- Layar kecil tetap menampilkan kanvas di atas panel; desktop memakai dua kolom.

### Kebijakan aset

- Karakter 3D prosedural dari primitif three.js, tanpa file model.
- Font dari Google Fonts via `next/font` (SIL OFL), ikon Lucide (ISC).
- Tidak ada audio otomatis; metronom (bila dibuat) default mati dan hanya aktif setelah klik.

## Riwayat keputusan

| Tanggal | Keputusan | Alasan |
|---|---|---|
| 1 Nov 2026 | TypeScript 6.0.3 | TS 7 ditolak typescript-eslint; TS 6 didukung, build/lint bersih |
| 1 Nov 2026 | Tema terang penuh | Permintaan terbaru; gelap hanya untuk elemen kecil, kontras dan label jalur tetap terjaga |
| 1 Nov 2026 | Scroll-story tanpa pin | Sticky CSS lebih sederhana dan stabil untuk tinggi dinamis; pin hanya bila benar-benar diperlukan |
| 1 Nov 2026 | QA produksi via Firefox BiDi | Menghindari pemasangan browser tambahan; build produksi dipakai karena dev HMR tidak stabil di headless |
