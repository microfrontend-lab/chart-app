import type { ReactNode } from 'react';
import { Card, Text } from '@/components/ui';

export interface ChartSlotProps {
  status: 'idle' | 'loading' | 'error' | 'success';
  error: { message: string } | null;
  empty: boolean;
  children: ReactNode;
}

export function ChartSlot({ status, error, empty, children }: ChartSlotProps) {
  if (status === 'loading' || status === 'idle') {
    return (
      <Card>
        <Text muted>Loading…</Text>
      </Card>
    );
  }

  if (status === 'error') {
    return (
      <Card>
        <Text>Couldn&apos;t load this chart{error ? `: ${error.message}` : '.'}</Text>
      </Card>
    );
  }

  if (empty) {
    return (
      <Card>
        <Text muted>No data yet.</Text>
      </Card>
    );
  }

  return <>{children}</>;
}
