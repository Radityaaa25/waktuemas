# Kebutuhan Aset Karakter & Objek (ASSETS-NEEDED.md)

Dokumen ini mencatat daftar kebutuhan ilustrasi vektor flat modern untuk 21 scene cerita *4 Menit Emas*. Aset harus berlisensi bebas (CC0, MIT, atau lisensi yang membolehkan modifikasi dan pemakaian non-komersial/kompetisi).

## Karakter Manusia (Ilustrasi Flat 2D)

| ID Aset | Nama & Peran | Pose / Adegan | Diperlukan di Scene | Format | Status |
|---|---|---|---|---|---|
| `char-person-standing` | Orang umum (siluet / warna pastel) | Berdiri menghadap depan / samping santai (variasi 10 orang) | Scene 1, 5, 6 | SVG | Tersedia (vektor flat di `public/assets/person-standing.svg`) |
| `char-ardi-walking` | Ardi (mahasiswa) | Berjalan santai sambil membawa buku/tas | Scene 5 | SVG | Menunggu download / dibuat |
| `char-ardi-collapse` | Ardi (korban) | Rebah/terbaring terlentang di lantai, tidak sadar | Scene 6, 8, 9, 11, 13 | SVG | Tersedia (vektor flat di `public/assets/ardi-collapsed.svg`) |
| `char-bystanders-crowd` | Kerumunan orang kantin | 3-4 orang berdiri kaget, menoleh, saling tatap | Scene 6 | SVG | Tersedia di `public/assets/bystanders.svg` |
| `char-sinta-kneel` | Sinta (penolong) | Berlutut di samping korban, memeriksa respons & napas | Scene 11 | SVG | Menunggu download (Fase B1) |
| `char-person-calling` | Orang menelepon | Berdiri/berlari dengan ponsel di telinga (mode speaker) | Scene 12 | SVG | Menunggu download (Fase B2) |
| `char-cpr-compressing` | Sinta menekan dada | Berlutut, tangan lurus terkunci di tengah dada | Scene 13 (2D fallback) + 3D low-poly | SVG / 3D Procedural | Fase B3 |
| `char-second-rescuer` | Penolong kedua | Berlari membawa kotak AED | Scene 12, 14, 15 | SVG | Fase B4-B5 |
| `char-paramedic` | Petugas ambulans | Membawa brankar / perlengkapan medis | Scene 16 | SVG | Fase Bantuan Tiba |

## Objek & Simbol (Dibuat Sendiri / Ikon SVG)

| Objek | Fungsi | Scene | Status |
|---|---|---|---|
| Jantung anatomis ilustratif | Berdenyut, berhenti, pulih | Scene 0, 2, 8, 16, 19 | SVG Prosedural (dibuat custom) |
| Gelombang EKG | Mengikuti scroll, datar, pulih | Scene 0, 8, 9, 13 | SVG Prosedural (dibuat custom) |
| Jam besar | Berputar maju dan mundur | Scene 3, 10 | SVG Prosedural |
| Kotak AED & Pad | Tampak atas, kabel, tombol kejutan | Scene 14 | SVG Prosedural |
| Ambulans | Bergerak horizontal dengan MotionPath | Scene 8, 16 | SVG Prosedural |
| Telepon darurat 112 / 119 | Tampilan tombol speaker menyala | Scene 12 | SVG Prosedural |

## Catatan Lisensi

Setiap aset yang diunduh dari luar WAJIB didokumentasikan di `CREDITS.md` beserta tautan lisensi asli dan pembuatnya sebelum dipakai.
