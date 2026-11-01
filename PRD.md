# PRD: "4 Menit Emas"

Web scrollytelling satu halaman tentang henti jantung dan CPR, untuk INVOFEST 2026 (Web Design Competition).

- **Subtema:** Health & Well-being for All (SDG 3)
- **Tema lomba:** Smart Ecosystems: Digital Solutions for a Sustainable Future
- **Deadline pengumpulan karya:** 7 November 2026
- **Status dokumen:** v1.0, dibuat 1 November 2026

---

## 1. Ringkasan

**Satu kalimat:** Halaman scrollytelling yang membuat pengunjung *merasakan* pentingnya menit-menit awal henti jantung, lalu mengajarkan langkah CPR dan AED lewat dua jalur cerita (tidak ada yang menolong vs ada yang menolong) dengan karakter 3D ringan, kamera sinematik, dan animasi detak jantung.

**Posisi di tema "Smart Ecosystems":** keselamatan korban henti jantung adalah *ekosistem*: warga terlatih, nomor darurat (112/119), AED, ambulans, rumah sakit. Web ini adalah solusi digital edukasi yang menghubungkan pengunjung ke ekosistem itu. Bagian penutup memvisualkan "Rantai Kelangsungan Hidup" (Chain of Survival) sebagai ekosistem.

**Sifat karya:** media edukasi berbasis riset, bukan alat diagnosis dan bukan pengganti pelatihan resmi.

## 2. Tujuan dan non-tujuan

**Tujuan**
1. Menang di kriteria juri: Tampilan & Desain (30%), Kreativitas & Inovasi (25%), Kemudahan Pengguna & Responsibilitas (20%), Originalitas (15%), Kesesuaian Tema (10%).
2. Pengunjung paham 5 hal: kenali, panggil, tekan, AED, lanjutkan.
3. Setiap klaim angka punya sumber jurnal yang tampil di UI.
4. Berjalan mulus di HP, tablet, dan desktop.
5. Selesai dan terkirim sebelum 7 November 2026.

**Non-tujuan**
- Bukan aplikasi dengan akun, backend, atau database.
- Bukan simulasi medis akurat atau alat pelatihan bersertifikat.
- Tidak mencakup CPR bayi dan anak secara detail (cukup catatan "berbeda, ikuti pelatihan").
- Tidak ada konten yang menyalahkan pihak mana pun (aturan lomba: tidak boleh menyudutkan).

## 3. Persona

| Persona | Kebutuhan | Cara web melayani |
|---|---|---|
| **Juri lomba** | Cepat menilai desain, kreativitas, kegunaan, kesesuaian tema | Hero kuat, animasi bervariasi, referensi jelas, panduan navigasi |
| **Mahasiswa/pelajar (target utama)** | Tahu harus apa saat ada yang kolaps | Langkah singkat, visual, mobile-friendly |
| **Pengguna dengan aksesibilitas** | Bisa mengakses tanpa animasi atau dengan keyboard | Mode kurangi animasi, kontras tinggi, teks alternatif |

## 4. Aturan lomba yang wajib dipenuhi (dari guidebook)

- Dibuat dengan HTML, CSS, JavaScript. Boleh framework, **dilarang full template**, **dilarang CMS**.
- Tema harus sesuai, pilih satu subtema (Health & Well-being, SDG 3).
- Konten edukatif, menginspirasi, tidak merendahkan atau menyudutkan pihak mana pun, tanpa pornografi/SARA.
- Karya orisinal, belum pernah dipublikasikan atau menang. Perlu lembar orisinalitas.
- Deliverable: PDF deskripsi karya, link folder Drive/GitHub, video penjelasan/demo 3-10 menit (min 720p, publik).
- **Aset pihak ketiga (model 3D, font, ikon) harus berlisensi bebas dan dicantumkan.** Rekomendasi: karakter dibuat prosedural dari primitif three.js, sehingga bebas masalah lisensi.

## 5. Struktur narasi (satu halaman)

