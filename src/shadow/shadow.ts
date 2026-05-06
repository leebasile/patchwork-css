import type { ShadowScale, ShadowToken, ShadowClassMap } from './types';

/**
 * Normalises a shadow value to a CSS box-shadow string.
 * Accepts a pre-built string or a ShadowToken descriptor object.
 */
export function normaliseShadowValue(value: ShadowToken | string): string {
  if (typeof value === 'string') return value;

  const { offsetX = 0, offsetY = 0, blur = 0, spread = 0, color, inset = false } = value;
  const parts = [
    inset ? 'inset' : '',
    `${offsetX}px`,
    `${offsetY}px`,
    `${blur}px`,
    `${spread}px`,
    color,
  ].filter(Boolean);

  return parts.join(' ');
}

/**
 * Resolves a ShadowScale config into a flat record of CSS box-shadow values.
 */
export function resolveShadowScale(
  scale: ShadowScale
): Record<string, string> {
  return Object.fromEntries(
    Object.entries(scale).map(([key, value]) => [key, normaliseShadowValue(value)])
  );
}

/**
 * Builds a map of utility class names to their CSS box-shadow declarations.
 * e.g. { 'shadow-sm': 'box-shadow: 0 1px 2px rgba(0,0,0,0.05);' }
 */
export function buildShadowClassMap(
  scale: ShadowScale,
  prefix = 'shadow'
): ShadowClassMap {
  const resolved = resolveShadowScale(scale);
  return Object.fromEntries(
    Object.entries(resolved).map(([key, value]) => [
      `${prefix}-${key}`,
      `box-shadow: ${value};`,
    ])
  );
}

/**
 * Formats a ShadowScale as a CSS block with custom properties.
 * e.g. --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
 */
export function formatShadowCSS(
  scale: ShadowScale,
  selector = ':root',
  prefix = 'shadow'
): string {
  const resolved = resolveShadowScale(scale);
  const vars = Object.entries(resolved)
    .map(([key, value]) => `  --${prefix}-${key}: ${value};`)
    .join('\n');
  return `${selector} {\n${vars}\n}`;
}
