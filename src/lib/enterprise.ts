export type ViewId =
  | "command"
  | "land"
  | "water"
  | "grazing"
  | "herd"
  | "health"
  | "works"
  | "market"
  | "plant";

export type AssetStatus = "ok" | "watch" | "fault" | "hold" | "planned" | "service";
export type CampId = "A" | "B" | "C" | "D";
export type PaddockUse = "grazing" | "rest" | "calving" | "rehab";
export type AnimalClass = "calf" | "weaner" | "growing" | "breeding" | "finishing" | "cull";

export const ENTERPRISE = {
  name: "PulaStock",
  ranch: "Lekhubu Range",
  works: "Tholo Works",
  location: "Kweneng District, Botswana",
  hq: "Gaborone",
  hectares: 10_000,
  paddocks: 24,
  camps: 4,
  herd: 1_840,
  aue: 1_564,
  haPerAue: 6.4,
  tswanaAue: 0.85,
  utilisationCap: 0.28,
  restDays: "45–60",
  waterLpd: 60,
  reserveDays: 4.2,
  season: "dry",
  seasonLabel: "Dry season",
  seasonSpan: "May–Oct",
  asOf: "13 Sep 2026",
  dvsOffice: "DVS Gaborone",
  fmdZone: "Vaccination zone",
  act: "Livestock and Meat Industries Act, 2007",
  baits: "BAITS-compatible",
  contact: "info@pulastock.bw",
  calvingRate: 0.78,
  mortality: 0.021,
  adg: 0.62,
  vaxCoverage: 0.96,
  saleWeight: 398,
  traceability: 0.994,
  costPerHd: 4820,
  revenuePerHd: 8140,
  dressing: "48–54%",
  fatCover: "6–12 mm P8",
} as const;

export const VIEWS: {
  id: ViewId;
  code: string;
  label: string;
  blurb: string;
}[] = [
  { id: "command", code: "00", label: "Command", blurb: "Herd, water, veld and offtake in one cycle" },
  { id: "land", code: "01", label: "Land", blurb: "10,000 ha GPS/GIS, veld scores, biomass" },
  { id: "water", code: "02", label: "Water", blurb: "Solar boreholes, tanks, pipelines, troughs" },
  { id: "grazing", code: "03", label: "Grazing", blurb: "Four-camp rotation, AUE, dry-season feed" },
  { id: "herd", code: "04", label: "Herd", blurb: "RFID, BAITS, crush-side records" },
  { id: "health", code: "05", label: "Health", blurb: "DVS, vaccination, biosecurity, FMD" },
  { id: "works", code: "06", label: "Works", blurb: "Tholo Works — slaughter, chill, cold chain" },
  { id: "market", code: "07", label: "Market", blurb: "Buyers, grades, offtake contingencies" },
  { id: "plant", code: "08", label: "Plant", blurb: "Everything required to run the enterprise" },
];

export const CHAIN: { id: ViewId; label: string }[] = [
  { id: "land", label: "Land" },
  { id: "water", label: "Water" },
  { id: "grazing", label: "Grazing" },
  { id: "herd", label: "Herd" },
  { id: "health", label: "Health" },
  { id: "works", label: "Works" },
  { id: "market", label: "Market" },
];

const OX = 18;
const OY = 16;
const PW = 148;
const PH = 112;
const GAP = 10;

export function paddockBox(index: number) {
  const col = index % 6;
  const row = Math.floor(index / 6);
  return {
    x: OX + col * (PW + GAP),
    y: OY + row * (PH + GAP),
    w: PW,
    h: PH,
  };
}

export const MAP = {
  w: 980,
  h: 560,
  ox: OX,
  oy: OY,
  pw: PW,
  ph: PH,
  gap: GAP,
  hq: { x: 330, y: 500, w: 320, h: 48 },
} as const;

type PaddockSeed = {
  id: string;
  name: string;
  camp: CampId;
  use: PaddockUse;
  ha: number;
  veld: number;
  biomass: number;
  head: number;
  rest: number;
  bush: number;
  basal: number;
  erosion: "low" | "mod" | "high";
  waterId: string;
};

