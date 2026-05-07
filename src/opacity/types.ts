/**
 * A scale mapping token keys to opacity values.
 * Values can be numbers (0–1) or percentage strings (e.g. '50%').
 *
 * @example
 * const scale: OpacityScale = {
 *   0: 0,
 *   25: '25%',
 *   50: 0.5,
 *   75: '75%',
 *   100: 1,
 * };
 */
export type OpacityValue = number | string;

export type OpacityScale = Record<string, OpacityValue>;

/**
 * Maps each scale key to its generated CSS class name.
 */
export type OpacityClassMap = Record<string, string>;

/**
 * Configuration for the opacity module.
 */
export interface OpacityConfig {
  /** The opacity scale to resolve. */
  scale: OpacityScale;
  /**
   * Optional prefix for class names and CSS custom properties.
   * Defaults to 'opacity'.
   */
  prefix?: string;
}
