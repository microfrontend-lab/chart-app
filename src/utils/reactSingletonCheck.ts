import * as React from 'react';

// Exposes this bundle's React reference on `window` under this app's name so
// it can be compared, in the browser console, against another federated
// bundle's reference: e.g.
//   window.__mfReact.todoApp.useState === window.__mfReact.chartApp.useState
// `true` means both bundles resolved to the one shared React instance
// (ARCHITECTURE.md §14.1). Compare an actual export like `useState`, not the
// namespace object itself — the bundler's interop wrapper can differ between
// bundles even when the underlying React module is genuinely shared.
declare global {
  interface Window {
    __mfReact?: Record<string, typeof React>;
  }
}

export function registerReactSingletonCheck(appName: string): void {
  window.__mfReact ??= {};
  window.__mfReact[appName] = React;
  console.info(`[${appName}] React version:`, React.version);
}
