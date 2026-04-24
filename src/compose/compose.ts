import type {
  ComposeConfig,
  VariantSelection,
  ComposedClasses,
} from "./types";

/**
 * Normalises a class value (string | string[] | undefined) to a trimmed string.
 */
function toClassString(value: string | string[] | undefined): string {
  if (!value) return "";
  const arr = Array.isArray(value) ? value : [value];
  return arr
    .flatMap((c) => c.split(/\s+/))
    .filter(Boolean)
    .join(" ");
}

/**
 * Composes a deterministic set of CSS classes from a config and a variant
 * selection.  The result is a single, deduplicated, space-separated string.
 *
 * @example
 * const btn = compose({
 *   base: "btn",
 *   variants: { size: { sm: "btn-sm", lg: "btn-lg" } },
 *   defaultVariants: { size: "sm" },
 * });
 * btn({ size: "lg" }); // "btn btn-lg"
 */
export function compose(
  config: ComposeConfig
): (selection?: VariantSelection) => ComposedClasses {
  return function resolve(selection: VariantSelection = {}): ComposedClasses {
    const parts: string[] = [];

    // 1. Base classes
    parts.push(toClassString(config.base));

    // 2. Variant classes
    const merged: VariantSelection = {
      ...config.defaultVariants,
      ...Object.fromEntries(
        Object.entries(selection).filter(([, v]) => v !== undefined)
      ),
    };

    for (const [variantKey, variantValue] of Object.entries(merged)) {
      const variantMap = config.variants?.[variantKey];
      if (variantMap && variantValue) {
        parts.push(toClassString(variantMap[variantValue]));
      }
    }

    // 3. Compound variant classes
    for (const compound of config.compoundVariants ?? []) {
      const allMatch = Object.entries(compound.variants).every(
        ([k, v]) => merged[k] === v
      );
      if (allMatch) {
        parts.push(toClassString(compound.classes));
      }
    }

    // Deduplicate while preserving order
    const seen = new Set<string>();
    return parts
      .flatMap((p) => p.split(/\s+/))
      .filter((cls) => {
        if (!cls || seen.has(cls)) return false;
        seen.add(cls);
        return true;
      })
      .join(" ");
  };
}
