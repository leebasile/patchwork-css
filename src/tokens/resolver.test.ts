import { describe, it, expect } from 'vitest';
import { resolveTokens } from './resolver';
import type { DesignTokenConfig } from './types';

describe('resolveTokens', () => {
  const config: DesignTokenConfig = {
    colors: { primary: '#3b82f6', secondary: '#6366f1' },
    spacing: { sm: '0.5rem', md: '1rem', lg: '2rem' },
    borderRadius: { none: '0', full: '9999px' },
    typography: {
      fontSizes: { base: '1rem', lg: '1.125rem' },
      fontWeights: { bold: '700' },
    },
  };

  it('resolves color tokens', () => {
    const tokens = resolveTokens(config);
    const colorTokens = tokens.filter((t) => t.prefix === 'text' && t.property === 'color');
    expect(colorTokens).toHaveLength(2);
    expect(colorTokens[0]).toMatchObject({
      className: 'text-primary',
      value: '#3b82f6',
      property: 'color',
    });
  });

  it('resolves spacing tokens', () => {
    const tokens = resolveTokens(config);
    const spacingTokens = tokens.filter((t) => t.prefix === 'space');
    expect(spacingTokens).toHaveLength(3);
    expect(spacingTokens.map((t) => t.className)).toEqual(['space-sm', 'space-md', 'space-lg']);
  });

  it('resolves typography tokens', () => {
    const tokens = resolveTokens(config);
    const fontSizeTokens = tokens.filter((t) => t.property === 'font-size');
    expect(fontSizeTokens).toHaveLength(2);
    expect(fontSizeTokens[0].className).toBe('text-base');
  });

  it('resolves border-radius tokens', () => {
    const tokens = resolveTokens(config);
    const radiusTokens = tokens.filter((t) => t.prefix === 'rounded');
    expect(radiusTokens).toHaveLength(2);
    expect(radiusTokens[1]).toMatchObject({ className: 'rounded-full', value: '9999px' });
  });

  it('returns empty array for empty config', () => {
    expect(resolveTokens({})).toEqual([]);
  });

  it('skips missing optional scales gracefully', () => {
    const partial: DesignTokenConfig = { shadows: { md: '0 4px 6px rgba(0,0,0,.1)' } };
    const tokens = resolveTokens(partial);
    expect(tokens).toHaveLength(1);
    expect(tokens[0].className).toBe('shadow-md');
  });
});
