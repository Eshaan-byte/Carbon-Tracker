export type ImpactStat = {
  id: number;
  value: number; 
  display: string;
  suffix: string; 
};
export const IMPACT_STATS = [
  {
    id: 1,
    value: 10500, 
    display: "10,000+",
    suffix: "activities tracked",
  },
  {
    id: 2,
    value: 2500, 
    display: "2.5",
    suffix: "tons CO2 awareness raised",
  },
  {
    id: 3,
    value: 530, 
    display: "500+",
    suffix: "eco-warriors joined",
  },
];

export const INSPIRATIONAL_TAGLINE = "Every action counts. Join the collective impact.";