const PADDOCK_SEEDS: PaddockSeed[] = [
  { id: "A1", name: "Morula North", camp: "A", use: "grazing", ha: 410, veld: 72, biomass: 920, head: 318, rest: 0, bush: 12, basal: 18, erosion: "low", waterId: "BH-01" },
  { id: "A2", name: "Acacia Drift", camp: "A", use: "grazing", ha: 428, veld: 68, biomass: 860, head: 302, rest: 0, bush: 16, basal: 16, erosion: "low", waterId: "BH-01" },
  { id: "A3", name: "Red Sand", camp: "A", use: "grazing", ha: 396, veld: 61, biomass: 740, head: 274, rest: 0, bush: 21, basal: 14, erosion: "mod", waterId: "BH-02" },
  { id: "A4", name: "Tau Flats", camp: "A", use: "grazing", ha: 442, veld: 74, biomass: 980, head: 331, rest: 0, bush: 10, basal: 19, erosion: "low", waterId: "BH-02" },
  { id: "A5", name: "Windmill", camp: "A", use: "grazing", ha: 405, veld: 66, biomass: 810, head: 289, rest: 0, bush: 18, basal: 15, erosion: "low", waterId: "BH-02" },
  { id: "A6", name: "Pula Pan", camp: "A", use: "grazing", ha: 418, veld: 70, biomass: 890, head: 326, rest: 0, bush: 14, basal: 17, erosion: "low", waterId: "BH-01" },
  { id: "B1", name: "Kgomo Ridge", camp: "B", use: "rest", ha: 430, veld: 64, biomass: 610, head: 0, rest: 18, bush: 22, basal: 13, erosion: "mod", waterId: "BH-03" },
  { id: "B2", name: "Tshimo East", camp: "B", use: "rest", ha: 388, veld: 58, biomass: 540, head: 0, rest: 18, bush: 28, basal: 12, erosion: "mod", waterId: "BH-05" },
  { id: "B3", name: "Camelthorn", camp: "B", use: "rest", ha: 455, veld: 71, biomass: 700, head: 0, rest: 18, bush: 15, basal: 17, erosion: "low", waterId: "BH-03" },
  { id: "B4", name: "Noka Bend", camp: "B", use: "rest", ha: 412, veld: 69, biomass: 680, head: 0, rest: 18, bush: 17, basal: 16, erosion: "low", waterId: "BH-03" },
  { id: "B5", name: "Dithaba", camp: "B", use: "rest", ha: 401, veld: 63, biomass: 590, head: 0, rest: 18, bush: 24, basal: 13, erosion: "mod", waterId: "BH-04" },
  { id: "B6", name: "Letsatsi", camp: "B", use: "rest", ha: 422, veld: 67, biomass: 640, head: 0, rest: 18, bush: 19, basal: 15, erosion: "low", waterId: "BH-04" },
  { id: "C1", name: "Mokongwa", camp: "C", use: "rest", ha: 436, veld: 76, biomass: 1100, head: 0, rest: 41, bush: 11, basal: 20, erosion: "low", waterId: "BH-06" },
  { id: "C2", name: "Mopane", camp: "C", use: "rest", ha: 419, veld: 73, biomass: 1040, head: 0, rest: 41, bush: 13, basal: 19, erosion: "low", waterId: "BH-06" },
  { id: "C3", name: "Salt Pan", camp: "C", use: "rest", ha: 377, veld: 55, biomass: 480, head: 0, rest: 41, bush: 26, basal: 11, erosion: "mod", waterId: "BH-07" },
  { id: "C4", name: "Kalahari Edge", camp: "C", use: "rest", ha: 448, veld: 70, biomass: 960, head: 0, rest: 41, bush: 16, basal: 16, erosion: "low", waterId: "BH-07" },
  { id: "C5", name: "Boscia", camp: "C", use: "rest", ha: 409, veld: 72, biomass: 1010, head: 0, rest: 41, bush: 12, basal: 18, erosion: "low", waterId: "BH-06" },
  { id: "C6", name: "Leadwood", camp: "C", use: "rest", ha: 427, veld: 75, biomass: 1080, head: 0, rest: 41, bush: 10, basal: 21, erosion: "low", waterId: "BH-07" },
  { id: "D1", name: "Terminalia", camp: "D", use: "rest", ha: 414, veld: 60, biomass: 520, head: 0, rest: 56, bush: 29, basal: 12, erosion: "mod", waterId: "BH-08" },
  { id: "D2", name: "Encroach West", camp: "D", use: "rehab", ha: 392, veld: 42, biomass: 310, head: 0, rest: 56, bush: 38, basal: 8, erosion: "high", waterId: "BH-08" },
  { id: "D3", name: "Erosion Fan", camp: "D", use: "rehab", ha: 368, veld: 38, biomass: 280, head: 0, rest: 56, bush: 34, basal: 7, erosion: "high", waterId: "BH-08" },
  { id: "D4", name: "Calving East", camp: "D", use: "calving", ha: 355, veld: 65, biomass: 640, head: 0, rest: 56, bush: 18, basal: 15, erosion: "low", waterId: "BH-04" },
  { id: "D5", name: "Calving West", camp: "D", use: "calving", ha: 348, veld: 64, biomass: 620, head: 0, rest: 56, bush: 17, basal: 15, erosion: "low", waterId: "BH-04" },
  { id: "D6", name: "Holding", camp: "D", use: "rest", ha: 390, veld: 59, biomass: 500, head: 0, rest: 56, bush: 23, basal: 12, erosion: "mod", waterId: "BH-05" },
];

export type Paddock = PaddockSeed & {
  x: number;
  y: number;
  w: number;
  h: number;
  aue: number;
  safeAue: number;
};

