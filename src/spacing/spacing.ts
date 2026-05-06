import type { SpacingScale, SpacingConfig, SpacingClassMap } from './types';

/**
 * Normalises a spacing value to a string with optional unit suffix.
 */
export function normaliseSpacingValue(value: number | string): string {
  if (typeof value === 'number') {
    return value === 0 ? '0' : `${value}rem`;
  }
  return value;
}

/**
 * Resolves a spacing scale (array or record) into a flat record of
 * token-key → CSS value pairs.
 */
export function resolveSpacingScale(scale: SpacingScale): Record<string, string> {
  if (Array.isArray(scale)) {
    return scale.reduce<Record<string, string>>((acc, val, idx) => {
      acc[String(idx)] = normaliseSpacingValue(val);
      return acc;
    }, {});
  }
  return Object.fromEntries(
    Object.entries(scale).map(([k, v]) => [k, normaliseSpacingValue(v)])
  );
}

/**
 * Builds a map of utility class names → CSS declarations for a given
 * spacing config (prefix + scale).
 *
 * e.g. { 'p-4': 'padding: 1rem', 'm-2': 'margin: 0.5rem' }
 */
export function buildSpacingClassMap(config: SpacingConfig): SpacingClassMap {
  const resolved = resolveSpacingScale(config.scale);
  const map: SpacingClassMap = {};

  for (const [key, value] of Object.entries(resolved)) {
    for (const { prefix, property } of config.utilities) {
      const className = `${prefix}-${key}`;
      map[className] = `${property}: ${value}`;
    }
  }

  return map;
}

/**
 * Formats a SpacingClassMap as a CSS string block.
 */
export function formatSpacingCSS(classMap: SpacingClassMap): string {
  return Object.entries(classMap)
    .map(([cls, decl]) => `.${cls} { ${decl}; }`)
    .join('\n');
}
