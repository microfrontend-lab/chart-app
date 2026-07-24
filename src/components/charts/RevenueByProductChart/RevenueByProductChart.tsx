import { useMemo } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { Text } from '@/components/ui';
import { getCategoryPalette, getToken } from '@/utils/chartColors';
import type { ProductRevenue } from '@/types/chart';
import type { WidgetProps } from '@/types/widget';
import styles from './RevenueByProductChart.module.css';

export interface RevenueByProductChartProps {
  data: ProductRevenue[];
  theme?: WidgetProps['theme'];
}

export function RevenueByProductChart({ data, theme }: RevenueByProductChartProps) {
  // `theme` is a dependency (not otherwise used) so these recompute when the
  // portal toggles the theme — see AnnualGrowthChart for why.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const palette = useMemo(() => getCategoryPalette(), [theme]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const textColor = useMemo(() => getToken('--color-text-muted'), [theme]);

  return (
    <div className={styles.container}>
      <Text as="h2" size="lg">
        Revenue by Product
      </Text>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            dataKey="revenue"
            nameKey="category"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
          >
            {data.map((entry, index) => (
              <Cell key={entry.category} fill={palette[index % palette.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ background: getToken('--color-surface-alt'), border: 'none' }}
            labelStyle={{ color: textColor }}
          />
          <Legend wrapperStyle={{ color: textColor, fontSize: 'var(--font-size-sm)' }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
