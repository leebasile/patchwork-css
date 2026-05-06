/**
 * A single outline token definition.
 */
export interface OutlineToken {
  /** Outline width — number treated as px, string used as-is. */
  width?: string | number;
  /** Outline style, e.g. 'solid' | 'dashed' | 'dotted'. Defaults to 'solid'. */
  style?: string;
  /** Outline color. Defaults to 'currentColor'. */
  color?: string;
  /** Outline offset — number treated as px, string used as-is. */
  offset?: string | number;
}

/**
 * A named scale of outline tokens.
 */
export type OutlineScale = Record<string, OutlineToken>;

/**
 * Configuration object passed to resolveOutline.
 */
export interface OutlineConfig {
  scale: OutlineScale;
  /** Optional CSS class prefix, e.g. 'tw-'. */
  prefix?: string;
}

/**
 * A map of generated CSS class names to their declaration strings.
 */
export type OutlineClassMap = Record<string, string>;
