export type ZoneId =
  | "unclean"
  | "clean"
  | "chill"
  | "effluent"
  | "service"
  | "admin"
  | "external";

export type DrawingId =
  | "cover"
  | "site"
  | "flow"
  | "lairage"
  | "hall"
  | "chill"
  | "section"
  | "utilities"
  | "phasing"
  | "schedule";

export type LayerId =
  | "zones"
  | "livestock"
  | "product"
  | "personnel"
  | "waste"
  | "labels";

export const PROJECT = {
  name: "Tholo Works",
  short: "Tholo",
  subtitle: "Red Meat Abattoir",
  location: "Kweneng District, Botswana",
  plotHa: 9.6,
  plotW: 400,
  plotH: 240,
  throughputCattle: 80,
  throughputSmall: 120,
  staff: 63,
  waterM3: 150,
  powerKva: 1000,
  chillCarcasses: 240,
  lairageCattle: 120,
  lairageSmall: 180,
  act: "Livestock and Meat Industries Act, 2007",
  schedule: "Eighteenth Schedule — new red meat premises",
  client: "Proprietary livestock platform",
  phase: "Concept for DEA / DVS submission",
  wind: "Prevailing easterlies — lairage and effluent sit downwind (west) of the clean plant",
  yield: "Line slaughter, 15 cattle/h · 8-hour kill",
} as const;

export const DRAWINGS: {
  id: DrawingId;
  code: string;
  title: string;
  scale: string;
  blurb: string;
}[] = [
  { id: "cover", code: "00", title: "Cover", scale: "—", blurb: "Campus portrait and project data" },
  { id: "site", code: "01", title: "Masterplan", scale: "1:1000", blurb: "Plot, buildings, circulation, wind" },
  { id: "flow", code: "02", title: "Hygiene flow", scale: "—", blurb: "Clean / unclean separation, no cross-over" },
  { id: "lairage", code: "03", title: "Lairage", scale: "1:200", blurb: "Pens, races, isolation, ante-mortem" },
  { id: "hall", code: "04", title: "Slaughter hall", scale: "1:150", blurb: "Stun to scale, dirty rooms, hygiene line" },
  { id: "chill", code: "05", title: "Chill & bone", scale: "1:150", blurb: "Cold chain, cutting, loading bays" },
  { id: "section", code: "06", title: "Section A–A", scale: "1:200", blurb: "Heights, rails, insulated envelopes" },
  { id: "utilities", code: "07", title: "Effluent", scale: "1:500", blurb: "Water, power, refrigeration, ponds" },
  { id: "phasing", code: "08", title: "Phasing", scale: "—", blurb: "Milestones from DEA to export chill" },
  { id: "schedule", code: "09", title: "Areas", scale: "—", blurb: "Accommodation, zones, DVS notes" },
];

export const ZONES: Record<
  ZoneId,
  { label: string; fill: string; stroke: string; note: string }
> = {
  unclean: {
    label: "Unclean",
    fill: "var(--color-unclean-soft)",
    stroke: "var(--color-unclean)",
    note: "Live animals, hides, viscera, blood. Staff remain on the black side.",
  },
  clean: {
    label: "Clean",
    fill: "var(--color-clean-soft)",
    stroke: "var(--color-clean)",
    note: "Inspected carcasses, cutting, packing. White-side clothing only.",
  },
  chill: {
    label: "Cold chain",
    fill: "var(--color-chill-soft)",
    stroke: "var(--color-chill)",
    note: "Blast, hold and dispatch rooms. Separate carcass and offal air.",
  },
  effluent: {
    label: "Effluent",
    fill: "var(--color-effluent-soft)",
    stroke: "var(--color-effluent)",
    note: "Screen, DAF, anaerobic ponds, reed beds, irrigation. Downwind.",
  },
  service: {
    label: "Plant",
    fill: "var(--color-surface)",
    stroke: "var(--color-service)",
    note: "Boiler, refrigeration, generator, water. Service road only.",
  },
  admin: {
    label: "Admin / DVS",
    fill: "var(--color-bg-elevated)",
    stroke: "var(--color-admin)",
    note: "Offices, laboratory, inspector rooms. Clean-gate access.",
  },
  external: {
    label: "External",
    fill: "transparent",
    stroke: "var(--color-subtle)",
    note: "Yards, roads, parking, landscape.",
  },
};

