/**
 * Types for the conditions module.
 * Conditions map named states (hover, focus, dark, etc.) to CSS selector or media query strings.
 */

export type ConditionValue = string;

export interface ConditionMap {
  [conditionName: string]: ConditionValue;
}

export interface ResolvedCondition {
  name: string;
  selector: string;
  isMediaQuery: boolean;
}

export type ConditionClassMap = Record<string, string[]>;

/**
 * Input to resolveConditions — a map of condition names to class arrays or strings.
 */
export interface ConditionInput {
  base?: string | string[];
  [conditionName: string]: string | string[] | undefined;
}
