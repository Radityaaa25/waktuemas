# PROMPT RESET: Perbaikan Arsitektur Repo (WAJIB, ganti pendekatan sekarang)

Aku sudah audit kode terbaru di repo. **Hasilnya tidak sesuai `prompt-revisi.md`.** Baca `prompt-revisi.md` dan `PRD.md` lagi, lalu lakukan perbaikan di bawah. Ini bukan polish: **mesin ceritanya harus diganti.**

## 1. Temuan audit (fakta dari kode)

| Temuan | Lokasi | Kenapa salah |
|---|---|---|
| Animasi berbasis "ketukan": `timeline.restart()`, `beatInScene`, `setScene`, durasi tetap (0.35s, 0.6s) | `StoryStage.tsx` | Animasi jalan sendiri tiap beat, **bukan mengikuti posisi scroll**. Harus scrub kontinu: maju saat scroll turun, mundur saat scroll naik |
| Hanya 7 scene dan 13 beat | `data/story.ts` | Storyboard di `prompt-revisi.md` §8 punya 21 scene. Cerita jadi terlalu tipis |
| Ada `StoryHeader` (logo + judul), `StoryHud`, `SceneNav` (titik navigasi) | `StoryStage.tsx` | Dilarang: **tidak boleh ada navbar/header/logo/menu di konten** |
| Latar gelap `#070b14` dengan gradien gelap | `StoryStage.tsx` | Harus **terang dan cerah** sesuai palet `prompt-revisi.md` §4 |
| `<StoryDetails />` dirender di bawah stage | `app/page.tsx` | Itu section ala landing page. Hapus dari alur utama |
| Karakter = `Person` dari lingkaran dan garis (stick figure) | `SceneVisuals.tsx` | Kasar dan tidak ekspresif. Tidak memenuhi kebutuhan "karakter" dan "gambar jantung" |
| Tidak ada `three` / `@react-three/fiber` / `drei` di dependencies | `package.json` | Scene CPR 3D dengan kamera berpindah belum ada (boleh menyusul di fase 3D) |

## 2. Yang DIPERTAHANKAN (jangan dibuang)

- Setup project: Next, Tailwind v4, TypeScript, ESLint, font (`next/font`), versi paket terbaru.
- `lib/gsap.ts`, `lib/lenis.ts`, `SmoothScrollProvider`, `useReducedMotion`.
- `data/content.ts`, `data/references.ts`, `Disclaimer`, `References`, `MotionToggle` (tombol kecil di pojok boleh tetap).
- Teks medis dan sumber yang sudah diverifikasi. Teks di `story.ts` boleh dipakai ulang bila sesuai storyboard, tapi harus dipersingkat (maks 1-2 kalimat).

## 3. Yang DIHAPUS / DIGANTI

1. Hapus `StoryHeader`, `StoryHud`, `SceneNav`, logo dan judul di dalam konten. Sisakan hanya progress bar tipis dan tombol "Kurangi animasi" kecil.
2. Hapus `<StoryDetails />` dari `page.tsx` (isinya pindahkan ke scene Kredit di akhir cerita, bukan section terpisah).
3. Hapus seluruh sistem ketukan (`restart()`, `setScene`, `beatInScene`, animasi durasi tetap per beat).
4. Ganti latar gelap menjadi terang. Tiap scene punya warna pastel berbeda sesuai palet.
5. Ganti `Person` stick figure dengan karakter ilustrasi yang layak (lihat bagian 5).

## 4. Mesin baru: Scene Engine (scrub)

Buat `components/story/Scene.tsx` dan `lib/sceneTimeline.ts`:

