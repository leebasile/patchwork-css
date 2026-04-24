/**
 * Core type definitions for design token configurations.
 */

export type TokenValue = string | number;

export type TokenScale = Record<string, TokenValue>;

export interface DesignTokenConfig {
  colors?: TokenScale;
  spacing?: TokenScale;
  typography?: {
    fontSizes?: TokenScale;
    fontWeights?: TokenScale;
    lineHeights?: TokenScale;
    fontFamilies?: TokenScale;
  };
  borderRadius?: TokenScale;
  shadows?: TokenScale;
  breakpoints?: TokenScale;
  [key: string]: TokenScale | Record<string, TokenScale> | undefined;
}

export interface ResolvedToken {
  /** The CSS property this token maps to */
  property: string;
  /** The utility class prefix */
  prefix: string;
  /** The token key */
  key: string;
  /** The resolved CSS value */
  value: string;
  /** The generated class name */
  className: string;
}

export type TokenResolver = (config: DesignTokenConfig) => ResolvedToken[];
