import { describe, it, expect } from 'vitest';
import {
  normaliseOpacityValue,
  buildOpacityClassMap,
  formatOpacityCSS,
  resolveOpacity,
} from './opacity';

describe('normaliseOpacityValue', () => {
  it('passes through valid decimal numbers', () => {
    expect(normaliseOpacityValue(0)).toBe(0);
    expect(normaliseOpacityValue(0.5)).toBe(0.5);
    expect(normaliseOpacityValue(1)).toBe(1);
  });

  it('converts percentage strings to decimals', () => {
    expect(normaliseOpacityValue('0%')).toBe(0);
    expect(normaliseOpacityValue('50%')).toBe(0.5);
    expect(normaliseOpacityValue('100%')).toBe(1);
  });

  it('parses numeric strings', () => {
    expect(normaliseOpacityValue('0.25')).toBe(0.25);
  });

  it('throws for out-of-range numbers', () => {
    expect(() => normaliseOpacityValue(-0.1)).toThrow(RangeError);
    expect(() => normaliseOpacityValue(1.1)).toThrow(RangeError);
  });

  it('throws for invalid percentage strings', () => {
    expect(() => normaliseOpacityValue('150%')).toThrow(RangeError);
    expect(() => normaliseOpacityValue('abc%')).toThrow(RangeError);
  });
});

describe('buildOpacityClassMap', () => {
  it('maps scale keys to class names with default prefix', () => {
    const map = buildOpacityClassMap({ '0': 0, '50': 0.5, '100': 1 });
    expect(map).toEqual({
      '0': 'opacity-0',
      '50': 'opacity-50',
      '100': 'opacity-100',
    });
  });

  it('respects a custom prefix', () => {
    const map = buildOpacityClassMap({ '50': 0.5 }, 'op');
    expect(map['50']).toBe('op-50');
  });
});

describe('formatOpacityCSS', () => {
  it('outputs a :root block with CSS custom properties', () => {
    const css = formatOpacityCSS({ '50': '50%', '100': 1 });
    expect(css).toContain(':root {');
    expect(css).toContain('--opacity-50: 0.5;');
    expect(css).toContain('--opacity-100: 1;');
  });
});

describe('resolveOpacity', () => {
  it('returns classMap and css', () => {
    const result = resolveOpacity({ scale: { '0': 0, '100': 1 } });
    expect(result.classMap['0']).toBe('opacity-0');
    expect(result.classMap['100']).toBe('opacity-100');
    expect(result.css).toContain('--opacity-0: 0;');
    expect(result.css).toContain('--opacity-100: 1;');
  });

  it('applies custom prefix', () => {
    const result = resolveOpacity({ scale: { '50': 0.5 }, prefix: 'op' });
    expect(result.classMap['50']).toBe('op-50');
    expect(result.css).toContain('--op-50: 0.5;');
  });
});
