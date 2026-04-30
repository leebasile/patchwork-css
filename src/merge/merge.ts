/**
 * merge.ts
 * Merges multiple class strings or class records, resolving conflicts
 * by letting later values win — similar to tailwind-merge but token-aware.
 */

export type ClassInput = string | string[] | Record<string, boolean> | null | undefined;

/**
 * Extracts the "property prefix" from a utility class.
 * e.g. "text-red-500" -> "text", "bg-blue-100" -> "bg"
 */
export function getClassPrefix(cls: string): string {
  const parts = cls.trim().split("-");
  return parts[0] ?? cls;
}

/**
 * Flattens a ClassInput into an array of class strings.
 */
export function flattenClassInput(input: ClassInput): string[] {
  if (!input) return [];
  if (typeof input === "string") {
    return input.split(/\s+/).filter(Boolean);
  }
  if (Array.isArray(input)) {
    return input.flatMap((item) => item.split(/\s+/).filter(Boolean));
  }
  return Object.entries(input)
    .filter(([, enabled]) => enabled)
    .map(([cls]) => cls);
}

/**
 * Merges class inputs so that later entries win on prefix conflicts.
 * Classes without conflicts are preserved.
 *
 * @example
 * merge("text-sm text-red-500", "text-lg") // => "text-red-500 text-lg"
 */
export function merge(...inputs: ClassInput[]): string {
  const prefixMap = new Map<string, string>();
  const order: string[] = [];

  for (const input of inputs) {
    const classes = flattenClassInput(input);
    for (const cls of classes) {
      const prefix = getClassPrefix(cls);
      if (!prefixMap.has(prefix)) {
        order.push(prefix);
      }
      prefixMap.set(prefix, cls);
    }
  }

  return order.map((prefix) => prefixMap.get(prefix) as string).join(" ");
}