export type Building = {
  id: string;
  name: string;
  short: string;
  zone: ZoneId;
  x: number;
  y: number;
  w: number;
  h: number;
  area: number;
  program: string;
  dvs: string;
  materials: string;
  drawing?: DrawingId;
  photo?: string;
};

export const BUILDINGS: Building[] = [
  {
    id: "weighbridge",
    name: "Livestock weighbridge",
    short: "Weigh",
    zone: "unclean",
    x: 22,
    y: 186,
    w: 14,
    h: 7,
    area: 98,
    program: "Inbound live-weight, lot ID, platform intake.",
    dvs: "Separate dirty-gate access. No product vehicles.",
    materials: "In-ground deck, steel cabin, washable apron.",
    photo: "/renders/lairage.jpg",
  },
  {
    id: "truck-wash",
    name: "Livestock truck wash",
    short: "Truck wash",
    zone: "unclean",
    x: 20,
    y: 164,
    w: 18,
    h: 16,
    area: 288,
    program: "Mandatory sanitise after offload. Recycled wash water to effluent.",
    dvs: "High-throughput red-meat rule: vehicles sanitised after unloading.",
    materials: "Bunded concrete, silt trap, 4-bar wash, roofed bay.",
    photo: "/renders/lairage.jpg",
  },
  {
    id: "unload",
    name: "Unloading ramps",
    short: "Ramps",
    zone: "unclean",
    x: 44,
    y: 164,
    w: 22,
    h: 16,
    area: 352,
    program: "Split cattle and small-stock ramps from mixed deck heights.",
    dvs: "Humane offload from different vehicle levels. Non-slip.",
    materials: "Concrete ramps, pipe rails, shade canopy.",
    drawing: "lairage",
    photo: "/renders/lairage.jpg",
  },
  {
    id: "lairage-cattle",
    name: "Cattle lairage",
    short: "Cattle pens",
    zone: "unclean",
    x: 72,
    y: 128,
    w: 50,
    h: 32,
    area: 1600,
    program: "120 head (1.5-day hold) in six pens, water, shade, races.",
    dvs: "Min. 1-day throughput. Roofed. Paved, drained. 2.3–2.8 m²/head loose.",
    materials: "Pipe-rail pens, sloped concrete, shade steel, drinkers.",
    drawing: "lairage",
    photo: "/renders/lairage.jpg",
  },
  {
    id: "lairage-small",
    name: "Small-stock lairage",
    short: "Sheep / goat",
    zone: "unclean",
    x: 72,
    y: 162,
    w: 30,
    h: 14,
    area: 420,
    program: "180 head, 0.7 m²/head, separate species races.",
    dvs: "Species held apart. Own drainage. Shade and water.",
    materials: "Mesh panels, concrete, shade roof.",
    drawing: "lairage",
    photo: "/renders/lairage.jpg",
  },
  {
    id: "isolation",
    name: "Isolation pens",
    short: "Suspect",
    zone: "unclean",
    x: 126,
    y: 128,
    w: 18,
    h: 16,
    area: 288,
    program: "Suspect and injured animals. Contained drainage. Crush.",
    dvs: "Secure holding pending supervised slaughter. Separate drain.",
    materials: "Solid walls to 1.5 m, lockable gates, own sump.",
    drawing: "lairage",
    photo: "/renders/lairage.jpg",
  },
  {
    id: "am-crush",
    name: "Ante-mortem crush",
    short: "A.M. crush",
    zone: "unclean",
    x: 126,
    y: 148,
    w: 14,
    h: 10,
    area: 140,
    program: "Individual restraint for DVS ante-mortem exam.",
    dvs: "Restraining facilities for examination of individual animals.",
    materials: "Steel crush, raised inspector walkway.",
    drawing: "lairage",
  },
  {
    id: "race",
    name: "Covered stun race",
    short: "Race",
    zone: "unclean",
    x: 146,
    y: 150,
    w: 18,
    h: 6,
    area: 108,
    program: "One-way cattle race, ~10 m from lairage to knocking box.",
    dvs: "Physical separation of lairage from edible areas. No return.",
    materials: "Solid-sided race, roof, non-slip floor.",
    drawing: "hall",
    photo: "/renders/hall.jpg",
  },
  {
    id: "hall",
    name: "Slaughter hall",
    short: "Kill floor",
    zone: "unclean",
    x: 166,
    y: 136,
    w: 52,
    h: 24,
    area: 1248,
    program: "Line slaughter: stun, bleed, dehide, eviscerate, split, inspect, wash, scale.",
    dvs: "Unidirectional flow. Clean/unclean line. No criss-cross of product, staff, or waste.",
    materials: "Insulated panels, epoxy floor, coved skirting, overhead rail, 750 lux.",
    drawing: "hall",
    photo: "/renders/hall.jpg",
  },
  {
    id: "byproducts",
    name: "By-product rooms",
    short: "Hide / paunch",
    zone: "unclean",
    x: 166,
    y: 162,
    w: 38,
    h: 14,
    area: 532,
    program: "Heads & feet, hides, paunch emptying, condemned skip.",
    dvs: "Inedible rooms on the dirty side with own exits to the dirty yard.",
    materials: "Washable walls, drained floors, fly-screened, separate doors.",
    drawing: "hall",
  },
  {
    id: "dirty-change",
    name: "Dirty-side change",
    short: "Black side",
    zone: "unclean",
    x: 166,
    y: 120,
    w: 16,
    h: 14,
    area: 224,
    program: "Black clothing, boots, canteen access from dirty yard only.",
    dvs: "Staff work dirty or clean — never both. Change + wash to cross.",
    materials: "Lockers, boot wash, showers, PPE issue.",
    drawing: "hall",
  },
  {
    id: "chillers",
    name: "Carcass chillers",
    short: "Chill",
    zone: "chill",
    x: 220,
    y: 136,
    w: 30,
    h: 24,
    area: 720,
    program: "Blast 80 + hold 160 carcasses. 0–4 °C deep muscle in 16–20 h.",
    dvs: "Chiller capacity for daily throughput. Carcass and red-offal air separated.",
    materials: "100 mm PIR panels, ceiling evaporators, rail 3.4 m, drain isolated.",
    drawing: "chill",
    photo: "/renders/boning.jpg",
  },
  {
    id: "boning",
    name: "Boning & packing",
    short: "Cutting",
    zone: "clean",
    x: 252,
    y: 136,
    w: 26,
    h: 24,
    area: 624,
    program: "Boning hall, vacuum pack, carton, labelled lots.",
    dvs: "Clean zone. 10–12 °C air. No return to slaughter floor.",
    materials: "Stainless tables, epoxy, positive-pressure AHU.",
    drawing: "chill",
    photo: "/renders/boning.jpg",
  },
  {
    id: "dispatch",
    name: "Dispatch chiller & docks",
    short: "Dispatch",
    zone: "chill",
    x: 280,
    y: 136,
    w: 22,
    h: 20,
    area: 440,
    program: "Sealed docks, carcass and carton bays, outbound weigh.",
    dvs: "Clean-gate only. No livestock vehicles on this apron.",
    materials: "Dock shelters, insulated doors, 4 bays.",
    drawing: "chill",
    photo: "/renders/dispatch.jpg",
  },
  {
    id: "clean-change",
    name: "Clean-side change",
    short: "White side",
    zone: "clean",
    x: 252,
    y: 120,
    w: 18,
    h: 14,
    area: 252,
    program: "White clothing, boot wash into cutting hall.",
    dvs: "No entry from dirty yard. Own staff gate from admin court.",
    materials: "Lockers, laundry pass, hygiene barrier.",
    drawing: "chill",
  },
  {
    id: "offices",
    name: "Admin & DVS offices",
    short: "Offices",
    zone: "admin",
    x: 256,
    y: 174,
    w: 40,
    h: 16,
    area: 640,
    program: "Plant manager, QA, DVS inspector, meeting, records.",
    dvs: "Inspector office with view of inspection line and independent access.",
    materials: "Rammed earth and timber pavilion, deep veranda.",
    photo: "/renders/admin.jpg",
  },
  {
    id: "lab",
    name: "Hygiene laboratory",
    short: "Lab",
    zone: "admin",
    x: 240,
    y: 176,
    w: 14,
    h: 12,
    area: 168,
    program: "Swabs, carcass temps, water, residue sampling.",
    dvs: "On-site lab or contracted — records available to DVS.",
    materials: "Benching, autoclave, cold store for samples.",
    photo: "/renders/admin.jpg",
  },
  {
    id: "plant",
    name: "Refrigeration plant",
    short: "Plant",
    zone: "service",
    x: 200,
    y: 100,
    w: 30,
    h: 16,
    area: 480,
    program: "Ammonia / glycol pack, 1,000 kVA connected load share.",
    dvs: "Plant room isolated from food rooms. Emergency ventilation.",
    materials: "Masonry plant hall, bunded plant, acoustic doors.",
  },
  {
    id: "boiler",
    name: "Boiler house",
    short: "Boiler",
    zone: "service",
    x: 176,
    y: 104,
    w: 16,
    h: 12,
    area: 192,
    program: "Steam / hot water for wash-down and sterilisers (82 °C).",
    dvs: "Potable hot water at every station. Steriliser pots on the line.",
    materials: "Fire-rated, flue, condensate return.",
  },
  {
    id: "generator",
    name: "Generator",
    short: "Gen",
    zone: "service",
    x: 232,
    y: 104,
    w: 12,
    h: 10,
    area: 120,
    program: "Standby for chillers, stunner, lights, effluent pumps.",
    dvs: "Cold chain must not fail. Auto-start on mains loss.",
    materials: "Acoustic canopy, 48 h fuel, bunded tank.",
  },
  {
    id: "water",
    name: "Water works",
    short: "Water",
    zone: "service",
    x: 154,
    y: 98,
    w: 16,
    h: 14,
    area: 224,
    program: "150 m³/day potable. 1,000 L/cattle + 100 L/small stock + wash.",
    dvs: "Potable water of drinking quality. Storage for 1.5 days.",
    materials: "Elevated tanks, chlorination, backflow prevention.",
  },
  {
    id: "effluent-works",
    name: "Primary effluent",
    short: "Screen / DAF",
    zone: "effluent",
    x: 176,
    y: 48,
    w: 24,
    h: 14,
    area: 336,
    program: "Screen, save-all, DAF, equalisation before ponds.",
    dvs: "Letter of no objection from Waste Management & Pollution Control.",
    materials: "Covered screens, concrete channels, DAF package.",
    drawing: "utilities",
    photo: "/renders/effluent.jpg",
  },
  {
    id: "pond-1",
    name: "Anaerobic pond 1",
    short: "An. pond 1",
    zone: "effluent",
    x: 24,
    y: 16,
    w: 92,
    h: 40,
    area: 3680,
    program: "Primary anaerobic treatment, 8–12 day HRT.",
    dvs: "Downwind of plant. Bunded. No overflow to natural water.",
    materials: "Lined earth basin, 3.5 m liquid depth, inlet baffle.",
    drawing: "utilities",
    photo: "/renders/effluent.jpg",
  },
  {
    id: "pond-2",
    name: "Anaerobic pond 2",
    short: "An. pond 2",
    zone: "effluent",
    x: 124,
    y: 20,
    w: 56,
    h: 32,
    area: 1792,
    program: "Second-stage anaerobic.",
    dvs: "Duty / assist with pond 1. Desludge access.",
    materials: "Lined earth basin.",
    drawing: "utilities",
    photo: "/renders/effluent.jpg",
  },
  {
    id: "facultative",
    name: "Facultative pond",
    short: "Fac. pond",
    zone: "effluent",
    x: 190,
    y: 16,
    w: 70,
    h: 26,
    area: 1820,
    program: "Aerobic polish, algae, BOD knock-down.",
    dvs: "No discharge to river without permit. Prefer irrigation.",
    materials: "Shallow lined basin, 1.5 m.",
    drawing: "utilities",
    photo: "/renders/effluent.jpg",
  },
  {
    id: "reed",
    name: "Reed-bed wetland",
    short: "Wetland",
    zone: "effluent",
    x: 268,
    y: 16,
    w: 56,
    h: 28,
    area: 1568,
    program: "Constructed wetland, final polish.",
    dvs: "DEA scoping item. Odour and mosquito management.",
    materials: "Gravel substrate, Typha / Phragmites.",
    drawing: "utilities",
    photo: "/renders/effluent.jpg",
  },
  {
    id: "irrigation",
    name: "Irrigation paddock",
    short: "Irrigate",
    zone: "effluent",
    x: 332,
    y: 16,
    w: 52,
    h: 48,
    area: 2496,
    program: "Treated water to fodder. Seasonal rest.",
    dvs: "No spray drift over clean plant or public road.",
    materials: "Fenced pasture, travelling irrigator.",
    drawing: "utilities",
    photo: "/renders/effluent.jpg",
  },
  {
    id: "manure",
    name: "Manure pad",
    short: "Dung",
    zone: "unclean",
    x: 72,
    y: 196,
    w: 22,
    h: 14,
    area: 308,
    program: "Lairage solids, compost, contractor removal.",
    dvs: "Dirty yard. Covered if wet season. No run-off to clean drains.",
    materials: "Bunded slab, leachate to effluent.",
  },
];

