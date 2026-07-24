import { BrowserRouter, Routes, Route, useInRouterContext } from 'react-router';
import ChartsPage from './pages/ChartsPage';
import { registerReactSingletonCheck } from './utils/reactSingletonCheck';
import type { WidgetProps } from './types/widget';

// Runs once when this module is first evaluated — in both standalone and
// embedded mode, since (unlike bootstrap.tsx) App.tsx runs in both.
registerReactSingletonCheck('chartApp');

function AppShell({ theme }: Pick<WidgetProps, 'theme'>) {
  return (
    <Routes>
      <Route path="/" element={<ChartsPage theme={theme} />} />
    </Routes>
  );
}

export default function App({ basename = '/', theme }: WidgetProps) {
  // Standalone mode mounts with no ambient Router, so App must provide one.
  // Embedded mode mounts inside the portal's own <BrowserRouter>, nested
  // under a `path="<route>/*"` — a second <BrowserRouter> there would throw
  // ("You cannot render a <Router> inside another <Router>"). useInRouterContext
  // tells us which case we're in so the same component works both ways.
  const isEmbedded = useInRouterContext();

  if (isEmbedded) {
    return <AppShell theme={theme} />;
  }

  return (
    <BrowserRouter basename={basename}>
      <AppShell theme={theme} />
    </BrowserRouter>
  );
}