Urutan sesuai keinginan tim: **Hook, Masalah + jurnal, Use case, Tata cara CPR (dua jalur), Penutup.**

### S1. Hero Hook
- **Tujuan:** menarik perhatian dalam 5 detik dengan pernyataan mengejutkan (clickbait yang jujur dan bersumber).
- **Contoh teks:** "Tahukah kamu? Di luar rumah sakit, hanya sekitar 4 dari 10 orang yang henti jantung mendapat CPR dari orang di sekitarnya." (Sumber: AHA 2025, data AS. Label negara data jelas.)
- **Visual:** layar gelap, garis EKG berdetak lalu melambat mengikuti scroll, judul "4 Menit Emas" masuk dari atas, tombol "Mulai" dan indikator scroll.
- **Animasi:** judul turun dari atas (y negatif ke 0), garis EKG di-scrub, vignette merah menguat.

### S2. Masalah + Jurnal
- **Tujuan:** membangun kredibilitas dan urgensi lewat data.
- **Isi:** 3 kartu statistik (lihat bagian 12), grafik "peluang selamat menurun tiap menit" digambar mengikuti scroll (label: *ilustrasi dari model penelitian*), catatan sumber kecil di tiap kartu.
- **Animasi:** kartu 1 dari kiri, kartu 2 dari kanan, kartu 3 dari bawah, grafik line-draw (strokeDashoffset) di-scrub, angka count-up.

### S3. Use Case
- **Tujuan:** membuat pengunjung merasa "ini bisa terjadi di tempat saya".
- **Isi:** cerita singkat dan netral di tempat umum (misal kantin kampus). Seseorang tiba-tiba kolaps. Orang di sekitar bingung harus apa.
- **Visual:** parallax berlapis (latar, tokoh siluet, foreground), cahaya meredup.
- **Animasi:** lapisan bergerak beda kecepatan, teks masuk dari kanan, siluet geser dari kiri, zoom-in ke korban.

### S4. Tata Cara CPR: dua jalur (section utama, pinned, ada 3D)
Satu scene 3D, timer 0:00 sampai 4:00 di tiap jalur.

**Jalur A: "Tidak Ada yang Menolong"** (bukan menyalahkan: framing = "tidak ada yang tahu caranya")
| Timer | Kejadian | Visual |
|---|---|---|
| 0:00 | Korban kolaps | Kamera wide high-angle, EKG normal lalu tidak teratur |
| 0:30 | Orang sekitar ragu, tidak tahu harus apa | Siluet membeku, teks "Bingung itu wajar" |
| 1:00 | Bantuan belum tiba | Garis rute ambulans di peta mini bergerak pelan |
| 2:00 | Kondisi memburuk | EKG melemah, warna layar mendingin |
| 4:00 | Tanpa pertolongan, peluang terus menurun | EKG garis datar, layar redup, tampil statistik penurunan per menit |

**Transisi "Rewind":** timer berputar mundur ke 0:00, efek glitch/rewind, teks "Bagaimana jika ada yang tahu caranya?". (Scrub maju dan mundur bekerja natural.)