export type Room = {
  id: string;
  name: string;
  x: number;
  y: number;
  w: number;
  h: number;
  zone: ZoneId;
  note: string;
};

export const HALL_ROOMS: Room[] = [
  { id: "stun", name: "Knocking box", x: 1.2, y: 8, w: 4.2, h: 6, zone: "unclean", note: "Captive-bolt stun. One animal. Non-slip. Immediate hoist." },
  { id: "bleed", name: "Bleeding trough", x: 5.6, y: 6, w: 10, h: 10, zone: "unclean", note: "8-station bleed rail. Blood to closed tank. 6 min bleed." },
  { id: "dehide", name: "Dehiding", x: 16, y: 5, w: 9, h: 12, zone: "unclean", note: "Hide-puller, legging, brisket. Hides drop to south room." },
  { id: "evisc", name: "Evisceration", x: 25.2, y: 5, w: 9, h: 12, zone: "unclean", note: "Viscera table, paunch drop, red-offal pan. Inspector present." },
  { id: "split", name: "Split & trim", x: 35.4, y: 5, w: 8, h: 12, zone: "clean", note: "Past hygiene line. Splitting saw, trim, spinal removal." },
  { id: "inspect", name: "Final inspection", x: 43.6, y: 5, w: 5.2, h: 7.5, zone: "clean", note: "DVS post-mortem. Retain rail. Stamp." },
  { id: "wash", name: "Carcass wash", x: 43.6, y: 13, w: 5.2, h: 5.5, zone: "clean", note: "Potable spray. No hide-side contact after this point." },
  { id: "scale", name: "Hot scale", x: 49, y: 8, w: 2.4, h: 4, zone: "clean", note: "Hot carcass weight. Lot ticket. Into blast." },
  { id: "heads", name: "Heads / feet", x: 1.2, y: 18.2, w: 8, h: 4.6, zone: "unclean", note: "Inspected then dispatched dirty-side or condemned." },
  { id: "hides", name: "Hide room", x: 9.4, y: 18.2, w: 8, h: 4.6, zone: "unclean", note: "Salted or fresh. Own dock to dirty yard." },
  { id: "paunch", name: "Paunch / tripe", x: 17.6, y: 18.2, w: 10, h: 4.6, zone: "unclean", note: "Emptying, wash. Rough offal chiller or same-day out." },
  { id: "condemned", name: "Condemned", x: 28, y: 18.2, w: 7.2, h: 4.6, zone: "unclean", note: "Lockable. Stained. Licensed renderer collection." },
];

