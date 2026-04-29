import type {
  ConditionMap,
  ResolvedCondition,
  ConditionInput,
  ConditionClassMap,
} from './types';

/**
 * Determines whether a condition value is a media query.
 */
export function isMediaQuery(value: string): boolean {
  return value.trimStart().startsWith('@');
}

/**
 * Resolves a ConditionMap into an array of ResolvedCondition objects.
 */
export function resolveConditionMap(map: ConditionMap): ResolvedCondition[] {
  return Object.entries(map).map(([name, selector]) => ({
    name,
    selector,
    isMediaQuery: isMediaQuery(selector),
  }));
}

/**
 * Normalises a string or string[] into a string[].
 */
function normaliseClasses(input: string | string[] | undefined): string[] {
  if (!input) return [];
  return Array.isArray(input) ? input.filter(Boolean) : input.split(/\s+/).filter(Boolean);
}

/**
 * Resolves a ConditionInput into a ConditionClassMap,
 * applying the condition selector as a prefix to each class.
 */
export function resolveConditions(
  input: ConditionInput,
  conditions: ConditionMap
): ConditionClassMap {
  const result: ConditionClassMap = {};

  for (const [key, rawClasses] of Object.entries(input)) {
    const classes = normaliseClasses(rawClasses);
    if (classes.length === 0) continue;

    if (key === 'base') {
      result['base'] = classes;
      continue;
    }

    const conditionSelector = conditions[key];
    if (!conditionSelector) continue;

    result[key] = classes.map((cls) =>
      isMediaQuery(conditionSelector)
        ? `${conditionSelector}:${cls}`
        : `${conditionSelector}\\:${cls}`
    );
  }

  return result;
}

/**
 * Flattens a ConditionClassMap into a single array of class strings.
 */
export function flattenConditionClasses(map: ConditionClassMap): string[] {
  return Object.values(map).flat();
}

/**
 * Converts a ConditionClassMap to a space-separated class string.
 */
export function conditionsToClassString(
  input: ConditionInput,
  conditions: ConditionMap
): string {
  const map = resolveConditions(input, conditions);
  return flattenConditionClasses(map).join(' ');
}
