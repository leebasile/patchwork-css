/**
 * cx — Conditional class name utility.
 *
 * Accepts strings, falsy values, and plain objects (Record<string, boolean>)
 * and returns a single deduplicated, space-separated class string.
 *
 * @module cx
 *
 * @example
 * import { cx } from "patchwork-css/cx";
 *
 * const classes = cx(
 *   "btn",
 *   isActive && "btn--active",
 *   { "btn--disabled": isDisabled }
 * );
 */

export { cx } from "./cx";
export type { CxInput } from "./cx";
