import { describe, it, expect } from 'vitest';
import {
  normaliseOutlineWidth,
  normaliseOutlineStyle,
  buildOutlineClassMap,
  formatOutlineCSS,
  resolveOutline,
} from './outline';

describe('normaliseOutlineWidth', () => {
  it('converts numbers to px strings', () => {
    expect(normaliseOutlineWidth(2)).toBe('2px');
  });

  it('passes string values through unchanged', () => {
    expect(normaliseOutlineWidth('0.125rem')).toBe('0.125rem');
  });
});

describe('normaliseOutlineStyle', () => {
  it('defaults to solid when undefined', () => {
    expect(normaliseOutlineStyle()).toBe('solid');
  });

  it('returns provided style', () => {
    expect(normaliseOutlineStyle('dashed')).toBe('dashed');
  });
});

describe('buildOutlineClassMap', () => {
  const scale = {
    sm: { width: 1, color: '#000' },
    md: { width: 2, style: 'dashed', color: 'blue', offset: 4 },
  };

  it('generates outline class for each scale key', () => {
    const map = buildOutlineClassMap(scale);
    expect(map['outline-sm']).toBe('outline: 1px solid #000;');
    expect(map['outline-md']).toBe('outline: 2px dashed blue;');
  });

  it('generates outline-offset class when offset is provided', () => {
    const map = buildOutlineClassMap(scale);
    expect(map['outline-offset-md']).toBe('outline-offset: 4px;');
  });

  it('does not generate outline-offset class when offset is absent', () => {
    const map = buildOutlineClassMap(scale);
    expect(map['outline-offset-sm']).toBeUndefined();
  });

  it('defaults color to currentColor', () => {
    const map = buildOutlineClassMap({ focus: { width: 2 } });
    expect(map['outline-focus']).toBe('outline: 2px solid currentColor;');
  });
});

describe('formatOutlineCSS', () => {
  it('produces CSS rule strings', () => {
    const css = formatOutlineCSS({ ring: { width: 3, color: 'red' } });
    expect(css).toContain('.outline-ring { outline: 3px solid red; }');
  });

  it('applies prefix to class names', () => {
    const css = formatOutlineCSS({ ring: { width: 1 } }, 'tw-');
    expect(css).toContain('.tw-outline-ring');
  });
});

describe('resolveOutline', () => {
  it('returns both classMap and css', () => {
    const result = resolveOutline({
      scale: { base: { width: 2, offset: 2 } },
      prefix: '',
    });
    expect(result.classMap['outline-base']).toBeDefined();
    expect(result.css).toContain('.outline-base');
    expect(result.css).toContain('.outline-offset-base');
  });
});
