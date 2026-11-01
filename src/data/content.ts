export type Direction = "up" | "left" | "right" | "down";

export type EcgState =
  | "normal"
  | "irregular"
  | "weak"
  | "flatline"
  | "cpr"
  | "recovered";

export type StoryPath = "A" | "B";

export interface SourceNote {
  refId: string;
  text: string;
  todoVerify?: boolean;
}

export interface StatCardContent {
  id: string;
  value: string;
  valueLabel: string;
  title: string;
  description: string;
  source: SourceNote;
  direction: Direction;
  tone: "alert" | "warn" | "hope";
  todoVerify?: boolean;
}

export interface CprStep {
  id: string;
  timer: string;
  timeSeconds: number;
  title: string;
  summary: string;
  bullets: string[];
  camera: string;
  ecg: EcgState;
}

export const site = {
  name: "4 Menit Emas",
  shortName: "4 Menit Emas",
  tagline: "Kenali. Panggil. Tekan. AED. Lanjutkan.",
  description:
    "Scrollytelling edukasi tentang henti jantung dan CPR dewasa: kenali tanda, panggil bantuan, lakukan kompresi, gunakan AED, dan teruskan sampai bantuan medis tiba.",
  event: "INVOFEST 2026 · Web Design Competition",
  theme: "Smart Ecosystems: Digital Solutions for a Sustainable Future",
  subtheme: "Health & Well-being for All (SDG 3)",
  emergency: {
    title: "Nomor darurat Indonesia",
    numbers: [
      { number: "112", label: "Panggilan Darurat Nasional" },
      { number: "119", label: "Darurat medis Kemenkes" },
    ],
    note: "Sebutkan lokasi dengan jelas, aktifkan speaker, dan ikuti arahan operator.",
  },
} as const;

export const a11y = {
  skipToContent: "Lewati ke konten utama",
  mainLabel: "Konten utama",
  navLabel: "Navigasi bagian",
  scrollHint: "Gulir untuk melanjutkan",
  canvasSummary:
    "Ilustrasi tiga dimensi: seseorang terbaring setelah kolaps, seorang penolong berlutut di sampingnya dan melakukan kompresi dada, lalu penolong kedua datang membawa AED. Semua langkah juga tersedia sebagai teks di panel sebelah.",
  canvasSummaryPathA:
    "Ilustrasi tiga dimensi: korban terbaring sendirian. Orang di sekitar belum tahu cara menolong, dan bantuan medis belum tiba.",
  reducedMotionOn: "Kurangi animasi: aktif",
  reducedMotionOff: "Kurangi animasi: nonaktif",
  reducedMotionHint:
    "Mematikan gerak kamera dan animasi dekoratif. Semua informasi tetap tersedia.",
  pauseScene: "Jeda ilustrasi 3D",
  playScene: "Lanjutkan ilustrasi 3D",
  replay: "Putar ulang animasi",
  externalLink: "Membuka tautan di tab baru",
} as const;

export const nav = [
  { id: "masalah", label: "Masalah" },
  { id: "use-case", label: "Situasi" },
  { id: "cpr", label: "Tata cara" },
  { id: "penutup", label: "Penutup" },
] as const;

export const hero = {
  eyebrow: `${site.event} · ${site.subtheme}`,
  title: "4 Menit Emas",
  titleLines: ["4 Menit", "Emas"],
  hook: "Di luar rumah sakit, hanya sekitar 4 dari 10 orang dewasa yang mengalami henti jantung di Amerika Serikat mendapat CPR dari orang di sekitarnya.",
  hookHighlight: "4 dari 10",
  hookSourceId: "aha-2025-exec",
  hookSource:
    "AHA 2025, data Amerika Serikat tahun 2024. Angka berbeda antarnegara dan komunitas.",
  lead: "Henti jantung bisa terjadi pada siapa saja, kapan saja. Yang menentukan bukan hanya alat canggih, tetapi orang-orang terdekat yang tahu apa yang harus dilakukan pada menit-menit pertama.",
  cta: "Mulai memahami",
  ctaHref: "#masalah",
  scrollHint: "Gulir perlahan",
  sideNote:
    "\u201c4 Menit Emas\u201d adalah pengingat naratif tentang pentingnya menit-menit awal, bukan batas pasti kerusakan otak.",
  ecgLabel: "Garis detak jantung ilustratif, melambat mengikuti gulir",
  stats: [
    { value: "41,7%", label: "mendapat CPR dari orang sekitar" },
    { value: "10,5%", label: "bertahan hidup sampai pulang dari rumah sakit" },
  ],
  statsSource:
    "AHA 2025, pasien henti jantung di luar rumah sakit dewasa di Amerika Serikat, tahun 2024.",
  statsSourceId: "aha-2025-exec",
} as const;

