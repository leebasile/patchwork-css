import type {
  BreakpointKey,
  ResponsiveConfig,
  ResponsiveValue,
  ResolvedResponsiveClasses,
} from './types';

/**
 * Normalises a class value (string or string[]) into a string[].
 */
function normaliseValue(value: string | string[]): string[] {
  if (Array.isArray(value)) {
    return value.flatMap((v) => v.split(/\s+/)).filter(Boolean);
  }
  return value.split(/\s+/).filter(Boolean);
}

/**
 * Resolves a `ResponsiveValue` into a flat array of (optionally prefixed)
 * CSS class strings, based on the provided `ResponsiveConfig`.
 *
 * Classes under the `base` key are emitted without a prefix.
 * Classes under a breakpoint key are prefixed using `prefixTemplate`.
 *
 * Unknown breakpoint keys (not in `config.breakpoints`) are silently ignored.
 *
 * @example
 * resolveResponsive(
 *   { base: 'flex', md: 'grid', lg: ['grid', 'gap-4'] },
 *   { breakpoints: { md: '768px', lg: '1024px' } }
 * );
 * // => ['flex', 'md:grid', 'lg:grid', 'lg:gap-4']
 */
export function resolveResponsive(
  value: ResponsiveValue,
  config: ResponsiveConfig,
): ResolvedResponsiveClasses {
  const prefix =
    config.prefixTemplate ?? ((key: BreakpointKey) => `${key}:`);

  const result: string[] = [];

  for (const [key, classes] of Object.entries(value)) {
    const normalised = normaliseValue(classes);

    if (key === 'base') {
      result.push(...normalised);
      continue;
    }

    if (!(key in config.breakpoints)) {
      continue;
    }

    const p = prefix(key);
    result.push(...normalised.map((cls) => `${p}${cls}`));
  }

  return result;
}

/**
 * Resolves multiple `ResponsiveValue` entries and returns a single flat
 * deduplicated array of class strings.
 */
export function resolveResponsiveAll(
  values: ResponsiveValue[],
  config: ResponsiveConfig,
): ResolvedResponsiveClasses {
  const seen = new Set<string>();
  const result: string[] = [];

  for (const value of values) {
    for (const cls of resolveResponsive(value, config)) {
      if (!seen.has(cls)) {
        seen.add(cls);
        result.push(cls);
      }
    }
  }

  return result;
}
