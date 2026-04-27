import { cx } from '../cx';

/**
 * A map of shorthand aliases to one or more utility class expansions.
 * Values can be a string (single class) or an array of classes.
 */
export type ShorthandMap = Record<string, string | string[]>;

/**
 * Options for createShorthand.
 */
export interface ShorthandOptions {
  /** Separator used when joining multiple shorthand keys. Defaults to ' '. */
  separator?: string;
}

/**
 * Resolves a single shorthand key against the map.
 * Returns an array of resolved class strings.
 */
export function resolveShorthand(
  key: string,
  map: ShorthandMap
): string[] {
  const value = map[key];
  if (value === undefined) {
    // Pass through unknown keys as-is
    return [key];
  }
  return Array.isArray(value) ? value : [value];
}

/**
 * Resolves multiple shorthand keys and returns a deduplicated class string.
 */
export function resolveShorthands(
  keys: string | string[],
  map: ShorthandMap
): string {
  const input = Array.isArray(keys) ? keys : keys.split(/\s+/).filter(Boolean);
  const resolved = input.flatMap((key) => resolveShorthand(key, map));
  return cx(resolved);
}

/**
 * Creates a bound shorthand resolver for a given map.
 * Returns a function that accepts shorthand keys and returns a class string.
 *
 * @example
 * const sh = createShorthand({ 'flex-center': ['flex', 'items-center', 'justify-center'] });
 * sh('flex-center') // => 'flex items-center justify-center'
 */
export function createShorthand(
  map: ShorthandMap,
  _options: ShorthandOptions = {}
): (keys: string | string[]) => string {
  return (keys) => resolveShorthands(keys, map);
}
