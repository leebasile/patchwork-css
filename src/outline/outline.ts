import type { OutlineConfig, OutlineScale, OutlineClassMap } from './types';

/**
 * Normalises an outline width value to a CSS string.
 */
export function normaliseOutlineWidth(value: string | number): string {
  if (typeof value === 'number') return `${value}px`;
  return value;
}

/**
 * Normalises an outline style value (defaults to 'solid').
 */
export function normaliseOutlineStyle(style?: string): string {
  return style ?? 'solid';
}

/**
 * Builds a map of utility class names to CSS declarations for an outline scale.
 */
export function buildOutlineClassMap(scale: OutlineScale): OutlineClassMap {
  const map: OutlineClassMap = {};

  for (const [key, config] of Object.entries(scale)) {
    const width = normaliseOutlineWidth(config.width ?? 1);
    const style = normaliseOutlineStyle(config.style);
    const color = config.color ?? 'currentColor';
    const offset = config.offset != null ? normaliseOutlineWidth(config.offset) : null;

    const className = `outline-${key}`;
    map[className] = `outline: ${width} ${style} ${color};`;

    if (offset !== null) {
      map[`outline-offset-${key}`] = `outline-offset: ${offset};`;
    }
  }

  return map;
}

/**
 * Formats an outline scale as a CSS string of utility classes.
 */
export function formatOutlineCSS(scale: OutlineScale, prefix = ''): string {
  const classMap = buildOutlineClassMap(scale);
  return Object.entries(classMap)
    .map(([cls, decl]) => `.${prefix}${cls} { ${decl} }`)
    .join('\n');
}

/**
 * Resolves an outline config into a class map and optional CSS output.
 */
export function resolveOutline(config: OutlineConfig): {
  classMap: OutlineClassMap;
  css: string;
} {
  const classMap = buildOutlineClassMap(config.scale);
  const css = formatOutlineCSS(config.scale, config.prefix);
  return { classMap, css };
}
