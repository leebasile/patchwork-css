/**
 * @module breakpoints
 *
 * Utilities for defining and resolving CSS breakpoints into media query strings.
 *
 * @example
 * ```ts
 * import { resolveBreakpoints, formatBreakpointCSS } from 'patchwork-css/breakpoints';
 *
 * const breakpoints = resolveBreakpoints({
 *   sm: { min: '640px' },
 *   md: { min: '768px' },
 *   lg: { min: '1024px' },
 * });
 *
 * const css = formatBreakpointCSS(breakpoints, {
 *   sm: '.text-sm { font-size: 0.875rem; }',
 *   lg: '.text-lg { font-size: 1.125rem; }',
 * });
 * ```
 */

export { buildMediaQuery, resolveBreakpoints, findBreakpoint, formatBreakpointCSS } from './breakpoints';
export type { BreakpointKey, BreakpointConfig, BreakpointMap, ResolvedBreakpoint, ResolvedBreakpointMap } from './types';
