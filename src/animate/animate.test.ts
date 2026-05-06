import { describe, it, expect } from 'vitest';
import {
  normaliseDuration,
  buildAnimationValue,
  resolveAnimation,
  resolveAnimations,
  animationClassMap,
} from './animate';
import type { AnimationToken } from './types';

describe('normaliseDuration', () => {
  it('returns 0s for undefined', () => {
    expect(normaliseDuration(undefined)).toBe('0s');
  });

  it('appends ms for numbers', () => {
    expect(normaliseDuration(300)).toBe('300ms');
  });

  it('passes through string values', () => {
    expect(normaliseDuration('0.3s')).toBe('0.3s');
  });
});

describe('buildAnimationValue', () => {
  it('builds a full animation value', () => {
    const token: AnimationToken = {
      name: 'fadeIn',
      duration: 300,
      easing: 'ease-in-out',
      delay: 0,
      iterations: 1,
      direction: 'normal',
      fillMode: 'both',
    };
    const result = buildAnimationValue(token);
    expect(result).toBe('fadeIn 300ms ease-in-out 0ms 1 normal both');
  });

  it('omits undefined fields', () => {
    const token: AnimationToken = { name: 'spin', duration: '1s' };
    expect(buildAnimationValue(token)).toBe('spin 1s');
  });

  it('returns empty string for empty token', () => {
    expect(buildAnimationValue({})).toBe('');
  });
});

describe('resolveAnimation', () => {
  it('produces correct className and css', () => {
    const result = resolveAnimation('fade', { name: 'fadeIn', duration: 200 });
    expect(result.className).toBe('anim-fade');
    expect(result.css).toBe('.anim-fade { animation: fadeIn 200ms; }');
  });

  it('respects custom prefix', () => {
    const result = resolveAnimation('spin', { name: 'spin', duration: '1s' }, 'ui');
    expect(result.className).toBe('ui-spin');
  });
});

describe('resolveAnimations', () => {
  it('resolves multiple tokens', () => {
    const { classMap, css } = resolveAnimations({
      fade: { name: 'fadeIn', duration: 200 },
      slide: { name: 'slideIn', duration: '0.4s' },
    });
    expect(classMap.fade).toBe('anim-fade');
    expect(classMap.slide).toBe('anim-slide');
    expect(css).toContain('.anim-fade');
    expect(css).toContain('.anim-slide');
  });
});

describe('animationClassMap', () => {
  it('returns only the class map', () => {
    const map = animationClassMap({ bounce: { name: 'bounce', duration: 500 } });
    expect(map).toEqual({ bounce: 'anim-bounce' });
  });
});
