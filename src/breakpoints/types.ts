/**
 * Breakpoint definitions for responsive design token support.
 */

export type BreakpointKey = string;

export interface BreakpointConfig {
  /** Min-width value including unit, e.g. '640px' */
  min?: string;
  /** Max-width value including unit, e.g. '1279px' */
  max?: string;
}

/**
 * A map of named breakpoints to their config.
 * @example
 * { sm: { min: '640px' }, md: { min: '768px' }, lg: { min: '1024px' } }
 */
export type BreakpointMap = Record<BreakpointKey, BreakpointConfig>;

/**
 * A resolved breakpoint entry with its key and generated media query string.
 */
export interface ResolvedBreakpoint {
  key: BreakpointKey;
  mediaQuery: string;
}

/**
 * Output of compiling a breakpoint map — an ordered list of resolved breakpoints.
 */
export type ResolvedBreakpointMap = ResolvedBreakpoint[];
