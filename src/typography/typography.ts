import type { TypographyScale, TypographyConfig, TypographyClassMap } from './types';

/**
 * Normalises a font-size value to a CSS string.
 */
export function normaliseFontSize(value: string | number): string {
  if (typeof value === 'number') {
    return `${value}rem`;
  }
  return value;
}

/**
 * Normalises a line-height value to a CSS string.
 */
export function normaliseLineHeight(value: string | number): string {
  if (typeof value === 'number') {
    return String(value);
  }
  return value;
}

/**
 * Builds a map of scale keys to Tailwind-style utility class arrays.
 */
export function buildTypographyClassMap(
  scale: TypographyScale,
  config: TypographyConfig = {}
): TypographyClassMap {
  const { prefix = 'text', lineHeightPrefix = 'leading' } = config;
  const map: TypographyClassMap = {};

  for (const [key, entry] of Object.entries(scale)) {
    const classes: string[] = [`${prefix}-${key}`];

    if (entry.lineHeight !== undefined) {
      classes.push(`${lineHeightPrefix}-${key}`);
    }

    if (entry.fontWeight !== undefined) {
      classes.push(`font-${entry.fontWeight}`);
    }

    if (entry.letterSpacing !== undefined) {
      classes.push(`tracking-${key}`);
    }

    map[key] = classes;
  }

  return map;
}

/**
 * Formats a typography scale as CSS custom property declarations.
 */
export function formatTypographyCSS(
  scale: TypographyScale,
  selector = ':root'
): string {
  const lines: string[] = [`${selector} {`];

  for (const [key, entry] of Object.entries(scale)) {
    lines.push(`  --font-size-${key}: ${normaliseFontSize(entry.fontSize)};`);

    if (entry.lineHeight !== undefined) {
      lines.push(`  --line-height-${key}: ${normaliseLineHeight(entry.lineHeight)};`);
    }

    if (entry.letterSpacing !== undefined) {
      lines.push(`  --letter-spacing-${key}: ${entry.letterSpacing};`);
    }
  }

  lines.push('}');
  return lines.join('\n');
}

/**
 * Resolves a typography key to its class string.
 */
export function resolveTypography(
  key: string,
  map: TypographyClassMap
): string {
  const classes = map[key];
  if (!classes || classes.length === 0) {
    throw new Error(`[patchwork-css] Unknown typography key: "${key}"`);
  }
  return classes.join(' ');
}
