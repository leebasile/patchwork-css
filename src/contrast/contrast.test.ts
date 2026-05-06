import { describe, it, expect } from 'vitest';
import {
  toLinear,
  relativeLuminance,
  hexToRgb,
  contrastRatio,
  checkContrast,
  pickAccessibleColour,
} from './contrast';

describe('toLinear', () => {
  it('converts 0 to 0', () => expect(toLinear(0)).toBe(0));
  it('converts 255 to ~1', () => expect(toLinear(255)).toBeCloseTo(1, 4));
  it('uses low-end branch for small values', () => {
    expect(toLinear(10)).toBeCloseTo(10 / 255 / 12.92, 6);
  });
});

describe('hexToRgb', () => {
  it('parses a 6-digit hex', () => {
    expect(hexToRgb('#ffffff')).toEqual([255, 255, 255]);
  });
  it('parses a 3-digit hex', () => {
    expect(hexToRgb('#fff')).toEqual([255, 255, 255]);
  });
  it('parses black', () => {
    expect(hexToRgb('#000000')).toEqual([0, 0, 0]);
  });
  it('throws on invalid hex', () => {
    expect(() => hexToRgb('#gg0011')).toThrow();
  });
});

describe('relativeLuminance', () => {
  it('white has luminance 1', () => {
    expect(relativeLuminance([255, 255, 255])).toBeCloseTo(1, 4);
  });
  it('black has luminance 0', () => {
    expect(relativeLuminance([0, 0, 0])).toBe(0);
  });
});

describe('contrastRatio', () => {
  it('black on white is 21:1', () => {
    expect(contrastRatio('#000000', '#ffffff')).toBe(21);
  });
  it('white on white is 1:1', () => {
    expect(contrastRatio('#ffffff', '#ffffff')).toBe(1);
  });
  it('is symmetric', () => {
    const a = contrastRatio('#123456', '#abcdef');
    const b = contrastRatio('#abcdef', '#123456');
    expect(a).toBe(b);
  });
});

describe('checkContrast', () => {
  it('black on white passes AA and AAA', () => {
    const result = checkContrast('#000000', '#ffffff');
    expect(result.passes.AA).toBe(true);
    expect(result.passes.AAA).toBe(true);
  });
  it('applies large-text thresholds', () => {
    // ratio ~3.1 — fails normal AA but passes large-text AA
    const result = checkContrast('#767676', '#ffffff', true);
    expect(result.passes.AA).toBe(true);
  });
  it('exposes the numeric ratio', () => {
    const result = checkContrast('#000000', '#ffffff');
    expect(result.ratio).toBe(21);
  });
});

describe('pickAccessibleColour', () => {
  it('picks black for a light background', () => {
    expect(pickAccessibleColour('#ffffff')).toBe('#000000');
  });
  it('picks white for a dark background', () => {
    expect(pickAccessibleColour('#000000')).toBe('#ffffff');
  });
  it('accepts custom candidates', () => {
    const result = pickAccessibleColour('#ffffff', ['#333333', '#cccccc']);
    expect(result).toBe('#333333');
  });
});
