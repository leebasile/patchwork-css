/**
 * Types for the animate module.
 * Maps animation token keys to CSS class strings.
 */

export type AnimationDuration = string | number;

export type AnimationEasing =
  | 'linear'
  | 'ease'
  | 'ease-in'
  | 'ease-out'
  | 'ease-in-out'
  | string;

export interface AnimationToken {
  duration?: AnimationDuration;
  easing?: AnimationEasing;
  delay?: AnimationDuration;
  iterations?: number | 'infinite';
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
  fillMode?: 'none' | 'forwards' | 'backwards' | 'both';
  name?: string;
}

export type AnimationTokenMap = Record<string, AnimationToken>;

export interface ResolvedAnimation {
  key: string;
  className: string;
  css: string;
}

export type AnimationClassMap = Record<string, string>;