export const PADDOCKS: Paddock[] = PADDOCK_SEEDS.map((p, i) => {
  const box = paddockBox(i);
  const safeAue = p.ha / 6.2;
  return {
    ...p,
    ...box,
    aue: +(p.head * ENTERPRISE.tswanaAue).toFixed(1),
    safeAue: +safeAue.toFixed(1),
  };
});

export const CAMPS: Record<
  CampId,
  { label: string; use: PaddockUse; rest: number; head: number; note: string }
> = {
  A: { label: "Camp A · grazing", use: "grazing", rest: 0, head: 1840, note: "Four-camp rotation — currently occupied. 45-day rest starts on exit." },
  B: { label: "Camp B · rest 18 d", use: "rest", rest: 18, head: 0, note: "Forage recovering. Next in rotation if veld holds above 60." },
  C: { label: "Camp C · rest 41 d", use: "rest", rest: 41, head: 0, note: "Best standing biomass. Held for late dry-season buffer." },
  D: { label: "Camp D · rest 56 d", use: "rest", rest: 56, head: 0, note: "Calving camps plus two rehab paddocks under bush control." },
};

export type Borehole = {
  id: string;
  name: string;
  x: number;
  y: number;
  yieldLs: number;
  quality: string;
  status: AssetStatus;
  tankKl: number;
  solarKw: number;
  note: string;
  lastCheck: string;
};

export const BOREHOLES: Borehole[] = [
  { id: "BH-01", name: "Morula", x: 172, y: 72, yieldLs: 4.2, quality: "Fit · pH 7.4 · low TDS", status: "ok", tankKl: 80, solarKw: 12, note: "Primary north yield. Feeds A1, A2, A6.", lastCheck: "13 Sep 06:40" },
  { id: "BH-02", name: "Tau", x: 488, y: 72, yieldLs: 3.1, quality: "Fit · pH 7.1", status: "ok", tankKl: 50, solarKw: 9, note: "A3–A5 troughs. Overflow to BH-01 line.", lastCheck: "13 Sep 06:42" },
  { id: "BH-03", name: "Pula", x: 172, y: 194, yieldLs: 5.0, quality: "Fit · pH 7.6", status: "ok", tankKl: 100, solarKw: 15, note: "Highest yield. Camp B backbone.", lastCheck: "13 Sep 06:38" },
  { id: "BH-04", name: "Kgomo", x: 488, y: 194, yieldLs: 2.8, quality: "Watch · rising salinity", status: "watch", tankKl: 50, solarKw: 9, note: "Salinity trending. Sample weekly. Calving troughs.", lastCheck: "13 Sep 06:51" },
  { id: "BH-05", name: "Tshimo", x: 804, y: 194, yieldLs: 3.6, quality: "Fit · pump down", status: "fault", tankKl: 50, solarKw: 9, note: "Submersible fault 07:12. Isolated. B2/D6 on BH-03 crossfeed.", lastCheck: "13 Sep 07:18" },
  { id: "BH-06", name: "Noka", x: 172, y: 316, yieldLs: 4.8, quality: "Fit · pH 7.3", status: "ok", tankKl: 80, solarKw: 12, note: "Camp C west. Gravity to C1, C2, C5.", lastCheck: "13 Sep 06:36" },
  { id: "BH-07", name: "Dithaba", x: 488, y: 316, yieldLs: 2.4, quality: "Fit · modest yield", status: "ok", tankKl: 40, solarKw: 7.5, note: "C3, C4, C6. Spare pump on rack.", lastCheck: "13 Sep 06:44" },
  { id: "BH-08", name: "Letsatsi", x: 172, y: 438, yieldLs: 3.9, quality: "Fit · pH 7.2", status: "ok", tankKl: 50, solarKw: 9, note: "Rehab paddocks D1–D3. Low draw.", lastCheck: "13 Sep 06:47" },
];

export const TROUGHS = PADDOCKS.map((p) => ({
  id: `TR-${p.id}`,
  paddockId: p.id,
  x: p.x + p.w - 22,
  y: p.y + p.h - 28,
  status: (p.waterId === "BH-05" ? "watch" : "ok") as AssetStatus,
}));

export const WATER_CHECKS = [
  { id: "c1", task: "Pump operation", cadence: "Daily" },
  { id: "c2", task: "Tank levels", cadence: "Daily" },
  { id: "c3", task: "Trough cleanliness", cadence: "Daily" },
  { id: "c4", task: "Leak patrol on pipelines", cadence: "Daily" },
  { id: "c5", task: "Water quality (salinity, pH)", cadence: "Weekly" },
  { id: "c6", task: "Spare pump / controller inventory", cadence: "Weekly" },
] as const;

export type Animal = {
  id: string;
  rfid: string;
  sex: "F" | "M";
  breed: string;
  born: string;
  dam: string | null;
  sire: string;
  kg: number;
  bcs: number;
  paddock: string;
  klass: AnimalClass;
  vax: boolean;
  withdrawal: string | null;
  baits: boolean;
  adg: number;
  note: string;
};

