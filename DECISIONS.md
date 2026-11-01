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
| zustand | 5.0.16 | state scroll/progress/ECG |
| lucide-react | 1.66.0 | ikon |
| eslint | 10.14.0 | flat config |
| eslint-config-next | 16.4.3 | disamakan dengan versi Next |
| @types/react / @types/react-dom | 19.3.0 | — |
| @types/node | 26.6.6 | — |

### Kompatibilitas yang diperiksa

- `next@16.4.3` peer: `react ^19`, `react-dom ^19`. Memenuhi.
- `eslint-config-next@16.4.3` peer: `eslint >=9`, `typescript >=3.3.1`. Memenuhi.

`npm ls --depth=0` bersih; tidak ada paket invalid. Paket 3D (`three`, R3F, drei) dilepas setelah arah desain berubah menjadi motion graphic SVG.

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

### Scrollytelling berbasis ketukan

- Arah desain dirombak: bukan landing page dengan animasi tempelan, tetapi cerita yang bergerak per ketukan. Ada 7 scene dan 13 ketukan di `src/data/story.ts`.
- Scroll tidak men-scrub semua elemen sekaligus. Posisi scroll memilih ketukan aktif (pembulatan progress), lalu timeline ketukan itu berjalan: teks masuk, elemen pendukung bergerak, adegan berganti.
- Arah masuk tiap ketukan berbeda (atas, bawah, kiri, kanan, scale). Kicker, judul, dan aside memakai arah yang berbeda pula agar tidak terasa "semua muncul dari bawah".
- Track scroll panjang dengan stage `sticky`; progress bar memakai CSS variable `--story-p`, sedangkan state React hanya diperbarui saat ketukan berganti.
- Motion graphic dibuat prosedural dengan SVG (tanpa aset pihak ketiga). Animasi ambient (scanline, pulse, jarum jam) menjaga layar tetap hidup di antara ketukan.
- `prefers-reduced-motion` dan tombol "Animasi" mengganti stage menjadi daftar scene statis yang lengkap; tidak ada informasi yang hilang.
- Detail aksesibel (angka, alur, lima langkah, panduan, referensi, disclaimer) berada di bawah cerita.

### Kebijakan aset

- Visual scene prosedural dengan SVG, tanpa aset gambar pihak ketiga.
- Font dari Google Fonts via `next/font` (SIL OFL), ikon Lucide (ISC).
- Tidak ada audio otomatis; metronom (bila dibuat) default mati dan hanya aktif setelah klik.

## Riwayat keputusan

| Tanggal | Keputusan | Alasan |
|---|---|---|
| 1 Nov 2026 | TypeScript 6.0.3 | TS 7 ditolak typescript-eslint; TS 6 didukung, build/lint bersih |
| 1 Nov 2026 | Tema terang penuh | Permintaan terbaru; gelap hanya untuk elemen kecil, kontras dan label jalur tetap terjaga |
| 1 Nov 2026 | Scroll-story tanpa pin | Sticky CSS lebih sederhana dan stabil untuk tinggi dinamis; pin hanya bila benar-benar diperlukan |
| 1 Nov 2026 | QA produksi via Firefox BiDi | Menghindari pemasangan browser tambahan; build produksi dipakai karena dev HMR tidak stabil di headless |
| 1 Nov 2026 | Rombak total ke scrollytelling ketukan | Masukan pengguna: bukan landing page, tetapi cerita yang bergerak tiap scroll |
| 1 Nov 2026 | Lepas paket 3D | Scene kini motion graphic SVG; three.js/R3F/drei tidak dipakai |
