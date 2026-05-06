/**
 * animate module
 *
 * Resolves animation design tokens into deterministic CSS utility classes.
 *
 * @example
 * ```ts
 * import { resolveAnimations, animationClassMap } from 'patchwork-css/animate';
 *
 * const tokens = {
 *   fade: { name: 'fadeIn', duration: 300, easing: 'ease-in-out', fillMode: 'both' },
 *   spin: { name: 'spin', duration: '1s', iterations: 'infinite' },
 * };
 *
 * const { classMap, css } = resolveAnimations(tokens);
 * // classMap => { fade: 'anim-fade', spin: 'anim-spin' }
 * // css => '.anim-fade { animation: fadeIn 300ms ease-in-out both; }\n...'
 * ```
 */

export type {
  AnimationToken,
  AnimationTokenMap,
  AnimationClassMap,
  ResolvedAnimation,
  AnimationDuration,
  AnimationEasing,
} from './types';

export {
  normaliseDuration,
  buildAnimationValue,
  resolveAnimation,
  resolveAnimations,
  animationClassMap,
} from './animate';
