export interface AnnualGrowthPoint {
  month: string;
  revenue: number;
}

export interface ProductRevenue {
  category: string;
  revenue: number;
}

export interface CategoryComparisonPoint {
  category: string;
  thisYear: number;
  lastYear: number;
}