export const ANIMALS: Animal[] = [
  { id: "LK-1847", rfid: "98600000001847", sex: "F", breed: "Tswana", born: "2022-10-12", dam: "LK-0912", sire: "TL-04", kg: 386, bcs: 3.0, paddock: "A4", klass: "breeding", vax: true, withdrawal: null, baits: true, adg: 0.54, note: "In-calf. Due window 18–26 Sep." },
  { id: "LK-1902", rfid: "98600000001902", sex: "F", breed: "Tswana", born: "2023-01-04", dam: "LK-0881", sire: "TL-04", kg: 362, bcs: 2.75, paddock: "A1", klass: "breeding", vax: true, withdrawal: null, baits: true, adg: 0.51, note: "BCS watch — protein lick on A1." },
  { id: "LK-2011", rfid: "98600000002011", sex: "M", breed: "Tuli × Tswana", born: "2024-11-22", dam: "LK-1408", sire: "TU-12", kg: 248, bcs: 3.25, paddock: "A6", klass: "growing", vax: true, withdrawal: null, baits: true, adg: 0.68, note: "On target for Q1 finishing." },
  { id: "LK-2114", rfid: "98600000002114", sex: "F", breed: "Tswana", born: "2025-12-02", dam: "LK-1847", sire: "TL-07", kg: 168, bcs: 3.0, paddock: "A4", klass: "weaner", vax: true, withdrawal: null, baits: true, adg: 0.72, note: "Fence-line weaned 11 Aug." },
  { id: "LK-2140", rfid: "98600000002140", sex: "M", breed: "Tswana", born: "2026-07-19", dam: "LK-1902", sire: "TL-07", kg: 62, bcs: 2.5, paddock: "D4", klass: "calf", vax: false, withdrawal: null, baits: true, adg: 0.81, note: "Colostrum logged 2.1 h. Tag at birth." },
  { id: "LK-1766", rfid: "98600000001766", sex: "M", breed: "Brahman × Tswana", born: "2023-09-30", dam: "LK-0714", sire: "BR-02", kg: 412, bcs: 3.5, paddock: "A2", klass: "finishing", vax: true, withdrawal: null, baits: true, adg: 0.74, note: "Offtake shortlist — Super conformation." },
  { id: "LK-1688", rfid: "98600000001688", sex: "F", breed: "Tswana", born: "2021-12-18", dam: "LK-0520", sire: "TL-01", kg: 401, bcs: 2.5, paddock: "A3", klass: "breeding", vax: true, withdrawal: "2026-09-21", baits: true, adg: 0.41, note: "Oxytet 7 Sep. Hold until withdrawal clears." },
  { id: "LK-1550", rfid: "98600000001550", sex: "F", breed: "Tswana", born: "2020-11-03", dam: "LK-0311", sire: "TL-01", kg: 428, bcs: 3.25, paddock: "A5", klass: "breeding", vax: true, withdrawal: null, baits: true, adg: 0.48, note: "Dam of LK-2114. Maternal EBV keep." },
  { id: "LK-2098", rfid: "98600000002098", sex: "M", breed: "Tuli × Tswana", born: "2024-08-14", dam: "LK-1550", sire: "TU-12", kg: 301, bcs: 3.0, paddock: "A6", klass: "growing", vax: true, withdrawal: null, baits: true, adg: 0.66, note: "Growth on curve." },
  { id: "LK-2210", rfid: "98600000002210", sex: "F", breed: "Tswana", born: "2026-08-28", dam: "LK-1688", sire: "TL-07", kg: 38, bcs: 2.75, paddock: "D5", klass: "calf", vax: false, withdrawal: null, baits: true, adg: 0.77, note: "Navel treated. Daily calf check." },
  { id: "LK-1624", rfid: "98600000001624", sex: "M", breed: "Tswana", born: "2022-03-09", dam: "LK-0702", sire: "TL-03", kg: 394, bcs: 2.25, paddock: "A3", klass: "cull", vax: true, withdrawal: "2026-09-18", baits: true, adg: 0.22, note: "Broken mouth. Emergency offtake channel." },
  { id: "LK-1988", rfid: "98600000001988", sex: "F", breed: "Tswana", born: "2023-11-17", dam: "LK-1104", sire: "TL-04", kg: 348, bcs: 3.0, paddock: "A1", klass: "breeding", vax: true, withdrawal: null, baits: true, adg: 0.57, note: "Open — join next bulling." },
  { id: "LK-2055", rfid: "98600000002055", sex: "M", breed: "Tswana", born: "2024-12-01", dam: "LK-1988", sire: "TL-07", kg: 236, bcs: 3.0, paddock: "A5", klass: "growing", vax: true, withdrawal: "2026-09-16", baits: true, adg: 0.63, note: "Pour-on 2 Sep. Clear 16 Sep." },
  { id: "LK-1733", rfid: "98600000001733", sex: "F", breed: "Tuli × Tswana", born: "2022-08-21", dam: "LK-0819", sire: "TU-08", kg: 378, bcs: 3.25, paddock: "A2", klass: "breeding", vax: true, withdrawal: null, baits: true, adg: 0.55, note: "Keep. Heat-adapted dam line." },
  { id: "LK-1880", rfid: "98600000001880", sex: "M", breed: "Tswana", born: "2023-04-02", dam: "LK-0990", sire: "TL-04", kg: 405, bcs: 3.5, paddock: "A4", klass: "finishing", vax: true, withdrawal: null, baits: true, adg: 0.71, note: "BMC Super candidate. Weigh 20 Sep." },
  { id: "LK-1482", rfid: "98600000001482", sex: "F", breed: "Tswana", born: "2019-10-08", dam: "LK-0204", sire: "TL-00", kg: 418, bcs: 2.75, paddock: "A1", klass: "breeding", vax: true, withdrawal: null, baits: true, adg: 0.33, note: "Eighth calf. Review 2027." },
];

