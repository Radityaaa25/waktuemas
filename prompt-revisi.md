# PROMPT REVISI: Arahan Visual & Struktur (WAJIB DIIKUTI, MENGGANTIKAN YANG BERTENTANGAN)

Hasil yang kamu buat sebelumnya **salah arah**. Hasilnya terasa seperti **landing page biasa**. Yang aku mau adalah **buku cerita / presentasi interaktif versi web**: satu cerita utuh yang tersusun dari "scene" layar penuh, dan semuanya bergerak mengikuti scroll.

Dokumen ini **menggantikan** PRD.md bagian 5 (struktur), 6 (sistem animasi), 8 (visual & warna), dan semua instruksi prompt.md yang bertentangan. Bagian lain PRD.md (aturan lomba, guardrail medis di bagian 11, referensi di bagian 12, stack, performa, aksesibilitas) tetap berlaku.

**Jangan mulai dari nol.** Pakai ulang: setup project, `content.ts`, `references.ts`, komponen EKG, logika kamera 3D, helper GSAP/Lenis. Yang diubah: arsitektur halaman, tampilan, dan gaya animasi.

---

## 1. Model mental (baca dulu)

Bayangkan **PowerPoint cerita atau buku bergambar** yang dibaca dengan scroll:
- Layar **tidak ikut bergeser**. Yang bergerak adalah **elemen-elemen di dalamnya**.
- Setiap scroll, elemen **muncul, bergerak, berubah, lalu keluar**, dan scene berikutnya masuk.
- Tidak terasa seperti "membaca halaman web", tapi **menonton cerita yang digerakkan jari**.

## 2. HAPUS dari tampilan

- Navbar, header, menu, logo di dalam konten, footer ala website.
- Hero ala landing page, tombol CTA gaya marketing, grid kartu fitur, section dengan padding vertikal biasa.
- Paragraf panjang. Blok teks berlapis.
- Tema gelap.

**Boleh ada (kecil, tidak mengganggu):** progress bar tipis di tepi layar, dan tombol kecil "Kurangi animasi" di pojok (aksesibilitas).

## 3. Arsitektur: Scene Engine

Buat komponen `<Scene>` yang dipakai untuk **semua** bagian cerita:

- Tinggi `100svh`, **di-pin** dengan ScrollTrigger (`pin: true`, `scrub: true`, `anticipatePin: 1`, `invalidateOnRefresh: true`).
- Panjang scroll per scene (`end: "+=300%"` dsb) disesuaikan jumlah "beat" di dalamnya.
- Tiap scene punya **satu timeline GSAP yang di-scrub**, dengan 3 fase: **IN** (elemen masuk), **HOLD** (elemen hidup: berdenyut, melayang, berputar), **OUT** (elemen keluar ke arah tertentu).
- Transisi antar scene: elemen scene lama **keluar ke arah berbeda**, latar scene baru masuk dengan wipe (`clip-path`), slide, atau zoom.
- Semua dua arah: scroll naik membalik animasi dengan mulus.
- Lenis tetap dipakai untuk kehalusan.

Props yang disarankan: `id`, `bg` (warna latar), `length` (panjang scroll), `children`, `build(tl, refs)`.

## 4. Gaya visual: TERANG, cerah, ilustratif

- **Flat vector illustration** gaya buku cerita modern: bentuk membulat, outline tipis warna navy, warna cerah. Bukan realistis, bukan gelap, bukan "tech neon".
- Setiap scene punya **latar warna pastel berbeda** (blok warna penuh) supaya terasa berganti halaman.
- Ada **elemen dekoratif hidup** di tiap scene agar tidak sepi: bentuk melayang, awan, bintang kecil, lingkaran berdenyut (ripple), garis gerak, partikel halus. Minimal **5-8 elemen bergerak per scene**.

### Palet (token CSS)

