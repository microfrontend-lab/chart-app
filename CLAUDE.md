# chart-app

Remote application in the `microfrontend-lab` micro frontend POC.

## Required reading

Before generating or modifying code, read:
- `../mf-registry/ARCHITECTURE.md` — system architecture, federation config, shared deps
- `../mf-registry/SCAFFOLD.md` — folder structure, CSS Modules rules, services layer

Source: https://github.com/microfrontend-lab/mf-registry

## This app

- Exposed module: `./ChartWidget`
- Dev port: 3002
- Routes: `/` (dashboard: annual growth line chart, revenue-by-product pie chart, year-over-year bar chart)
- Bucket: `gs://mf-chart-app`