- Setiap scene: `100svh`, `ScrollTrigger` dengan `pin: true`, `scrub: 1` (atau `true`), `anticipatePin: 1`, `end: "+=300%"` (sesuaikan), `invalidateOnRefresh: true`.
- Satu timeline GSAP per scene dengan fase **IN, HOLD, OUT** yang dikendalikan scroll. Tidak ada `restart()`, tidak ada durasi yang berjalan sendiri.
- Elemen di dalam scene masuk dari **minimal 3 arah berbeda**, lalu terus bergerak selama scene (geser, rotasi, skala, MotionPath), lalu keluar ke arah berbeda.
- Transisi antar scene: wipe `clip-path`, slide, atau zoom. Latar scene baru berganti warna.
- Semua dua arah. Scroll naik membalik animasi dengan mulus.
- Gunakan `gsap.matchMedia()` untuk mobile dan desktop. Reduced motion: transisi fade sederhana, scene tetap berurutan.

## 5. Visual: berhenti menggambar karakter dari primitif

Menggambar manusia dari lingkaran dan garis hasilnya kasar. Ganti dengan **aset ilustrasi berlisensi bebas yang kemudian dianimasikan dengan GSAP**:

- **Karakter dan objek:** ilustrasi vektor (SVG) bergaya flat dengan lisensi yang membolehkan pemakaian dan modifikasi. Butuh: orang berdiri, orang jatuh/rebah, orang berlutut dan menekan dada, orang menelepon, orang berlari, siluet kerumunan, jantung, otak, AED, ambulans, telepon, jam.
- **Motion graphic:** boleh pakai animasi Lottie/dotLottie berlisensi bebas untuk jantung berdenyut, ripple, confetti halus, atau EKG, dikendalikan lewat scroll (frame mengikuti progress).
- **Cara kerja aset:** jika kamu bisa mengunduh aset dari internet, lakukan dan simpan di `public/assets/`. **Jika tidak bisa**, jangan menggambar ulang dari primitif. Buat daftar kebutuhan aset (nama, pose, gaya, ukuran) di `ASSETS-NEEDED.md` dan minta aku yang mengunduhnya.
- **Wajib:** catat setiap aset (sumber, pembuat, lisensi, URL) di `CREDITS.md` dan tampilkan di scene Kredit. Hanya pakai aset yang lisensinya jelas membolehkan penggunaan seperti ini. Jangan pakai aset yang melarang modifikasi atau penggunaan di kompetisi.
- Warna aset diselaraskan dengan palet lewat CSS (fill di-override) agar konsisten.
- Jantung, EKG, jam, panah, dan ikon sederhana boleh dibuat sendiri dengan SVG karena bentuknya sederhana. **Karakter manusia tidak.**

## 6. Cara mengerjakan (urutan, JANGAN lompat)

1. **Laporkan rencana** dalam 8 baris: apa yang dihapus, apa yang dipertahankan, aset apa yang kamu butuhkan.
2. **Bangun Scene Engine + 3 scene saja:** scene 0 Sampul, scene 1 Tahukah kamu, scene 6 Tiba-tiba (sesuai `prompt-revisi.md` §8).
3. **Ambil screenshot** di lebar 390 dan 1280 px, simpan di `docs/screens/`, jalankan `npm run build` dan `npm run lint`, commit, lalu **berhenti dan tunggu aku cek.**
4. Setelah aku setuju, lanjut scene P1, lalu P2, lalu fase 3D, lalu polish dan deploy.

Judul/nama proyek: simpan di **satu konstanta** (`storyMeta.title`) karena nama final belum diputuskan.

## 7. Cek sebelum bilang selesai

- [ ] Tidak ada header/logo/navbar/menu/titik navigasi di dalam cerita.
- [ ] Semua scene di-pin, scrub kontinu, bisa mundur saat scroll naik.
- [ ] Tidak ada `restart()` atau durasi animasi yang jalan sendiri.
- [ ] Latar terang, palet sesuai `prompt-revisi.md`.
- [ ] Karakter berupa ilustrasi layak, bukan stick figure. Semua aset tercatat di `CREDITS.md`.
- [ ] Teks maksimal 1-2 kalimat per beat.
- [ ] Tidak ada section ala landing page.

Jika ada yang ragu, **tanya aku dulu, jangan menebak.**