```css
:root {
  --paper:  #FFF8EE; /* latar krem seperti kertas */
  --ink:    #1E2A4A; /* teks dan outline (navy) */
  --coral:  #FF5A6E; /* jantung, detak, warna utama */
  --sun:    #FFC94D; /* highlight, angka penting */
  --sky:    #8FD3FF; /* latar scene tenang */
  --mint:   #3CCFA8; /* penolong, AED, Jalur B */
  --peach:  #FFE3D6; /* latar hangat */
  --lilac:  #D9D2FF; /* aksen dekoratif */
  --cool:   #E3E8F5; /* latar Jalur A: terang tapi dingin dan pucat */
}
```

- Teks selalu `--ink` di atas latar terang (cek kontras WCAG AA). Warna mint dan sun dipakai sebagai **fill**, bukan teks kecil.
- **Jalur A** = latar `--cool` dan abu-biru pucat, tetap terang, tanpa gelap. **Jalur B** = `--peach`, `--sun`, `--mint` yang hangat. Bedakan juga dengan **label dan ikon** (jangan hanya warna).
- **Font:** judul besar **Bricolage Grotesque**, teks **Plus Jakarta Sans**, timer/angka **JetBrains Mono**. Ukuran teks **besar** (judul scene `clamp(2rem, 6vw, 5rem)`).

## 5. Aturan teks (singkat, bukan paragraf)

- **Maksimal 1-2 kalimat per beat**, kira-kira 12-15 kata. Satu ide per layar.
- Angka dan fakta dijadikan **visual besar** (angka raksasa, ikon, ilustrasi), bukan kalimat panjang.
- Sumber ditulis kecil di pojok scene (misal "AHA 2025, data AS"), bukan di tengah.
- Makna dan info tetap jelas, tapi ditulis seperti **caption buku cerita**, bukan artikel.

## 6. Elemen visual yang harus ada (bukan cuma teks)

- **Karakter ilustrasi** (2D SVG dari primitif, tanpa file aset berat): Ardi (korban), Sinta (penolong), orang-orang sekitar. Animasi: berjalan masuk, jatuh, berlutut, menekan, berlari, menelepon.
- **Jantung ilustrasi** yang berdenyut (SVG), bisa melambat, berhenti, lalu berdenyut lagi.
- **Garis EKG** yang digambar mengikuti scroll.
- **Objek cerita:** jam/timer, telepon, ambulans, AED, tangan, otak, peta kecil, ikon.
- **Motion graphic dekoratif:** ripple, bentuk melayang, garis kecepatan, confetti halus di momen positif.
- Scene CPR (B3) memakai **3D low-poly prosedural** dengan kamera berpindah (samping, depan, atas), tapi **dengan latar dan pencahayaan terang** sesuai palet. Scene lain cukup 2D agar ringan.

## 7. Arah gerak: semua elemen, bukan hanya teks

Setiap scene wajib memakai **minimal 3 arah masuk berbeda** di antara elemen-elemennya (atas, bawah, kiri, kanan), ditambah rotasi, skala, atau clip-path. **Dilarang** semua elemen masuk dari bawah. Selain masuk, elemen juga **bergerak selama scroll** (bergeser, berputar, membesar, mengikuti jalur), bukan hanya muncul lalu diam.

Contoh pola yang boleh digabung: teks dari atas, karakter dari kiri, benda penting dari kanan, dekorasi dari bawah, jam berputar mengikuti scroll, garis EKG digambar, objek bergerak mengikuti jalur lengkung (MotionPath).

## 8. Storyboard (urutan scene)

Teks di kolom "Teks" adalah **draf pendek**. Jangan ditambah. Angka bertanda ⚠ jangan tampil sebagai fakta final sebelum aku konfirmasi (beri `TODO-VERIFY`).

