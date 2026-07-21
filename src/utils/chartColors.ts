// recharts needs colour values in JS, not CSS — this is the one place charts
// read design tokens directly instead of via var() in a stylesheet (SCAFFOLD §6).
const FALLBACK: Record<string, string> = {
  '--color-primary': '#4f8cff',
  '--color-primary-hover': '#3d78e8',
  '--color-success': '#3fb27f',
  '--color-danger': '#e5484d',
  '--color-text-muted': '#9aa1ad',
  '--color-text': '#e6e8ec',
  '--color-border': '#2a2f3a',
  '--color-surface': '#181b22',
  '--color-surface-alt': '#20242d',
};

export function getToken(name: string): string {
  if (typeof window === 'undefined') return FALLBACK[name] ?? '#888';
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value || FALLBACK[name] || '#888';
}

/** Distinct-enough colours for categorical data, drawn from the existing token set. */
export function getCategoryPalette(): string[] {
  return [
    getToken('--color-primary'),
    getToken('--color-success'),
    getToken('--color-danger'),
    getToken('--color-primary-hover'),
    getToken('--color-text-muted'),
  ];
}
