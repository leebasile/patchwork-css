/**
 * Types for the variants module.
 * Variants map named states (e.g. 'hover', 'dark') to class modifiers.
 */

export type VariantModifier = string;

export type VariantMap = Record<string, VariantModifier>;

/**
 * A single variant definition: a named group of modifier → class mappings.
 *
 * @example
 * const colorVariant: VariantDefinition = {
 *   name: 'color',
 *   options: { primary: 'text-blue-500', secondary: 'text-gray-500' },
 * };
 */
export interface VariantDefinition {
  name: string;
  options: Record<string, string | string[]>;
  defaultOption?: string;
}

/**
 * A resolved variant result: the selected option key and its resolved classes.
 */
export interface ResolvedVariant {
  variant: string;
  option: string;
  classes: string[];
}

/**
 * Config passed to `resolveVariants`.
 */
export interface VariantConfig {
  definitions: VariantDefinition[];
  selected: Record<string, string>;
}
