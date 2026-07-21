import { useMemo } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { Text } from '@/components/ui';
import { getCategoryPalette, getToken } from '@/utils/chartColors';
import type { ProductRevenue } from '@/types/chart';
import styles from './RevenueByProductChart.module.css';

export interface RevenueByProductChartProps {
  data: ProductRevenue[];
}

export function RevenueByProductChart({ data }: RevenueByProductChartProps) {
  const palette = useMemo(() => getCategoryPalette(), []);
  const textColor = useMemo(() => getToken('--color-text-muted'), []);

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
