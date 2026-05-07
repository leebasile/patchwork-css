import { describe, it, expect } from 'vitest';
import {
  isCursorKeyword,
  normaliseCursorValue,
  buildCursorClassMap,
  formatCursorCSS,
  resolveCursor,
} from './cursor';
import type { CursorConfig } from './types';

const config: CursorConfig = {
  cursors: {
    default: 'default',
    pointer: 'pointer',
    disabled: 'not-allowed',
    custom: 'https://example.com/cursor.png',
  },
  prefix: 'cur',
};

describe('isCursorKeyword', () => {
  it('returns true for known keywords', () => {
    expect(isCursorKeyword('pointer')).toBe(true);
    expect(isCursorKeyword('grab')).toBe(true);
  });
  it('returns false for unknown values', () => {
    expect(isCursorKeyword('banana')).toBe(false);
    expect(isCursorKeyword('')).toBe(false);
  });
});

describe('normaliseCursorValue', () => {
  it('returns keyword as-is', () => {
    expect(normaliseCursorValue('pointer')).toBe('pointer');
  });
  it('wraps non-keyword, non-url values in url()', () => {
    expect(normaliseCursorValue('https://example.com/c.png')).toBe(
      'url(https://example.com/c.png), auto',
    );
  });
  it('returns url() values as-is', () => {
    expect(normaliseCursorValue('url(foo.png)')).toBe('url(foo.png)');
  });
});

describe('buildCursorClassMap', () => {
  it('generates class names with prefix', () => {
    const map = buildCursorClassMap(config);
    expect(map['pointer']).toBe('cur-pointer');
    expect(map['disabled']).toBe('cur-disabled');
  });
  it('uses default prefix when none provided', () => {
    const map = buildCursorClassMap({ cursors: { grab: 'grab' } });
    expect(map['grab']).toBe('cursor-grab');
  });
});

describe('formatCursorCSS', () => {
  it('outputs valid CSS rules', () => {
    const css = formatCursorCSS(config);
    expect(css).toContain('.cur-pointer { cursor: pointer; }');
    expect(css).toContain('.cur-disabled { cursor: not-allowed; }');
  });
  it('wraps custom cursor values', () => {
    const css = formatCursorCSS(config);
    expect(css).toContain('url(https://example.com/cursor.png), auto');
  });
});

describe('resolveCursor', () => {
  it('returns the class for a known token', () => {
    expect(resolveCursor('pointer', config)).toBe('cur-pointer');
  });
  it('returns undefined for unknown token', () => {
    expect(resolveCursor('missing', config)).toBeUndefined();
  });
});