export const ANIMAL_EVENTS: Record<string, { date: string; kind: string; detail: string }[]> = {
  "LK-1847": [
    { date: "2022-10-12", kind: "Birth", detail: "Calving camp D4. RFID paired. Colostrum 2.4 h." },
    { date: "2023-08-19", kind: "Wean", detail: "Fence-line wean. 198 kg." },
    { date: "2025-12-02", kind: "Calved", detail: "Heifer LK-2114. Unassisted." },
    { date: "2026-01-14", kind: "Bulling", detail: "TL-07. Pregnancy confirmed 18 Mar." },
    { date: "2026-08-02", kind: "Vax", detail: "FMD + anthrax. DVS batch 26-GAB-081." },
  ],
  "LK-1766": [
    { date: "2023-09-30", kind: "Birth", detail: "Birth weight 32 kg." },
    { date: "2024-07-12", kind: "Wean", detail: "214 kg. Creep from week 7." },
    { date: "2026-06-18", kind: "Finish", detail: "Moved onto A2 with lick." },
    { date: "2026-09-08", kind: "Weigh", detail: "412 kg. Dressing estimate 52%." },
  ],
  "LK-1688": [
    { date: "2026-09-07", kind: "Treat", detail: "Oxytetracycline. Meat withdrawal 14 d → 21 Sep." },
    { date: "2026-08-02", kind: "Vax", detail: "FMD + anthrax." },
    { date: "2026-08-28", kind: "Calved", detail: "Heifer LK-2210." },
  ],
};

export const KPIS = [
  { key: "herd", label: "Herd", value: "1,840", unit: "hd", hint: "1,564 AUE · 0.85 Tswana" },
  { key: "calving", label: "Calving", value: "78%", unit: "", hint: "Target ≥ 75%" },
  { key: "mortality", label: "Mortality", value: "2.1%", unit: "", hint: "Calf + adult rolling 12 mo" },
  { key: "adg", label: "ADG", value: "0.62", unit: "kg", hint: "Post-wean RFID crush" },
  { key: "water", label: "Water reserve", value: "4.2", unit: "d", hint: "3–7 day band · BH-05 down" },
  { key: "graze", label: "Utilisation", value: "27%", unit: "", hint: "Cap 25–30% standing DM" },
  { key: "vax", label: "Vaccination", value: "96%", unit: "", hint: "DVS zone schedule" },
  { key: "sale", label: "Sale weight", value: "398", unit: "kg", hint: "Last 90-day offtake" },
  { key: "trace", label: "Traceability", value: "99.4%", unit: "", hint: "RFID + BAITS + paper" },
  { key: "margin", label: "Margin / hd", value: "P 3,320", unit: "", hint: "Revenue 8,140 − cost 4,820" },
] as const;

export const SERIES = {
  months: ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
  adg: [0.71, 0.74, 0.7, 0.68, 0.66, 0.64, 0.61, 0.55, 0.52, 0.54, 0.58, 0.62],
  bcs: [3.2, 3.3, 3.3, 3.2, 3.1, 3.0, 2.9, 2.7, 2.6, 2.7, 2.8, 2.9],
  waterKl: [96, 102, 108, 114, 118, 112, 104, 98, 101, 108, 116, 110],
  biomass: [1400, 1280, 1100, 980, 860, 740, 620, 540, 500, 480, 520, 560],
};

