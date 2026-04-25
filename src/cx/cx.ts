/**
 * cx — Conditional class name utility for patchwork-css.
 * Accepts strings, falsy values, and record objects where keys are class names
 * and values are booleans. Returns a deduplicated, trimmed class string.
 */

export type CxInput =
  | string
  | null
  | undefined
  | false
  | 0
  | Record<string, boolean | null | undefined>;

/**
 * Flatten a single CxInput into an array of class name strings.
 */
function flattenInput(input: CxInput): string[] {
  if (!input) return [];

  if (typeof input === "string") {
    return input.split(/\s+/).filter(Boolean);
  }

  if (typeof input === "object") {
    return Object.entries(input)
      .filter(([, active]) => Boolean(active))
      .map(([cls]) => cls)
      .flatMap((cls) => cls.split(/\s+/).filter(Boolean));
  }

  return [];
}

/**
 * Compose conditional class names into a single deduplicated string.
 *
 * @example
 * cx("btn", isActive && "btn--active", { "btn--disabled": isDisabled })
 * // => "btn btn--active"
 */
export function cx(...inputs: CxInput[]): string {
  const seen = new Set<string>();
  const result: string[] = [];

  for (const input of inputs) {
    for (const cls of flattenInput(input)) {
      if (!seen.has(cls)) {
        seen.add(cls);
        result.push(cls);
      }
    }
  }

  return result.join(" ");
}
