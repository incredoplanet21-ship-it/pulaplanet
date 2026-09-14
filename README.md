# PulaPlanet / PulaStock

Operations command centre for a **10,000-hectare Botswana beef enterprise** — from Lekhubu Range rangeland through water, rotational grazing, RFID/BAITS herd records, DVS-compliant abattoir drawings, and a plant bill of quantities.

Built for PulaStock (Gaborone) against the *From Pasture to Premium Markets* value chain.

## What it is

A single interactive studio covering the full infrastructure stack:

| View | What you get |
| --- | --- |
| **Command** | Herd, water, veld, offtake KPIs and alerts |
| **Land** | 10,000 ha ranch map, 24 paddocks, 4 camps, veld condition |
| **Water** | Solar boreholes, tanks, troughs, isolate → repair → verify workflow |
| **Grazing** | Four-camp rotation, rest days, seasonal calendar |
| **Herd** | RFID / BAITS search, crush captures, animal inspector |
| **Health** | Vaccination coverage, biosecurity gate, FMD protocol |
| **Works** | Tholo Works abattoir drawings (DVS Eighteenth Schedule) |
| **Market** | Buyer contracts and offtake contingencies |
| **Plant** | Full infrastructure BoQ with BWP capex, status, phasing |

No login required. Demo data lives in memory for the session.

## Scale encoded in the model

- **10,000 ha** semi-arid rangeland, Kweneng District
- **1,840 head** Tswana-type cattle
- Safe stocking **4–8 ha / AUE**, utilisation cap **25–30%**
- Water **~60 L / mature animal / day**, **3–7 day** reserve
- Rest **45–60 days** per paddock
- Abattoir design throughput **80 cattle / day**

## Run it

```bash
npm install
npm run dev
```

App serves on port `8080`.

```bash
npm run typecheck
npm run build
```

## Stack

React 19 · TanStack Start / Router · Tailwind v4 · Zustand · Recharts · Vite

## Regulatory alignment (design, not a licence)

Drawings and plant specs follow Botswana **DVS / Livestock and Meat Industries Act 2007** logic: unidirectional flow, clean/unclean separation, effluent downwind, BAITS traceability. They are a planning studio — not a substitute for DEA, DVS, or district approvals.

## Repo

[github.com/incredoplanet21-ship-it/pulaplanet](https://github.com/incredoplanet21-ship-it/pulaplanet)
