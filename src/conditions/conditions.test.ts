import {
  isMediaQuery,
  resolveConditionMap,
  resolveConditions,
  flattenConditionClasses,
  conditionsToClassString,
} from './conditions';
import type { ConditionMap } from './types';

const conditions: ConditionMap = {
  hover: '&:hover',
  focus: '&:focus',
  dark: '@media (prefers-color-scheme: dark)',
  sm: '@media (min-width: 640px)',
};

describe('isMediaQuery', () => {
  it('returns true for @ prefixed strings', () => {
    expect(isMediaQuery('@media (min-width: 640px)')).toBe(true);
  });
  it('returns false for selector strings', () => {
    expect(isMediaQuery('&:hover')).toBe(false);
  });
});

describe('resolveConditionMap', () => {
  it('maps conditions to ResolvedCondition objects', () => {
    const resolved = resolveConditionMap(conditions);
    expect(resolved).toContainEqual({ name: 'hover', selector: '&:hover', isMediaQuery: false });
    expect(resolved).toContainEqual({
      name: 'dark',
      selector: '@media (prefers-color-scheme: dark)',
      isMediaQuery: true,
    });
  });
});

describe('resolveConditions', () => {
  it('passes base classes through unchanged', () => {
    const result = resolveConditions({ base: 'text-sm font-bold' }, conditions);
    expect(result['base']).toEqual(['text-sm', 'font-bold']);
  });

  it('prefixes pseudo-selector conditions with escaped colon', () => {
    const result = resolveConditions({ hover: ['text-blue-500'] }, conditions);
    expect(result['hover']).toEqual(['&:hover\\:text-blue-500']);
  });

  it('prefixes media query conditions with colon', () => {
    const result = resolveConditions({ sm: 'text-lg' }, conditions);
    expect(result['sm']).toEqual(['@media (min-width: 640px):text-lg']);
  });

  it('ignores unknown conditions', () => {
    const result = resolveConditions({ unknown: 'text-red-500' }, conditions);
    expect(result['unknown']).toBeUndefined();
  });

  it('ignores empty class arrays', () => {
    const result = resolveConditions({ hover: [] }, conditions);
    expect(result['hover']).toBeUndefined();
  });
});

describe('flattenConditionClasses', () => {
  it('flattens all condition classes into a single array', () => {
    const map = { base: ['text-sm'], hover: ['&:hover\\:text-blue-500'] };
    expect(flattenConditionClasses(map)).toEqual(['text-sm', '&:hover\\:text-blue-500']);
  });
});

describe('conditionsToClassString', () => {
  it('returns a space-separated class string', () => {
    const result = conditionsToClassString(
      { base: 'text-sm', hover: 'text-blue-500' },
      conditions
    );
    expect(result).toBe('text-sm &:hover\\:text-blue-500');
  });
});
