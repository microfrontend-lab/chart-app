import '@testing-library/jest-dom/vitest';

// jsdom doesn't implement ResizeObserver, which recharts' ResponsiveContainer
// requires to measure its container.
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

(globalThis as unknown as { ResizeObserver: typeof ResizeObserverMock }).ResizeObserver =
  ResizeObserverMock;
