import { describe, it, expect } from 'vitest';
import { clsx } from './clsx';

describe('clsx', () => {
  it('handles plain strings', () => {
    expect(clsx('foo', 'bar')).toBe('foo bar');
  });

  it('handles multi-class strings', () => {
    expect(clsx('foo bar', 'baz')).toBe('foo bar baz');
  });

  it('ignores falsy values', () => {
    expect(clsx('foo', null, undefined, false, '', 'bar')).toBe('foo bar');
  });

  it('handles conditional objects', () => {
    expect(clsx({ foo: true, bar: false, baz: true })).toBe('foo baz');
  });

  it('handles nested arrays', () => {
    expect(clsx(['foo', ['bar', 'baz']])).toBe('foo bar baz');
  });

  it('handles mixed input types', () => {
    expect(clsx('a', { b: true, c: false }, ['d', 'e'])).toBe('a b d e');
  });

  it('deduplicates classes by default', () => {
    expect(clsx('foo', 'foo', 'bar')).toBe('foo bar');
  });

  it('skips deduplication when disabled', () => {
    expect(clsx('foo', 'foo', 'bar', { deduplicate: false })).toBe(
      'foo foo bar'
    );
  });

  it('applies prefix to all resolved classes', () => {
    expect(clsx('text-sm', 'font-bold', { prefix: 'tw-' })).toBe(
      'tw-text-sm tw-font-bold'
    );
  });

  it('handles numeric inputs', () => {
    expect(clsx(0, 1)).toBe('0 1');
  });

  it('returns empty string for all falsy inputs', () => {
    expect(clsx(null, undefined, false, '')).toBe('');
  });

  it('handles boolean true values in object as class names', () => {
    const active = true;
    expect(clsx({ 'is-active': active, 'is-disabled': !active })).toBe(
      'is-active'
    );
  });
});
