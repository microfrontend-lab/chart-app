import { useEffect, useState } from 'react';
import { chartService, ApiError } from '@/services';
import type { AnnualGrowthPoint } from '@/types/chart';

type Status = 'idle' | 'loading' | 'error' | 'success';

export function useAnnualGrowth() {
  const [data, setData] = useState<AnnualGrowthPoint[]>([]);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<ApiError | null>(null);

  useEffect(() => {
    setStatus('loading');
    chartService
      .annualGrowth()
      .then((points) => {
        setData(points);
        setStatus('success');
      })
      .catch((err: unknown) => {
        setError(err instanceof ApiError ? err : new ApiError(500, 'Unknown error'));
        setStatus('error');
      });
  }, []);

  return { data, status, error };
}
