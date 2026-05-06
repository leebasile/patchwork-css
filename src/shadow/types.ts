/**
 * Descriptor object for a single shadow token.
 */
export interface ShadowToken {
  /** Horizontal offset in px */
  offsetX?: number;
  /** Vertical offset in px */
  offsetY?: number;
  /** Blur radius in px */
  blur?: number;
  /** Spread radius in px */
  spread?: number;
  /** CSS color value */
  color: string;
  /** Whether this is an inset shadow */
  inset?: boolean;
}

/**
 * A named map of shadow tokens.
 * Values can be ShadowToken objects or raw CSS strings.
 */
export type ShadowScale = Record<string, ShadowToken | string>;

/**
 * Map of utility class names to their CSS declarations.
 * e.g. { 'shadow-md': 'box-shadow: 0 4px 6px rgba(0,0,0,0.1);' }
 */
export type ShadowClassMap = Record<string, string>;

/**
 * Options for shadow resolution.
 */
export interface ShadowOptions {
  /** CSS class prefix (default: 'shadow') */
  prefix?: string;
  /** CSS selector for custom property output (default: ':root') */
  selector?: string;
}
