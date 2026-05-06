import { describe, it, expect } from 'vitest';
import {
  normaliseFontSize,
  normaliseLineHeight,
  buildTypographyClassMap,
  formatTypographyCSS,
  resolveTypography,
} from './typography';
import type { TypographyScale } from './types';

const scale: TypographyScale = {
  sm: { fontSize: '0.875rem', lineHeight: 1.25 },
  base: { fontSize: 1, lineHeight: 1.5, letterSpacing: '-0.01em' },
  lg: { fontSize: '1.125rem', lineHeight: 1.75, fontWeight: 'semibold' },
  xl: { fontSize: '1.25rem' },
};

describe('normaliseFontSize', () => {
  it('appends rem to numeric values', () => {
    expect(normaliseFontSize(1)).toBe('1rem');
    expect(normaliseFontSize(1.5)).toBe('1.5rem');
  });

  it('returns string values unchanged', () => {
    expect(normaliseFontSize('0.875rem')).toBe('0.875rem');
  });
});

describe('normaliseLineHeight', () => {
  it('converts numbers to strings', () => {
    expect(normaliseLineHeight(1.5)).toBe('1.5');
  });

  it('returns string values unchanged', () => {
    expect(normaliseLineHeight('tight')).toBe('tight');
  });
});

describe('buildTypographyClassMap', () => {
  it('generates base text class for every key', () => {
    const map = buildTypographyClassMap(scale);
    expect(map['sm']).toContain('text-sm');
    expect(map['base']).toContain('text-base');
  });

  it('adds leading class when lineHeight is defined', () => {
    const map = buildTypographyClassMap(scale);
    expect(map['sm']).toContain('leading-sm');
    expect(map['xl']).not.toContain('leading-xl');
  });

  it('adds font-weight class when fontWeight is defined', () => {
    const map = buildTypographyClassMap(scale);
    expect(map['lg']).toContain('font-semibold');
    expect(map['sm']).not.toContain('font-');
  });

  it('adds tracking class when letterSpacing is defined', () => {
    const map = buildTypographyClassMap(scale);
    expect(map['base']).toContain('tracking-base');
  });

  it('respects custom prefixes', () => {
    const map = buildTypographyClassMap(scale, { prefix: 'type', lineHeightPrefix: 'lh' });
    expect(map['sm']).toContain('type-sm');
    expect(map['sm']).toContain('lh-sm');
  });
});

describe('formatTypographyCSS', () => {
  it('outputs CSS custom properties for font-size', () => {
    const css = formatTypographyCSS(scale);
    expect(css).toContain('--font-size-sm: 0.875rem;');
    expect(css).toContain('--font-size-base: 1rem;');
  });

  it('outputs line-height vars when defined', () => {
    const css = formatTypographyCSS(scale);
    expect(css).toContain('--line-height-base: 1.5;');
    expect(css).not.toContain('--line-height-xl:');
  });

  it('uses a custom selector', () => {
    const css = formatTypographyCSS(scale, '.theme');
    expect(css.startsWith('.theme {'));
  });
});

describe('resolveTypography', () => {
  it('returns joined class string for a known key', () => {
    const map = buildTypographyClassMap(scale);
    const result = resolveTypography('lg', map);
    expect(result).toBe('text-lg leading-lg font-semibold');
  });

  it('throws for an unknown key', () => {
    const map = buildTypographyClassMap(scale);
    expect(() => resolveTypography('unknown', map)).toThrow('[patchwork-css]');
  });
});