export const problem = {
  eyebrow: "Mengapa ini penting",
  title: "Menit pertama bukan menunggu. Menit pertama adalah tindakan.",
  lead: "Henti jantung berbeda dari serangan jantung. Jantung berhenti memompa secara efektif, sehingga darah berhenti mengalir ke otak dan organ vital. Tanpa kompresi dada, peluang selamat terus menurun.",
  cards: [
    {
      id: "card-cpr",
      value: "41,7%",
      valueLabel: "pasien dewasa",
      title: "Mendapat CPR dari orang sekitar",
      description:
        "Dari seluruh pasien henti jantung di luar rumah sakit di Amerika Serikat pada 2024, sekitar empat dari sepuluh menerima CPR dari orang di sekitarnya.",
      source: {
        refId: "aha-2025-exec",
        text: "AHA 2025, data AS 2024",
      },
      direction: "left",
      tone: "alert",
    },
    {
      id: "card-time",
      value: "Tiap menit",
      valueLabel: "tanpa pertolongan",
      title: "Peluang selamat menurun",
      description:
        "Model penelitian menggambarkan peluang selamat turun seiring tertundanya CPR dan defibrilasi. Angka ini perkiraan populasi, bukan kepastian untuk satu orang.",
      source: {
        refId: "larsen-1993",
        text: "Larsen 1993; Stieglis 2024 \u2014 perkiraan model",
        todoVerify: true,
      },
      direction: "right",
      tone: "warn",
      // TODO-VERIFY: PRD §12 menandai angka penurunan per menit (Larsen/Stieglis).
      // Tampilkan angka final hanya setelah dikonfirmasi ke teks asli.
      todoVerify: true,
    },
    {
      id: "card-indonesia",
      value: "\u00b1360 ribu",
      valueLabel: "perkiraan per tahun",
      title: "Kejadian henti jantung di Indonesia",
      description:
        "Estimasi kejadian henti jantung di luar rumah sakit di Indonesia yang beredar di literatur pengabdian. Angka ini masih dirujuk dari sumber sekunder dan perlu diverifikasi ke data primer.",
      source: {
        refId: "binakes-2025",
        text: "Kemenkes RI 2022, dikutip Binakes 2025 \u2014 perlu verifikasi",
        todoVerify: true,
      },
      direction: "down",
      tone: "hope",
      // TODO-VERIFY: PRD §12 menandai angka \u00b1360.000 (sumber sekunder).
      todoVerify: true,
    },
  ] satisfies StatCardContent[],
  chart: {
    eyebrow: "Ilustrasi model",
    title: "Peluang selamat menurun saat pertolongan tertunda",
    description:
      "Kurva di bawah adalah ilustrasi dari model penelitian, bukan data pasien tertentu dan bukan prediksi untuk satu individu. Tujuannya menunjukkan arah: semakin cepat CPR dan defibrilasi, semakin besar peluang.",
    axisX: "Waktu sejak kolaps",
    axisY: "Peluang selamat (ilustratif)",
    caption:
      "Ilustrasi dari model penelitian Larsen dkk. (1993). Bentuk kurva tidak mewakili angka pasti per menit.",
    sourceId: "larsen-1993",
    todoVerify: true,
  },
  closingLine:
    "Kabar baiknya: sebagian besar tindakan awal tidak membutuhkan alat. Hanya pengetahuan, keberanian, dan tangan yang mau menekan.",
} as const;