| # | Scene | Teks (draf) | Elemen utama | Arah gerak (contoh) |
|---|---|---|---|---|
| 0 | **Sampul** | [JUDUL] + "Cerita tentang menit-menit pertama." | Jantung besar berdenyut, bentuk melayang | Judul dari atas, jantung zoom-in dari tengah, bentuk dari kiri dan kanan |
| 1 | **Tahukah kamu?** | "Tahukah kamu? Hanya 4 dari 10 korban henti jantung yang langsung ditolong." (AHA 2025, data AS) | 10 siluet orang, 4 menyala | Siluet masuk bergantian dari 4 arah, 4 yang menyala berkilau |
| 2 | **Apa itu henti jantung?** | "Jantung tiba-tiba berhenti memompa. Darah ke otak ikut berhenti." | Jantung, panah darah, otak | Jantung dari kiri, otak dari kanan, panah digambar mengikuti scroll |
| 3 | **Waktu tidak menunggu** | "Tiap menit tanpa CPR, peluang selamat menurun." (perkiraan model, Larsen 1993) ⚠ | Jam besar berputar, grafik menurun digambar | Jam dari atas berputar mengikuti scroll, garis grafik dari kiri ke kanan |
| 4 | **Di Indonesia** | "Diperkirakan sekitar 360 ribu kasus per tahun." ⚠ "Pelatihan CPR untuk awam masih minim." | Angka raksasa count-up, siluet orang | Angka dari bawah, ikon dari kanan, teks kedua dari kiri |
| 5 | **Cerita dimulai** | "Selasa siang. Kantin kampus." | Kantin ilustrasi berlapis (parallax), Ardi dan teman-teman | Kantin geser horizontal, karakter berjalan masuk dari kiri dan kanan, awan dari atas |
| 6 | **Tiba-tiba** | "Ardi jatuh. Semua berhenti. Semua bingung." | Ardi jatuh, orang-orang membeku, tanda tanya | Ardi rebah dari atas, orang menoleh, tanda tanya muncul dari 4 sudut |
| 7 | **Mitos** | "Tepuk lengan kirinya? Itu mitos. Yang dibutuhkan: CPR." | Kartu mitos membalik jadi fakta | Kartu masuk dari kanan, flip 3D, stempel "MITOS" dari atas |
| 8 | **Jalur A 0:00-1:00** | "Tidak ada yang tahu caranya." "Ambulans masih di jalan." | Timer, jantung melambat, mini-peta ambulans | Timer dari atas, ambulans bergerak horizontal (MotionPath), EKG digambar |
| 9 | **Jalur A 4:00** | "Setiap menit berharga. Tanpa pertolongan, peluang terus menurun." | Garis EKG datar, warna memudar lembut | Elemen keluar perlahan ke samping, latar pucat. **Tanpa visual grafis.** |
| 10 | **Rewind** | "Bagaimana kalau ada yang tahu caranya?" | Timer mundur, efek rewind | Timer berputar mundur mengikuti scroll, glitch ringan, warna berganti hangat |
| 11 | **B1 Pastikan aman & cek** | "1. Pastikan aman. Cek respons dan napas (maks 10 detik)." | Sinta berlutut, tepuk bahu, ikon mata dan telinga | Sinta dari kiri, bubble teks dari atas, ikon dari kanan |
| 12 | **B2 Panggil** | "2. Panggil 112 atau 119. Minta orang lain bawa AED." | Telepon (speaker), orang berlari | Telepon dari kanan, orang berlari melintas kiri ke kanan, ikon AED dari bawah |
| 13 | **B3 Tekan (3D)** | "3. Tekan tengah dada, 100-120 kali per menit, sedalam 5-6 cm." | Scene 3D: Sinta menekan, EKG berdenyut mengikuti ritme, counter | Kamera pindah: samping, depan, atas. Counter dari atas, ritme garis dari kiri |
| 14 | **B4 AED** | "4. Nyalakan AED. Ikuti suara alatnya." | AED, pad ditempel (tampak atas), "jauhi korban" | Panel langkah AED diputar lewat scroll, pad meluncur dari kiri dan kanan |
| 15 | **B5 Lanjutkan** | "5. Lanjutkan. Gantian sekitar tiap 2 menit." | Dua penolong bertukar posisi, jam 2 menit | Penolong kedua masuk dari kanan, bertukar posisi mengikuti scroll |
| 16 | **Bantuan tiba** | "Bantuan medis tiba. CPR memberi peluang, bukan jaminan." | Ambulans datang, jantung berdenyut hangat | Ambulans dari kiri, confetti halus dari atas, jantung berdenyut normal |
| 17 | **Kasus nyata** | "Euro 2020. CPR dan AED cepat. Eriksen kembali. Ditangani tim medis profesional." (sumber berita kredibel) | Ilustrasi lingkaran pelindung, jantung | Lingkaran orang membentuk dari 4 arah. **Jangan tampilkan wajah/foto asli.** |
| 18 | **Rantai penolong** | "Kamu satu mata rantai." | 6 node: awam, 112/119, AED, ambulans, RS, pemulihan | Node masuk bergantian kiri-kanan, garis penghubung digambar |
| 19 | **Penutup** | "Jadilah menit pertama." "Ikut pelatihan BHD resmi. Simpan 112 dan 119." | Jantung besar, tangan | Teks dari atas, jantung zoom-in, ikon dari kiri dan kanan |
| 20 | **Kredit** | Referensi, disclaimer, catatan "4 menit adalah perangkat cerita", kredit tim dan lisensi aset | Teks bergulir pelan ala kredit film | Baris masuk dari bawah. Disclaimer: konten edukasi umum, bukan pengganti pelatihan resmi |

