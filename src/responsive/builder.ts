import type { BreakpointMap, ResponsiveConfig, ResponsiveValue } from './types';
import { resolveResponsiveAll } from './resolver';

/**
 * Given a map of breakpoint prefixes and a record of responsive prop values,
 * produce a flat array of CSS class strings with breakpoint prefixes applied.
 *
 * @example
 * buildResponsiveClasses(
 *   { sm: 'sm:', md: 'md:', lg: 'lg:' },
 *   { display: { base: 'block', md: 'flex' }, gap: 'gap-4' }
 * )
 * // => ['block', 'md:flex', 'gap-4']
 */
export function buildResponsiveClasses(
  breakpoints: BreakpointMap,
  config: ResponsiveConfig,
): string[] {
  const classes: string[] = [];

  for (const [_prop, value] of Object.entries(config)) {
    const resolved = resolveResponsiveAll(
      value as ResponsiveValue<string>,
      breakpoints,
    );
    classes.push(...resolved);
  }

  return classes;
}
