export type SceneId =
  | "opening"
  | "collapse"
  | "hesitate"
  | "decline"
  | "rewind"
  | "respond"
  | "chain";

export type Direction = "up" | "down" | "left" | "right" | "scale";

export interface BeatMotion {
  from: Direction;
  delay?: number;
}

export interface StoryBeat {
  id: string;
  time: string;
  line: string;
  aside?: string;
  scene: SceneId;
  motion: BeatMotion;
}

export interface StoryScene {
  id: SceneId;
  label: string;
  kicker: string;
  headline: string;
  support: string;
  tone: "hope" | "alert" | "warn" | "sky";
  clock: [number, number];
}

export const storyMeta = {
  title: "4 Menit Emas",
  tagline: "Kenali. Panggil. Tekan. AED. Lanjutkan.",
  intro: "Satu kejadian. Empat menit. Dua kemungkinan.",
  scrollHint: "Gulir untuk melanjutkan cerita",
  event: "INVOFEST 2026",
  cprRate: "100\u2013120",
  cprDepth: "5\u20136",
  ratio: "30 : 2",
  emergency: [
    { number: "112", label: "Darurat nasional" },
    { number: "119", label: "Darurat medis" },
  ],
} as const;

export const scenes: StoryScene[] = [
  {
    id: "opening",
    label: "Mulai",
    kicker: "Detik nol",
    headline: "Jantung berhenti.\nWaktu tidak.",
    support:
      "Henti jantung bisa terjadi pada siapa saja. Yang menentukan adalah menit-menit pertama.",
    tone: "hope",
    clock: [240, 240],
  },
  {
    id: "collapse",
    label: "Kolaps",
    kicker: "Detik 0",
    headline: "4 dari 10\nditangani orang sekitar.",
    support: "AHA 2025, data Amerika Serikat 2024.",
    tone: "alert",
    clock: [0, 0],
  },
  {
    id: "hesitate",
    label: "Ragu",
    kicker: "Detik 30",
    headline: "Keraguan\njuga memakan waktu.",
    support: "Tanpa kompresi dada, darah berhenti mengalir ke otak.",
    tone: "warn",
    clock: [30, 60],
  },
  {
    id: "decline",
    label: "Menurun",
    kicker: "Menit 1\u20134",
    headline: "Peluang menurun\nsetiap menit.",
    support: "Ilustrasi model penelitian, bukan prediksi untuk satu orang.",
    tone: "alert",
    clock: [60, 240],
  },
  {
    id: "rewind",
    label: "Rewind",
    kicker: "Putar ulang",
    headline: "Kembali ke\ndetik nol.",
    support: "Kali ini, bayangkan satu orang di sana pernah belajar CPR.",
    tone: "sky",
    clock: [240, 0],
  },
  {
    id: "respond",
    label: "Bertindak",
    kicker: "Jalur B",
    headline: "Tahu caranya\nmengubah arah.",
    support: "Urutan ini mengikuti AHA 2025 untuk BLS dewasa.",
    tone: "hope",
    clock: [0, 240],
  },
  {
    id: "chain",
    label: "Rantai",
    kicker: "Setelah 4 menit",
    headline: "Keselamatan bukan\nkerja satu orang.",
    support: "Kamu bisa menjadi bagian pertama dari rantai pertolongan.",
    tone: "hope",
    clock: [240, 240],
  },
];

export const beats: StoryBeat[] = [
  {
    id: "opening-1",
    time: "0:00",
    line: "Satu orang jatuh.",
    aside: "Tidak responsif. Tidak bernapas normal.",
    scene: "opening",
    motion: { from: "up" },
  },
  {
    id: "opening-2",
    time: "4:00",
    line: "Empat menit mulai berjalan.",
    aside: "Timer tidak menunggu siapa pun.",
    scene: "opening",
    motion: { from: "left" },
  },
  {
    id: "collapse-1",
    time: "0:00",
    line: "Orang di sekitar membeku.",
    aside: "Bukan karena tidak peduli. Banyak yang belum pernah diajari.",
    scene: "collapse",
    motion: { from: "right" },
  },
  {
    id: "hesitate-1",
    time: "0:30",
    line: "Belum ada yang menekan dada.",
    aside: "Timer tetap berjalan.",
    scene: "hesitate",
    motion: { from: "down" },
  },
  {
    id: "decline-1",
    time: "1:00",
    line: "Bantuan belum tiba.",
    aside: "Peluang menurun seiring waktu.",
    scene: "decline",
    motion: { from: "left" },
  },
  {
    id: "decline-2",
    time: "4:00",
    line: "Menit emas terlewat.",
    aside: "Satu orang yang tahu caranya bisa mengubah arah cerita.",
    scene: "decline",
    motion: { from: "down" },
  },
  {
    id: "rewind-1",
    time: "0:00",
    line: "Putar ulang.",
    aside: "Kembali ke detik nol.",
    scene: "rewind",
    motion: { from: "scale" },
  },
  {
    id: "respond-1",
    time: "0:00",
    line: "Aman. Kenali respons dan napas.",
    aside: "Maksimal 10 detik.",
    scene: "respond",
    motion: { from: "up" },
  },
  {
    id: "respond-2",
    time: "0:15",
    line: "Panggil 112 atau 119.",
    aside: "Speaker aktif. Minta satu orang mencari AED.",
    scene: "respond",
    motion: { from: "right" },
  },
  {
    id: "respond-3",
    time: "0:30",
    line: "Tekan dada: 100\u2013120 per menit.",
    aside: "Kedalaman 5\u20136 cm. Biarkan dada naik penuh.",
    scene: "respond",
    motion: { from: "left" },
  },
  {
    id: "respond-4",
    time: "2:00",
    line: "Nyalakan AED. Ikuti suaranya.",
    aside: "Jauhi korban saat analisis dan kejutan.",
    scene: "respond",
    motion: { from: "down" },
  },
  {
    id: "respond-5",
    time: "4:00",
    line: "Serahkan ke petugas.",
    aside: "CPR tidak menjamin selamat, tetapi memberi peluang.",
    scene: "respond",
    motion: { from: "up" },
  },
  {
    id: "chain-1",
    time: "4:00",
    line: "Satu orang cukup untuk memulai.",
    aside: "Kenali. Panggil. Tekan. AED. Lanjutkan.",
    scene: "chain",
    motion: { from: "right" },
  },
];

export const sceneById = Object.fromEntries(
  scenes.map((scene) => [scene.id, scene]),
) as Record<SceneId, StoryScene>;

export function beatsForScene(scene: SceneId) {
  return beats.filter((beat) => beat.scene === scene);
}
