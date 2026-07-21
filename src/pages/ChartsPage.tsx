import { useAnnualGrowth } from '@/hooks/useAnnualGrowth';
import { useRevenueByProduct } from '@/hooks/useRevenueByProduct';
import { useCategoryComparison } from '@/hooks/useCategoryComparison';
import { AnnualGrowthChart } from '@/components/charts/AnnualGrowthChart';
import { RevenueByProductChart } from '@/components/charts/RevenueByProductChart';
import { CategoryComparisonChart } from '@/components/charts/CategoryComparisonChart';
import { ChartSlot } from '@/components/ChartSlot';
import { Text } from '@/components/ui';
import styles from './ChartsPage.module.css';

export default function ChartsPage() {
  const growth = useAnnualGrowth();
  const revenue = useRevenueByProduct();
  const comparison = useCategoryComparison();

  return (
    <div className={styles.page}>
      <Text as="h1" size="xl">
        Sales Dashboard
      </Text>

      <div className={styles.grid}>
        <ChartSlot status={growth.status} error={growth.error} empty={growth.data.length === 0}>
          <AnnualGrowthChart data={growth.data} />
        </ChartSlot>

        <ChartSlot status={revenue.status} error={revenue.error} empty={revenue.data.length === 0}>
          <RevenueByProductChart data={revenue.data} />
        </ChartSlot>

        <ChartSlot
          status={comparison.status}
          error={comparison.error}
          empty={comparison.data.length === 0}
        >
          <CategoryComparisonChart data={comparison.data} />
        </ChartSlot>
      </div>
    </div>
  );
}
