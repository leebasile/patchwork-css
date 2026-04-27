import { describe, it, expect } from 'vitest';
import { buildResponsiveClasses } from './builder';
import type { BreakpointMap } from './types';

const breakpoints: BreakpointMap = {
  sm: 'sm:',
  md: 'md:',
  lg: 'lg:',
};

describe('buildResponsiveClasses', () => {
  it('handles a plain string value (no breakpoint)', () => {
    const result = buildResponsiveClasses(breakpoints, {
      display: 'block',
    });
    expect(result).toEqual(['block']);
  });

  it('applies base value without a prefix', () => {
    const result = buildResponsiveClasses(breakpoints, {
      display: { base: 'block' },
    });
    expect(result).toContain('block');
  });

  it('applies breakpoint prefixes to non-base values', () => {
    const result = buildResponsiveClasses(breakpoints, {
      display: { base: 'block', md: 'flex', lg: 'grid' },
    });
    expect(result).toContain('block');
    expect(result).toContain('md:flex');
    expect(result).toContain('lg:grid');
  });

  it('handles multiple props independently', () => {
    const result = buildResponsiveClasses(breakpoints, {
      display: { base: 'block', md: 'flex' },
      gap: 'gap-4',
    });
    expect(result).toContain('block');
    expect(result).toContain('md:flex');
    expect(result).toContain('gap-4');
  });

  it('ignores unknown breakpoint keys not in the map', () => {
    const result = buildResponsiveClasses(breakpoints, {
      display: { base: 'block', xl: 'inline' } as any,
    });
    expect(result).toContain('block');
    expect(result).not.toContain('xl:inline');
    expect(result).not.toContain('inline');
  });

  it('returns empty array for empty config', () => {
    const result = buildResponsiveClasses(breakpoints, {});
    expect(result).toEqual([]);
  });
});