export const ALERTS: {
  id: string;
  tone: AssetStatus;
  title: string;
  detail: string;
  view: ViewId;
  asset?: string;
}[] = [
  { id: "a1", tone: "fault", title: "BH-05 Tshimo pump down", detail: "Isolated 07:12. Crossfeed from BH-03. Repair window 24 h.", view: "water", asset: "BH-05" },
  { id: "a2", tone: "hold", title: "3 head on meat withdrawal", detail: "LK-1688, LK-1624, LK-2055. Blocked from offtake lists.", view: "herd" },
  { id: "a3", tone: "watch", title: "D2 Encroach West · bush 38%", detail: "Palatable forage cut ~40%. Destock already. Clearing crew week 38.", view: "land", asset: "D2" },
  { id: "a4", tone: "watch", title: "BH-04 salinity rising", detail: "Still livestock-fit. Weekly sample. Calving camps on this line.", view: "water", asset: "BH-04" },
  { id: "a5", tone: "ok", title: "2 cows in calving window", detail: "LK-1847 due 18–26 Sep. 24-hour watch on D4/D5.", view: "herd" },
];

export const VELD_INDICATORS = [
  "Species composition",
  "Basal cover",
  "Vegetation cover",
  "Plant diversity",
  "Soil exposure",
  "Bush encroachment",
  "Erosion risk",
] as const;

export const ROTATION = [
  { month: "Nov", season: "green", action: "Open rotation. Short graze, long rest as veld greens." },
  { month: "Dec", season: "green", action: "Peak growth. Keep utilisation under 30%." },
  { month: "Jan", season: "green", action: "Weigh weaners. Creep feed on if ADG slips." },
  { month: "Feb", season: "green", action: "Bulling groups. BCS ≥ 2.75 before join." },
  { month: "Mar", season: "green", action: "Last strong growth. Build Camp C as dry buffer." },
  { month: "Apr", season: "green", action: "Close green season. Map biomass colour." },
  { month: "May", season: "dry", action: "Licks on. Cut graze days. Pipeline leak patrols." },
  { month: "Jun", season: "dry", action: "Protein blocks. Watch BCS 2.5 trigger." },
  { month: "Jul", season: "dry", action: "Destock culls if veld < 50. Water reserve audit." },
  { month: "Aug", season: "dry", action: "Wean remaining calves. Fence-line." },
  { month: "Sep", season: "dry", action: "Current. Hold Camp C. Repair BH-05. Calving watch." },
  { month: "Oct", season: "dry", action: "Hottest. 60 L/hd. Shade and trough space." },
];

export const VAX_SCHEDULE = [
  { name: "FMD (SAT 1/2/3)", when: "Aug + Feb", coverage: 0.98, note: "DVS zone. Batch logged to BAITS." },
  { name: "Anthrax", when: "Aug", coverage: 0.97, note: "Annual. Compulsory in district." },
  { name: "BQ / blackleg", when: "Wean", coverage: 0.94, note: "Weaner group at crush." },
  { name: "Lumpy skin", when: "Nov", coverage: 0.91, note: "Pre-green-season vectors." },
  { name: "Brucellosis (heifers)", when: "4–8 mo", coverage: 0.89, note: "S19/RB51 per DVS protocol." },
  { name: "TB skin test", when: "Annual", coverage: 0.86, note: "TST at handling. Reactor isolation." },
];

export const FMD_STEPS = [
  { id: 1, title: "Isolate", detail: "Move suspects to isolation pens. No mixing." },
  { id: 2, title: "Standstill", detail: "Stop all livestock movement. Lock biosecurity gate." },
  { id: 3, title: "Notify DVS", detail: "Gaborone office within 24 hours. Keep the log." },
  { id: 4, title: "Sample", detail: "Vesicle epithelium / probang. Cool chain to BNVL." },
  { id: 5, title: "Stamp-out", detail: "On confirmation: humane kill, burial/burn per DVS." },
  { id: 6, title: "Disinfect", detail: "Premises, trucks, kit. Restock only on written release." },
];

export const BUYERS = [
  {
    id: "bmc",
    name: "BMC Gaborone",
    spec: "Super / Prime. 180–220 kg carcass. Fat 6–12 mm. Full BAITS.",
    volume: "40 hd / month",
    price: "P 42 / kg CW",
    status: "active" as const,
    next: "22 Sep · 18 hd listed",
  },
  {
    id: "eu",
    name: "EU trial via BMC",
    spec: "HGP-free, farm-of-origin, 90-day residency, residue-clear.",
    volume: "12 hd / month",
    price: "P 58 / kg CW",
    status: "pilot" as const,
    next: "Dossier with DVS · Oct window",
  },
  {
    id: "retail",
    name: "Gaborone retail box",
    spec: "Vacuum primals. Cut-level RFID. ≤ 2 °C dispatch.",
    volume: "1.4 t / week",
    price: "P 72 / kg boxed",
    status: "active" as const,
    next: "Weekly Thurs load",
  },
  {
    id: "emerg",
    name: "Emergency offtake",
    spec: "Approved abattoirs. Underweight / non-compliant / drought.",
    volume: "As required",
    price: "Spot · grade-in",
    status: "standby" as const,
    next: "LK-1624 queued",
  },
];

export const GRADES = [
  { grade: "Super", share: 22, price: 46 },
  { grade: "Prime", share: 38, price: 42 },
  { grade: "Choice", share: 27, price: 37 },
  { grade: "Standard", share: 13, price: 31 },
];

