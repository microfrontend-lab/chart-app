import { http } from './http/client';
import type { AnnualGrowthPoint, ProductRevenue, CategoryComparisonPoint } from '@/types/chart';

export const chartService = {
  annualGrowth: () => http.get<AnnualGrowthPoint[]>('/charts/annual-growth'),
  revenueByProduct: () => http.get<ProductRevenue[]>('/charts/revenue-by-product'),
  categoryComparison: () => http.get<CategoryComparisonPoint[]>('/charts/category-comparison'),
} as const;
