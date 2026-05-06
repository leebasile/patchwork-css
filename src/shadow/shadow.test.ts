import { describe, it, expect } from 'vitest';
import {
  normaliseShadowValue,
  resolveShadowScale,
  buildShadowClassMap,
  formatShadowCSS,
} from './shadow';

const scale = {
  sm: { offsetX: 0, offsetY: 1, blur: 2, spread: 0, color: 'rgba(0,0,0,0.05)' },
  md: '0 4px 6px rgba(0,0,0,0.1)',
  inner: { offsetX: 0, offsetY: 2, blur: 4, spread: 0, color: 'rgba(0,0,0,0.06)', inset: true },
};

describe('normaliseShadowValue', () => {
  it('returns a string value unchanged', () => {
    expect(normaliseShadowValue('0 4px 6px red')).toBe('0 4px 6px red');
  });

  it('builds a shadow string from a descriptor object', () => {
    expect(
      normaliseShadowValue({ offsetX: 0, offsetY: 1, blur: 2, spread: 0, color: 'rgba(0,0,0,0.05)' })
    ).toBe('0px 1px 2px 0px rgba(0,0,0,0.05)');
  });

  it('prepends inset when flag is true', () => {
    expect(
      normaliseShadowValue({ offsetX: 0, offsetY: 2, blur: 4, spread: 0, color: '#000', inset: true })
    ).toBe('inset 0px 2px 4px 0px #000');
  });
});

describe('resolveShadowScale', () => {
  it('resolves mixed scale to string values', () => {
    const result = resolveShadowScale(scale);
    expect(result.md).toBe('0 4px 6px rgba(0,0,0,0.1)');
    expect(result.sm).toContain('rgba(0,0,0,0.05)');
    expect(result.inner).toContain('inset');
  });
});

describe('buildShadowClassMap', () => {
  it('creates class names with the default prefix', () => {
    const map = buildShadowClassMap(scale);
    expect(Object.keys(map)).toEqual(['shadow-sm', 'shadow-md', 'shadow-inner']);
  });

  it('wraps values in box-shadow declarations', () => {
    const map = buildShadowClassMap(scale);
    expect(map['shadow-md']).toBe('box-shadow: 0 4px 6px rgba(0,0,0,0.1);');
  });

  it('respects a custom prefix', () => {
    const map = buildShadowClassMap(scale, 'elev');
    expect(Object.keys(map)).toContain('elev-sm');
  });
});

describe('formatShadowCSS', () => {
  it('outputs a :root block with CSS custom properties', () => {
    const css = formatShadowCSS(scale);
    expect(css).toContain(':root {');
    expect(css).toContain('--shadow-sm:');
    expect(css).toContain('--shadow-md: 0 4px 6px rgba(0,0,0,0.1);');
  });

  it('respects a custom selector', () => {
    const css = formatShadowCSS(scale, '[data-theme="dark"]');
    expect(css).toContain('[data-theme="dark"] {');
  });
});
