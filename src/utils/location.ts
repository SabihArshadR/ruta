export interface POI {
  id: number;
  name: string;
  lat: number;
  lng: number;
  radius: number;
}

export const POIs: POI[] = [
  { id: 1, name: "POI1", lng: 1.9051043, lat: 41.2546824, radius: 5 },
  { id: 2, name: "POI2", lng: 1.8215565, lat: 41.2351338, radius: 5 },
  { id: 3, name: "POI3", lng: 1.8129802, lat: 41.2355034, radius: 5 },
  { id: 4, name: "POI4", lng: 1.7947774, lat: 41.2298172, radius: 5 },
  { id: 5, name: "POI5", lng: 1.7430935, lat: 41.218227, radius: 5 },
  { id: 6, name: "POI6", lng: 1.725226, lat: 41.2143534, radius: 5 },
  { id: 7, name: "POI7", lng: 1.7135795, lat: 41.2107159, radius: 5 },
  { id: 8, name: "POI8", lng: 1.6734255, lat: 41.1985038, radius: 5 },
  { id: 9, name: "POI9", lng: 1.6700365, lat: 41.1994589, radius: 5 },
  { id: 10, name: "POI10", lng: 1.6361633, lat: 41.1939082, radius: 5 },
  { id: 11, name: "POI11", lng: 1.5813114, lat: 41.1879458, radius: 5 },
  { id: 12, name: "POI12", lng: 1.5493982, lat: 41.1842667, radius: 5 },
  { id: 13, name: "POI13", lng: 1.502091, lat: 41.174888, radius: 5 },
  // { id: 1, name: "POI1", lng: 1.724675, lat: 41.214502, radius: 5 },
  // { id: 2, name: "POI2", lng: 1.725477, lat: 41.214584, radius: 5 },
  // { id: 3, name: "POI3", lng: 1.725301, lat: 41.214864, radius: 5 },
  // { id: 4, name: "POI4", lng: 1.725007, lat: 41.215348, radius: 5 },
  // { id: 5, name: "POI5", lng: 1.725156, lat: 41.215096, radius: 5 },
  // { id: 6, name: "POI6", lng: 1.724870, lat: 41.215550, radius: 5 },
  // { id: 7, name: "POI7", lng: 1.724686, lat: 41.215899, radius: 5 },
  // { id: 8, name: "POI8", lng: 1.724577, lat: 41.216091, radius: 5 },
  // { id: 9, name: "POI9", lng: 1.724400, lat: 41.216293, radius: 5 },
  // { id: 10, name: "POI10", lng: 1.724566, lat: 41.216080, radius: 5 },
  // { id: 11, name: "POI11", lng: 1.724904, lat: 41.215554, radius: 5 },
  // { id: 12, name: "POI12", lng: 1.725248, lat: 41.214973, radius: 5 },
];

// Coin configuration for each POI (0-indexed)
// Each array represents the coin values that should spawn
// null means this POI doesn't have coins (quiz POIs)
// The number of coins shown equals the array length
export const POICoinConfig: (number[] | null)[] = [
  [1, 1, 1, 1, 1], // POI1: 5 coins, total 15 (3+3+3+3+3=15)
  [1, 1, 1, 1, 1], // POI2: 5 coins, total 20 (4+4+4+4+4=20)
  [1, 1, 1, 1, 1], // POI3: 5 coins, total 25 (previously quiz POI)
  [1, 1, 1, 1, 1, 1, 1], // POI4: 7 coins, total 35 (5+5+5+5+5+5+5=35)
  [1, 1, 1, 1, 1], // POI5: 5 coins, total 15 (3+3+3+3+3=15)
  [1, 1, 1, 1, 1, 1], // POI6: 6 coins, total 24 (previously quiz POI)
  [1, 1, 1, 1, 1, 1, 1], // POI7: 7 coins, total 45 (6+6+6+6+6+6+9=45)
  [1, 1, 1, 1, 1, 1, 1], // POI8: 7 coins, total 50 (7+7+7+7+7+7+8=50)
  [1, 1, 1, 1, 1, 1], // POI9: 6 coins, total 30 (previously quiz POI)
  [1, 1, 1, 1, 1, 1, 1], // POI10: 7 coins, total 55 (8+8+8+8+8+8+7=55)
  [1, 1, 1, 1, 1], // POI11: 5 coins, total 17 (3+3+3+4+4=17)
  [1, 1, 1, 1, 1, 1, 1], // POI12: 7 coins, total 28 (previously quiz POI)
  [1, 1, 1, 1, 1, 1, 1], // POI13: 7 coins, total 31 (previously quiz POI)
];

// Get total coins required for a POI (0-indexed)
export const getPOITotalCoins = (poiIndex: number): number => {
  const config = POICoinConfig[poiIndex];
  if (!config) return 0;
  return config.reduce((sum, val) => sum + val, 0);
};

// Get coin configuration for a POI (0-indexed)
export const getPOICoinConfig = (poiIndex: number): number[] | null => {
  return POICoinConfig[poiIndex] || null;
};
