/**
 * Types for responsive breakpoint utilities.
 */

export type BreakpointKey = string;

export type BreakpointMap = Record<BreakpointKey, string>;

/**
 * A responsive value maps breakpoint keys to class strings or arrays.
 * The special key `base` is used for the default (mobile-first) value.
 *
 * @example
 * { base: 'text-sm', md: 'text-base', lg: 'text-lg' }
 */
export type ResponsiveValue = Record<BreakpointKey | 'base', string | string[]>;

/**
 * Config passed to `resolveResponsive`.
 */
export interface ResponsiveConfig {
  /** Defined breakpoints, e.g. { sm: '640px', md: '768px', lg: '1024px' } */
  breakpoints: BreakpointMap;
  /**
   * Prefix template used to generate responsive class prefixes.
   * Defaults to `(key) => \`${key}:\``.
   */
  prefixTemplate?: (key: BreakpointKey) => string;
}

/**
 * Result of resolving a responsive value — a flat array of prefixed classes.
 */
export type ResolvedResponsiveClasses = string[];
