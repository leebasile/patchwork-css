import { composeClasses, classesFromTokens, mergeClassConfigs } from './composer';

describe('composeClasses', () => {
  it('joins plain string entries', () => {
    expect(composeClasses('foo', 'bar', 'baz')).toBe('foo bar baz');
  });

  it('includes conditional entries when condition is true', () => {
    expect(composeClasses('base', ['active', true])).toBe('base active');
  });

  it('excludes conditional entries when condition is false', () => {
    expect(composeClasses('base', ['hidden', false])).toBe('base');
  });

  it('excludes conditional entries when condition is null or undefined', () => {
    expect(composeClasses('base', ['hidden', null], ['gone', undefined])).toBe('base');
  });

  it('deduplicates repeated class names', () => {
    expect(composeClasses('foo', 'foo', 'bar')).toBe('foo bar');
  });

  it('ignores empty strings', () => {
    expect(composeClasses('', 'foo', '  ')).toBe('foo');
  });
});

describe('classesFromTokens', () => {
  it('generates classes from token map without prefix', () => {
    const result = classesFromTokens({ color: 'blue', size: 'md' });
    expect(result).toBe('color-blue size-md');
  });

  it('applies a prefix to each class', () => {
    const result = classesFromTokens({ spacing: '4' }, 'tw-');
    expect(result).toBe('tw-spacing-4');
  });

  it('skips null or undefined token values', () => {
    const result = classesFromTokens({ color: 'red', size: undefined as unknown as string });
    expect(result).toBe('color-red');
  });
});

describe('mergeClassConfigs', () => {
  it('merges multiple configs with later values winning', () => {
    const a = { color: 'text-red' };
    const b = { color: 'text-blue', size: 'text-lg' };
    expect(mergeClassConfigs(a, b)).toEqual({ color: 'text-blue', size: 'text-lg' });
  });

  it('returns empty object for no inputs', () => {
    expect(mergeClassConfigs()).toEqual({});
  });
});
