# Keputusan Teknis

Dokumen ini mencatat versi paket, alasan kompromi, dan keputusan desain/teknis yang tidak eksplisit di PRD.

## Versi paket (diverifikasi 1 November 2026)

Diperiksa dengan `npm view <paket> version` sebelum instalasi, bukan dari ingatan.

| Paket | Versi terpasang | Catatan |
|---|---|---|
| next | 16.4.3 | rilis stabil terbaru (jalur 16.x) |
| react | 19.3.1 | sesuai peer Next 16 dan R3F 9 |
| react-dom | 19.3.1 | — |
| typescript | 5.9.3 | **kompromi**: 7.0.2 ditolak typescript-eslint; lihat catatan di bawah |
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

### TypeScript 5.9.3 (kompromi dari 7.0.2)

Versi stabil terbaru adalah TypeScript 7.0.2. Setelah instalasi, `npm run lint` gagal karena `typescript-eslint` (dipakai `eslint-config-next@16.4.3`) menolak TS 7.0:

```
typescript-eslint does not support TS 7.0.
```

`tsc --noEmit` dan `next build` sendiri berhasil dengan TS 7.0.2. Namun lint adalah syarat PRD §17, sehingga proyek turun ke **TypeScript 5.9.3** (5.x stabil terakhir) agar seluruh toolchain bersih. Ini bukan downgrade diam-diam: versi 7.0.2 sempat dipasang dan diuji. Kembali ke TS 7 setelah typescript-eslint mendukung.

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

### Kebijakan aset

- Karakter 3D prosedural dari primitif three.js, tanpa file model.
- Font dari Google Fonts via `next/font` (SIL OFL), ikon Lucide (ISC).
- Tidak ada audio otomatis; metronom (bila dibuat) default mati dan hanya aktif setelah klik.

## Riwayat keputusan

| Tanggal | Keputusan | Alasan |
|---|---|---|
| 1 Nov 2026 | TypeScript 7.0.2 dipilih | rilis stabil terbaru; diverifikasi lewat build/lint fase 0 |
