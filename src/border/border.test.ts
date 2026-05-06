import { describe, it, expect } from 'vitest';
import {
  normaliseBorderWidth,
  normaliseBorderStyle,
  buildBorderClassMap,
  formatBorderCSS,
  resolveBorder,
} from './border';

describe('normaliseBorderWidth', () => {
  it('converts number to px string', () => {
    expect(normaliseBorderWidth(2)).toBe('2px');
    expect(normaliseBorderWidth(0)).toBe('0px');
  });

  it('returns string values as-is', () => {
    expect(normaliseBorderWidth('1rem')).toBe('1rem');
    expect(normaliseBorderWidth('thin')).toBe('thin');
  });
});

describe('normaliseBorderStyle', () => {
  it('accepts valid border styles', () => {
    expect(normaliseBorderStyle('solid')).toBe('solid');
    expect(normaliseBorderStyle('dashed')).toBe('dashed');
    expect(normaliseBorderStyle('none')).toBe('none');
  });

  it('throws on invalid border style', () => {
    expect(() => normaliseBorderStyle('wiggly')).toThrow('Invalid border style');
  });
});

describe('buildBorderClassMap', () => {
  const scale = {
    sm: { width: 1, style: 'solid', color: '#ccc' },
    md: { width: 2, style: 'dashed', color: '#999', radius: '4px' },
    none: { style: 'none' },
  };

  it('builds class strings for each scale key', () => {
    const result = buildBorderClassMap(scale);
    expect(result.sm).toBe('border-[1px] border-solid border-[#ccc]');
    expect(result.md).toBe('border-[2px] border-dashed border-[#999] rounded-[4px]');
    expect(result.none).toBe('border-none');
  });

  it('uses a custom prefix', () => {
    const result = buildBorderClassMap({ ring: { width: 2, style: 'solid' } }, 'ring');
    expect(result.ring).toBe('ring-[2px] ring-solid');
  });
});

describe('formatBorderCSS', () => {
  it('generates CSS blocks for each scale entry', () => {
    const scale = {
      base: { width: 1, style: 'solid', color: 'black', radius: '2px' },
    };
    const css = formatBorderCSS(scale);
    expect(css).toContain('.border-base {');
    expect(css).toContain('border-width: 1px;');
    expect(css).toContain('border-style: solid;');
    expect(css).toContain('border-color: black;');
    expect(css).toContain('border-radius: 2px;');
  });

  it('skips entries with no declarations', () => {
    const css = formatBorderCSS({ empty: {} });
    expect(css).toBe('');
  });
});

describe('resolveBorder', () => {
  it('returns a class map using provided config', () => {
    const result = resolveBorder({
      scale: { thin: { width: 1, style: 'solid' } },
    });
    expect(result.thin).toContain('border-[1px]');
    expect(result.thin).toContain('border-solid');
  });

  it('uses custom prefix from config', () => {
    const result = resolveBorder({
      scale: { focus: { width: 2, style: 'dotted' } },
      prefix: 'outline',
    });
    expect(result.focus).toContain('outline-[2px]');
  });
});