export type PlantItem = {
  id: string;
  group: string;
  name: string;
  spec: string;
  qty: string;
  capex: number;
  status: "in-service" | "specified" | "tender" | "planned";
  phase: "1 Pilot" | "2 Validate" | "3 Scale";
};

export const PLANT: PlantItem[] = [
  { id: "p01", group: "Land & survey", name: "GPS / GIS boundary survey", spec: "10,000 ha, paddocks, water, veld plots, roads", qty: "1 ls", capex: 180_000, status: "in-service", phase: "1 Pilot" },
  { id: "p02", group: "Land & survey", name: "Veld sampling grid", spec: "Seven-indicator score, clipping cages, DM conversion", qty: "48 plots", capex: 64_000, status: "in-service", phase: "1 Pilot" },
  { id: "p03", group: "Land & survey", name: "Bush clearing (encroach)", spec: "Targeted woody control, restore palatable forage", qty: "1,200 ha", capex: 2_880_000, status: "tender", phase: "2 Validate" },
  { id: "p04", group: "Fencing", name: "Perimeter + camp fence", spec: "5-strand, steel posts, jackal-proof on HQ", qty: "180 km", capex: 5_040_000, status: "in-service", phase: "1 Pilot" },
  { id: "p05", group: "Fencing", name: "Internal paddock gates", spec: "4.2 m cattle gates, crush-side returns", qty: "48 ea", capex: 288_000, status: "in-service", phase: "1 Pilot" },
  { id: "p06", group: "Water", name: "Solar borehole complete", spec: "Yield test, panels, controller, submersible, tank", qty: "8 ea", capex: 3_360_000, status: "in-service", phase: "1 Pilot" },
  { id: "p07", group: "Water", name: "Storage tanks", spec: "Galvanised 40–100 kL, elevated + ground", qty: "12 ea", capex: 1_020_000, status: "in-service", phase: "1 Pilot" },
  { id: "p08", group: "Water", name: "HDPE pipeline network", spec: "Gravity-assist, mapped, isolation valves", qty: "42 km", capex: 3_990_000, status: "in-service", phase: "1 Pilot" },
  { id: "p09", group: "Water", name: "Concrete troughs", spec: "Low-spill, away from fence lines", qty: "36 ea", capex: 450_000, status: "in-service", phase: "1 Pilot" },
  { id: "p10", group: "Water", name: "Backup pumps + spares", spec: "One spare per two boreholes, 24 h repair", qty: "4 ea", capex: 180_000, status: "in-service", phase: "1 Pilot" },
  { id: "p11", group: "Energy", name: "Borehole solar arrays", spec: "7.5–15 kW off-grid per hole", qty: "8 arrays", capex: 0, status: "in-service", phase: "1 Pilot" },
  { id: "p12", group: "Energy", name: "HQ hybrid mini-grid", spec: "48 kW PV, 80 kWh storage, generator", qty: "1 ls", capex: 1_240_000, status: "specified", phase: "2 Validate" },
  { id: "p13", group: "Handling", name: "Curved race + crush", spec: "Anti-slip, shade, calibrated load cells", qty: "1 ls", capex: 1_850_000, status: "in-service", phase: "1 Pilot" },
  { id: "p14", group: "Handling", name: "Dip tank + pour-on race", spec: "Tick control, DVS-aligned", qty: "1 ea", capex: 280_000, status: "in-service", phase: "1 Pilot" },
  { id: "p15", group: "Handling", name: "Loading ramps", spec: "Split deck heights, non-slip, shade", qty: "2 ea", capex: 190_000, status: "in-service", phase: "1 Pilot" },
  { id: "p16", group: "Handling", name: "Calving camps", spec: "24-h watch, water, shelter, crush", qty: "2 camps", capex: 380_000, status: "in-service", phase: "1 Pilot" },
  { id: "p17", group: "Handling", name: "Isolation / biosecurity pens", spec: "Solid walls 1.5 m, own drain, lockable", qty: "1 ls", capex: 420_000, status: "in-service", phase: "1 Pilot" },
  { id: "p18", group: "Digital", name: "RFID ear tags (paired)", spec: "ISO 11784/5 HDX + visual", qty: "2,200", capex: 99_000, status: "in-service", phase: "1 Pilot" },
  { id: "p19", group: "Digital", name: "Fixed + handheld readers", spec: "Crush, gates, loading", qty: "6 ea", capex: 108_000, status: "in-service", phase: "1 Pilot" },
  { id: "p20", group: "Digital", name: "Field tablets + BAITS sync", spec: "Offline-first, crush-side forms", qty: "12 ea", capex: 102_000, status: "in-service", phase: "1 Pilot" },
  { id: "p21", group: "Digital", name: "Comms / LoRa backhaul", spec: "HQ to camps, borehole telemetry", qty: "1 ls", capex: 260_000, status: "specified", phase: "2 Validate" },
  { id: "p22", group: "Health", name: "Farm store + fridge", spec: "Vaccines, anthelmintics, lockable", qty: "1 ls", capex: 95_000, status: "in-service", phase: "1 Pilot" },
  { id: "p23", group: "Health", name: "Biosecurity gate + wash", spec: "Vehicle wheel bath, visitor log", qty: "1 ea", capex: 140_000, status: "in-service", phase: "1 Pilot" },
  { id: "p24", group: "Nutrition", name: "Lick sheds + bunks", spec: "Protein, energy, minerals · dry season", qty: "8 sites", capex: 210_000, status: "in-service", phase: "1 Pilot" },
  { id: "p25", group: "Transport", name: "Cattle liner (welfare)", spec: "Shade, density, non-slip, GPS", qty: "2 ea", capex: 1_280_000, status: "in-service", phase: "1 Pilot" },
  { id: "p26", group: "Processing", name: "Tholo Works abattoir", spec: "80 cattle/d, 9.6 ha, Eighteenth Schedule", qty: "1 plant", capex: 48_000_000, status: "specified", phase: "2 Validate" },
  { id: "p27", group: "Processing", name: "Lairage + isolation", spec: "120 cattle, 180 small stock, 1.5-day hold", qty: "1 ls", capex: 0, status: "specified", phase: "2 Validate" },
  { id: "p28", group: "Processing", name: "Chill + bone + pack", spec: "240 carcass places, 0–2 °C, cut RFID", qty: "1 ls", capex: 0, status: "specified", phase: "2 Validate" },
  { id: "p29", group: "Processing", name: "Effluent + ponds", spec: "Screen, DAF, anaerobic, reed beds", qty: "1 ls", capex: 0, status: "specified", phase: "2 Validate" },
  { id: "p30", group: "Cold chain", name: "Refrigerated trucks", spec: "Continuous logger, dual-zone", qty: "3 ea", capex: 3_300_000, status: "planned", phase: "3 Scale" },
  { id: "p31", group: "Market", name: "BMC / EU dossier pack", spec: "HACCP, residue, residency, BAITS", qty: "1 ls", capex: 75_000, status: "tender", phase: "2 Validate" },
  { id: "p32", group: "People", name: "Staff housing + office", spec: "Manager, 8 stockmen, DVS room", qty: "1 campus", capex: 2_400_000, status: "specified", phase: "2 Validate" },
];

