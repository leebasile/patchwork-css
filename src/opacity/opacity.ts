import type { OpacityScale, OpacityConfig, OpacityClassMap } from './types';

/**
 * Normalise an opacity value to a number between 0 and 1.
 * Accepts either a decimal (0–1) or a percentage string (e.g. '50%').
 */
export function normaliseOpacityValue(value: string | number): number {
  if (typeof value === 'number') {
    if (value < 0 || value > 1) {
      throw new RangeError(`Opacity value must be between 0 and 1, got: ${value}`);
    }
    return value;
  }

  if (value.endsWith('%')) {
    const numeric = parseFloat(value);
    if (isNaN(numeric) || numeric < 0 || numeric > 100) {
      throw new RangeError(`Invalid opacity percentage: ${value}`);
    }
    return numeric / 100;
  }

  const numeric = parseFloat(value);
  if (isNaN(numeric) || numeric < 0 || numeric > 1) {
    throw new RangeError(`Invalid opacity value: ${value}`);
  }
  return numeric;
}

/**
 * Build a map of scale key → CSS class name for opacity utilities.
 */
export function buildOpacityClassMap(
  scale: OpacityScale,
  prefix = 'opacity'
): OpacityClassMap {
  const map: OpacityClassMap = {};
  for (const [key, value] of Object.entries(scale)) {
    map[key] = `${prefix}-${key}`;
  }
  return map;
}

/**
 * Format an opacity scale as CSS custom-property declarations.
 */
export function formatOpacityCSS(
  scale: OpacityScale,
  prefix = 'opacity'
): string {
  const lines = Object.entries(scale).map(([key, value]) => {
    const normalised = normaliseOpacityValue(value);
    return `  --${prefix}-${key}: ${normalised};`;
  });
  return `:root {\n${lines.join('\n')}\n}`;
}

/**
 * Resolve an opacity config into a class map and CSS string.
 */
export function resolveOpacity(config: OpacityConfig): {
  classMap: OpacityClassMap;
  css: string;
} {
  const { scale, prefix = 'opacity' } = config;
  return {
    classMap: buildOpacityClassMap(scale, prefix),
    css: formatOpacityCSS(scale, prefix),
  };
}