**Prioritas (karena deadline 7 November):**
- **P1 (wajib):** scene 0, 1, 3, 5, 6, 8, 9, 10, 11, 12, 13, 14, 16, 19, 20.
- **P2 (bila waktu cukup):** scene 2, 4, 7, 15, 17, 18.

Jalur A tidak boleh menyalahkan siapa pun. Framing: "tidak ada yang tahu caranya", bukan "mereka tidak peduli".

## 9. Responsif

- Semua scene memakai `svh/dvh`. Mobile: tata letak vertikal, teks tetap besar, elemen disesuaikan. Desktop: komposisi lebih lebar.
- Gunakan `gsap.matchMedia()` untuk komposisi berbeda per ukuran layar. Tes di 360, 390, 768, 1024, 1280, 1536 piksel.
- `prefers-reduced-motion` dan tombol "Kurangi animasi": ganti pin dan scrub dramatis dengan transisi sederhana (fade), scene tetap berurutan dan terbaca.

## 10. Cara kerja sekarang (urutan)

1. **Audit singkat.** Jelaskan dalam 5 baris apa yang akan kamu pakai ulang dan apa yang dihapus dari hasil sebelumnya.
2. **Bangun Scene Engine + 3 scene contoh** (scene 0 Sampul, scene 1 Tahukah kamu, scene 6 Tiba-tiba) dengan gaya terang, karakter ilustrasi, dan variasi arah. **Berhenti dan minta aku cek.** Jangan lanjut ke scene lain sebelum aku setuju dengan rasa visualnya.
3. Setelah disetujui, bangun scene sisanya sesuai prioritas P1 lalu P2.
4. Setelah semua scene jadi: responsif, aksesibilitas, performa, deploy.

Setiap akhir tahap: jalankan build dan lint, tes di 390, 768, 1280 piksel, commit, lalu laporkan dengan format di prompt.md bagian 8.

## 11. Kriteria "lolos" (cek sebelum bilang selesai)

- [ ] Tidak ada navbar, header, logo di konten, atau footer ala website.
- [ ] Setiap scene layar penuh dan **di-pin**. Layar tidak bergeser, elemennya yang bergerak.
- [ ] Setiap scene memakai minimal 3 arah masuk berbeda, dan elemen terus bergerak saat scroll.
- [ ] Scroll naik membalik animasi dengan mulus.
- [ ] Tidak ada teks lebih dari 2 kalimat per beat. Fakta ditampilkan secara visual.
- [ ] Tema **terang** dan cerah, sesuai palet.
- [ ] Ada karakter, jantung berdenyut, EKG, dan motion graphic dekoratif di tiap scene.
- [ ] Scene CPR 3D berjalan dengan kamera berpindah mulus, latar terang.
- [ ] Terasa seperti **buku cerita interaktif**, bukan landing page.
- [ ] Guardrail medis dan sumber angka sesuai PRD bagian 11 dan 12.

Jika ada yang ragu atau bertentangan dengan dokumen ini, **tanya aku dulu, jangan menebak.**