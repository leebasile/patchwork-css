/**
 * animate.ts
 * Resolves animation design tokens into CSS utility classes.
 */

import type {
  AnimationToken,
  AnimationTokenMap,
  AnimationClassMap,
  ResolvedAnimation,
} from './types';

const DEFAULT_PREFIX = 'anim';

/**
 * Normalises a duration value to a CSS string.
 */
export function normaliseDuration(value: string | number | undefined): string {
  if (value === undefined) return '0s';
  if (typeof value === 'number') return `${value}ms`;
  return value;
}

/**
 * Builds the CSS `animation` shorthand value from an AnimationToken.
 */
export function buildAnimationValue(token: AnimationToken): string {
  const parts: string[] = [];
  if (token.name) parts.push(token.name);
  if (token.duration !== undefined) parts.push(normaliseDuration(token.duration));
  if (token.easing) parts.push(token.easing);
  if (token.delay !== undefined) parts.push(normaliseDuration(token.delay));
  if (token.iterations !== undefined) parts.push(String(token.iterations));
  if (token.direction) parts.push(token.direction);
  if (token.fillMode) parts.push(token.fillMode);
  return parts.join(' ');
}

/**
 * Resolves a single animation token to a ResolvedAnimation.
 */
export function resolveAnimation(
  key: string,
  token: AnimationToken,
  prefix: string = DEFAULT_PREFIX,
): ResolvedAnimation {
  const className = `${prefix}-${key}`;
  const value = buildAnimationValue(token);
  const css = `.${className} { animation: ${value}; }`;
  return { key, className, css };
}

/**
 * Resolves all animation tokens into a class map and CSS string.
 */
export function resolveAnimations(
  tokens: AnimationTokenMap,
  prefix: string = DEFAULT_PREFIX,
): { classMap: AnimationClassMap; css: string } {
  const classMap: AnimationClassMap = {};
  const cssBlocks: string[] = [];

  for (const [key, token] of Object.entries(tokens)) {
    const resolved = resolveAnimation(key, token, prefix);
    classMap[key] = resolved.className;
    cssBlocks.push(resolved.css);
  }

  return { classMap, css: cssBlocks.join('\n') };
}

/**
 * Returns only the class map for a token map.
 */
export function animationClassMap(
  tokens: AnimationTokenMap,
  prefix: string = DEFAULT_PREFIX,
): AnimationClassMap {
  return resolveAnimations(tokens, prefix).classMap;
}
