# PROMPT UPGRADE: Motion Graphic, Transisi Antar Scene, dan Background Hidup

Arah dasarnya sudah benar (terang, pin + scrub, ilustrasi flat, tanpa navbar). **Jangan ubah arsitektur Scene Engine.** Masalahnya sekarang: tampilannya masih **basic**. Tiap scene hanya berisi satu judul besar di tengah, satu ilustrasi, dan 2-4 bentuk dekoratif, jadi terasa kosong dan statis. Tugas kali ini: tambah **kehidupan visual** tanpa membuatnya ramai.

Aturan sebelumnya tetap berlaku: `prompt-revisi.md`, `prompt-reset.md`, guardrail medis di `PRD.md` §11, teks maksimal 1-2 kalimat, palet terang, tanpa header/navbar/logo di konten, hanya animasi `transform` dan `opacity` (plus `clip-path` untuk transisi).

---

## 1. Dua lapis animasi (inti perbaikan)

Sekarang semua gerak terikat scroll (scrub), jadi saat scroll berhenti **semuanya diam**. Itu yang bikin terasa basic. Pisahkan menjadi dua lapis:

| Lapis | Dikendalikan | Fungsi |
|---|---|---|
| **Scrub timeline** (sudah ada) | Posisi scroll | Elemen masuk, berpindah, keluar, cerita maju |
| **Ambient loop** (BARU) | Waktu (jalan sendiri) | Elemen **tetap hidup saat scroll berhenti** |

Aturan ambient loop:
- Dibuat dengan GSAP `repeat: -1`, `yoyo: true`, `ease: "sine.inOut"`, durasi dan fase **berbeda-beda** tiap elemen supaya tidak terasa serempak (pakai `delay` acak).
- **Hanya jalan saat scene terlihat.** Pakai `ScrollTrigger` (`onToggle`) untuk `play()` dan `pause()`, supaya tidak membebani performa.
- Dimatikan total saat `prefers-reduced-motion` atau tombol "Kurangi animasi".
- Dipisah dari timeline scrub (jangan dimasukkan ke dalamnya).
- Buat helper `lib/ambient.ts` dengan fungsi seperti `float(el)`, `breathe(el)`, `wobble(el)`, `spin(el)`, `pulse(el)`, `drift(el)`, `blink(el)`, `twinkle(el)`.

**Gerak ambient per jenis elemen:**
- Bentuk dekoratif: melayang naik-turun, berputar pelan, berdenyut kecil.
- Jantung: berdenyut dua kali cepat lalu jeda (ritme "lub-dub"), dengan ring ripple yang memancar.
- Garis EKG: garis berjalan terus (dash offset loop).
- Jam: jarum bergerak.
- Awan/bintang: drift pelan, kedip (twinkle).
- Tanda tanya: bergoyang bergantian.
- Karakter yang sadar: berkedip, kepala sedikit miring, bernapas halus (skala 1.0-1.02).
- **Karakter korban (Ardi) JANGAN diberi animasi napas.** Henti jantung berarti tidak bernapas normal. Beri efek lain: ring denyut lemah di sekitar dada atau tanda "!" berkedip pelan.

## 2. Background tidak polos: titik dan grid kecil

Tambah tekstur halus di **setiap scene**, berganti-ganti jenis supaya tidak monoton:

| Jenis | Dipakai di | Gaya |
|---|---|---|
| **Dot grid** (titik kecil rapat) | Sampul, Tahukah kamu, scene hangat | Titik 1.5 px, jarak 22-28 px |
| **Line grid** (kotak kecil) | Scene dingin Jalur A, kantin | Garis 1 px, kotak 32 px |
| **Dot besar jarang + blob lembut** | Scene positif Jalur B | Titik 2 px jarak 40 px + blob blur pastel |

Aturan:
- Opacity rendah (4%-10% dari `--ink`), jangan mengganggu teks. Gunakan `mask-image` radial supaya memudar ke tengah atau pinggir.
- **Bergerak halus:** geser pelan (drift) saat ambient, dan **parallax** terhadap scroll (lebih lambat dari elemen utama), jadi terasa berlapis.
- Tambah 1-2 **blob gradien lembut** besar (blur) sebagai pencahayaan latar, bergerak sangat pelan.
- Contoh dasar (sesuaikan):

```css
.bg-dots {
  background-image: radial-gradient(color-mix(in oklab, var(--ink) 14%, transparent) 1.5px, transparent 1.5px);
  background-size: 24px 24px;
  mask-image: radial-gradient(ellipse at center, transparent 20%, #000 85%);
}
.bg-grid {
  background-image:
    linear-gradient(color-mix(in oklab, var(--ink) 7%, transparent) 1px, transparent 1px),
    linear-gradient(90deg, color-mix(in oklab, var(--ink) 7%, transparent) 1px, transparent 1px);
  background-size: 32px 32px;
}
```