export const useCase = {
  eyebrow: "Ini bisa terjadi di dekatmu",
  title: "Kantin kampus, jam istirahat.",
  paragraphs: [
    "Seorang mahasiswa tiba-tiba jatuh dari kursinya. Piring berbunyi, percakapan berhenti. Beberapa orang mendekat, sebagian merekam, sebagian membeku.",
    "Tidak ada yang menyalahkan mereka. Bingung adalah reaksi wajar ketika tidak pernah diajari apa yang harus dilakukan. Yang dibutuhkan saat itu bukan penonton yang panik, melainkan satu orang yang tahu langkah pertama.",
    "Bayangkan dirimu ada di sana. Apa yang bisa kamu lakukan dalam sepuluh detik pertama?",
  ],
  beats: [
    { time: "Detik 0", text: "Seseorang jatuh. Suasana berubah." },
    { time: "Detik 10", text: "Orang di sekitar saling melihat, menunggu siapa yang bergerak." },
    { time: "Detik 30", text: "Satu orang berlutut. Sisanya mulai membantu." },
  ],
  ariaSummary:
    "Cerita singkat: seseorang kolaps di kantin kampus. Orang di sekitarnya bingung, bukan karena tidak peduli, tetapi karena belum tahu caranya. Satu orang yang tahu langkah pertama dapat mengubah arah cerita.",
} as const;

export const transition = {
  eyebrow: "Gulir untuk memutar ulang",
  title: "Bagaimana jika ada yang tahu caranya?",
  description:
    "Kembali ke detik nol. Kali ini, bayangkan satu orang di sana pernah belajar CPR.",
  rewindLabel: "Memutar waktu kembali ke 0:00",
} as const;

const pathA: CprStep[] = [
  {
    id: "a-collapse",
    timer: "0:00",
    timeSeconds: 0,
    title: "Korban kolaps",
    summary: "Seseorang jatuh. Jantung berhenti memompa secara efektif.",
    bullets: [
      "Waktu mulai berjalan sejak kolaps.",
      "Napas terengah-engah atau tidak bernapas normal bukan tanda bangun.",
    ],
    camera: "Wide, sudut tinggi",
    ecg: "irregular",
  },
  {
    id: "a-hesitate",
    timer: "0:30",
    timeSeconds: 30,
    title: "Orang sekitar ragu",
    summary:
      "Bingung itu wajar. Banyak orang belum pernah diajari CPR dan takut melakukan kesalahan.",
    bullets: [
      "Tidak ada yang tahu cara memulai kompresi.",
      "Keraguan bukan berarti tidak peduli.",
    ],
    camera: "Siluet membeku",
    ecg: "weak",
  },
  {
    id: "a-wait",
    timer: "1:00",
    timeSeconds: 60,
    title: "Bantuan belum tiba",
    summary:
      "Panggilan darurat sudah dilakukan, tetapi ambulans masih dalam perjalanan.",
    bullets: [
      "Waktu respons dipengaruhi lokasi dan kondisi lalu lintas.",
      "Tanpa kompresi, tidak ada yang membantu memompa darah.",
    ],
    camera: "Rute ambulans",
    ecg: "weak",
  },
  {
    id: "a-worse",
    timer: "2:00",
    timeSeconds: 120,
    title: "Kondisi memburuk",
    summary:
      "Semakin lama tanpa aliran darah, semakin besar dampak pada otak dan organ vital.",
    bullets: [
      "Peluang selamat terus menurun.",
      "Kompresi dada sejak awal memberi peluang yang lebih besar.",
    ],
    camera: "Layar mendingin",
    ecg: "weak",
  },
  {
    id: "a-late",
    timer: "4:00",
    timeSeconds: 240,
    title: "Tanpa pertolongan",
    summary:
      "Peluang selamat menurun seiring waktu. Inilah mengapa orang pertama yang ada di lokasi memegang peran besar.",
    bullets: [
      "Bukan untuk menakuti, tetapi untuk menunjukkan betapa berharganya menit awal.",
      "Satu orang yang tahu caranya dapat mengubah arah cerita.",
    ],
    camera: "Redup, garis datar",
    ecg: "flatline",
  },
];

