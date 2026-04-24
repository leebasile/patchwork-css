/**
 * Types for the class composition module.
 */

/** A record mapping variant keys to CSS class strings */
export type ClassVariantMap = Record<string, string | string[]>;

/** A condition/variant selector config */
export interface ComposeConfig {
  base?: string | string[];
  variants?: Record<string, ClassVariantMap>;
  defaultVariants?: Record<string, string>;
  compoundVariants?: CompoundVariant[];
}

/** A compound variant applies additional classes when multiple variants match */
export interface CompoundVariant {
  variants: Record<string, string>;
  classes: string | string[];
}

/** The resolved variant selection passed to the compose function */
export type VariantSelection = Record<string, string | undefined>;

/** The result of calling compose() — a deterministic class string */
export type ComposedClasses = string;
