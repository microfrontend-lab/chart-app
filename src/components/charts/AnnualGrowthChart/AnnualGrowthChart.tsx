import { useMemo } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { Text } from '@/components/ui';
import { getToken } from '@/utils/chartColors';
import type { AnnualGrowthPoint } from '@/types/chart';
import type { WidgetProps } from '@/types/widget';
import styles from './AnnualGrowthChart.module.css';

export interface AnnualGrowthChartProps {
  data: AnnualGrowthPoint[];
  theme?: WidgetProps['theme'];
}

export function AnnualGrowthChart({ data, theme }: AnnualGrowthChartProps) {
  // `theme` itself isn't used directly — it's a dependency so this recomputes
  // when the portal toggles the theme. recharts needs literal colour strings
  // (not CSS vars), so without this the chart would keep rendering with
  // whichever colours were resolved on first mount.
  const colors = useMemo(
    () => ({
      line: getToken('--color-primary'),
      grid: getToken('--color-border'),
      text: getToken('--color-text-muted'),
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [theme],
  );

  return (
    <div className={styles.container}>
      <Text as="h2" size="lg">
        Annual Growth
      </Text>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data} margin={{ top: 8, right: 16, bottom: 0, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
          <XAxis dataKey="month" stroke={colors.text} tick={{ fill: colors.text }} />
          <YAxis stroke={colors.text} tick={{ fill: colors.text }} />
          <Tooltip
            contentStyle={{ background: getToken('--color-surface-alt'), border: 'none' }}
            labelStyle={{ color: colors.text }}
          />
          <Line
            type="monotone"
            dataKey="revenue"
            name="Revenue ($K)"
            stroke={colors.line}
            strokeWidth={2}
            dot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