const pathB: CprStep[] = [
  {
    id: "b-check",
    timer: "0:00",
    timeSeconds: 0,
    title: "Aman & kenali",
    summary:
      "Pastikan lingkungan aman, lalu periksa respons dan napas. Maksimal 10 detik.",
    bullets: [
      "Pastikan tidak ada bahaya di sekitar korban.",
      "Tepuk atau goyangkan bahu dengan lembut dan panggil dengan suara jelas.",
      "Lihat dada: napas normal atau tidak? Napas terengah-engah bukan napas normal.",
      "Jika tidak responsif dan tidak bernapas normal, mulai CPR.",
    ],
    camera: "Wide tiga perempat",
    ecg: "irregular",
  },
  {
    id: "b-call",
    timer: "0:15",
    timeSeconds: 15,
    title: "Panggil",
    summary:
      "Hubungi 112 atau 119, aktifkan speaker, dan minta orang lain mencari AED.",
    bullets: [
      "Sebutkan lokasi dengan jelas dan ikuti arahan operator.",
      "Minta satu orang menyiapkan AED dan satu orang lain mengarahkan bantuan.",
      "Jangan menunda kompresi hanya untuk mencari AED.",
    ],
    camera: "Medium dari samping",
    ecg: "weak",
  },
  {
    id: "b-press",
    timer: "0:30",
    timeSeconds: 30,
    title: "Tekan",
    summary:
      "Kompresi dada dengan kecepatan 100\u2013120 kali per menit dan kedalaman minimal 5 cm, tidak melebihi 6 cm.",
    bullets: [
      "Letakkan telapak tangan di tengah dada, lengan lurus, bahu di atas tangan.",
      "Biarkan dada naik kembali penuh di antara kompresi.",
      "Minimalkan jeda. Orang awam yang belum terlatih boleh melakukan hands-only CPR.",
      "Jika terlatih dan mampu, lakukan 30 kompresi : 2 napas.",
    ],
    camera: "Profil samping, lalu close-up tangan",
    ecg: "cpr",
  },
  {
    id: "b-aed",
    timer: "2:00",
    timeSeconds: 120,
    title: "AED",
    summary:
      "Nyalakan AED, ikuti petunjuk suara, tempel pad, dan jauhi korban saat analisis dan kejutan.",
    bullets: [
      "Tempel pad sesuai gambar pada kemasan; pastikan dada kering.",
      "Tidak ada yang menyentuh korban saat AED menganalisis dan saat kejutan.",
      "AED aman untuk semua korban. Jangan menunda penggunaannya.",
      "Hargai martabat korban: minta orang lain membantu menutupi area sekitar.",
    ],
    camera: "Atas, bird's eye",
    ecg: "cpr",
  },
  {
    id: "b-continue",
    timer: "3:00",
    timeSeconds: 180,
    title: "Lanjutkan",
    summary:
      "Teruskan kompresi. Bila ada orang lain, bergantian sebagai penolong sekitar tiap 2 menit.",
    bullets: [
      "Ganti penolong sekitar setiap 2 menit untuk menjaga kualitas kompresi.",
      "Lanjutkan sampai petugas medis tiba atau korban menunjukkan tanda hidup.",
      "Jika AED meminta analisis ulang, ikuti petunjuk suara dengan tenang.",
    ],
    camera: "Orbit pelan",
    ecg: "cpr",
  },
  {
    id: "b-arrive",
    timer: "4:00",
    timeSeconds: 240,
    title: "Bantuan medis tiba",
    summary:
      "Serahkan kepada petugas. CPR tidak menjamin selamat, tetapi memberi peluang.",
    bullets: [
      "Sampaikan apa yang sudah dilakukan: kompresi, jumlah kejutan, dan waktu mulai.",
      "Tetap tenang dan ikuti arahan petugas.",
      "CPR tidak menjamin korban selamat, tetapi memberi peluang yang lebih baik.",
    ],
    camera: "Pull-back wide",
    ecg: "recovered",
  },
];

