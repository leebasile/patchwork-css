import { describe, it, expect } from 'vitest';
import {
  resolveShorthand,
  resolveShorthands,
  createShorthand,
} from './shorthand';

const map = {
  'flex-center': ['flex', 'items-center', 'justify-center'],
  'sr-only': [
    'absolute',
    'w-px',
    'h-px',
    'overflow-hidden',
    'clip-rect-0',
  ],
  truncate: 'truncate',
};

describe('resolveShorthand', () => {
  it('expands an array shorthand', () => {
    expect(resolveShorthand('flex-center', map)).toEqual([
      'flex',
      'items-center',
      'justify-center',
    ]);
  });

  it('expands a string shorthand', () => {
    expect(resolveShorthand('truncate', map)).toEqual(['truncate']);
  });

  it('passes through unknown keys', () => {
    expect(resolveShorthand('unknown-key', map)).toEqual(['unknown-key']);
  });
});

describe('resolveShorthands', () => {
  it('resolves multiple keys from a string', () => {
    const result = resolveShorthands('flex-center truncate', map);
    expect(result).toBe('flex items-center justify-center truncate');
  });

  it('resolves multiple keys from an array', () => {
    const result = resolveShorthands(['flex-center', 'truncate'], map);
    expect(result).toBe('flex items-center justify-center truncate');
  });

  it('deduplicates overlapping expansions', () => {
    const m = { a: ['x', 'y'], b: ['y', 'z'] };
    const result = resolveShorthands(['a', 'b'], m);
    expect(result).toBe('x y z');
  });

  it('passes through unknown keys', () => {
    const result = resolveShorthands('my-custom-class', map);
    expect(result).toBe('my-custom-class');
  });
});

describe('createShorthand', () => {
  it('returns a bound resolver function', () => {
    const sh = createShorthand(map);
    expect(sh('flex-center')).toBe('flex items-center justify-center');
  });

  it('handles array input', () => {
    const sh = createShorthand(map);
    expect(sh(['truncate', 'flex-center'])).toBe(
      'truncate flex items-center justify-center'
    );
  });

  it('works with an empty map', () => {
    const sh = createShorthand({});
    expect(sh('some-class')).toBe('some-class');
  });
});
