export interface EnvironmentalFact {
  id: number;
  fact: string;
  icon: string;
}

export const ENVIRONMENTAL_FACTS: EnvironmentalFact[] = [
  {
    id: 1,
    fact:
      "Sending about 65 emails can emit roughly the same CO₂ as driving 1 km in a typical car.",
    icon: "📧",
  },
  {
    id: 2,
    fact:
      "The internet is responsible for an estimated 2–3% of global CO₂ emissions, comparable to aviation.",
    icon: "🌐",
  },
  {
    id: 3,
    fact:
      "Streaming video in HD can use ~8× more data than SD, increasing associated emissions.",
    icon: "📺",
  },
  {
    id: 4,
    fact:
      "Turning off video during calls can reduce data transfer drastically and cut emissions for meetings.",
    icon: "📹",
  },
  {
    id: 5,
    fact:
      "Cleaning unused files from cloud storage helps reduce data center energy use and emissions.",
    icon: "☁️",
  },
  {
    id: 6,
    fact:
      "Batching emails and unsubscribing from newsletters lowers digital noise and small but cumulative CO₂.",
    icon: "📬",
  },
  {
    id: 7,
    fact:
      "Efficient devices and renewable-powered data centers significantly decrease the carbon intensity of digital activities.",
    icon: "🔋",
  },
  {
    id: 8,
    fact:
      "Downloading frequently watched content can reduce repeat streaming emissions over time.",
    icon: "⬇️",
  },
  {
    id: 9,
    fact:
      "Dark mode on OLED screens can save energy, especially at higher brightness levels.",
    icon: "🌙",
  },
  {
    id: 10,
    fact:
      "Optimizing code and build pipelines reduces compute time, indirectly lowering cloud emissions.",
    icon: "💻",
  },
  {
    id: 11,
    fact:
      "Using Wi‑Fi instead of mobile data can be more energy efficient for large downloads and streams.",
    icon: "📶",
  },
];