export const cpr = {
  eyebrow: "Tata cara CPR dewasa",
  title: "Dua jalur, satu perbedaan: ada yang tahu caranya.",
  lead: "Gulir untuk mengikuti dua kemungkinan dari kejadian yang sama. Timer berjalan dari 0:00 sampai 4:00 di setiap jalur.",
  hint: "Gulir perlahan. Animasi mengikuti arah gulir dan bisa diputar mundur.",
  pathA: {
    id: "A" as StoryPath,
    label: "Jalur A",
    badge: "Tidak ada yang menolong",
    icon: "alert" as const,
    description:
      "Bukan karena orang di sekitar jahat, tetapi karena tidak ada yang tahu caranya. Jalur ini menunjukkan apa yang terjadi ketika menit-menit awal lewat tanpa kompresi.",
    steps: pathA,
    outcome: {
      title: "Menit awal terlewat",
      text: "Peluang selamat menurun. Jalur ini bukan untuk menyalahkan siapa pun, melainkan menunjukkan mengapa pengetahuan dasar begitu berharga.",
    },
  },
  pathB: {
    id: "B" as StoryPath,
    label: "Jalur B",
    badge: "Ada yang menolong",
    icon: "hope" as const,
    description:
      "Satu orang tahu langkah pertama, satu orang lain menelepon, satu orang mencari AED. Tindakan sederhana yang saling melengkapi.",
    steps: pathB,
    outcome: {
      title: "Rantai pertolongan bekerja",
      text: "CPR dan AED tidak menjamin keselamatan, tetapi keduanya memberi peluang yang lebih besar sampai bantuan medis tiba.",
    },
  },
  guidance: {
    title: "Catatan penting",
    items: [
      "Panduan ini untuk orang dewasa. CPR bayi dan anak berbeda; ikuti pelatihan khusus.",
      "Mulai CPR hanya bila korban tidak responsif dan tidak bernapas normal.",
      "Orang awam yang belum terlatih boleh melakukan hands-only CPR.",
      "Ikuti pelatihan BHD resmi dari PMI, rumah sakit, atau organisasi profesi untuk keterampilan yang lebih lengkap.",
    ],
    sourceId: "aha-2025-bls",
  },
  toggleLabel: "Pilih jalur",
  pathAriaLabel: "Pilih Jalur A: tidak ada yang menolong",
  pathBAriaLabel: "Pilih Jalur B: ada yang menolong",
  timerLabel: "Waktu sejak kolaps",
  stepCounter: (index: number, total: number) => `Langkah ${index} dari ${total}`,
} as const;