Buat komponen `components/motion/SceneBackground.tsx` dengan prop `variant` (`dots` | `grid` | `soft`) dan `tint`.

## 3. Transisi antar scene ("splash")

Setiap perpindahan scene harus punya **momen transisi**: sesuatu yang lewat menutupi layar lalu membuka scene berikutnya. Dikendalikan scroll (scrub), dua arah.

**Mekanisme (agar menyatu):**
- Tiap `Scene` punya `TransitionOverlay` di dalam stage.
- Di akhir timeline scene N (fase OUT), overlay **menutup** layar dengan warna dan bentuk tertentu.
- Di awal timeline scene N+1 (fase IN), overlay dengan **warna dan bentuk yang sama** langsung **membuka**, menyingkap latar scene baru.
- Karena warnanya sama, mata melihatnya sebagai satu gerakan mulus.
- Overlay `pointer-events: none`, animasikan hanya `transform` dan `clip-path`.

**Variasi transisi (bergantian, jangan pakai yang sama berturut-turut):**

| Nama | Efek | Arah |
|---|---|---|
| `circle-wipe` | Lingkaran warna membesar dari titik tertentu (misal dari jantung) | dari tengah / pojok |
| `diagonal-stripes` | 4-5 pita warna miring menyapu layar bergantian | kiri ke kanan |
| `wave` | Gelombang cair naik menutupi layar | bawah ke atas |
| `ekg-sweep` | Garis EKG tebal melintas lalu menyapu warna | kanan ke kiri |
| `object-pass` | Objek cerita melintas (ambulans, jam besar, jantung besar, balon tanda tanya) membawa warna di belakangnya | beragam |
| `blob-splash` | Bentuk blob organik "memercik" dari bawah lalu menyebar | bawah ke atas |
| `shutter` | Panel bergaya tirai menutup dan membuka | atas ke bawah |

Pasangkan dengan cerita bila bisa: Sampul ke Tahukah kamu = `circle-wipe` dari jantung; Tahukah kamu ke Tiba-tiba = `diagonal-stripes`; transisi ke Jalur A atau rewind = `ekg-sweep`; ke Jalur B = `blob-splash` atau `wave` hangat; Bantuan tiba = `object-pass` ambulans.

Buat `components/motion/transitions/` berisi tiap varian, plus `lib/transitions.ts` untuk memetakan scene ke varian. Tambahkan ke ketiga scene yang ada (Sampul, Tahukah kamu, Tiba-tiba) untuk uji coba.

## 4. Lebih banyak elemen, tapi terkendali

Tiga lapis kedalaman di tiap scene:

1. **Latar:** tekstur (bagian 2) + blob lembut.
2. **Tengah (dekorasi):** 6-10 elemen kecil bergaya motion graphic.
3. **Depan (cerita):** karakter, objek utama, teks.

**Daftar elemen dekoratif (buat sebagai komponen SVG reusable di `components/motion/`):**
`PlusSign`, `Ring`, `Squiggle` (garis bergelombang), `Star/Sparkle`, `MiniHeart`, `EkgFragment`, `Cross` (palang medis), `Pill`, `Dots cluster`, `Arc/Bracket`, `Cloud`, `Halftone circle`, `SpeedLines`, `ArrowDoodle` (panah tangan yang digambar saat scroll).

**Elemen "motion graphic" yang bikin hidup:**
- **MarqueeTape:** pita miring berisi teks/ikon berulang yang bergeser terus (misal "TAHUKAH KAMU? ★ TAHUKAH KAMU?"). Cocok di scene hook.
- **Sticker pop:** badge dan stiker muncul dengan efek pantul (overshoot) lalu bergoyang kecil.
- **Highlighter swipe:** sapuan stabilo berwarna di belakang kata kunci judul, digambar mengikuti scroll.
- **Squiggle underline:** garis bergelombang yang digambar di bawah kata penting.
- **Angka:** count-up besar dengan ring progress.
- **Teks bertahap:** judul pecah per kata, tiap kata masuk dari arah berbeda.
- **Burst:** ledakan kecil (garis memancar/confetti halus) saat momen penting.

**Aturan kepadatan (supaya tidak ramai):**
- Zona aman tengah: dekorasi **tidak boleh menimpa teks** dan karakter utama. Dekorasi mengisi pinggir dan sudut.
- Maksimal **±40 elemen bergerak per scene** di desktop, **±20 di HP** (kurangi lewat `gsap.matchMedia()`).
- Dekorasi berukuran kecil sampai sedang, opacity 0.35-0.9, warna dari palet. Hanya 1-2 elemen yang "berteriak" per scene.
- Variasikan ukuran, kecepatan, dan kedalaman parallax (elemen jauh lebih lambat dan lebih pucat).
- Cek visual: kalau screenshot terasa sesak, kurangi. Kalau masih terasa kosong di pojok, tambah.

