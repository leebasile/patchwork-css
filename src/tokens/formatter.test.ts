import { describe, it, expect } from 'vitest';
import {
  tokenPathToCSSVar,
  formatTokensAsCSS,
  formatTokensAsVarRecord,
} from './formatter';
import type { ResolvedTokenMap } from './types';

const sampleTokens: ResolvedTokenMap = {
  'color.primary.500': '#3b82f6',
  'color.neutral.100': '#f5f5f5',
  'spacing.4': '1rem',
  'font.size.base': '16px',
};

describe('tokenPathToCSSVar', () => {
  it('converts dot-separated path to CSS variable name', () => {
    expect(tokenPathToCSSVar('color.primary.500', 'pw')).toBe(
      '--pw-color-primary-500'
    );
  });

  it('uses the provided prefix', () => {
    expect(tokenPathToCSSVar('spacing.4', 'ds')).toBe('--ds-spacing-4');
  });

  it('handles single segment paths', () => {
    expect(tokenPathToCSSVar('base', 'pw')).toBe('--pw-base');
  });
});

describe('formatTokensAsCSS', () => {
  it('wraps declarations in :root by default', () => {
    const result = formatTokensAsCSS({ 'color.primary.500': '#3b82f6' });
    expect(result).toContain(':root {');
    expect(result).toContain('--pw-color-primary-500: #3b82f6;');
    expect(result).toMatch(/^:root \{[\s\S]+\}$/);
  });

  it('uses a custom selector when provided', () => {
    const result = formatTokensAsCSS(sampleTokens, { selector: '.theme' });
    expect(result).toContain('.theme {');
  });

  it('uses a custom prefix when provided', () => {
    const result = formatTokensAsCSS(sampleTokens, { prefix: 'ds' });
    expect(result).toContain('--ds-color-primary-500: #3b82f6;');
  });

  it('returns empty string for empty token map', () => {
    expect(formatTokensAsCSS({})).toBe('');
  });

  it('includes all token entries', () => {
    const result = formatTokensAsCSS(sampleTokens);
    expect(result).toContain('--pw-spacing-4: 1rem;');
    expect(result).toContain('--pw-font-size-base: 16px;');
  });
});

describe('formatTokensAsVarRecord', () => {
  it('returns a flat record of CSS var names to values', () => {
    const record = formatTokensAsVarRecord(sampleTokens);
    expect(record['--pw-color-primary-500']).toBe('#3b82f6');
    expect(record['--pw-spacing-4']).toBe('1rem');
  });

  it('uses a custom prefix', () => {
    const record = formatTokensAsVarRecord(sampleTokens, { prefix: 'ds' });
    expect(record['--ds-color-primary-500']).toBe('#3b82f6');
    expect(record['--pw-color-primary-500']).toBeUndefined();
  });
});
