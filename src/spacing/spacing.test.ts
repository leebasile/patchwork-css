import { describe, it, expect } from 'vitest';
import {
  normaliseSpacingValue,
  resolveSpacingScale,
  buildSpacingClassMap,
  formatSpacingCSS,
} from './spacing';
import type { SpacingConfig } from './types';

describe('normaliseSpacingValue', () => {
  it('converts 0 to the string "0"', () => {
    expect(normaliseSpacingValue(0)).toBe('0');
  });

  it('appends rem to non-zero numbers', () => {
    expect(normaliseSpacingValue(1)).toBe('1rem');
    expect(normaliseSpacingValue(0.5)).toBe('0.5rem');
  });

  it('passes through string values unchanged', () => {
    expect(normaliseSpacingValue('2px')).toBe('2px');
    expect(normaliseSpacingValue('auto')).toBe('auto');
  });
});

describe('resolveSpacingScale', () => {
  it('resolves an array scale using indices as keys', () => {
    const result = resolveSpacingScale([0, 0.25, 0.5]);
    expect(result).toEqual({ '0': '0', '1': '0.25rem', '2': '0.5rem' });
  });

  it('resolves a record scale preserving keys', () => {
    const result = resolveSpacingScale({ sm: '0.5rem', md: 1 });
    expect(result).toEqual({ sm: '0.5rem', md: '1rem' });
  });
});

describe('buildSpacingClassMap', () => {
  const config: SpacingConfig = {
    scale: [0, 0.5, 1],
    utilities: [
      { prefix: 'p', property: 'padding' },
      { prefix: 'm', property: 'margin' },
    ],
  };

  it('generates class entries for every scale key × utility', () => {
    const map = buildSpacingClassMap(config);
    expect(map['p-0']).toBe('padding: 0');
    expect(map['p-1']).toBe('padding: 0.5rem');
    expect(map['m-2']).toBe('margin: 1rem');
  });

  it('produces the correct number of entries', () => {
    const map = buildSpacingClassMap(config);
    // 3 scale keys × 2 utilities = 6
    expect(Object.keys(map)).toHaveLength(6);
  });
});

describe('formatSpacingCSS', () => {
  it('formats a class map as CSS rule strings', () => {
    const css = formatSpacingCSS({ 'p-0': 'padding: 0', 'm-1': 'margin: 0.25rem' });
    expect(css).toContain('.p-0 { padding: 0; }');
    expect(css).toContain('.m-1 { margin: 0.25rem; }');
  });
});