**Jalur B: "Ada yang Menolong"** (isi langkah wajib akurat, lihat bagian 11)
| Timer | Langkah | Kamera | Visual |
|---|---|---|---|
| 0:00 | **Aman & kenali.** Pastikan aman, tepuk bahu, cek respons dan napas (maks 10 detik). Napas terengah-engah bukan napas normal | Wide 3/4 | Penolong berlutut, teks langkah dari kiri |
| 0:15 | **Panggil.** Hubungi 112/119, aktifkan speaker, minta orang lain mencari AED | Medium dari samping | Ikon telepon masuk dari kanan, orang kedua berlari mengambil AED |
| 0:30 | **Tekan.** Telapak tangan di tengah dada, 100-120 kali/menit, kedalaman 5-6 cm, biarkan dada naik kembali | Side profile lalu close-up depan ke tangan | Animasi kompresi prosedural, counter, EKG berdenyut mengikuti ritme, metronom opsional |
| 2:00 | **AED.** Nyalakan, ikuti suara, tempel pad, jauhi korban saat analisis dan kejutan | Top-down (bird's eye) | Posisi pad ditandai, panel langkah AED di-pin dan diputar lewat scroll |
| 3:00 | **Lanjutkan.** Teruskan kompresi, bergantian penolong sekitar tiap 2 menit | Orbit pelan | Dua penolong bertukar posisi |
| 4:00 | **Bantuan medis tiba.** Serahkan ke petugas | Pull-back wide | EKG berubah ke ritme hijau/teal, teks "CPR tidak menjamin selamat, tetapi memberi peluang" |

### S5. Penutup
- **Isi:** ringkasan 5 langkah, **Rantai Kelangsungan Hidup** sebagai ekosistem (penolong awam, 112/119, AED, ambulans, rumah sakit, pemulihan), ajakan (ikut pelatihan BHD resmi, simpan nomor darurat, bagikan), **Referensi**, **Disclaimer**, kredit (tim, lisensi aset).
- **Animasi:** node rantai muncul bergantian dari kiri-kanan, kartu referensi naik dari bawah.

## 6. Sistem animasi scroll (wajib bervariasi dan dua arah)

**Prinsip:** semua animasi utama pakai **scrub** (mengikuti posisi scroll) sehingga maju saat scroll turun dan mundur saat scroll naik. Hindari animasi "sekali jalan" kecuali dekoratif kecil.

**Katalog efek yang harus dipakai (minimal satu kali masing-masing):**

| Efek | Arah/Teknik | Dipakai di |
|---|---|---|
| Masuk dari atas | y: -120 ke 0 + fade | Hero judul |
| Masuk dari kiri | x: -140 ke 0 | Kartu statistik 1, langkah CPR, siluet use case |
| Masuk dari kanan | x: 140 ke 0 | Kartu statistik 2, ikon telepon, teks use case |
| Masuk dari bawah | y: 120 ke 0 | Kartu statistik 3, referensi |
| Line draw SVG | strokeDashoffset | Grafik penurunan peluang, EKG, rute ambulans |
| Count-up | angka naik mengikuti scroll | Statistik, timer |
| Parallax berlapis | kecepatan beda per layer | Use case |
| Zoom/scale | scale 1 ke 1.15 + clip-path | Transisi use case ke S4 |
| Pinned + scrub | section menempel, scroll memutar timeline | S4 penuh, langkah AED |
| Text split reveal | huruf/kata muncul bertahap | Hook, judul section |
| Rewind/glitch | timeline dibalik + filter | Transisi Jalur A ke B |
| Horizontal travel | elemen bergerak horizontal saat scroll vertikal | Rute ambulans, rantai kelangsungan hidup |

**Smooth scroll:** Lenis, disinkronkan dengan ScrollTrigger (`lenis.on('scroll', ScrollTrigger.update)` dan `gsap.ticker`).

**Aturan performa animasi:** animasikan `transform` dan `opacity` saja, `will-change` hanya saat aktif, jangan animasi `top/left/width/height`.

## 7. Spesifikasi 3D

**Pendekatan:** satu `<Canvas>` fixed di S4, di-lazy-load saat section mendekati viewport. Seluruh karakter dan environment **prosedural low-poly** (primitif three.js) agar ringan, tanpa masalah lisensi, dan gerakannya bisa diatur presisi.

**Karakter (stylized, bukan realistis, tidak grafis):**
- **Korban:** terbaring, kepala bulat, torso, lengan, kaki dari kapsul/silinder. Warna netral.
- **Penolong:** berlutut di samping korban, lengan lurus. Rig sederhana: grup `torso`, `armL`, `armR`, `head`.
- **Penolong kedua / orang sekitar:** siluet atau low-poly lebih sederhana.
- Ekspresi wajah tidak wajib. Pakai bentuk minimalis.

**Animasi CPR prosedural:**
- Frekuensi **110 kompresi/menit** (≈1,83 Hz), amplitudo dada sesuai 5-6 cm skala scene.
- Gerak turun-naik penuh (ada fase naik kembali / recoil).
- Kecepatan animasi bisa mengikuti scroll (aktif saat berada di langkah "Tekan").
- Opsional: tombol metronom 110 BPM via Web Audio, **default mati**, hanya aktif setelah klik pengguna.

**Kamera sinematik (mulus, dua arah):**
- Kamera bergerak sepanjang kurva `CatmullRomCurve3` untuk posisi, kurva kedua untuk titik lihat (lookAt).
- Progress 0..1 dari ScrollTrigger scrub, lalu di-*damp* (lerp atau `gsap` scrub 0.6-1) agar halus.
- **Keyframe awal (satuan meter, korban berbaring sepanjang sumbu X, dada di sekitar (0, 0.25, 0)). Nilai ini titik awal, tuning visual wajib:**

| Progress | Angle | Posisi kamera | Lihat ke |
|---|---|---|---|
| 0.00 | Wide 3/4 high | (4.5, 3.2, 5.5) | (0, 0.3, 0) |
| 0.25 | Samping (profil) | (0, 0.9, -3.0) | (0, 0.35, 0.1) |
| 0.45 | Depan, close-up tangan | (0.2, 1.1, 1.6) | (0, 0.3, 0) |
| 0.65 | Atas (top-down) | (0, 4.5, 0.01) | (0, 0, 0) |
| 0.85 | Orbit pelan | (-3.0, 1.8, 3.5) | (0, 0.4, 0) |
| 1.00 | Pull-back wide | (-4.0, 2.5, 4.5) | (0, 0.5, 0) |

- FOV 35-45 untuk kesan sinematik. Hindari lompatan, jangan menembus objek.

**Pencahayaan dan gaya:** 1 directional + ambient + sedikit rim light berwarna, tanpa shadow realtime berat (gunakan contact shadow murah atau blob shadow). Material `MeshStandardMaterial` flat/toon-ish.

**Efek lain (non-3D):**
- **EKG/detak jantung:** komponen SVG/canvas 2D overlay. State: `normal` (72 BPM), `irregular`, `weak`, `flatline`, `cpr` (denyut mengikuti kompresi), `recovered`. Berubah mengikuti progress scroll.
- Vignette merah/teal, grain halus, glitch saat rewind (CSS/SVG filter ringan).
- Haptic/getar: **tidak dipakai**.

**Budget:**
- Total aset 3D (jika ada) < 1 MB. Rekomendasi: 0 file (prosedural).
- Poly count scene < 30k triangles. Draw calls < 60.
- DPR dibatasi: desktop max 2, mobile max 1.5, turun ke 1 bila FPS rendah.
- Jangan render canvas saat section di luar viewport (`frameloop="demand"` atau pause).

**Fallback:**
1. Deteksi kemampuan: `hardwareConcurrency`, `deviceMemory`, tidak ada WebGL, atau FPS rata-rata di bawah 30 (gunakan `PerformanceMonitor` dari drei) maka tampilkan **versi 2D** (ilustrasi SVG berurutan dengan transisi yang sama).
2. `prefers-reduced-motion` atau toggle "Kurangi animasi": matikan scrub dramatis, kamera 3D jadi pose statis per langkah, scroll biasa.

## 8. Desain visual

**Arah:** gelap sinematik, kontras tinggi, terasa mendesak tapi tidak menakutkan. Gaya modern editorial.

**Font (via `next/font/google`, self-hosted otomatis):**
| Peran | Font | Alasan |
|---|---|---|
| Display / judul | **Bricolage Grotesque** (variable) | Ekspresif, karakter kuat, bagus untuk hook |
| Body / UI | **Plus Jakarta Sans** | Dirancang di Indonesia, sangat terbaca |
| Angka timer/data | **JetBrains Mono** | Angka monospaced stabil untuk timer dan counter |

**Palet warna (token CSS, wajib lolos kontras WCAG AA untuk teks):**
| Token | Hex | Kegunaan |
|---|---|---|
| `--bg` | `#0B0F1A` | Latar utama |
| `--surface` | `#121826` | Kartu, panel |
| `--text` | `#F4F6FB` | Teks utama |
| `--muted` | `#9AA3B8` | Teks sekunder |
| `--alert` | `#FF3B4E` | Detak jantung, bahaya, Jalur A |
| `--hope` | `#2DD4BF` | Penolong, AED, Jalur B |
| `--warn` | `#FFB020` | Peringatan, highlight angka |

- Jalur A: dominan abu-biru dingin dan merah. Jalur B: teal hangat dan putih. Perbedaan tidak boleh hanya bergantung pada warna: sertakan **label teks dan ikon** (ramah buta warna).
- Spasi lega, grid 12 kolom desktop, 4 kolom mobile. Radius 16-24 px. Ikon: `lucide-react`.

**Tipografi responsif:** pakai `clamp()` untuk ukuran judul. Body minimal 16 px. Lebar baris 60-75 karakter.

## 9. Responsif dan aksesibilitas

**Breakpoint:** 360, 390 (HP), 768 (tablet), 1024, 1280, 1536+ (desktop). Tes juga landscape HP.

**Layout S4:**
- **Desktop (≥1024):** canvas 3D sticky di kanan (~60%), panel langkah di kiri (~40%).
- **Tablet:** canvas sticky di atas (50vh), panel di bawah.
- **HP:** canvas sticky di atas (~45vh), panel langkah seperti bottom sheet di bawah, teks singkat. Tinggi memakai `svh/dvh` agar aman dari address bar.
- Gunakan `gsap.matchMedia()` untuk animasi berbeda per ukuran layar dan `ScrollTrigger.refresh()` saat resize/orientasi.

**Aksesibilitas wajib:**
- Skip link, landmark semantik (`header/main/section/footer`), urutan heading benar (satu `h1`).
- Semua konten penting tersedia sebagai **teks nyata** (bukan hanya di canvas). Canvas `aria-hidden`, dengan ringkasan teks setara.
- Fokus terlihat jelas, bisa dinavigasi keyboard, tombol berukuran minimal 44x44 px.
- Tombol "Kurangi animasi" mudah ditemukan dan mengikuti `prefers-reduced-motion`.
- Tidak ada konten berkedip lebih dari 3 kali per detik (hindari kilatan EKG/glitch agresif).
- Timer dan angka tidak diumumkan terus-menerus ke screen reader (hindari `aria-live` berisik).
- Tidak ada audio otomatis.

## 10. Arsitektur teknis

**Stack (WAJIB versi terbaru stabil saat dikerjakan. Agent harus memverifikasi dengan `npm view <paket> version` dan jangan memakai versi dari ingatan):**

| Kebutuhan | Paket |
|---|---|
| Framework | `next` (versi stabil terbaru, App Router, Turbopack). Per pengecekan 1 Nov 2026 jalur 16.x (16.4.x) |
| UI | `react`, `react-dom` (19.x terbaru, sesuai peer dependency Next) |
| Bahasa | TypeScript strict |
| Styling | `tailwindcss` v4 (CSS-first config) + CSS variables |
| Animasi scroll | `gsap` (+ `ScrollTrigger`, plugin lain yang tersedia gratis) dan `@gsap/react` (`useGSAP`) |
| Smooth scroll | `lenis` |
| 3D | `three`, `@react-three/fiber` (v9+, wajib agar kompatibel React 19), `@react-three/drei` (v10+) |
| State ringan | `zustand` |
| Ikon | `lucide-react` |
| Deploy | Vercel |

> Catatan kompatibilitas: R3F v9 diperlukan untuk React 19. Setelah install, jalankan build dan pastikan tidak ada peer dependency warning serius. Jika ada konflik, pilih versi terbaru yang saling kompatibel dan catat di `DECISIONS.md`.

**Struktur folder:**
```
src/
  app/
    layout.tsx          # font, metadata, providers
    page.tsx            # susun semua section
    globals.css         # token warna, base styles
  components/
    sections/           # Hero, Problem, UseCase, CprStory, Closing, References
    three/              # Scene, Character, CameraRig, Environment
    ui/                 # Timer, EcgLine, StatCard, StepPanel, MotionToggle, Disclaimer
  lib/
    gsap.ts             # register plugin, helper
    cameraPath.ts       # keyframe + kurva kamera
    scrollStore.ts      # zustand: progress, path A/B, step, ecgState
  data/
    content.ts          # semua teks (Bahasa Indonesia)
    references.ts       # daftar jurnal
  hooks/
    useReducedMotion.ts
    useDeviceTier.ts
public/
  og.png, favicon
DECISIONS.md
README.md
```

**Aturan kode:** komponen client hanya bila perlu (`"use client"`), canvas dimuat dengan `next/dynamic` (`ssr: false`), cleanup semua ScrollTrigger/rAF/event listener, tidak ada `localStorage` wajib (boleh untuk preferensi motion).

## 11. Panduan konten medis (guardrail)

Semua langkah harus konsisten dengan **AHA 2025 Guidelines for CPR and ECC** dan ditulis untuk **dewasa**. Jika ragu, jangan menulis klaim baru: tulis netral atau hilangkan.

Isi yang boleh ditampilkan:
1. Mulai CPR bila dewasa **tidak responsif dan tidak bernapas normal** (napas terengah-engah bukan napas normal).
2. Panggil bantuan (112 nasional, 119 darurat medis Kemenkes) dan minta AED. Gunakan speaker agar operator bisa memandu.
3. Kompresi: **100-120/menit**, kedalaman **minimal 5 cm dan tidak melebihi 6 cm**, biarkan dada naik penuh, minimalkan jeda.
4. Orang awam **belum terlatih**: boleh hands-only. **Terlatih dan mampu**: 30 kompresi : 2 napas.
5. AED: nyalakan, ikuti petunjuk suara, tempel pad, pastikan tidak ada yang menyentuh korban saat analisis/kejutan. AED aman untuk semua korban; hargai martabat korban (minta orang lain membantu menutupi), jangan menunda penggunaan.
6. Ganti penolong sekitar tiap 2 menit bila ada orang lain.
7. Lanjutkan sampai petugas medis tiba atau korban menunjukkan tanda hidup.

Larangan:
- Tidak boleh mengklaim "4 menit" sebagai batas pasti kerusakan otak atau kematian. "4 Menit Emas" adalah **perangkat naratif** untuk menekankan menit-menit awal. Tulis catatan ini di halaman.
- Tidak boleh menjanjikan korban pasti selamat.
- Tidak ada visual darah, luka, atau kematian grafis.
- Cantumkan disclaimer: konten edukasi umum, bukan pengganti pelatihan resmi. Ajak pengunjung ikut pelatihan BHD (PMI, rumah sakit, organisasi profesi).
- Catatan: CPR bayi dan anak berbeda, ikuti pelatihan khusus.

## 12. Data dan jurnal (untuk `src/data/references.ts`)

Gunakan hanya sumber di bawah (sudah diverifikasi keberadaannya lewat pencarian). **Kutip sendiri dengan kata-kata sendiri, jangan menyalin paragraf.** Kutipan pendek (di bawah 15 kata) hanya bila perlu. Sumber bertanda ⚠ perlu dicek ke teks aslinya sebelum angkanya dipajang.

**Inti (primer)**
1. Del Rios M, et al. *Part 1: Executive Summary: 2025 American Heart Association Guidelines for CPR and ECC.* Circulation. 2025;152(suppl 2):S284-S312. DOI: 10.1161/CIR.0000000000001372. Dipakai untuk: persentase CPR oleh orang sekitar (41,7% pasien OHCA dewasa di AS pada 2024), survival to discharge setelah OHCA dewasa 10,5%.
2. *Part 7: Adult Basic Life Support: 2025 AHA Guidelines for CPR and ECC.* Circulation. 2025;152(16_suppl_2):S448-S478. DOI: 10.1161/CIR.0000000000001369. Dipakai untuk: langkah BLS, rate, depth, AED, hands-only vs 30:2.
3. Larsen MP, Eisenberg MS, Cummins RO, Hallstrom AP. *Predicting survival from out-of-hospital cardiac arrest: a graphic model.* Ann Emerg Med. 1993;22(11):1652-1658. PubMed ID 8214853. Dipakai untuk: grafik model penurunan peluang selamat per menit. ⚠ Abstrak menyebut model: 67% dikurangi 2,3% per menit sampai CPR, 1,1% per menit sampai defibrilasi, 2,1% per menit sampai ACLS (total tanpa tindakan sekitar 5,5%/menit). Angka populer "7-10% per menit tanpa CPR, 3-4% bila CPR segera" sering dikutip dari studi yang sama lewat ringkasan AHA. **Pilih satu angka, tulis sumbernya persis, dan beri label "perkiraan model, bukan kepastian individu".**
4. Stieglis R, et al. (Amsterdam UMC), 2024. Studi 3.723 pasien OHCA yang disaksikan dengan VF di Belanda Utara: tiap menit penundaan kejutan pertama dikaitkan dengan penurunan peluang selamat sekitar 6%. ⚠ Cari kutipan lengkap (jurnal, tahun, DOI) sebelum dipakai.

**Konteks Indonesia (sekunder, perlu dicek ke sumber primer)**
5. Binakes: Jurnal Pengabdian Kesehatan, Vol 6 No 1, 2025 (Poltekkes Kemenkes Jambi), artikel pembentukan bystander CPR melalui pelatihan BHD. ⚠ Menyebut estimasi sekitar 360.000 kejadian henti jantung di luar rumah sakit per tahun di Indonesia (dikutip dari Kemenkes RI 2022). Cari rujukan primer Kemenkes sebelum angka ditampilkan, atau tulis "sekitar" dan sebut sumber sekunder.
6. Purwadi H, et al. JPMIS (Jurnal Pengabdian Masyarakat Indonesia Sejahtera), Vol 2 No 3, September 2023. DOI: 10.59059/jpmis.v2i3.294. Dipakai untuk: hands-only CPR dan rendahnya pengetahuan/keterampilan CPR.
7. Jurnal Pengabdian Kepada Masyarakat (JPKM) Unimed, artikel BHD awam. ⚠ Memuat data bahwa CPR oleh orang awam di negara Asia berkisar 10,5% sampai 40,9% (dikutip dari Ong 2015). Cari Ong ME et al. 2015 sebagai sumber primer.

**Nomor darurat Indonesia:** 112 (Panggilan Darurat Nasional), 119 (darurat medis Kemenkes, juga lewat aplikasi SATUSEHAT Mobile). Beberapa sumber populer menulis 118 untuk ambulans. Pakai **112 dan 119** dan catat sumber resmi (Kemenkes/Komdigi) di halaman.

**Draft kartu statistik S2 (tentukan angka final setelah cek sumber):**
- Kartu 1: "±41,7%": orang dewasa OHCA di AS yang mendapat CPR dari orang sekitar (AHA 2025, data AS 2024).
- Kartu 2: "tiap menit": peluang selamat turun saat pertolongan tertunda (Larsen 1993 / Stieglis 2024, perkiraan).
- Kartu 3: "±360 ribu": perkiraan kejadian OHCA per tahun di Indonesia (Kemenkes, via Binakes 2025, ⚠ verifikasi).

## 13. Performa dan kualitas (target)

- Lighthouse mobile: Performance ≥ 85, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 90.
- LCP < 2,5 detik pada 4G cepat, CLS < 0,1, tidak ada layout shift saat font/canvas dimuat.
- JS awal (tanpa chunk 3D) < 200 KB gzip. Chunk 3D dimuat lazy.
- 60 FPS target di desktop, minimal 30 FPS di HP menengah. Bila turun, otomatis degradasi (DPR turun, lalu fallback 2D).
- Gambar: `next/image`, format modern, ukuran sesuai. Tidak ada aset di atas 500 KB tanpa alasan.

## 14. Risiko dan mitigasi

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Waktu sangat singkat (6 hari) | Tidak selesai | Bangun 2D dulu penuh, 3D menyusul, fallback 2D selalu siap |
| 3D berat di HP | Lag, juri membuka di HP | Prosedural low-poly, DPR cap, PerformanceMonitor, fallback 2D |
| ScrollTrigger + pin rusak saat resize/orientasi | Layout kacau | `matchMedia`, `refresh()` terkontrol, tes 360/768/1280 |
| Konflik versi R3F/React | Build gagal | Pakai R3F v9, verifikasi peer deps, catat di `DECISIONS.md` |
| Angka medis salah | Kredibilitas dan keselamatan | Ikuti guardrail bagian 11, tampilkan sumber, label perkiraan |
| Dianggap "dipublikasikan sebelumnya" | Diskualifikasi | Tanyakan panitia (CP: Nissa 0838-2093-1296) soal deploy Vercel dan repo publik |
| Konten dianggap menyudutkan | Pelanggaran aturan | Framing Jalur A = "tidak tahu caranya", bukan menyalahkan |

## 15. Rencana kerja (1-7 November 2026)

| Tanggal | Target |
|---|---|
| 1-2 Nov | Daftar lomba (Gelombang 3), setup project, design tokens, semua section 2D dengan animasi scroll, `content.ts` dan `references.ts` |
| 3-4 Nov | Scene 3D: karakter prosedural, animasi CPR, kamera path, EKG state, integrasi scroll |
| 5 Nov | Responsif (HP/tablet/desktop), aksesibilitas, mode kurangi animasi, fallback 2D, optimasi performa |
| 6 Nov | QA, Lighthouse, deploy Vercel, rekam video (min 720p, 3-10 menit, publik) |
| 7 Nov (pagi) | PDF deskripsi, lembar orisinalitas, link Drive/GitHub, submit. Jangan mepet malam |

## 16. Deliverable dan checklist pengumpulan

- [ ] Web live di Vercel (URL stabil)
- [ ] Repo GitHub (atau folder Drive) dengan README, DECISIONS.md, lisensi aset
- [ ] PDF deskripsi karya: `Web Design INVOFEST 2026_<Nama Tim>_<Nama Ketua>.pdf`
- [ ] Lembar orisinalitas (unduh dari website INVOFEST)
- [ ] Video penjelasan/demo 3-10 menit, min 720p, publik (Drive/YouTube), penamaan sesuai panduan (konfirmasi format ke panitia)
- [ ] Bukti pendaftaran dan pembayaran

## 17. Kriteria penerimaan (Definition of Done)

1. Semua 5 section ada, urutan sesuai bagian 5.
2. Katalog efek bagian 6 terpenuhi, semua dua arah (scroll naik/turun).
3. Scene 3D berjalan: karakter, animasi CPR 110/menit, kamera berpindah mulus melewati 6 keyframe, EKG berubah sesuai state.
4. Dua jalur (A dan B) lengkap dengan transisi rewind.
5. Responsif diuji di 360, 390, 768, 1024, 1280, 1536 piksel, portrait dan landscape.
6. Mode kurangi animasi dan fallback 2D berfungsi.
7. Semua angka punya sumber di UI, halaman Referensi lengkap, disclaimer tampil.
8. Target Lighthouse bagian 13 tercapai atau dijelaskan.
9. `npm run build` dan `npm run lint` bersih, deploy Vercel sukses.
10. Tidak ada template penuh, CMS, atau aset berlisensi tidak jelas.