export const LAIRAGE_PENS: Room[] = [
  { id: "p1", name: "Pen 1", x: 4, y: 4, w: 10, h: 8, zone: "unclean", note: "20 cattle @ 2.5 m². Drinker. Shade." },
  { id: "p2", name: "Pen 2", x: 15, y: 4, w: 10, h: 8, zone: "unclean", note: "20 cattle." },
  { id: "p3", name: "Pen 3", x: 26, y: 4, w: 10, h: 8, zone: "unclean", note: "20 cattle." },
  { id: "p4", name: "Pen 4", x: 4, y: 18, w: 10, h: 8, zone: "unclean", note: "20 cattle." },
  { id: "p5", name: "Pen 5", x: 15, y: 18, w: 10, h: 8, zone: "unclean", note: "20 cattle." },
  { id: "p6", name: "Pen 6", x: 26, y: 18, w: 10, h: 8, zone: "unclean", note: "20 cattle. Closest to race." },
  { id: "alley", name: "Central alley", x: 4, y: 12.2, w: 32, h: 5.6, zone: "unclean", note: "Drove alley 5.6 m. Wash-down. 1:50 fall to drain." },
  { id: "iso1", name: "Isolation A", x: 54, y: 4, w: 8, h: 8, zone: "unclean", note: "Suspect cattle. Own drain." },
  { id: "iso2", name: "Isolation B", x: 54, y: 13, w: 8, h: 7, zone: "unclean", note: "Injured. Crush attached." },
  { id: "small1", name: "Small-stock 1", x: 4, y: 34, w: 14, h: 8, zone: "unclean", note: "90 sheep/goats @ 0.7 m²." },
  { id: "small2", name: "Small-stock 2", x: 19, y: 34, w: 14, h: 8, zone: "unclean", note: "90 sheep/goats." },
  { id: "crush", name: "A.M. crush", x: 54, y: 22, w: 8, h: 6, zone: "unclean", note: "DVS walkway 1.2 m above." },
];

