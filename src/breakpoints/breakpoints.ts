import type {
  BreakpointMap,
  BreakpointConfig,
  ResolvedBreakpoint,
  ResolvedBreakpointMap,
} from './types';

/**
 * Builds a CSS media query string from a BreakpointConfig.
 */
export function buildMediaQuery(config: BreakpointConfig): string {
  const parts: string[] = [];

  if (config.min) {
    parts.push(`(min-width: ${config.min})`);
  }

  if (config.max) {
    parts.push(`(max-width: ${config.max})`);
  }

  if (parts.length === 0) {
    throw new Error('BreakpointConfig must define at least one of min or max.');
  }

  return `@media ${parts.join(' and ')}`;
}

/**
 * Resolves a BreakpointMap into an ordered list of ResolvedBreakpoints.
 * Order follows insertion order of the input map.
 */
export function resolveBreakpoints(map: BreakpointMap): ResolvedBreakpointMap {
  return Object.entries(map).map(([key, config]): ResolvedBreakpoint => ({
    key,
    mediaQuery: buildMediaQuery(config),
  }));
}

/**
 * Looks up a resolved breakpoint by key.
 * Returns undefined if the key is not found.
 */
export function findBreakpoint(
  resolved: ResolvedBreakpointMap,
  key: string
): ResolvedBreakpoint | undefined {
  return resolved.find((bp) => bp.key === key);
}

/**
 * Formats resolved breakpoints as a CSS string wrapping provided class rules.
 * @param resolved - The resolved breakpoint map
 * @param classMap - A map of breakpoint key to CSS rule block (inner content only)
 */
export function formatBreakpointCSS(
  resolved: ResolvedBreakpointMap,
  classMap: Record<string, string>
): string {
  return resolved
    .filter((bp) => classMap[bp.key] !== undefined)
    .map((bp) => `${bp.mediaQuery} {\n  ${classMap[bp.key]}\n}`)
    .join('\n');
}
