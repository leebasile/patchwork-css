/**
 * Supported input types for the clsx utility.
 */
export type ClsxPrimitive = string | number | null | undefined | boolean;

export type ClsxArray = ClsxInput[];

export type ClsxObject = Record<string, unknown>;

export type ClsxInput = ClsxPrimitive | ClsxArray | ClsxObject;

/**
 * Result of clsx — always a trimmed string of space-separated class names.
 */
export type ClsxResult = string;

/**
 * Options for clsx behaviour.
 */
export interface ClsxOptions {
  /**
   * When true, duplicate class names are removed from the output.
   * @default true
   */
  deduplicate?: boolean;

  /**
   * Optional prefix to prepend to every resolved class name.
   */
  prefix?: string;
}
