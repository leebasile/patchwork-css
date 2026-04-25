import type {
  VariantConfig,
  VariantDefinition,
  ResolvedVariant,
} from './types';

/**
 * Normalises a variant option value to an array of class strings.
 */
function normaliseClasses(value: string | string[]): string[] {
  return Array.isArray(value) ? value : value.split(/\s+/).filter(Boolean);
}

/**
 * Resolves a single variant definition against a chosen option key.
 * Falls back to `defaultOption` when the selected key is absent.
 *
 * Returns `null` when neither the selected option nor a default exists.
 */
export function resolveVariant(
  definition: VariantDefinition,
  selectedOption: string | undefined
): ResolvedVariant | null {
  const key = selectedOption ?? definition.defaultOption;
  if (key === undefined) return null;

  const value = definition.options[key];
  if (value === undefined) return null;

  return {
    variant: definition.name,
    option: key,
    classes: normaliseClasses(value),
  };
}

/**
 * Resolves all variant definitions in a `VariantConfig` and returns
 * an array of `ResolvedVariant` objects (skipping unresolvable entries).
 */
export function resolveVariants(config: VariantConfig): ResolvedVariant[] {
  return config.definitions.reduce<ResolvedVariant[]>((acc, definition) => {
    const selected = config.selected[definition.name];
    const resolved = resolveVariant(definition, selected);
    if (resolved !== null) acc.push(resolved);
    return acc;
  }, []);
}

/**
 * Flattens resolved variants into a single deduplicated class string.
 */
export function variantsToClassString(resolved: ResolvedVariant[]): string {
  const seen = new Set<string>();
  const classes: string[] = [];

  for (const rv of resolved) {
    for (const cls of rv.classes) {
      if (!seen.has(cls)) {
        seen.add(cls);
        classes.push(cls);
      }
    }
  }

  return classes.join(' ');
}
