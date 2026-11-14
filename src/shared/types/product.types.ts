export interface PriceTrendModel {
  dir: "up" | "down" | "flat";
  pct: number;
}

export interface MarketPriceModel {
  market: string;
  division: string;
  min: number;
  max: number;
  avg?: number;
}

export interface ProductItemModel {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: PriceTrendModel;
  markets: MarketPriceModel[];
}