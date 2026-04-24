import type { TokenMap } from '../tokens/types';

export type ClassCondition = boolean | undefined | null;
export type ClassEntry = string | [string, ClassCondition];
export type ClassConfig = Record<string, ClassEntry | ClassEntry[]>;

/**
 * Resolves a flat list of class entries into a deduplicated class string.
 */
export function composeClasses(...entries: ClassEntry[]): string {
  const resolved: string[] = [];

  for (const entry of entries) {
    if (Array.isArray(entry)) {
      const [cls, condition] = entry;
      if (condition) resolved.push(cls);
    } else if (typeof entry === 'string' && entry.trim().length > 0) {
      resolved.push(entry.trim());
    }
  }

  return [...new Set(resolved)].join(' ');
}

/**
 * Builds a class string from a token map and an optional prefix.
 * Each key in the map becomes `{prefix}{key}-{value}`.
 */
export function classesFromTokens(
  tokens: TokenMap,
  prefix = ''
): string {
  const classes: string[] = [];

  for (const [key, value] of Object.entries(tokens)) {
    if (value !== undefined && value !== null) {
      classes.push(`${prefix}${key}-${value}`);
    }
  }

  return classes.join(' ');
}

/**
 * Merges multiple class config objects, with later entries taking precedence.
 */
export function mergeClassConfigs(...configs: ClassConfig[]): ClassConfig {
  return Object.assign({}, ...configs);
}