export const CHILL_ROOMS: Room[] = [
  { id: "blast", name: "Blast chiller", x: 1, y: 2, w: 14, h: 20, zone: "chill", note: "80 carcasses. High-velocity. 24 h cycle." },
  { id: "hold-a", name: "Hold chiller A", x: 15.5, y: 2, w: 12, h: 20, zone: "chill", note: "80 carcasses. 0–2 °C." },
  { id: "hold-b", name: "Hold chiller B", x: 28, y: 2, w: 12, h: 10, zone: "chill", note: "80 carcasses. Weekend buffer." },
  { id: "offal-chill", name: "Red-offal chill", x: 28, y: 13, w: 12, h: 9, zone: "chill", note: "Separate air from carcasses." },
  { id: "cut", name: "Boning hall", x: 41, y: 2, w: 22, h: 14, zone: "clean", note: "10–12 °C. Stainless. 500 lux." },
  { id: "pack", name: "Pack & carton", x: 41, y: 17, w: 12, h: 5, zone: "clean", note: "Vacuum, label, metal detect." },
  { id: "dispatch-chill", name: "Dispatch chill", x: 64, y: 2, w: 14, h: 12, zone: "chill", note: "Carcass and carton staging." },
  { id: "docks", name: "Loading docks", x: 64, y: 15, w: 14, h: 7, zone: "chill", note: "Four sealed bays. Dock shelters." },
];

