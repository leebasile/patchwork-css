import { describe, it, expect } from 'vitest';
import { resolveResponsive, resolveResponsiveAll } from './resolver';
import type { ResponsiveConfig } from './types';

const config: ResponsiveConfig = {
  breakpoints: { sm: '640px', md: '768px', lg: '1024px' },
};

describe('resolveResponsive', () => {
  it('returns base classes without a prefix', () => {
    expect(resolveResponsive({ base: 'flex flex-col' }, config)).toEqual([
      'flex',
      'flex-col',
    ]);
  });

  it('prefixes breakpoint classes with default template', () => {
    expect(resolveResponsive({ base: 'flex', md: 'grid' }, config)).toEqual([
      'flex',
      'md:grid',
    ]);
  });

  it('handles array values', () => {
    expect(
      resolveResponsive({ base: ['flex', 'flex-col'], lg: ['grid', 'gap-4'] }, config),
    ).toEqual(['flex', 'flex-col', 'lg:grid', 'lg:gap-4']);
  });

  it('ignores unknown breakpoint keys', () => {
    expect(resolveResponsive({ base: 'flex', xl: 'hidden' }, config)).toEqual([
      'flex',
    ]);
  });

  it('supports a custom prefix template', () => {
    const customConfig: ResponsiveConfig = {
      breakpoints: { md: '768px' },
      prefixTemplate: (key) => `${key}__`,
    };
    expect(resolveResponsive({ md: 'text-lg' }, customConfig)).toEqual([
      'md__text-lg',
    ]);
  });

  it('returns empty array for empty value', () => {
    expect(resolveResponsive({} as never, config)).toEqual([]);
  });
});

describe('resolveResponsiveAll', () => {
  it('merges multiple responsive values', () => {
    const result = resolveResponsiveAll(
      [{ base: 'flex' }, { md: 'grid' }],
      config,
    );
    expect(result).toEqual(['flex', 'md:grid']);
  });

  it('deduplicates repeated classes', () => {
    const result = resolveResponsiveAll(
      [{ base: 'flex' }, { base: 'flex', md: 'grid' }],
      config,
    );
    expect(result).toEqual(['flex', 'md:grid']);
  });

  it('returns empty array for empty input', () => {
    expect(resolveResponsiveAll([], config)).toEqual([]);
  });
});
