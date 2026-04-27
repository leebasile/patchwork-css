import { describe, it, expect } from 'vitest';
import {
  buildMediaQuery,
  resolveBreakpoints,
  findBreakpoint,
  formatBreakpointCSS,
} from './breakpoints';
import type { BreakpointMap } from './types';

const defaultMap: BreakpointMap = {
  sm: { min: '640px' },
  md: { min: '768px' },
  lg: { min: '1024px', max: '1279px' },
};

describe('buildMediaQuery', () => {
  it('builds a min-width query', () => {
    expect(buildMediaQuery({ min: '640px' })).toBe('@media (min-width: 640px)');
  });

  it('builds a max-width query', () => {
    expect(buildMediaQuery({ max: '1279px' })).toBe('@media (max-width: 1279px)');
  });

  it('builds a combined min and max query', () => {
    expect(buildMediaQuery({ min: '768px', max: '1023px' })).toBe(
      '@media (min-width: 768px) and (max-width: 1023px)'
    );
  });

  it('throws when config is empty', () => {
    expect(() => buildMediaQuery({})).toThrow();
  });
});

describe('resolveBreakpoints', () => {
  it('returns a resolved list in insertion order', () => {
    const resolved = resolveBreakpoints(defaultMap);
    expect(resolved.map((b) => b.key)).toEqual(['sm', 'md', 'lg']);
  });

  it('generates correct media queries', () => {
    const resolved = resolveBreakpoints(defaultMap);
    expect(resolved[0].mediaQuery).toBe('@media (min-width: 640px)');
    expect(resolved[2].mediaQuery).toBe('@media (min-width: 1024px) and (max-width: 1279px)');
  });
});

describe('findBreakpoint', () => {
  it('finds a breakpoint by key', () => {
    const resolved = resolveBreakpoints(defaultMap);
    expect(findBreakpoint(resolved, 'md')?.key).toBe('md');
  });

  it('returns undefined for unknown key', () => {
    const resolved = resolveBreakpoints(defaultMap);
    expect(findBreakpoint(resolved, 'xl')).toBeUndefined();
  });
});

describe('formatBreakpointCSS', () => {
  it('wraps rules in media queries', () => {
    const resolved = resolveBreakpoints({ sm: { min: '640px' } });
    const result = formatBreakpointCSS(resolved, { sm: '.text-sm { font-size: 0.875rem; }' });
    expect(result).toContain('@media (min-width: 640px)');
    expect(result).toContain('.text-sm { font-size: 0.875rem; }');
  });

  it('skips breakpoints not in classMap', () => {
    const resolved = resolveBreakpoints(defaultMap);
    const result = formatBreakpointCSS(resolved, { md: '.block { display: block; }' });
    expect(result).not.toContain('640px');
    expect(result).toContain('768px');
  });
});
