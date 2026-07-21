import annualGrowth from '@/resources/data/annual-growth.json';
import revenueByProduct from '@/resources/data/revenue-by-product.json';
import categoryComparison from '@/resources/data/category-comparison.json';
import { ApiError } from './ApiError';

const LATENCY_MS = 300;

const ROUTES: Record<string, unknown> = {
  'GET /charts/annual-growth': annualGrowth,
  'GET /charts/revenue-by-product': revenueByProduct,
  'GET /charts/category-comparison': categoryComparison,
};

function delay(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, LATENCY_MS));
}

export async function mockRequest<T>(method: string, path: string): Promise<T> {
  await delay();

  const found = ROUTES[`${method} ${path}`];
  if (found) return structuredClone(found) as T;

  throw new ApiError(501, `No mock for ${method} ${path}`);
}
