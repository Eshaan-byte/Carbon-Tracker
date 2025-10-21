export interface ImpactStat {
  id: number;
  suffix: string; 
  value: number; 
  decimalPlaces?: number; 
  showPlus?: boolean; 
}

export const INSPIRATIONAL_TAGLINE = "Every action counts. Join the collective impact.";

export const IMPACT_STATS: ImpactStat[] = [
  {
    id: 1,
    suffix: 'activities tracked',
    value: 10500,
    showPlus: true, // Show '+' for users
  },
  {
    id: 2,
    suffix: 'Tons of CO2 awareness raised',
    value: 2.5,          
    decimalPlaces: 1,    
    showPlus: true,      
  },
  {
    id: 3,
    suffix: 'eco-warriors joined',
    value: 530,
    showPlus:true,
  },
];

