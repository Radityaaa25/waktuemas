export interface Reference {
  id: string;
  authors: string;
  title: string;
  publication: string;
  year: string;
  identifier?: string;
  url?: string;
  use: string;
  note?: string;
  todoVerify?: boolean;
}

export const references: Reference[] = [
  {
    id: "aha-2025-exec",
    authors: "Del Rios M, et al.",
    title:
      "Part 1: Executive Summary: 2025 American Heart Association Guidelines for CPR and ECC",
    publication: "Circulation. 2025;152(suppl 2):S284\u2013S312",
    year: "2025",
    identifier: "DOI: 10.1161/CIR.0000000000001372",
    use: "Persentase CPR oleh orang sekitar pada henti jantung di luar rumah sakit dewasa di AS (41,7%, data 2024) dan survival to discharge (10,5%).",
  },
  {
    id: "aha-2025-bls",
    authors: "American Heart Association",
    title:
      "Part 7: Adult Basic Life Support: 2025 AHA Guidelines for CPR and ECC",
    publication: "Circulation. 2025;152(16_suppl_2):S448\u2013S478",
    year: "2025",
    identifier: "DOI: 10.1161/CIR.0000000000001369",
    use: "Langkah BLS dewasa: respons dan napas, panggilan darurat, kecepatan dan kedalaman kompresi, hands-only vs 30:2, penggunaan AED, pergantian penolong.",
  },
  {
    id: "larsen-1993",
    authors: "Larsen MP, Eisenberg MS, Cummins RO, Hallstrom AP.",
    title:
      "Predicting survival from out-of-hospital cardiac arrest: a graphic model",
    publication: "Annals of Emergency Medicine. 1993;22(11):1652\u20131658",
    year: "1993",
    identifier: "PubMed ID 8214853",
    use: "Ilustrasi model penurunan peluang selamat per menit sejak kolaps sampai CPR, defibrilasi, dan ACLS.",
    note: "Angka per menit pada model ditandai perlu verifikasi. Halaman menampilkan kurva ilustratif, bukan angka pasti.",
    todoVerify: true,
  },
  {
    id: "stieglis-2024",
    authors: "Stieglis R, et al. (Amsterdam UMC)",
    title:
      "Studi 3.723 pasien henti jantung di luar rumah sakit yang disaksikan dengan fibrilasi ventrikel di Belanda Utara",
    publication: "2024",
    year: "2024",
    use: "Konteks hubungan antara penundaan kejutan pertama dan peluang selamat.",
    note: "TODO-VERIFY: kutipan lengkap (jurnal, volume, DOI) belum tersedia di PRD; jangan tampilkan angka sebelum diverifikasi.",
    todoVerify: true,
  },
  {
    id: "binakes-2025",
    authors: "Binakes",
    title:
      "Pembentukan bystander CPR melalui pelatihan BHD",
    publication:
      "Jurnal Pengabdian Kesehatan, Vol. 6 No. 1, 2025 (Poltekkes Kemenkes Jambi)",
    year: "2025",
    use: "Konteks praktik pelatihan BHD dan estimasi kejadian henti jantung di luar rumah sakit di Indonesia.",
    note: "TODO-VERIFY: estimasi \u00b1360.000 kejadian per tahun dirujuk dari Kemenkes RI 2022 melalui sumber sekunder. Perlu rujukan primer sebelum dipajang sebagai fakta final.",
    todoVerify: true,
  },
  {
    id: "purwadi-2023",
    authors: "Purwadi H, et al.",
    title: "Artikel tentang hands-only CPR dan pengetahuan CPR masyarakat",
    publication:
      "JPMIS (Jurnal Pengabdian Masyarakat Indonesia Sejahtera), Vol. 2 No. 3, September 2023",
    year: "2023",
    identifier: "DOI: 10.59059/jpmis.v2i3.294",
    use: "Konteks rendahnya pengetahuan dan keterampilan CPR di masyarakat serta relevansi hands-only CPR.",
  },
  {
    id: "jpkm-unimed",
    authors: "JPKM Unimed",
    title: "Artikel pengabdian tentang BHD untuk orang awam",
    publication: "Jurnal Pengabdian Kepada Masyarakat, Universitas Negeri Medan",
    year: "\u2014",
    use: "Konteks pelatihan BHD awam.",
    note: "TODO-VERIFY: artikel memuat rentang CPR oleh orang awam di Asia (10,5%\u201340,9%) yang dikutip dari Ong 2015. Cari Ong ME et al. 2015 sebagai sumber primer sebelum angka dipakai.",
    todoVerify: true,
  },
  {
    id: "emergency-112",
    authors: "Pemerintah Indonesia",
    title: "Layanan Panggilan Darurat Nasional 112",
    publication: "Kanal resmi pemerintah",
    year: "\u2014",
    use: "Nomor darurat nasional yang dapat dihubungi dari berbagai wilayah.",
    note: "Nomor 112 adalah layanan darurat nasional. Beberapa sumber populer menulis 118 untuk ambulans; halaman ini hanya memakai 112 dan 119.",
  },
  {
    id: "emergency-119",
    authors: "Kementerian Kesehatan Republik Indonesia",
    title: "Layanan Darurat Medis 119",
    publication: "Kementerian Kesehatan RI",
    year: "\u2014",
    use: "Nomor darurat medis Kemenkes, juga dapat diakses melalui aplikasi SATUSEHAT Mobile.",
  },
];

export function getReference(id: string): Reference | undefined {
  return references.find((reference) => reference.id === id);
}
