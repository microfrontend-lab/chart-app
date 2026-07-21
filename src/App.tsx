import { BrowserRouter, Routes, Route, useInRouterContext } from 'react-router';
import ChartsPage from './pages/ChartsPage';
import type { WidgetProps } from './types/widget';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ChartsPage />} />
    </Routes>
  );
}

export default function App({ basename = '/' }: WidgetProps) {
  // Standalone mode mounts with no ambient Router, so App must provide one.
  // Embedded mode mounts inside the portal's own <BrowserRouter>, nested
  // under a `path="<route>/*"` — a second <BrowserRouter> there would throw
  // ("You cannot render a <Router> inside another <Router>"). useInRouterContext
  // tells us which case we're in so the same component works both ways.
  const isEmbedded = useInRouterContext();

  if (isEmbedded) {
    return <AppRoutes />;
  }

  return (
    <BrowserRouter basename={basename}>
      <AppRoutes />
    </BrowserRouter>
  );
}