## 5. Karakter jadi bisa dianimasikan

Aset SVG karakter sekarang dipakai sebagai gambar utuh (`<Image>`). Ubah menjadi **komponen SVG inline** dengan grup terpisah (`head`, `body`, `armL`, `armR`, `legL`, `legR`, mata) dan atur `transform-origin` tiap bagian. Dengan begitu bisa: berkedip, melambai, menoleh, menunduk, menunjuk, berlari (kaki bergantian), menekan (lengan naik-turun). Animasi gerak karakter masuk ke ambient loop atau ke scrub sesuai kebutuhan cerita.

## 6. Perbaikan komposisi scene yang ada

Perbaiki tiga scene yang sudah ada:
- **Sampul:** tambah dot grid, ring ripple berdenyut dari jantung, EKG berjalan melintas di belakang jantung, ikon medis melayang, MarqueeTape tipis di bawah.
- **Tahukah kamu:** siluet 10 orang tetap, tambah highlighter pada "4 dari 10", count-up angka besar dengan ring, bintang kecil di sekitar 4 siluet yang menyala, MarqueeTape miring.
- **Tiba-tiba:** line grid dingin, kerumunan dengan gestur bergantian (menoleh, menggaruk kepala), tanda tanya bergoyang berbeda fase, ring denyut lemah di dada Ardi (tanpa animasi napas), bayangan pada lantai, vignette halus.

Pastikan setiap scene punya **komposisi tidak hanya "judul di tengah + gambar di bawah"**: coba judul di kiri dengan ilustrasi besar di kanan di desktop, atau judul bertumpuk miring, atau elemen yang menembus bingkai. Variasikan layout antar scene.

## 7. Performa dan aksesibilitas

- Hanya `transform`, `opacity`, `clip-path`. Gunakan `will-change` hanya saat animasi aktif.
- Ambient loop berhenti saat scene di luar layar. Semua loop dihentikan saat reduced motion (tampilkan versi statis yang tetap rapi).
- Tidak ada kilatan lebih dari 3 kali per detik (hati-hati pada efek burst dan ekg-sweep).
- Transisi tidak boleh menyembunyikan teks penting terlalu lama. Pastikan teks terbaca penuh pada fase HOLD.
- Mobile: kurangi jumlah elemen dan kompleksitas transisi (lingkaran, pita, gelombang tetap boleh, objek berat dikurangi). Target tetap lancar di HP menengah.

## 8. Cara kerja (urutan)

1. **Laporkan rencana** singkat (8 baris): komponen motion apa yang dibuat dan bagaimana struktur ambient dan transisi.
2. Buat `lib/ambient.ts`, `components/motion/*` (SceneBackground, dekorasi, MarqueeTape, TransitionOverlay + varian).
3. Terapkan ke **3 scene yang ada** + 2 transisi (Sampul ke Tahukah kamu, Tahukah kamu ke Tiba-tiba).
4. Ambil screenshot di 390 dan 1280 px untuk: tiap scene saat HOLD, dan **tiap transisi di tengah proses (progress 50%)**. Simpan di `docs/screens/`.
5. Jalankan `npm run build` dan `npm run lint`, commit, lalu **berhenti dan tunggu aku cek.** Jangan lanjut ke scene lain sebelum aku setuju dengan rasanya.

## 9. Cek sebelum bilang selesai

- [ ] Saat scroll berhenti di sebuah scene, elemen-elemennya **tetap bergerak halus** (bukan diam).
- [ ] Setiap scene punya tekstur latar (dot/grid) yang bergerak halus.
- [ ] Setiap pergantian scene ada transisi yang menyatu, dua arah, dan variasinya berbeda.
- [ ] Ada elemen motion graphic (marquee, sticker, highlighter, squiggle, burst) dan bukan hanya bentuk dasar.
- [ ] Tidak sesak: teks dan karakter utama tidak tertimpa dekorasi.
- [ ] Ardi (korban) tidak diberi animasi bernapas.
- [ ] Ambient berhenti di luar layar dan saat reduced motion.
- [ ] Layout antar scene bervariasi, tidak semua "judul di tengah".
- [ ] Build dan lint bersih. Screenshot HOLD dan transisi tersedia di `docs/screens/`.

Jika ada yang ragu atau bertentangan dengan dokumen sebelumnya, **tanya aku dulu, jangan menebak.**