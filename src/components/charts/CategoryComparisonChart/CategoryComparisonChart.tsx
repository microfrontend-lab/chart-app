import { useMemo } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { Text } from '@/components/ui';
import { getToken } from '@/utils/chartColors';
import type { CategoryComparisonPoint } from '@/types/chart';
import styles from './CategoryComparisonChart.module.css';

export interface CategoryComparisonChartProps {
  data: CategoryComparisonPoint[];
}

export function CategoryComparisonChart({ data }: CategoryComparisonChartProps) {
  const colors = useMemo(
    () => ({
      thisYear: getToken('--color-primary'),
      lastYear: getToken('--color-success'),
      grid: getToken('--color-border'),
      text: getToken('--color-text-muted'),
    }),
    [],
  );

  return (
    <div className={styles.container}>
      <Text as="h2" size="lg">
        Category Revenue: This Year vs Last Year
      </Text>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 8, right: 16, bottom: 0, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
          <XAxis dataKey="category" stroke={colors.text} tick={{ fill: colors.text }} />
          <YAxis stroke={colors.text} tick={{ fill: colors.text }} />
          <Tooltip
            contentStyle={{ background: getToken('--color-surface-alt'), border: 'none' }}
            labelStyle={{ color: colors.text }}
          />
          <Legend wrapperStyle={{ color: colors.text, fontSize: 'var(--font-size-sm)' }} />
          <Bar dataKey="lastYear" name="Last Year ($K)" fill={colors.lastYear} radius={[4, 4, 0, 0]} />
          <Bar dataKey="thisYear" name="This Year ($K)" fill={colors.thisYear} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