export const FLOW_STEPS: {
  id: string;
  n: number;
  name: string;
  zone: ZoneId;
  side: "process" | "waste" | "inspect";
  note: string;
}[] = [
  { id: "f1", n: 1, name: "Receive & weigh", zone: "unclean", side: "process", note: "Dirty gate. Lot ID. No product trucks." },
  { id: "f2", n: 2, name: "Lairage rest", zone: "unclean", side: "process", note: "12–24 h. Water. Shade. Species apart." },
  { id: "f3", n: 3, name: "Ante-mortem", zone: "unclean", side: "inspect", note: "DVS. Suspects to isolation. Emergency slaughter if needed." },
  { id: "f4", n: 4, name: "Stun", zone: "unclean", side: "process", note: "Captive bolt. Irreversible. Immediate hoist." },
  { id: "f5", n: 5, name: "Bleed", zone: "unclean", side: "process", note: "Closed blood line. Six-minute bleed." },
  { id: "f6", n: 6, name: "Dehide", zone: "unclean", side: "process", note: "Hide drops dirty-side. No carcass contact after." },
  { id: "f7", n: 7, name: "Eviscerate", zone: "unclean", side: "process", note: "Paunch to tripe room. Red offal to pan." },
  { id: "f8", n: 8, name: "Post-mortem", zone: "unclean", side: "inspect", note: "Head, viscera, carcass. Retain or pass." },
  { id: "f9", n: 9, name: "Split & wash", zone: "clean", side: "process", note: "Hygiene line crossed. White side from here." },
  { id: "f10", n: 10, name: "Stamp & scale", zone: "clean", side: "process", note: "Health mark. Hot weight. Lot ticket." },
  { id: "f11", n: 11, name: "Blast chill", zone: "chill", side: "process", note: "Deep muscle ≤7 °C in 16–20 h, then 0–4 °C." },
  { id: "f12", n: 12, name: "Bone / pack", zone: "clean", side: "process", note: "Optional. Phase 2. Carton for export or domestic." },
  { id: "f13", n: 13, name: "Dispatch", zone: "chill", side: "process", note: "Clean dock. Reefer only. Traceability closed." },
  { id: "w1", n: 0, name: "Blood tank", zone: "effluent", side: "waste", note: "Closed collection. Renderer or biogas later." },
  { id: "w2", n: 0, name: "Hides out", zone: "unclean", side: "waste", note: "Dirty dock. No clean-yard crossing." },
  { id: "w3", n: 0, name: "Paunch & manure", zone: "effluent", side: "waste", note: "Screen → DAF → ponds. Solids to pad." },
  { id: "w4", n: 0, name: "Condemned", zone: "unclean", side: "waste", note: "Lockable. Stained. Licensed destruction." },
];

