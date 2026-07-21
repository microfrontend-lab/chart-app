# chart-app

Standalone charting application, and a remote in the `microfrontend-lab`
micro frontend POC. Runs fully on its own; the portal is optional.

See [`CLAUDE.md`](./CLAUDE.md) for the architecture docs this app must
conform to.

## Run standalone

Requires Node 24 (`.nvmrc`).

```bash
pnpm install
pnpm dev
```

Open http://localhost:3002 — a small ecommerce sales dashboard, fully styled,
backed by mock data, no other repo running.

## What it shows

Three charts, mock ecommerce data in `src/resources/data/`:

| Chart | Type | Data |
|---|---|---|
| Annual Growth | Line | Monthly revenue, 12 months |
| Revenue by Product | Pie | Apparel, Shoes, Sport Shoes, Bags, Accessories |
| Category Revenue: This Year vs Last Year | Bar (two series) | Same five categories, year-over-year |

Chart colours are read from the design tokens at runtime
(`src/utils/chartColors.ts`) via `getComputedStyle`, since recharts needs JS
colour values rather than CSS — see `SCAFFOLD.md` §6. No colour is hardcoded
in a chart component.

## Exposed module

| | |
|---|---|
| MF container name | `chartApp` |
| Exposed module | `./ChartWidget` |
| `remoteEntry.js` | `http://localhost:3002/remoteEntry.js` (dev) |
| Props | `WidgetProps` — `basename`, `user`, `theme` (all optional; see `src/types/widget.ts`) |

## Routes

| Path | Page |
|---|---|
| `/` | Dashboard (all three charts) |

Embedded under the portal's `/apps/chart` prefix, this becomes `/apps/chart`.

## Registry entry

```json
{
  "name": "chartApp",
  "url": "https://storage.googleapis.com/mf-chart-app/remoteEntry.js",
  "module": "./ChartWidget",
  "route": "/apps/chart",
  "title": "Charts",
  "icon": "bar-chart-3",
  "enabled": true
}
```

## Scripts

| Command | Purpose |
|---|---|
| `pnpm dev` | Dev server on :3002 |
| `pnpm build` | Production build → `dist/` |
| `pnpm preview` | Serve `dist/` locally |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm lint` / `lint:fix` | ESLint |
| `pnpm stylelint` | Stylelint on `*.module.css` |
| `pnpm test` | Vitest |

## Deploy

`.github/workflows/deploy.yml` builds and syncs `dist/` to `gs://mf-chart-app`
on push to `main`, via Workload Identity Federation. `remoteEntry.js` and
`index.html` are uploaded with `Cache-Control: no-cache`; hashed chunks get a
one-year immutable cache. See `infra/README.md` for the bucket Terraform.
