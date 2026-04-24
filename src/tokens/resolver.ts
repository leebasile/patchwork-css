/**
 * Resolves a DesignTokenConfig into a flat list of ResolvedTokens.
 */

import type { DesignTokenConfig, ResolvedToken, TokenScale } from './types';

const SCALE_MAP: Array<{
  configKey: keyof DesignTokenConfig;
  cssProperty: string;
  prefix: string;
}> = [
  { configKey: 'colors', cssProperty: 'color', prefix: 'text' },
  { configKey: 'spacing', cssProperty: 'margin', prefix: 'space' },
  { configKey: 'borderRadius', cssProperty: 'border-radius', prefix: 'rounded' },
  { configKey: 'shadows', cssProperty: 'box-shadow', prefix: 'shadow' },
];

const TYPOGRAPHY_MAP: Array<{
  subKey: string;
  cssProperty: string;
  prefix: string;
}> = [
  { subKey: 'fontSizes', cssProperty: 'font-size', prefix: 'text' },
  { subKey: 'fontWeights', cssProperty: 'font-weight', prefix: 'font' },
  { subKey: 'lineHeights', cssProperty: 'line-height', prefix: 'leading' },
  { subKey: 'fontFamilies', cssProperty: 'font-family', prefix: 'font-family' },
];

function resolveScale(
  scale: TokenScale,
  cssProperty: string,
  prefix: string
): ResolvedToken[] {
  return Object.entries(scale).map(([key, value]) => ({
    property: cssProperty,
    prefix,
    key,
    value: String(value),
    className: `${prefix}-${key}`,
  }));
}

export function resolveTokens(config: DesignTokenConfig): ResolvedToken[] {
  const tokens: ResolvedToken[] = [];

  for (const { configKey, cssProperty, prefix } of SCALE_MAP) {
    const scale = config[configKey] as TokenScale | undefined;
    if (scale) {
      tokens.push(...resolveScale(scale, cssProperty, prefix));
    }
  }

  if (config.typography) {
    for (const { subKey, cssProperty, prefix } of TYPOGRAPHY_MAP) {
      const scale = config.typography[subKey as keyof typeof config.typography];
      if (scale) {
        tokens.push(...resolveScale(scale as TokenScale, cssProperty, prefix));
      }
    }
  }

  return tokens;
}
