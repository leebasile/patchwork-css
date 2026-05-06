/**
 * A spacing scale expressed as an ordered array of values (index becomes the key)
 * or a named record of values.
 *
 * Values may be numbers (interpreted as rem) or explicit CSS strings.
 *
 * @example
 * // Array form – keys become 0, 1, 2 …
 * [0, 0.25, 0.5, 1, 2]
 *
 * // Record form – keys are explicit
 * { xs: '0.25rem', sm: '0.5rem', md: '1rem' }
 */
export type SpacingScale =
  | Array<number | string>
  | Record<string, number | string>;

/**
 * Describes one CSS utility group: a class prefix and the CSS property it maps to.
 *
 * @example
 * { prefix: 'p', property: 'padding' }
 * { prefix: 'mx', property: 'margin-inline' }
 */
export interface SpacingUtility {
  prefix: string;
  property: string;
}

/**
 * Full spacing configuration passed to `buildSpacingClassMap`.
 */
export interface SpacingConfig {
  scale: SpacingScale;
  utilities: SpacingUtility[];
}

/**
 * Output of `buildSpacingClassMap`: a flat map of class name → CSS declaration.
 *
 * @example
 * { 'p-4': 'padding: 1rem', 'mt-2': 'margin-top: 0.5rem' }
 */
export type SpacingClassMap = Record<string, string>;