export const closing = {
  eyebrow: "Rantai kelangsungan hidup",
  title: "Keselamatan bukan kerja satu orang.",
  lead: "Pertolongan henti jantung adalah ekosistem: orang terlatih, nomor darurat, AED, ambulans, dan rumah sakit saling terhubung. Kamu bisa menjadi bagian pertama dari rantai itu.",
  fiveStepsTitle: "Lima hal untuk diingat",
  fiveSteps: [
    { number: "01", title: "Kenali", text: "Tidak responsif dan tidak bernapas normal." },
    { number: "02", title: "Panggil", text: "112 atau 119, aktifkan speaker, minta AED." },
    { number: "03", title: "Tekan", text: "100\u2013120 per menit, dalam 5\u20136 cm, biarkan dada naik." },
    { number: "04", title: "AED", text: "Nyalakan, ikuti suara, jauhi korban saat kejutan." },
    { number: "05", title: "Lanjutkan", text: "Sampai petugas medis tiba atau tanda hidup muncul." },
  ],
  chainTitle: "Rantai Kelangsungan Hidup",
  chain: [
    { id: "bystander", title: "Penolong awam", text: "Mengenali dan memulai tindakan pertama." },
    { id: "call", title: "Panggilan darurat", text: "112/119 memandu dan mengerahkan bantuan." },
    { id: "cpr", title: "CPR", text: "Kompresi dada menjaga aliran darah." },
    { id: "aed", title: "AED", text: "Defibrilasi bila irama jantung memungkinkan." },
    { id: "ambulance", title: "Ambulans", text: "Perawatan lanjutan dalam perjalanan." },
    { id: "hospital", title: "Rumah sakit & pemulihan", text: "Perawatan intensif dan rehabilitasi." },
  ],
  actionsTitle: "Langkah berikutnya untukmu",
  actions: [
    {
      id: "training",
      title: "Ikuti pelatihan BHD resmi",
      text: "Belajar langsung dari PMI, rumah sakit, atau organisasi profesi.",
    },
    {
      id: "numbers",
      title: "Simpan nomor darurat",
      text: "112 untuk darurat nasional, 119 untuk darurat medis Kemenkes.",
    },
    {
      id: "share",
      title: "Bagikan halaman ini",
      text: "Semakin banyak yang tahu, semakin besar peluang seseorang ditolong.",
    },
  ],
  referencesTitle: "Referensi",
  referencesIntro:
    "Semua klaim angka di halaman ini merujuk pada daftar berikut. Ringkasan ditulis ulang dengan kata-kata sendiri; pembaca dapat membuka sumber aslinya.",
  disclaimerTitle: "Disclaimer",
  disclaimer: [
    "Halaman ini adalah media edukasi umum, bukan alat diagnosis, bukan simulasi medis, dan bukan pengganti pelatihan resmi.",
    "Panduan yang ditampilkan ditujukan untuk orang dewasa. CPR bayi dan anak memiliki teknik berbeda; ikuti pelatihan khusus.",
    "CPR dan AED tidak menjamin korban selamat, tetapi memberi peluang yang lebih besar. Selalu ikuti arahan operator darurat dan petugas medis.",
    "\u201c4 Menit Emas\u201d adalah perangkat naratif untuk menekankan pentingnya menit-menit awal, bukan batas pasti kerusakan otak atau kematian.",
    "Sebagian data berasal dari Amerika Serikat dan tidak dapat digeneralisasi ke semua negara. Angka bertanda perkiraan pada halaman ini menunggu verifikasi sumber primer.",
  ],
  creditTitle: "Kredit & lisensi",
  credits: [
    { label: "Karya", value: "Tim 4 Menit Emas \u2014 INVOFEST 2026" },
    {
      label: "Karakter 3D",
      value: "Dibuat prosedural dari primitif three.js, tanpa aset model pihak ketiga.",
    },
    {
      label: "Font",
      value: "Bricolage Grotesque, Plus Jakarta Sans, JetBrains Mono \u2014 Google Fonts (SIL Open Font License).",
    },
    { label: "Ikon", value: "Lucide \u2014 ISC License." },
    {
      label: "Animasi",
      value: "GSAP + ScrollTrigger, Lenis \u2014 lihat lisensi masing-masing proyek.",
    },
  ],
  footerNote:
    "Dibuat untuk INVOFEST 2026 Web Design Competition. Tidak ada audio otomatis dan tidak ada konten grafis.",
} as const;

export const ecgLabels: Record<EcgState, string> = {
  normal: "Irama normal, ilustratif",
  irregular: "Irama tidak teratur, ilustratif",
  weak: "Irama melemah, ilustratif",
  flatline: "Garis datar, ilustratif",
  cpr: "Denyut mengikuti kompresi, ilustratif",
  recovered: "Irama pulih pada ilustrasi, bukan jaminan medis",
};

export const sectionTitles = {
  problem: "Masalah",
  useCase: "Situasi",
  cpr: "Tata cara CPR",
  closing: "Penutup",
} as const;