export const PLANT_GROUPS = [...new Set(PLANT.map((p) => p.group))];

export const ROADMAP = [
  { id: "r1", title: "Pilot ranch operations", detail: "Fence, water, RFID, four-camp, crush records.", now: true },
  { id: "r2", title: "Site & regulatory validation", detail: "DEA / DVS on Tholo Works. Movement permits rehearsed." },
  { id: "r3", title: "Herd health & data diligence", detail: "BAITS integrity, withdrawal discipline, FMD drill." },
  { id: "r4", title: "Market & offtake validation", detail: "BMC cadence + EU trial carcasses." },
  { id: "r5", title: "Scale-up", detail: "Cold-chain fleet, boxed retail, reinvest in veld." },
];

export const REINVEST = [
  { into: "Pasture", share: 28, note: "Bush clearing, rest, erosion fans" },
  { into: "Water", share: 18, note: "Redundant pumps, extra 3-day storage" },
  { into: "Herd health", share: 16, note: "Coverage gaps, dip, isolation" },
  { into: "Handling", share: 14, note: "Shade, load cells, calving watch" },
  { into: "Traceability", share: 12, note: "Telemetry, BAITS, crush tablets" },
  { into: "People", share: 12, note: "Stockmen, DVS liaison, training" },
];

export function pula(n: number) {
  return `P ${n.toLocaleString("en-BW")}`;
}

export function veldTone(score: number): AssetStatus {
  if (score >= 65) return "ok";
  if (score >= 50) return "watch";
  return "fault";
}

export function herdDemandM3() {
  return +((ENTERPRISE.herd * ENTERPRISE.waterLpd) / 1000).toFixed(1);
}

export function tankCapacityKl() {
  return BOREHOLES.reduce((s, b) => s + b.tankKl, 0);
}

export function liveYieldLs(repaired: string[]) {
  return BOREHOLES.filter((b) => b.status !== "fault" || repaired.includes(b.id)).reduce(
    (s, b) => s + b.yieldLs,
    0,
  );
}

export function plantTotals() {
  const capex = PLANT.reduce((s, p) => s + p.capex, 0);
  const byStatus = {
    "in-service": PLANT.filter((p) => p.status === "in-service").length,
    specified: PLANT.filter((p) => p.status === "specified").length,
    tender: PLANT.filter((p) => p.status === "tender").length,
    planned: PLANT.filter((p) => p.status === "planned").length,
  };
  return { capex, count: PLANT.length, byStatus };
}
