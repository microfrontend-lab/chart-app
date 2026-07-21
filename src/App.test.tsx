import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('App', () => {
  it('renders the dashboard once loading resolves', async () => {
    render(<App basename="/" />);

    expect(await screen.findByText('Sales Dashboard')).toBeInTheDocument();
    expect(await screen.findByText('Annual Growth')).toBeInTheDocument();
    expect(await screen.findByText('Revenue by Product')).toBeInTheDocument();
    expect(await screen.findByText('Category Revenue: This Year vs Last Year')).toBeInTheDocument();
  });
});
