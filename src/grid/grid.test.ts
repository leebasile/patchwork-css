import { describe, it, expect } from 'vitest';
import { buildGridClassMap, resolveGrid, gridToClassString } from './grid';

describe('buildGridClassMap', () => {
  it('generates col classes for all valid column counts', () => {
    const map = buildGridClassMap();
    expect(map.cols['1']).toBe('grid-cols-1');
    expect(map.cols['12']).toBe('grid-cols-12');
    expect(map.cols['none']).toBe('grid-cols-none');
  });

  it('generates row classes', () => {
    const map = buildGridClassMap();
    expect(map.rows['3']).toBe('grid-rows-3');
    expect(map.rows['none']).toBe('grid-rows-none');
  });

  it('respects a custom prefix', () => {
    const map = buildGridClassMap('tw');
    expect(map.cols['4']).toBe('tw-cols-4');
    expect(map.gap['md']).toBe('tw-gap-md');
  });

  it('generates gap, gapX, gapY classes', () => {
    const map = buildGridClassMap();
    expect(map.gap['lg']).toBe('grid-gap-lg');
    expect(map.gapX['sm']).toBe('grid-gap-x-sm');
    expect(map.gapY['xl']).toBe('grid-gap-y-xl');
  });
});

describe('resolveGrid', () => {
  it('always includes base grid class', () => {
    const result = resolveGrid({});
    expect(result).toContain('grid');
  });

  it('resolves cols and rows', () => {
    const result = resolveGrid({ cols: 3, rows: 2 });
    expect(result).toContain('grid-cols-3');
    expect(result).toContain('grid-rows-2');
  });

  it('resolves flow', () => {
    const result = resolveGrid({ flow: 'row-dense' });
    expect(result).toContain('grid-flow-row-dense');
  });

  it('resolves gap variants independently', () => {
    const result = resolveGrid({ gapX: 'sm', gapY: 'lg' });
    expect(result).toContain('grid-gap-x-sm');
    expect(result).toContain('grid-gap-y-lg');
    expect(result).not.toContain('grid-gap-md');
  });

  it('resolves align and justify', () => {
    const result = resolveGrid({ align: 'center', justify: 'between' });
    expect(result).toContain('grid-align-center');
    expect(result).toContain('grid-justify-between');
  });
});

describe('gridToClassString', () => {
  it('returns a space-separated string', () => {
    const str = gridToClassString({ cols: 4, gap: 'md' });
    expect(str).toBe('grid grid-cols-4 grid-gap-md');
  });

  it('returns just grid for empty config', () => {
    expect(gridToClassString({})).toBe('grid');
  });
});