export const PHASES: {
  id: string;
  name: string;
  months: string;
  items: string[];
  buildings: string[];
}[] = [
  {
    id: "p0",
    name: "Phase 0 — Clearance",
    months: "M0–M6",
    items: [
      "DEA project brief and screening",
      "Waste Management letter of no objection",
      "DVS Eighteenth Schedule + plot suitability",
      "Architectural plans: clean / unclean paths",
      "Director of Veterinary Services building approval before ground-break",
    ],
    buildings: [],
  },
  {
    id: "p1",
    name: "Phase 1 — Hot carcass plant",
    months: "M6–M18",
    items: [
      "Fence, dirty/clean gates, roads, water, power",
      "Lairage, slaughter hall, by-product rooms",
      "Blast + hold chillers, dispatch carcass dock",
      "Primary effluent, ponds, manure pad",
      "DVS offices and dirty/clean change",
    ],
    buildings: [
      "weighbridge",
      "truck-wash",
      "unload",
      "lairage-cattle",
      "lairage-small",
      "isolation",
      "am-crush",
      "race",
      "hall",
      "byproducts",
      "dirty-change",
      "chillers",
      "dispatch",
      "plant",
      "boiler",
      "generator",
      "water",
      "effluent-works",
      "pond-1",
      "pond-2",
      "facultative",
      "manure",
      "offices",
    ],
  },
  {
    id: "p2",
    name: "Phase 2 — Value-add",
    months: "M18–M26",
    items: [
      "Boning hall, packing, carton freeze",
      "Red-offal chiller, extra hold chiller",
      "Reed bed and irrigation paddock",
      "Hygiene laboratory",
    ],
    buildings: ["boning", "clean-change", "lab", "reed", "irrigation"],
  },
  {
    id: "p3",
    name: "Phase 3 — Export buffer",
    months: "M26–M36",
    items: [
      "Second hold chiller and dock",
      "Parametric risk buffer on livestock cycles",
      "Institutional finance draw-down (CEDA / NDB) against commissioned throughput",
    ],
    buildings: ["hold-b"],
  },
];

export const AREA_SCHEDULE: {
  id: string;
  name: string;
  zone: ZoneId;
  area: number;
  notes: string;
}[] = [
  { id: "s1", name: "Cattle lairage (pens + alleys)", zone: "unclean", area: 1600, notes: "120 head, 1.5-day" },
  { id: "s2", name: "Small-stock lairage", zone: "unclean", area: 420, notes: "180 head" },
  { id: "s3", name: "Isolation + A.M. crush", zone: "unclean", area: 428, notes: "Separate drain" },
  { id: "s4", name: "Unloading + truck wash", zone: "unclean", area: 640, notes: "Dirty court" },
  { id: "s5", name: "Slaughter hall", zone: "unclean", area: 1248, notes: "Line, 15 cattle/h" },
  { id: "s6", name: "By-product rooms", zone: "unclean", area: 532, notes: "Hide, paunch, condemned" },
  { id: "s7", name: "Dirty-side change", zone: "unclean", area: 224, notes: "Black clothing" },
  { id: "s8", name: "Carcass chillers", zone: "chill", area: 720, notes: "240 carcass places" },
  { id: "s9", name: "Boning & packing", zone: "clean", area: 624, notes: "Phase 2" },
  { id: "s10", name: "Dispatch + docks", zone: "chill", area: 440, notes: "4 sealed bays" },
  { id: "s11", name: "Clean-side change", zone: "clean", area: 252, notes: "White clothing" },
  { id: "s12", name: "Admin, DVS, lab", zone: "admin", area: 808, notes: "Clean-gate access" },
  { id: "s13", name: "Plant, boiler, gen, water", zone: "service", area: 1016, notes: "North service road" },
  { id: "s14", name: "Primary effluent works", zone: "effluent", area: 336, notes: "Screen + DAF" },
  { id: "s15", name: "Ponds & wetland (plan area)", zone: "effluent", area: 8856, notes: "Downwind west–north" },
  { id: "s16", name: "Manure pad", zone: "unclean", area: 308, notes: "Leachate to effluent" },
];

export function buildingById(id: string) {
  return BUILDINGS.find((b) => b.id === id);
}

export function areaTotal() {
  return AREA_SCHEDULE.reduce((s, r) => s + r.area, 0);
}
